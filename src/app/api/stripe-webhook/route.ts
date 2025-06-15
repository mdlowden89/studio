
import { NextResponse, type NextRequest } from 'next/server';
import Stripe from 'stripe';
import { Readable } from 'stream';

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
  console.log(`Received Stripe event: ${event.type}`, event.data.object);

  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session;
      // Fulfill the purchase...
      // e.g., grant access to subscription, send confirmation email
      console.log(`Checkout session completed for session ID: ${session.id}`);
      if (session.customer && session.subscription) {
          console.log(`Customer ID: ${session.customer}, Subscription ID: ${session.subscription}`);
          // TODO: Save subscription details to your database, associate with your user
          // Example: updateSubscriptionStatus(session.client_reference_id, session.subscription, 'active');
      } else {
          console.warn('Checkout session completed but customer or subscription ID is missing.');
      }
      break;
    
    case 'customer.subscription.created':
      const subscriptionCreated = event.data.object as Stripe.Subscription;
      console.log(`Subscription created: ${subscriptionCreated.id}, Customer: ${subscriptionCreated.customer}, Status: ${subscriptionCreated.status}`);
      // TODO: Store subscription details and status.
      break;

    case 'customer.subscription.updated':
      const subscriptionUpdated = event.data.object as Stripe.Subscription;
      console.log(`Subscription updated: ${subscriptionUpdated.id}, Customer: ${subscriptionUpdated.customer}, Status: ${subscriptionUpdated.status}`);
      // TODO: Handle subscription changes (e.g., plan change, status change like 'past_due').
      // If subscriptionUpdated.status is 'active', ensure user has access.
      // If status is 'canceled' or 'unpaid', revoke access.
      break;

    case 'customer.subscription.deleted':
      const subscriptionDeleted = event.data.object as Stripe.Subscription;
      console.log(`Subscription deleted: ${subscriptionDeleted.id}, Customer: ${subscriptionDeleted.customer}, Status: ${subscriptionDeleted.status}`);
      // TODO: Revoke access to premium features.
      break;

    case 'invoice.payment_succeeded':
      const invoicePaymentSucceeded = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment succeeded for invoice ID: ${invoicePaymentSucceeded.id}, Subscription: ${invoicePaymentSucceeded.subscription}`);
      // If it's for a subscription, ensure the subscription is marked as active.
      if (invoicePaymentSucceeded.subscription) {
        // TODO: Verify subscription status and grant access if needed.
      }
      break;

    case 'invoice.payment_failed':
      const invoicePaymentFailed = event.data.object as Stripe.Invoice;
      console.log(`Invoice payment failed for invoice ID: ${invoicePaymentFailed.id}, Subscription: ${invoicePaymentFailed.subscription}`);
      // TODO: Notify the customer, potentially downgrade or suspend subscription.
      break;

    // ... handle other event types as needed

    default:
      console.warn(`Unhandled event type ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
