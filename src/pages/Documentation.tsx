
import React from "react";
import { Helmet } from "react-helmet-async";
import BackButton from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Documentation = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Documentation | MemesEye</title>
        <meta name="description" content="Comprehensive documentation and guides for using the MemesEye platform" />
      </Helmet>
      
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold ml-2">Documentation</h1>
      </div>
      
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Getting Started with MemesEye</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold">Platform Overview</h2>
            <p>
              MemesEye is a comprehensive platform for tracking, analyzing, and trading meme tokens and cryptocurrencies. Our platform provides real-time data, tracking tools, and token creation capabilities.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Key Features</h2>
            <ul>
              <li><strong>Wallet Tracking:</strong> Monitor whale wallets and market influencers</li>
              <li><strong>Twitter Tweet Tracker:</strong> Track tweets from crypto influencers</li>
              <li><strong>Token Creation:</strong> Create your own tokens with customizable settings</li>
              <li><strong>Trading Platform:</strong> Snipe and trade tokens with ease</li>
            </ul>
            
            <h2 className="text-xl font-semibold mt-6">Dashboard</h2>
            <p>
              The dashboard provides an overview of your portfolio, market trends, and recent activity. You can quickly access all main features from the bottom navigation bar.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Wallet Section</h2>
            <p>
              Connect your wallet to trade and create tokens. MemesEye supports various wallet providers, with Phantom wallet as our recommended solution for the best experience.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Creating Tokens</h2>
            <p>
              Our token creation process is divided into three simple steps:
            </p>
            <ol>
              <li><strong>Basic Info:</strong> Set your token name, symbol, and upload an image</li>
              <li><strong>Token Economics:</strong> Define decimals, total supply, and add a description</li>
              <li><strong>Finalize & Launch:</strong> Choose authority settings and add social links</li>
            </ol>
            <p>
              Each authority option (Freeze, Mint, Update) incurs a fee of 0.1 SOL, and token creation itself costs 0.1 SOL.
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Advanced Features</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <h2 className="text-xl font-semibold">Twitter Tweet Tracker</h2>
            <p>
              Enter Twitter usernames to track tweets from crypto influencers. When tokens are mentioned, you can quickly snipe them through our platform.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Wallet Tracker</h2>
            <p>
              Monitor wallets of known traders and whales. When they make significant moves, you can follow their strategies with our copy trading feature.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">Trading</h2>
            <p>
              Our trading interface provides real-time data and quick execution to help you capitalize on market opportunities.
            </p>
            
            <h2 className="text-xl font-semibold mt-6">API Documentation</h2>
            <p>
              For developers, we offer API access to our platform's core features. Contact our support team for API keys and detailed documentation.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Documentation;
