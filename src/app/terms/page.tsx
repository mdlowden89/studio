
import { AppLayout } from '@/components/layout/app-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const SectionTitle = ({ children, id }: { children: React.ReactNode, id: string }) => (
  <h2 id={id} className="text-2xl font-bold text-primary mt-8 mb-4 scroll-mt-20">{children}</h2>
);

const SubHeading = ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-lg font-semibold text-foreground mt-6 mb-2">{children}</h3>
);

const Paragraph = ({ children }: { children: React.ReactNode }) => (
  <p className="text-muted-foreground leading-relaxed">{children}</p>
);

const ListItem = ({ children }: { children: React.ReactNode }) => (
    <li className="text-muted-foreground ml-5 leading-relaxed">{children}</li>
);

export default function TermsOfServicePage() {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto py-8">
        <Card className="bg-card shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">Terms of Service</CardTitle>
            <CardDescription>
              Last updated: July 11, 2025
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SectionTitle id="agreement">AGREEMENT TO OUR LEGAL TERMS</SectionTitle>
            <Paragraph>
              We are Crossd ('<strong>Company</strong>', '<strong>we</strong>', '<strong>us</strong>', or '<strong>our</strong>'), a company registered in the United Kingdom at 3rd floor, 86-90 Paul Street, London, England EC2A 4NE.
            </Paragraph>
            <Paragraph>
              We operate the website <Link href="https://crossd.app" className="text-primary hover:underline">crossd.app</Link> (the '<strong>Site</strong>'), the mobile application Crossd (the '<strong>App</strong>'), as well as any other related products and services that refer or link to these legal terms (the '<strong>Legal Terms</strong>') (collectively, the '<strong>Services</strong>').
            </Paragraph>
             <Paragraph>
              You can contact us by email at mlowdencrossd@gmail.com or by mail to 3rd floor, 86-90 Paul Street, London, England EC2A 4NE, United Kingdom.
            </Paragraph>
             <Paragraph>
              These Legal Terms constitute a legally binding agreement made between you, whether personally or on behalf of an entity ('<strong>you</strong>'), and Crossd, concerning your access to and use of the Services. You agree that by accessing the Services, you have read, understood, and agreed to be bound by all of these Legal Terms. IF YOU DO NOT AGREE WITH ALL OF THESE LEGAL TERMS, THEN YOU ARE EXPRESSLY PROHIBITED FROM USING THE SERVICES AND YOU MUST DISCONTINUE USE IMMEDIATELY.
            </Paragraph>
            <Paragraph>
              Supplemental terms and conditions or documents that may be posted on the Services from time to time are hereby expressly incorporated herein by reference. We reserve the right, in our sole discretion, to make changes or modifications to these Legal Terms from time to time. We will alert you about any changes by updating the 'Last updated' date of these Legal Terms, and you waive any right to receive specific notice of each such change. It is your responsibility to periodically review these Legal Terms to stay informed of updates. You will be subject to, and will be deemed to have been made aware of and to have accepted, the changes in any revised Legal Terms by your continued use of the Services after the date such revised Legal Terms are posted.
            </Paragraph>
            <Paragraph>
             The Services are intended for users who are at least 18 years old. Persons under the age of 18 are not permitted to use or register for the Services.
            </Paragraph>

            <Separator className="my-6" />

            <h2 className="text-2xl font-bold text-primary mt-8 mb-4">TABLE OF CONTENTS</h2>
            <ol className="list-decimal space-y-2 pl-5 text-muted-foreground">
                <li><Link href="#services" className="hover:text-primary hover:underline">OUR SERVICES</Link></li>
                <li><Link href="#ip" className="hover:text-primary hover:underline">INTELLECTUAL PROPERTY RIGHTS</Link></li>
                <li><Link href="#userreps" className="hover:text-primary hover:underline">USER REPRESENTATIONS</Link></li>
                <li><Link href="#userreg" className="hover:text-primary hover:underline">USER REGISTRATION</Link></li>
                <li><Link href="#products" className="hover:text-primary hover:underline">PRODUCTS</Link></li>
                <li><Link href="#purchases" className="hover:text-primary hover:underline">PURCHASES AND PAYMENT</Link></li>
                <li><Link href="#subscriptions" className="hover:text-primary hover:underline">SUBSCRIPTIONS</Link></li>
                <li><Link href="#refunds" className="hover:text-primary hover:underline">REFUNDS POLICY</Link></li>
                <li><Link href="#prohibited" className="hover:text-primary hover:underline">PROHIBITED ACTIVITIES</Link></li>
                <li><Link href="#ugc" className="hover:text-primary hover:underline">USER GENERATED CONTRIBUTIONS</Link></li>
                <li><Link href="#license" className="hover:text-primary hover:underline">CONTRIBUTION LICENCE</Link></li>
                <li><Link href="#mobile" className="hover:text-primary hover:underline">MOBILE APPLICATION LICENCE</Link></li>
                <li><Link href="#sitemanage" className="hover:text-primary hover:underline">SERVICES MANAGEMENT</Link></li>
                <li><Link href="#pp" className="hover:text-primary hover:underline">PRIVACY POLICY</Link></li>
                <li><Link href="#copyright" className="hover:text-primary hover:underline">COPYRIGHT INFRINGEMENTS</Link></li>
                <li><Link href="#terms" className="hover:text-primary hover:underline">TERM AND TERMINATION</Link></li>
                <li><Link href="#modifications" className="hover:text-primary hover:underline">MODIFICATIONS AND INTERRUPTIONS</Link></li>
                <li><Link href="#law" className="hover:text-primary hover:underline">GOVERNING LAW</Link></li>
                <li><Link href="#disputes" className="hover:text-primary hover:underline">DISPUTE RESOLUTION</Link></li>
                <li><Link href="#corrections" className="hover:text-primary hover:underline">CORRECTIONS</Link></li>
                <li><Link href="#disclaimer" className="hover:text-primary hover:underline">DISCLAIMER</Link></li>
                <li><Link href="#liability" className="hover:text-primary hover:underline">LIMITATIONS OF LIABILITY</Link></li>
                <li><Link href="#indemnification" className="hover:text-primary hover:underline">INDEMNIFICATION</Link></li>
                <li><Link href="#userdata" className="hover:text-primary hover:underline">USER DATA</Link></li>
                <li><Link href="#electronic" className="hover:text-primary hover:underline">ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</Link></li>
                <li><Link href="#california" className="hover:text-primary hover:underline">CALIFORNIA USERS AND RESIDENTS</Link></li>
                <li><Link href="#misc" className="hover:text-primary hover:underline">MISCELLANEOUS</Link></li>
                <li><Link href="#contact" className="hover:text-primary hover:underline">CONTACT US</Link></li>
            </ol>
            
            <SectionTitle id="services">1. OUR SERVICES</SectionTitle>
            <Paragraph>The information provided when using the Services is not intended for distribution to or use by any person or entity in any jurisdiction or country where such distribution or use would be contrary to law or regulation or which would subject us to any registration requirement within such jurisdiction or country. Accordingly, those persons who choose to access the Services from other locations do so on their own initiative and are solely responsible for compliance with local laws, if and to the extent local laws are applicable.</Paragraph>

            <SectionTitle id="ip">2. INTELLECTUAL PROPERTY RIGHTS</SectionTitle>
            <SubHeading>Our intellectual property</SubHeading>
            <Paragraph>We are the owner or the licensee of all intellectual property rights in our Services, including all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics in the Services (collectively, the 'Content'), as well as the trademarks, service marks, and logos contained therein (the 'Marks'). Our Content and Marks are protected by copyright and trademark laws and treaties around the world. The Content and Marks are provided in or through the Services 'AS IS' for your personal, non-commercial use only.</Paragraph>
            <SubHeading>Your use of our Services</SubHeading>
            <Paragraph>Subject to your compliance with these Legal Terms, including the 'PROHIBITED ACTIVITIES' section below, we grant you a non-exclusive, non-transferable, revocable licence to access the Services and to download or print a copy of any portion of the Content to which you have properly gained access, solely for your personal, non-commercial use.</Paragraph>
            
            <SectionTitle id="userreps">3. USER REPRESENTATIONS</SectionTitle>
            <Paragraph>By using the Services, you represent and warrant that: (1) all registration information you submit will be true, accurate, current, and complete; (2) you will maintain the accuracy of such information and promptly update such registration information as necessary; (3) you have the legal capacity and you agree to comply with these Legal Terms; (4) you are not a minor in the jurisdiction in which you reside; (5) you will not access the Services through automated or non-human means, whether through a bot, script or otherwise; (6) you will not use the Services for any illegal or unauthorised purpose; and (7) your use of the Services will not violate any applicable law or regulation.</Paragraph>

            <SectionTitle id="userreg">4. USER REGISTRATION</SectionTitle>
            <Paragraph>You may be required to register to use the Services. You agree to keep your password confidential and will be responsible for all use of your account and password. We reserve the right to remove, reclaim, or change a username you select if we determine, in our sole discretion, that such username is inappropriate, obscene, or otherwise objectionable.</Paragraph>
            
            <SectionTitle id="products">5. PRODUCTS</SectionTitle>
            <Paragraph>All products are subject to availability. We reserve the right to discontinue any products at any time for any reason. Prices for all products are subject to change.</Paragraph>
            
            <SectionTitle id="purchases">6. PURCHASES AND PAYMENT</SectionTitle>
            <Paragraph>We accept the following forms of payment: Visa, Mastercard. You agree to provide current, complete, and accurate purchase and account information for all purchases made via the Services. You further agree to promptly update account and payment information, including email address, payment method, and payment card expiration date, so that we can complete your transactions and contact you as needed. Sales tax will be added to the price of purchases as deemed required by us. We may change prices at any time. All payments shall be in GBP Pound.</Paragraph>
            
            <SectionTitle id="subscriptions">7. SUBSCRIPTIONS</SectionTitle>
            <SubHeading>Billing and Renewal</SubHeading>
            <Paragraph>Your subscription will continue and automatically renew unless cancelled. You consent to our charging your payment method on a recurring basis without requiring your prior approval for each recurring charge, until such time as you cancel the applicable order. The length of your billing cycle will depend on the type of subscription plan you choose when you subscribed to the Services.</Paragraph>
            <SubHeading>Cancellation</SubHeading>
            <Paragraph>You can cancel your subscription at any time by logging into your account. Your cancellation will take effect at the end of the current paid term. If you have any questions or are unsatisfied with our Services, please email us at mlowdencrossd@gmail.com.</Paragraph>
            
            <SectionTitle id="refunds">8. REFUNDS POLICY</SectionTitle>
            <Paragraph>All sales are final and no refund will be issued.</Paragraph>

            <SectionTitle id="prohibited">9. PROHIBITED ACTIVITIES</SectionTitle>
            <Paragraph>You may not access or use the Services for any purpose other than that for which we make the Services available. The Services may not be used in connection with any commercial endeavours except those that are specifically endorsed or approved by us.</Paragraph>
            
            <SectionTitle id="ugc">10. USER GENERATED CONTRIBUTIONS</SectionTitle>
            <Paragraph>The Services may invite you to chat, contribute to, or participate in blogs, message boards, online forums, and other functionality, and may provide you with the opportunity to create, submit, post, display, transmit, perform, publish, distribute, or broadcast content and materials to us or on the Services, including but not limited to text, writings, video, audio, photographs, graphics, comments, suggestions, or personal information or other material (collectively, 'Contributions').</Paragraph>

            <SectionTitle id="license">11. CONTRIBUTION LICENCE</SectionTitle>
            <Paragraph>By posting your Contributions to any part of the Services, you automatically grant, and you represent and warrant that you have the right to grant, to us an unrestricted, unlimited, irrevocable, perpetual, non-exclusive, transferable, royalty-free, fully-paid, worldwide right, and licence to host, use, copy, reproduce, disclose, sell, resell, publish, broadcast, retitle, archive, store, cache, publicly perform, publicly display, reformat, translate, transmit, excerpt (in whole or in part), and distribute such Contributions (including, without limitation, your image and voice) for any purpose, commercial, advertising, or otherwise, and to prepare derivative works of, or incorporate into other works, such Contributions, and grant and authorise sublicences of the foregoing. The use and distribution may occur in any media formats and through any media channels.</Paragraph>
            
            <SectionTitle id="mobile">12. MOBILE APPLICATION LICENCE</SectionTitle>
            <SubHeading>Use Licence</SubHeading>
            <Paragraph>If you access the Services via the App, then we grant you a revocable, non-exclusive, non-transferable, limited right to install and use the App on wireless electronic devices owned or controlled by you, and to access and use the App on such devices strictly in accordance with the terms and conditions of this mobile application licence contained in these Legal Terms.</Paragraph>

            <SectionTitle id="sitemanage">13. SERVICES MANAGEMENT</SectionTitle>
            <Paragraph>We reserve the right, but not the obligation, to: (1) monitor the Services for violations of these Legal Terms; (2) take appropriate legal action against anyone who, in our sole discretion, violates the law or these Legal Terms, including without limitation, reporting such user to law enforcement authorities; (3) in our sole discretion and without limitation, refuse, restrict access to, limit the availability of, or disable (to the extent technologically feasible) any of your Contributions or any portion thereof; (4) in our sole discretion and without limitation, notice, or liability, to remove from the Services or otherwise disable all files and content that are excessive in size or are in any way burdensome to our systems; and (5) otherwise manage the Services in a manner designed to protect our rights and property and to facilitate the proper functioning of the Services.</Paragraph>

            <SectionTitle id="pp">14. PRIVACY POLICY</SectionTitle>
            <Paragraph>We care about data privacy and security. Please review our Privacy Policy: <Link href="/privacy" className="text-primary hover:underline">https://crossd.app/privacy</Link>. By using the Services, you agree to be bound by our Privacy Policy, which is incorporated into these Legal Terms.</Paragraph>
            
            <SectionTitle id="copyright">15. COPYRIGHT INFRINGEMENTS</SectionTitle>
            <Paragraph>We respect the intellectual property rights of others. If you believe that any material available on or through the Services infringes upon any copyright you own or control, please immediately notify us using the contact information provided below.</Paragraph>
            
            <SectionTitle id="terms">16. TERM AND TERMINATION</SectionTitle>
            <Paragraph>These Legal Terms shall remain in full force and effect while you use the Services. WITHOUT LIMITING ANY OTHER PROVISION OF THESE LEGAL TERMS, WE RESERVE THE RIGHT TO, IN OUR SOLE DISCRETION AND WITHOUT NOTICE OR LIABILITY, DENY ACCESS TO AND USE OF THE SERVICES (INCLUDING BLOCKING CERTAIN IP ADDRESSES), TO ANY PERSON FOR ANY REASON OR FOR NO REASON, INCLUDING WITHOUT LIMITATION FOR BREACH OF ANY REPRESENTATION, WARRANTY, OR COVENANT CONTAINED IN THESE LEGAL TERMS OR OF ANY APPLICABLE LAW OR REGULATION. WE MAY TERMINATE YOUR USE OR PARTICIPATION IN THE SERVICES OR DELETE YOUR ACCOUNT AND ANY CONTENT OR INFORMATION THAT YOU POSTED AT ANY TIME, WITHOUT WARNING, IN OUR SOLE DISCRETION.</Paragraph>
            
            <SectionTitle id="modifications">17. MODIFICATIONS AND INTERRUPTIONS</SectionTitle>
            <Paragraph>We reserve the right to change, modify, or remove the contents of the Services at any time or for any reason at our sole discretion without notice. However, we have no obligation to update any information on our Services. We will not be liable to you or any third party for any modification, price change, suspension, or discontinuance of the Services.</Paragraph>
            
            <SectionTitle id="law">18. GOVERNING LAW</SectionTitle>
            <Paragraph>These Legal Terms are governed by and interpreted following the laws of the United Kingdom, and the use of the United Nations Convention of Contracts for the International Sales of Goods is expressly excluded.</Paragraph>
            
            <SectionTitle id="disputes">19. DISPUTE RESOLUTION</SectionTitle>
            <SubHeading>Informal Negotiations</SubHeading>
            <Paragraph>To expedite resolution and control the cost of any dispute, controversy, or claim related to these Legal Terms (each a 'Dispute' and collectively, the 'Disputes') brought by either you or us (individually, a 'Party' and collectively, the 'Parties'), the Parties agree to first attempt to negotiate any Dispute (except those Disputes expressly provided below) informally for at least thirty (30) days before initiating arbitration. Such informal negotiations commence upon written notice from one Party to the other Party.</Paragraph>
            <SubHeading>Binding Arbitration</SubHeading>
            <Paragraph>Any dispute arising from the relationships between the Parties to these Legal Terms shall be determined by one arbitrator who will be chosen in accordance with the Arbitration and Internal Rules of the European Court of Arbitration being part of the European Centre of Arbitration having its seat in Strasbourg.</Paragraph>
            
            <SectionTitle id="corrections">20. CORRECTIONS</SectionTitle>
            <Paragraph>There may be information on the Services that contains typographical errors, inaccuracies, or omissions, including descriptions, pricing, availability, and various other information. We reserve the right to correct any errors, inaccuracies, or omissions and to change or update the information on the Services at any time, without prior notice.</Paragraph>

            <SectionTitle id="disclaimer">21. DISCLAIMER</SectionTitle>
            <Paragraph>THE SERVICES ARE PROVIDED ON AN AS-IS AND AS-AVAILABLE BASIS. YOU AGREE THAT YOUR USE OF THE SERVICES WILL BE AT YOUR SOLE RISK. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, IN CONNECTION WITH THE SERVICES AND YOUR USE THEREOF, INCLUDING, WITHOUT LIMITATION, THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.</Paragraph>

            <SectionTitle id="liability">22. LIMITATIONS OF LIABILITY</SectionTitle>
            <Paragraph>IN NO EVENT WILL WE OR OUR DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY DIRECT, INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LOST PROFIT, LOST REVENUE, LOSS OF DATA, OR OTHER DAMAGES ARISING FROM YOUR USE OF THE SERVICES, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</Paragraph>

            <SectionTitle id="indemnification">23. INDEMNIFICATION</SectionTitle>
            <Paragraph>You agree to defend, indemnify, and hold us harmless, including our subsidiaries, affiliates, and all of our respective officers, agents, partners, and employees, from and against any loss, damage, liability, claim, or demand, including reasonable attorneys’ fees and expenses, made by any third party due to or arising out of: (1) your Contributions; (2) use of the Services; (3) breach of these Legal Terms; (4) any breach of your representations and warranties set forth in these Legal Terms; (5) your violation of the rights of a third party, including but not limited to intellectual property rights; or (6) any overt harmful act toward any other user of the Services with whom you connected via the Services.</Paragraph>
            
            <SectionTitle id="userdata">24. USER DATA</SectionTitle>
            <Paragraph>We will maintain certain data that you transmit to the Services for the purpose of managing the performance of the Services, as well as data relating to your use of the Services. Although we perform regular routine backups of data, you are solely responsible for all data that you transmit or that relates to any activity you have undertaken using the Services. You agree that we shall have no liability to you for any loss or corruption of any such data, and you hereby waive any right of action against us arising from any such loss or corruption of such data.</Paragraph>
            
            <SectionTitle id="electronic">25. ELECTRONIC COMMUNICATIONS, TRANSACTIONS, AND SIGNATURES</SectionTitle>
            <Paragraph>Visiting the Services, sending us emails, and completing online forms constitute electronic communications. You consent to receive electronic communications, and you agree that all agreements, notices, disclosures, and other communications we provide to you electronically, via email and on the Services, satisfy any legal requirement that such communication be in writing. YOU HEREBY AGREE TO THE USE OF ELECTRONIC SIGNATURES, CONTRACTS, ORDERS, AND OTHER RECORDS, AND TO ELECTRONIC DELIVERY OF NOTICES, POLICIES, AND RECORDS OF TRANSACTIONS INITIATED OR COMPLETED BY US OR VIA THE SERVICES.</Paragraph>
            
            <SectionTitle id="california">26. CALIFORNIA USERS AND RESIDENTS</SectionTitle>
            <Paragraph>If any complaint with us is not satisfactorily resolved, you can contact the Complaint Assistance Unit of the Division of Consumer Services of the California Department of Consumer Affairs in writing at 1625 North Market Blvd., Suite N 112, Sacramento, California 95834 or by telephone at (800) 952-5210 or (916) 445-1254.</Paragraph>
            
            <SectionTitle id="misc">27. MISCELLANEOUS</SectionTitle>
            <Paragraph>These Legal Terms and any policies or operating rules posted by us on the Services or in respect to the Services constitute the entire agreement and understanding between you and us. Our failure to exercise or enforce any right or provision of these Legal Terms shall not operate as a waiver of such right or provision. These Legal Terms operate to the fullest extent permissible by law. We may assign any or all of our rights and obligations to others at any time.</Paragraph>
            
            <SectionTitle id="contact">28. CONTACT US</SectionTitle>
            <Paragraph>In order to resolve a complaint regarding the Services or to receive further information regarding use of the Services, please contact us at:</Paragraph>
            <address className="mt-2 not-italic text-muted-foreground">
                <strong>Crossd</strong><br />
                3rd floor, 86-90 Paul Street<br />
                London, England EC2A 4NE<br />
                United Kingdom<br/>
                mlowdencrossd@gmail.com
            </address>

          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
