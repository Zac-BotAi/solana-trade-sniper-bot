
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center">
          <Twitter className="h-5 w-5 mr-2 text-blue-400" />
          Twitter Sniper
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Track tweets from crypto influencers and automatically snipe mentioned tokens.
        </p>

        <div className="flex space-x-2 mb-6">
          <div className="relative flex-grow">
            <span className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400">@</span>
            <Input
              placeholder="username"
              className="pl-8"
              value={twitterUsername}
              onChange={handleUsernameChange}
            />
          </div>
          <Button onClick={startTracking}>Track</Button>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium p-3 border-b border-gray-200 dark:border-gray-700">
            Tracked Accounts
          </h3>

          {trackedAccounts.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {trackedAccounts.map((account) => (
                <div key={account} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">@{account}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Monitoring for token mentions</p>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={() => handleSnipe(account)}
                    className="group"
                  >
                    Snipe
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
              No accounts being tracked yet
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TwitterSniper;
