import { useState } from "react";
import { Twitter, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TwitterSniperProps {
  onSnipe: (twitterUsername: string) => void;
}

const TwitterSniper = ({ onSnipe }: TwitterSniperProps) => {
  const [twitterUsername, setTwitterUsername] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [trackedAccounts, setTrackedAccounts] = useState<string[]>([]);

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTwitterUsername(e.target.value.replace('@', ''));
  };

  const startTracking = () => {
    if (!twitterUsername) {
      toast.error("Please enter a Twitter username");
      return;
    }

    if (trackedAccounts.includes(twitterUsername)) {
      toast.error("You're already tracking this account");
      return;
    }

    setTrackedAccounts([...trackedAccounts, twitterUsername]);
    setIsTracking(true);
    toast.success(`Now tracking @${twitterUsername} for token mentions!`);
  };

  const handleSnipe = (username: string) => {
    onSnipe(username);
  };

  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-blue-900/80 to-blue-700/80 backdrop-blur-sm">
      <CardHeader className="bg-blue-900/30 backdrop-blur-sm">
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

        <div className="bg-blue-800/30 backdrop-blur-sm rounded-xl border border-blue-500/30">
          <h3 className="text-sm font-medium p-3 border-b border-blue-500/30 text-blue-100">
            Tracked Accounts
          </h3>

          {trackedAccounts.length > 0 ? (
            <div className="divide-y divide-blue-500/30">
              {trackedAccounts.map((account) => (
                <div key={account} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">@{account}</p>
                    <p className="text-xs text-blue-300">Monitoring for token mentions</p>
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
