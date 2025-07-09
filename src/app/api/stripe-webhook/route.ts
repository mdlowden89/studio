
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Readable } from 'stream';
import { db } from '@/lib/firebase';
import { doc, updateDoc, collection, query, where, getDocs, limit, increment } from 'firebase/firestore';
import type { SubscriptionInfo } from '@/lib/types';
import { addHours, addDays } from 'date-fns';

// Initialize Stripe with the secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-06-20',
});

// Stripe requires the raw body to construct events, so we disable the default Next.js body parser
export const config = {
  api: {
    bodyParser: false,
  },
};

// Helper function to buffer the request stream
async function buffer(readable: Readable) {
  const chunks = [];
  for await (const chunk of readable) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

const updateSubscriptionStatus = async (userId: string, subscription: Stripe.Subscription) => {
    const subscriptionData: SubscriptionInfo = {
        stripeSubscriptionId: subscription.id,
        stripeCustomerId: subscription.customer as string,
        planId: subscription.items.data[0].price.id,
        status: subscription.status,
        currentPeriodEnd: subscription.current_period_end,
    };
    
    const userDocRef = doc(db, 'users', userId);
    await updateDoc(userDocRef, {
        subscription: subscriptionData,
    });
    console.log(`Updated subscription for user ${userId} to status ${subscription.status}.`);
};

export async function POST(request: NextRequest) {
  if (!request.body) {
    return NextResponse.json({ error: 'Missing request body' }, { status: 400 });
  }
  const buf = await buffer(request.body);
  const sig = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !webhookSecret) {
    console.error('Webhook Error: Missing stripe-signature or webhook secret.');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error(`Webhook signature verification failed: ${err.message}`);
    return NextResponse.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  // Handle the event
  console.log(`Received Stripe event: ${event.type}`);

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      const userId = session.client_reference_id;
      
      if (!userId) {
        console.warn('Webhook Error: Missing client_reference_id in checkout.session.completed event.');
        break;
      }
      
      // Handle subscription-based checkouts
      if (session.mode === 'subscription') {
          if (!session.subscription) {
            console.warn(`Webhook Error: Missing subscription ID for user ${userId} in subscription mode checkout.`);
            break;
          }
          console.log(`Checkout session completed for user ID: ${userId}, subscription ID: ${session.subscription}`);
          const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
          await updateSubscriptionStatus(userId, subscription);
      } 
      // Handle one-time payment checkouts
      else if (session.mode === 'payment') {
          const purchaseItem = session.metadata?.purchase_item;
          console.log(`One-time payment checkout session completed for user ID: ${userId}, item: ${purchaseItem}`);
          
          if (purchaseItem === 'glow_boost') {
              const userDocRef = doc(db, 'users', userId);
              const expiresAt = addHours(new Date(), 24).toISOString();
              await updateDoc(userDocRef, {
                  glowEffect: {
                      active: true,
                      expiresAt: expiresAt,
                  },
              });
              console.log(`Successfully activated Glow Mode for user ${userId}.`);
          } else {
            console.warn(`Unhandled purchase item '${purchaseItem}' for user ${userId}.`);
          }
      }
      break;
    }
    
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('subscription.stripeCustomerId', '==', customerId), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userId = querySnapshot.docs[0].id;
        await updateSubscriptionStatus(userId, subscription);
      } else {
        console.warn(`Webhook Error: Received subscription update for unknown customer ID: ${customerId}`);
      }
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      const customerId = subscription.customer as string;

      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('subscription.stripeCustomerId', '==', customerId), limit(1));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userId = querySnapshot.docs[0].id;
         const userDocRef = doc(db, 'users', userId);
        // Set status to canceled. You might want more sophisticated logic here,
        // e.g., setting a `subscription` field to null or a different status.
        await updateDoc(userDocRef, {
            'subscription.status': 'canceled',
        });
        console.log(`Cancelled subscription for user ${userId}.`);
      } else {
        console.warn(`Webhook Error: Received subscription deletion for unknown customer ID: ${customerId}`);
      }
      break;
    }

    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment succeeded for invoice ID: ${invoicePaymentSucceeded.id}, Subscription: ${invoicePaymentSucceeded.subscription}`);
      // The 'customer.subscription.updated' event will handle the status change to 'active'.
      // You can add additional logic here if needed, like sending a receipt email.
      break;

    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment failed for invoice ID: ${invoicePaymentFailed.id}, Subscription: ${invoicePaymentFailed.subscription}`);
      // The 'customer.subscription.updated' event will handle the status change to 'past_due' or other statuses.
      // You can add logic to notify the user about the payment failure.
      break;

    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
