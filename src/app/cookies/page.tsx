
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h2>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground ml-5 leading-relaxed">{children}</li>
);


export default function CookiePolicyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Cookie Policy</CardTitle>
            <CardDescription>
              Last updated: July 11, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Paragraph>
              This Cookie Policy explains how Crossd ("Company," "we," "us," and "our") uses cookies and similar technologies to recognize you when you visit our website at <Link href="https://crossd.app" className="text-primary hover:underline">crossd.app</Link> ("Website"). It explains what these technologies are and why we use them, as well as your rights to control our use of them.
            </Paragraph>
             <Paragraph>
              In some cases we may use cookies to collect personal information, or that becomes personal information if we combine it with other information.
            </Paragraph>
            
            <Separator className="my-6" />

            <SectionTitle>What are cookies?</SectionTitle>
            <Paragraph>
              Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.
            </Paragraph>
            <Paragraph>
                Cookies set by the website owner (in this case, Crossd) are called "first-party cookies." Cookies set by parties other than the website owner are called "third-party cookies." Third-party cookies enable third-party features or functionality to be provided on or through the website (e.g., advertising, interactive content, and analytics). The parties that set these third-party cookies can recognize your computer both when it visits the website in question and also when it visits certain other websites.
            </Paragraph>

            <SectionTitle>Why do we use cookies?</SectionTitle>
             <Paragraph>
                We use first- and third-party cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies. Other cookies also enable us to track and target the interests of our users to enhance the experience on our Online Properties. Third parties serve cookies through our Website for advertising, analytics, and other purposes. This is described in more detail below.
            </Paragraph>

            <SectionTitle>How can I control cookies?</SectionTitle>
            <Paragraph>
              You have the right to decide whether to accept or reject cookies. You can exercise your cookie rights by setting your preferences in the Cookie Consent Manager. The Cookie Consent Manager allows you to select which categories of cookies you accept or reject. Essential cookies cannot be rejected as they are strictly necessary to provide you with services.
            </Paragraph>
             <Paragraph>
              The Cookie Consent Manager can be found in the notification banner and on our Website. If you choose to reject cookies, you may still use our Website though your access to some functionality and areas of our Website may be restricted. You may also set or amend your web browser controls to accept or refuse cookies.
            </Paragraph>
            
            <SectionTitle>What about other tracking technologies, like web beacons?</SectionTitle>
            <Paragraph>
                Cookies are not the only way to recognize or track visitors to a website. We may use other, similar technologies from time to time, like web beacons (sometimes called "tracking pixels" or "clear gifs"). These are tiny graphics files that contain a unique identifier that enables us to recognize when someone has visited our Website or opened an email including them. This allows us, for example, to monitor the traffic patterns of users from one page within a website to another, to deliver or communicate with cookies, to understand whether you have come to the website from an online advertisement displayed on a third-party website, to improve site performance, and to measure the success of email marketing campaigns. In many instances, these technologies are reliant on cookies to function properly, and so declining cookies will impair their functioning.
            </Paragraph>

            <SectionTitle>How often will you update this Cookie Policy?</SectionTitle>
            <Paragraph>
                We may update this Cookie Policy from time to time in order to reflect, for example, changes to the cookies we use or for other operational, legal, or regulatory reasons. Please therefore revisit this Cookie Policy regularly to stay informed about our use of cookies and related technologies. The date at the top of this Cookie Policy indicates when it was last updated.
            </Paragraph>

             <SectionTitle>Where can I get further information?</SectionTitle>
             <Paragraph>
                If you have any questions about our use of cookies or other technologies, please email us at mlowdencrossd@gmail.com or by post to:
             </Paragraph>
             <address className="mt-2 not-italic text-muted-foreground">
                <strong>Crossd</strong><br />
                3rd floor, 86-90 Paul St, London EC2A 4NE, UK
             </address>


          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
