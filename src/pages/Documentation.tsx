
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const Documentation = () => {
  const [searchQuery, setSearchQuery] = useState("");
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Documentation | MemesEye</title>
        <meta name="description" content="Learn how to use MemesEye platform features including trading, sniping, copy trading, and more." />
      </Helmet>

      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Documentation</h1>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search documentation..."
              className="pl-10 w-64"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <Tabs defaultValue="getting-started" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="trading">Trading</TabsTrigger>
            <TabsTrigger value="token-tracking">Token Tracking</TabsTrigger>
            <TabsTrigger value="twitter-tracker">Twitter Tracker</TabsTrigger>
            <TabsTrigger value="wallet">Wallet</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>
          
          <TabsContent value="getting-started">
            <Card>
              <CardHeader>
                <CardTitle>Getting Started with MemesEye</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <h3>Welcome to MemesEye</h3>
                <p>
                  MemesEye is a comprehensive platform designed for meme token traders and enthusiasts. This guide will help you understand the basic features and get started with your trading journey.
                </p>
                
                <h3 className="mt-6">Creating an Account</h3>
                <p>
                  To use MemesEye, you'll need to create an account. You can sign up using your email, Google account, or by connecting your Phantom wallet.
                </p>
                <ol>
                  <li>Visit the <a href="/signup">signup page</a></li>
                  <li>Choose your preferred signup method (Email, Google, or Phantom Wallet)</li>
                  <li>Complete the registration process</li>
                  <li>Set up your profile and preferences</li>
                </ol>
                
                <h3 className="mt-6">Dashboard Overview</h3>
                <p>
                  Once logged in, you'll be taken to your dashboard. Here you can view:
                </p>
                <ul>
                  <li>Your wallet balance</li>
                  <li>Recent trading activity</li>
                  <li>Token pairs and their performance</li>
                  <li>Quick access to trading and tracking features</li>
                </ul>
                
                <h3 className="mt-6">Navigating the Platform</h3>
                <p>
                  MemesEye has several main sections:
                </p>
                <ul>
                  <li><strong>Dashboard</strong>: Overview of your activity and the market</li>
                  <li><strong>Trade</strong>: Execute trades, snipe tokens, and set up copy trading</li>
                  <li><strong>Tracker</strong>: Monitor wallets and Twitter for trading opportunities</li>
                  <li><strong>Mint Token</strong>: Create and manage your own tokens</li>
                  <li><strong>Wallet</strong>: Manage your wallet, view balances, and transaction history</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="trading">
            <Card>
              <CardHeader>
                <CardTitle>Trading Guide</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <h3>Basic Trading</h3>
                <p>
                  MemesEye offers intuitive token trading with a 1% fee structure. To make a trade:
                </p>
                <ol>
                  <li>Navigate to the Trade section</li>
                  <li>Select a token pair</li>
                  <li>Enter the amount you want to trade</li>
                  <li>Review the transaction details including fees</li>
                  <li>Execute the trade</li>
                </ol>
                
                <h3 className="mt-6">Token Sniping</h3>
                <p>
                  Token sniping allows you to quickly jump on new opportunities:
                </p>
                <ol>
                  <li>In the Trade section, enable the "Start Sniping" feature</li>
                  <li>Set your trading parameters and amount</li>
                  <li>The system will execute trades based on your parameters</li>
                  <li>Monitor the live trades section for executed snipes</li>
                </ol>
                
                <h3 className="mt-6">Copy Trading</h3>
                <p>
                  Follow successful traders by copying their trades:
                </p>
                <ol>
                  <li>Go to the Tracker section</li>
                  <li>Enter a wallet address to track</li>
                  <li>Click "Copy Trade" for the wallet you want to follow</li>
                  <li>Configure your copy trading parameters</li>
                  <li>The system will replicate their trades within your parameters</li>
                </ol>
                
                <h3 className="mt-6">Advanced Trading Features</h3>
                <ul>
                  <li><strong>Trade history</strong>: View all your past transactions</li>
                  <li><strong>Performance metrics</strong>: Analyze your trading performance</li>
                  <li><strong>Token filters</strong>: Find specific tokens based on parameters</li>
                  <li><strong>Custom alerts</strong>: Set up notifications for specific market conditions</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="token-tracking">
            <Card>
              <CardHeader>
                <CardTitle>Token Tracking Features</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <h3>Token Pairs List</h3>
                <p>
                  The Token Pairs section shows you available tokens for trading with real-time market data:
                </p>
                <ul>
                  <li><strong>Price</strong>: Current token price</li>
                  <li><strong>24h Change</strong>: Price change percentage in the last 24 hours</li>
                  <li><strong>Market Cap</strong>: Total market capitalization</li>
                  <li><strong>Volume</strong>: Trading volume in the specified timeframe</li>
                </ul>
                
                <h3 className="mt-6">Filtering and Searching</h3>
                <p>
                  Use these features to find specific tokens:
                </p>
                <ul>
                  <li>Search by name or symbol</li>
                  <li>Filter by market cap, volume, or price change</li>
                  <li>Toggle to show or hide migrated tokens</li>
                  <li>Sort by different metrics (name, price, change, etc.)</li>
                </ul>
                
                <h3 className="mt-6">Token Categories</h3>
                <p>
                  MemesEye categorizes tokens to help you find what you're looking for:
                </p>
                <ul>
                  <li><strong>New Pairs</strong>: Recently created token pairs</li>
                  <li><strong>Final Stretch</strong>: Tokens nearing important milestones</li>
                  <li><strong>Migrated</strong>: Tokens that have undergone migration</li>
                  <li><strong>Trending</strong>: Currently popular tokens</li>
                </ul>
                
                <h3 className="mt-6">Token Details</h3>
                <p>
                  Click on any token to view detailed information:
                </p>
                <ul>
                  <li>Price chart with customizable timeframes</li>
                  <li>Key metrics and statistics</li>
                  <li>Holder distribution</li>
                  <li>Contract details and verification status</li>
                  <li>Social media links and community information</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="twitter-tracker">
            <Card>
              <CardHeader>
                <CardTitle>Twitter Tweet Tracker</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <h3>Tracking Influencer Tweets</h3>
                <p>
                  The Twitter Tweet Tracker allows you to monitor specific accounts for token mentions and trading signals:
                </p>
                <ol>
                  <li>Go to the Tracker page</li>
                  <li>Enter a Twitter username (without the @ symbol)</li>
                  <li>Click "Track" to add them to your monitored accounts</li>
                  <li>The system will monitor their tweets for token mentions</li>
                </ol>
                
                <h3 className="mt-6">Sniping Based on Tweets</h3>
                <p>
                  Execute trades automatically when specific Twitter accounts mention tokens:
                </p>
                <ol>
                  <li>Click "Snipe" next to the Twitter account you're tracking</li>
                  <li>Configure your sniping parameters (amount, token filters, etc.)</li>
                  <li>The system will execute trades when the account tweets about tokens</li>
                </ol>
                
                <h3 className="mt-6">Twitter Snipe Configuration</h3>
                <p>
                  Customize your Twitter sniping strategy:
                </p>
                <ul>
                  <li><strong>Amount per snipe</strong>: How much to invest per trade</li>
                  <li><strong>Token filters</strong>: Only snipe specific types of tokens</li>
                  <li><strong>Delay</strong>: Set a custom delay after tweet detection</li>
                  <li><strong>Stop loss</strong>: Automatically sell if the token drops below a threshold</li>
                  <li><strong>Take profit</strong>: Automatically sell when profit reaches a target</li>
                </ul>
                
                <h3 className="mt-6">Tweet Analysis</h3>
                <p>
                  The system analyzes tweets for:
                </p>
                <ul>
                  <li>Token mentions and symbols</li>
                  <li>Contract addresses</li>
                  <li>Sentiment (positive or negative)</li>
                  <li>Cashtags and relevant keywords</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallet">
            <Card>
              <CardHeader>
                <CardTitle>Wallet Management</CardTitle>
              </CardHeader>
              <CardContent className="prose prose-gray dark:prose-invert max-w-none">
                <h3>Wallet Connection</h3>
                <p>
                  MemesEye supports connection with Phantom wallets:
                </p>
                <ol>
                  <li>Go to the Wallet section</li>
                  <li>Click "Connect Wallet" or "Generate New Wallet"</li>
                  <li>Follow the prompts to complete the connection</li>
                  <li>Your wallet balance and tokens will appear in the interface</li>
                </ol>
                
                <h3 className="mt-6">Managing Your Funds</h3>
                <p>
                  Once your wallet is connected, you can:
                </p>
                <ul>
                  <li>View your SOL balance and token holdings</li>
                  <li>Send and receive SOL and tokens</li>
                  <li>View transaction history</li>
                  <li>Track performance of your holdings over time</li>
                </ul>
                
                <h3 className="mt-6">Wallet Tracking</h3>
                <p>
                  Monitor other wallets for their activities:
                </p>
                <ol>
                  <li>Go to the Tracker section</li>
                  <li>Enter a wallet address to track</li>
                  <li>You'll be able to see their transactions and holdings</li>
                  <li>Use this information for copy trading or market research</li>
                </ol>
                
                <h3 className="mt-6">Security Recommendations</h3>
                <ul>
                  <li>Never share your private keys or seed phrases</li>
                  <li>Enable two-factor authentication for your MemesEye account</li>
                  <li>Regularly check your transaction history for unauthorized activity</li>
                  <li>Consider using a hardware wallet for larger holdings</li>
                  <li>Be cautious of phishing attempts and only use official links</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="faq">
            <Card>
              <CardHeader>
                <CardTitle>Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">What fees does MemesEye charge?</h3>
                  <p>MemesEye charges a 1% fee on all trading transactions. Token creation costs 0.1 SOL, and each revocation action (Freeze Authority, Mint Authority, Update Authority) costs 0.1 SOL.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">How does the referral system work?</h3>
                  <p>Our 3-tier referral system allows you to earn from users you refer and their subsequent referrals:
                    <br />- Tier 1 (Direct): Earn 5% of trading fees from users you refer
                    <br />- Tier 2 (Indirect): Earn 10% of trading fees from users referred by your referrals
                    <br />- Tier 3 (Extended): Earn 30% of trading fees from users referred by Tier 2 users
                  </p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Is copy trading guaranteed to be profitable?</h3>
                  <p>No, copy trading is not guaranteed to be profitable. While you can follow successful traders, past performance is not indicative of future results. All trading carries risk, and you should only invest what you can afford to lose.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">How does Twitter Tweet Tracking work?</h3>
                  <p>Our system monitors tweets from specified Twitter accounts for token mentions. When a relevant tweet is detected, the system can automatically execute trades based on your preset parameters.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">Can I create my own token on MemesEye?</h3>
                  <p>Yes, you can create your own token on MemesEye for a fee of 0.1 SOL. You can customize various aspects of your token including name, symbol, total supply, and access controls.</p>
                </div>
                
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg mb-2">How secure is MemesEye?</h3>
                  <p>MemesEye employs industry-standard security measures to protect your data and assets. However, we recommend enabling two-factor authentication and following best security practices when using any crypto platform.</p>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-2">How do I contact support?</h3>
                  <p>You can contact our support team through the Help & Support section in your profile menu, or by emailing support@memeseye.com. We aim to respond to all inquiries within 24 hours.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Documentation;
