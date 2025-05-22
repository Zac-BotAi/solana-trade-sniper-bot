
import { useState } from "react";
import { Twitter, ArrowRight, Search, User, Heart, MessageCircle, RefreshCw, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface TwitterSniperProps {
  onSnipe: (twitterUsername: string) => void;
}

interface Tweet {
  id: string;
  username: string;
  displayName: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
  retweets: number;
  replies: number;
  images?: string[];
  tokenMentioned?: {
    name: string;
    symbol: string;
    address: string;
  }
}

const TwitterSniper = ({ onSnipe }: TwitterSniperProps) => {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackedAccounts, setTrackedAccounts] = useState<string[]>([]);
  const [tweets, setTweets] = useState<Tweet[]>([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterUsername(e.target.value.replace('@', ''));
  };

  const handleSnipe = (username: string) => {
    onSnipe(username);
  };

  // Mock tweets for the UI
  const mockTweets: Tweet[] = [
    {
      id: "1",
      username: "solana_devs",
      displayName: "Solana Developers",
      avatar: "https://cryptologos.cc/logos/solana-sol-logo.png",
      content: "Just launched a new $MEME token on Solana! 🚀 This is going to be huge! Check it out: solana.com/m3m3",
      timestamp: "2m ago",
      likes: 452,
      retweets: 87,
      replies: 32,
      images: ["https://cryptologos.cc/logos/pepe-pepe-logo.png"],
      tokenMentioned: {
        name: "Meme Token",
        symbol: "MEME",
        address: "0x123...abc"
      }
    },
    {
      id: "2",
      username: "whale_alerts",
      displayName: "Crypto Whale Alerts",
      avatar: "https://cryptologos.cc/logos/whale-alert-whale-logo.png",
      content: "🚨 Whale alert: 1,000,000 $BONK just transferred from wallet to exchange! 👀 #Solana #CryptoNews",
      timestamp: "5m ago",
      likes: 217,
      retweets: 54,
      replies: 12,
      tokenMentioned: {
        name: "Bonk",
        symbol: "BONK",
        address: "0xb0nk...123"
      }
    }
  ];

  const startTracking = () => {
    if (!twitterUsername) {
      toast.error("Please enter a Twitter username");
      return;
    }

    if (trackedAccounts.includes(twitterUsername)) {
      toast.error("You're already tracking this account");
      return;
    }

    // Simulate loading
    toast.loading(`Loading tweets from @${twitterUsername}...`);
    
    setTimeout(() => {
      setTrackedAccounts([...trackedAccounts, twitterUsername]);
      setIsTracking(true);
      setTweets(mockTweets);
      toast.dismiss();
      toast.success(`Now tracking @${twitterUsername} for token mentions!`);
    }, 1500);
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-[#1a1f2c] to-[#15181e] backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-sm">
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Twitter className="h-5 w-5 mr-2 text-blue-400" />
          Twitter Tweet Tracker
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-6">
        <p className="text-sm text-blue-100 mb-4">
          Monitor tweets from crypto influencers and automatically snipe mentioned tokens.
        </p>

        <div className="flex space-x-2 mb-6">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">@</span>
            <Input
              placeholder="username"
              className="pl-8 bg-white/10 border-blue-500/30 text-white placeholder:text-blue-200/60"
              value={twitterUsername}
              onChange={handleUsernameChange}
            />
          </div>
          <Button 
            onClick={startTracking}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Track
          </Button>
        </div>

        {tweets.length > 0 && (
          <div className="mb-6 space-y-4">
            <h3 className="text-sm font-medium text-blue-100">
              Latest Tweets
            </h3>

            {tweets.map((tweet) => (
              <motion.div
                key={tweet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#252A37] rounded-xl overflow-hidden border border-blue-500/20"
              >
                <div className="p-3">
                  <div className="flex items-center mb-2">
                    <Avatar className="h-10 w-10 mr-3 rounded-full">
                      <AvatarImage src={tweet.avatar} alt={tweet.displayName} />
                      <AvatarFallback>{tweet.displayName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-white">{tweet.displayName}</span>
                        <span className="ml-1 text-blue-400 text-sm">@{tweet.username}</span>
                      </div>
                      <span className="text-gray-400 text-xs">{tweet.timestamp}</span>
                    </div>
                  </div>
                  
                  <p className="text-white mb-2">{tweet.content}</p>
                  
                  {tweet.images && tweet.images.length > 0 && (
                    <div className="mb-3 rounded-xl overflow-hidden">
                      <img src={tweet.images[0]} alt="Tweet image" className="w-full h-auto max-h-64 object-cover" />
                    </div>
                  )}
                  
                  {tweet.tokenMentioned && (
                    <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-2 mb-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-blue-300 text-sm font-medium">Token Detected:</p>
                          <p className="text-white">{tweet.tokenMentioned.name} ({tweet.tokenMentioned.symbol})</p>
                          <p className="text-gray-400 text-xs truncate">{tweet.tokenMentioned.address}</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => handleSnipe(tweet.username)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          Snipe Now
                        </Button>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between text-gray-400 text-sm">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        <span>{tweet.replies}</span>
                      </div>
                      <div className="flex items-center">
                        <RefreshCw className="h-4 w-4 mr-1" />
                        <span>{tweet.retweets}</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        <span>{tweet.likes}</span>
                      </div>
                    </div>
                    
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-1"
                      onClick={() => window.open(`https://twitter.com/${tweet.username}`, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="bg-blue-800/20 backdrop-blur-sm rounded-xl border border-blue-500/30">
          <h3 className="text-sm font-medium p-3 border-b border-blue-500/30 text-blue-100">
            Tracked Accounts
          </h3>

          {trackedAccounts.length > 0 ? (
            <div className="divide-y divide-blue-500/30">
              {trackedAccounts.map((account, index) => (
                <div key={index} className="p-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-3">
                      <AvatarFallback className="bg-blue-900 text-blue-200">{account[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-white">@{account}</p>
                      <p className="text-xs text-blue-300">Monitoring for token mentions</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSnipe(account)}
                    className="group border-blue-500/50 text-white hover:bg-blue-600"
                  >
                    Snipe
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-blue-200 text-center py-6">
              No accounts being tracked yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterSniper;
