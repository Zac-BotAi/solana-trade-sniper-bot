
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { toast } from "sonner";
import { Search, Mail, MessageSquare } from "lucide-react";

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Your message has been sent! We'll get back to you soon.");
    setContactForm({ name: "", email: "", subject: "", message: "" });
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Help & Support | MemesEye</title>
        <meta name="description" content="Get help and support for the MemesEye platform." />
      </Helmet>

      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Help & Support</h1>
        
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search help articles..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <Tabs defaultValue="faq" className="mb-8">
          <TabsList>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
            <TabsTrigger value="contact">Contact Us</TabsTrigger>
            <TabsTrigger value="tutorials">Tutorials</TabsTrigger>
            <TabsTrigger value="troubleshooting">Troubleshooting</TabsTrigger>
          </TabsList>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How do I create an account?</AccordionTrigger>
                    <AccordionContent>
                      You can create an account by clicking on the "Sign Up" button at the top of the page. You have the option to sign up using your email, Google account, or by connecting your Phantom wallet.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What fees does MemesEye charge?</AccordionTrigger>
                    <AccordionContent>
                      MemesEye charges a 1% fee on all trading transactions. Token creation costs 0.1 SOL, and each revocation action (Freeze Authority, Mint Authority, Update Authority) costs 0.1 SOL.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>How does copy trading work?</AccordionTrigger>
                    <AccordionContent>
                      Copy trading allows you to automatically replicate the trades of other users. Simply navigate to the Tracker page, add a wallet address to track, then click "Copy Trade". You can then set your parameters like maximum amount per trade and the system will automatically copy their trading activity.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>What is Twitter Tweet Tracking?</AccordionTrigger>
                    <AccordionContent>
                      Twitter Tweet Tracking monitors specified Twitter accounts for mentions of tokens or trading signals. When our system detects relevant tweets, it can automatically execute trades based on your preset parameters. This helps you capitalize on market movements triggered by influential accounts.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>How do I withdraw funds?</AccordionTrigger>
                    <AccordionContent>
                      To withdraw funds, go to the Wallet section and click on "Withdraw". Enter the destination address and the amount you wish to withdraw. Confirm the transaction in your connected wallet and the funds will be transferred.
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-6">
                    <AccordionTrigger>What is the referral system?</AccordionTrigger>
                    <AccordionContent>
                      Our 3-tier referral system allows you to earn from users you refer and their subsequent referrals:
                      <br />- Tier 1 (Direct): Earn 5% of trading fees from users you refer
                      <br />- Tier 2 (Indirect): Earn 10% of trading fees from users referred by your referrals
                      <br />- Tier 3 (Extended): Earn 30% of trading fees from users referred by Tier 2 users
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-7">
                    <AccordionTrigger>Is my information secure?</AccordionTrigger>
                    <AccordionContent>
                      Yes, MemesEye employs industry-standard security measures to protect your data and assets. We use encryption for sensitive data, secure connections for all communications, and follow best practices for data protection. However, we recommend enabling two-factor authentication and following good security practices when using any cryptocurrency platform.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact Us</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Get in Touch</h3>
                    <p className="text-muted-foreground mb-6">
                      Have a question or need assistance? Our support team is here to help. Fill out the form and we'll get back to you as soon as possible.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <Mail className="h-5 w-5 mr-3 text-primary" />
                        <span>support@memeseye.com</span>
                      </div>
                      <div className="flex items-center">
                        <MessageSquare className="h-5 w-5 mr-3 text-primary" />
                        <span>Join our <a href="https://t.me/memeseye" className="text-primary hover:underline">Telegram community</a></span>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h4 className="font-medium mb-2">Support Hours</h4>
                      <p className="text-sm text-muted-foreground">
                        Monday - Friday: 9:00 AM - 5:00 PM UTC
                        <br />
                        Weekend: 10:00 AM - 2:00 PM UTC
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <form onSubmit={handleFormSubmit} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input 
                          id="name" 
                          name="name"
                          value={contactForm.name}
                          onChange={handleInputChange}
                          placeholder="Your name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email"
                          type="email"
                          value={contactForm.email}
                          onChange={handleInputChange}
                          placeholder="Your email address"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Input 
                          id="subject" 
                          name="subject"
                          value={contactForm.subject}
                          onChange={handleInputChange}
                          placeholder="What's this about?"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="message">Message</Label>
                        <Textarea 
                          id="message" 
                          name="message"
                          value={contactForm.message}
                          onChange={handleInputChange}
                          placeholder="How can we help you?"
                          rows={5}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        Send Message
                      </Button>
                    </form>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="tutorials">
            <Card>
              <CardHeader>
                <CardTitle>Video Tutorials</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">Tutorial Video</span>
                      </div>
                      <h3 className="font-semibold mb-1">Getting Started with MemesEye</h3>
                      <p className="text-sm text-muted-foreground">A complete walkthrough of the platform for beginners</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">Tutorial Video</span>
                      </div>
                      <h3 className="font-semibold mb-1">Advanced Trading Techniques</h3>
                      <p className="text-sm text-muted-foreground">Learn how to make the most of MemesEye's trading features</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">Tutorial Video</span>
                      </div>
                      <h3 className="font-semibold mb-1">Setting Up Twitter Tweet Tracker</h3>
                      <p className="text-sm text-muted-foreground">Configure your Twitter tracking for optimal results</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="p-4">
                      <div className="aspect-video bg-muted mb-3 rounded-md flex items-center justify-center">
                        <span className="text-muted-foreground">Tutorial Video</span>
                      </div>
                      <h3 className="font-semibold mb-1">Creating Your Own Token</h3>
                      <p className="text-sm text-muted-foreground">Step-by-step guide to minting your own token</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="troubleshooting">
            <Card>
              <CardHeader>
                <CardTitle>Troubleshooting Common Issues</CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>I can't connect my wallet</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">If you're having trouble connecting your wallet, try these steps:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Make sure you have Phantom wallet installed and unlocked</li>
                        <li>Refresh the page and try connecting again</li>
                        <li>Clear your browser cache and cookies</li>
                        <li>Try using a different browser</li>
                        <li>Check if your Phantom wallet is up to date</li>
                      </ol>
                      <p className="mt-3">If the issue persists, please contact our support team.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Transactions are failing or taking too long</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">Transaction issues can occur due to several reasons:</p>
                      <ul className="list-disc list-inside space-y-2">
                        <li>Network congestion on Solana blockchain</li>
                        <li>Insufficient SOL for transaction fees</li>
                        <li>Transaction timeout due to network issues</li>
                      </ul>
                      <p className="mt-3">Try these solutions:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Ensure you have enough SOL to cover transaction fees (at least 0.01 SOL)</li>
                        <li>Wait a few minutes and try again when network congestion subsides</li>
                        <li>Check Solana network status at <a href="https://status.solana.com" className="text-primary hover:underline">status.solana.com</a></li>
                      </ol>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Twitter tracker is not detecting tweets</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">If the Twitter Tweet Tracker is not detecting tweets properly:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Verify that you entered the correct Twitter username (without the @ symbol)</li>
                        <li>Make sure the Twitter account is public and active</li>
                        <li>There might be a slight delay in tweet detection (up to a few minutes)</li>
                        <li>Check if the account has posted any tweets recently</li>
                      </ol>
                      <p className="mt-3">Our system monitors tweets in near real-time, but some delays may occur due to Twitter API restrictions.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-4">
                    <AccordionTrigger>I can't withdraw my funds</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">If you're experiencing issues with withdrawals:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Ensure you have enough funds (including fees) for the withdrawal</li>
                        <li>Verify that the destination address is correct and valid</li>
                        <li>Check if there are any temporary withdrawal restrictions on your account</li>
                        <li>Make sure your wallet is properly connected</li>
                      </ol>
                      <p className="mt-3">For security reasons, some withdrawal operations may require additional verification, especially for large amounts or if the system detects unusual activity.</p>
                    </AccordionContent>
                  </AccordionItem>
                  
                  <AccordionItem value="item-5">
                    <AccordionTrigger>The platform is loading slowly or not displaying properly</AccordionTrigger>
                    <AccordionContent>
                      <p className="mb-2">If you're experiencing display or performance issues:</p>
                      <ol className="list-decimal list-inside space-y-2">
                        <li>Clear your browser cache and cookies</li>
                        <li>Try using a different browser (Chrome, Firefox, Edge are recommended)</li>
                        <li>Disable browser extensions that might interfere with the app</li>
                        <li>Make sure your internet connection is stable</li>
                        <li>If using a mobile device, try switching to desktop view</li>
                      </ol>
                      <p className="mt-3">MemesEye is optimized for modern browsers. If you're using an outdated browser, consider updating to the latest version.</p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HelpSupport;
