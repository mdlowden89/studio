
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-bold text-primary mt-6 mb-3">{children}</h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-foreground mt-4 mb-2">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground ml-5 leading-relaxed">{children}</li>
);

export default function PrivacyPolicyPage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Privacy Policy</CardTitle>
            <CardDescription>
              Last updated: June 23, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Paragraph>
              This Privacy Notice for Crossd ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you:
            </Paragraph>
            <ul className="list-disc space-y-2 pl-5">
                <ListItem>Visit our website at https://studio--crossd-rw236.us-central1.hosted.app or any website of ours that links to this Privacy Notice.</ListItem>
                <ListItem>Use Crossd. Crossd is a mobile-first social discovery app that helps people reconnect after real-life encounters. Users log shared experiences in physical locations (such as cafés, parks, or events) and can explore potential mutual connections based on overlapping paths and shared interests. The platform uses location-based memory logging, profile discovery, and moment tracking to foster meaningful reconnections in a respectful and privacy-conscious way. The app offers optional in-app purchases including visibility boosts, profile enhancements, and a premium membership that unlocks additional features like advanced filters, spark replays, and engagement insights.</ListItem>
                <ListItem>Engage with us in other related ways, including any sales, marketing, or events.</ListItem>
            </ul>
             <Paragraph>
              <strong>Questions or concerns?</strong> Reading this Privacy Notice will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at mlowdencrossd@gmail.com.
            </Paragraph>

            <Separator className="my-6" />

            <SectionTitle>SUMMARY OF KEY POINTS</SectionTitle>
            <Paragraph><em>This summary provides key points from our Privacy Notice, but you can find out more details about any of these topics by using our table of contents below to find the section you are looking for.</em></Paragraph>
            <ul className='list-disc space-y-3 pl-5'>
                <ListItem><strong>What personal information do we process?</strong> When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use.</ListItem>
                <ListItem><strong>Do we process any sensitive personal information?</strong> Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law.</ListItem>
                <ListItem><strong>Do we collect any information from third parties?</strong> We do not collect any information from third parties.</ListItem>
                <ListItem><strong>How do we process your information?</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.</ListItem>
                <ListItem><strong>In what situations and with which parties do we share personal information?</strong> We may share information in specific situations and with specific third parties.</ListItem>
                <ListItem><strong>How do we keep your information safe?</strong> We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure.</ListItem>
                <ListItem><strong>What are your rights?</strong> Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information.</ListItem>
                <ListItem><strong>How do you exercise your rights?</strong> The easiest way to exercise your rights is by submitting a data subject access request, or by contacting us.</ListItem>
            </ul>
            
            <Separator className="my-6" />

            <SectionTitle>TABLE OF CONTENTS</SectionTitle>
            <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
                <li><a href="#section-1" className="hover:text-primary hover:underline">WHAT INFORMATION DO WE COLLECT?</a></li>
                <li><a href="#section-2" className="hover:text-primary hover:underline">HOW DO WE PROCESS YOUR INFORMATION?</a></li>
                <li><a href="#section-3" className="hover:text-primary hover:underline">WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#section-4" className="hover:text-primary hover:underline">WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</a></li>
                <li><a href="#section-5" className="hover:text-primary hover:underline">DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</a></li>
                <li><a href="#section-6" className="hover:text-primary hover:underline">DO WE OFFER ARTIFICIAL INTELLIGENCE-BASED PRODUCTS?</a></li>
                <li><a href="#section-7" className="hover:text-primary hover:underline">HOW LONG DO WE KEEP YOUR INFORMATION?</a></li>
                <li><a href="#section-8" className="hover:text-primary hover:underline">HOW DO WE KEEP YOUR INFORMATION SAFE?</a></li>
                <li><a href="#section-9" className="hover:text-primary hover:underline">DO WE COLLECT INFORMATION FROM MINORS?</a></li>
                <li><a href="#section-10" className="hover:text-primary hover:underline">WHAT ARE YOUR PRIVACY RIGHTS?</a></li>
                <li><a href="#section-11" className="hover:text-primary hover:underline">CONTROLS FOR DO-NOT-TRACK FEATURES</a></li>
                <li><a href="#section-12" className="hover:text-primary hover:underline">DO UNITED STATES RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</a></li>
                <li><a href="#section-13" className="hover:text-primary hover:underline">DO WE MAKE UPDATES TO THIS NOTICE?</a></li>
                <li><a href="#section-14" className="hover:text-primary hover:underline">HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</a></li>
                <li><a href="#section-15" className="hover:text-primary hover:underline">HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</a></li>
            </ol>
            
            <div id="section-1">
                <SectionTitle>1. WHAT INFORMATION DO WE COLLECT?</SectionTitle>
                <SubHeading>Personal information you disclose to us</SubHeading>
                <Paragraph><em><strong>In Short:</strong> We collect personal information that you provide to us.</em></Paragraph>
                <Paragraph>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.</Paragraph>
                <Paragraph><strong>Personal Information Provided by You.</strong> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</Paragraph>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>names</li>
                    <li>email addresses</li>
                    <li>usernames</li>
                    <li>passwords</li>
                    <li>contact preferences</li>
                    <li>billing addresses</li>
                    <li>debit/credit card numbers</li>
                </ul>
                <Paragraph><strong>Sensitive Information.</strong> When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information:</Paragraph>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li>financial data</li>
                    <li>data about a person's sex life or sexual orientation</li>
                    <li>information revealing race or ethnic origin</li>
                    <li>information revealing political opinions</li>
                    <li>information revealing religious or philosophical beliefs</li>
                </ul>
                <Paragraph><strong>Payment Data.</strong> We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Stripe. You may find their privacy notice link here: <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">https://stripe.com/gb/privacy</a>.</Paragraph>
                <Paragraph>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</Paragraph>
                
                <SubHeading>Information automatically collected</SubHeading>
                <Paragraph><em><strong>In Short:</strong> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</em></Paragraph>
                <Paragraph>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</Paragraph>
                <Paragraph>Like many businesses, we also collect information through cookies and similar technologies.</Paragraph>
                <Paragraph>The information we collect includes:</Paragraph>
                <ul className="list-disc space-y-1 pl-5 text-muted-foreground">
                    <li><strong>Log and Usage Data.</strong> Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings).</li>
                    <li><strong>Location Data.</strong> We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.</li>
                </ul>
                <SubHeading>Google API</SubHeading>
                <Paragraph>Our use of information received from Google APIs will adhere to <a href="https://developers.google.com/terms/api-services-user-data-policy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Google API Services User Data Policy</a>, including the Limited Use requirements.</Paragraph>
            </div>
            
            <div id="section-2">
                <SectionTitle>2. HOW DO WE PROCESS YOUR INFORMATION?</SectionTitle>
                <Paragraph><em><strong>In Short:</strong> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We process the personal information for the following purposes listed below. We may also process your information for other purposes only with your prior explicit consent.</em></Paragraph>
                <Paragraph>We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</Paragraph>
                <ul className="list-disc space-y-2 pl-5 text-muted-foreground">
                    <li><strong>To facilitate account creation and authentication and otherwise manage user accounts.</strong> We may process your information so you can create and log in to your account, as well as keep your account in working order.</li>
                    <li><strong>To deliver and facilitate delivery of services to the user.</strong> We may process your information to provide you with the requested service.</li>
                    <li><strong>To respond to user inquiries/offer support to users.</strong> We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</li>
                    <li><strong>To enable user-to-user communications.</strong> We may process your information if you choose to use any of our offerings that allow for communication with another user.</li>
                    <li><strong>To request feedback.</strong> We may process your information when necessary to request feedback and to contact you about your use of our Services.</li>
                    <li><strong>To send you marketing and promotional communications.</strong> We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see 'WHAT ARE YOUR PRIVACY RIGHTS?' below.</li>
                    <li><strong>To protect our Services.</strong> We may process your information as part of our efforts to keep our Services safe and secure, including fraud monitoring and prevention.</li>
                    <li><strong>To identify usage trends.</strong> We may process information about how you use our Services to better understand how they are being used so we can improve them.</li>
                    <li><strong>To save or protect an individual's vital interest.</strong> We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.</li>
                </ul>
            </div>
            
            <div id="section-14">
                <SectionTitle>14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</SectionTitle>
                <Paragraph>If you have questions or comments about this notice, you may email us at mlowdencrossd@gmail.com or contact us by post at:</Paragraph>
                <address className="mt-2 not-italic text-muted-foreground">
                Crossd<br />
                3rd floor, 86-90 Paul Street<br />
                London, England EC2A 4NE<br />
                United Kingdom
                </address>
            </div>

            <div id="section-15">
                <SectionTitle>15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</SectionTitle>
                <Paragraph>Based on the applicable laws of your country or state of residence in the US, you may have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law. To request to review, update, or delete your personal information, please fill out and submit a data subject access request.</Paragraph>
            </div>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
