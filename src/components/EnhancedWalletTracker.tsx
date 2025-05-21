
import { useState } from "react";
import { Eye, Copy, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const EnhancedWalletTracker = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [trackedWallets, setTrackedWallets] = useState<{ address: string; label?: string }[]>([]);
  const navigate = useNavigate();
  
  const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };
  
  const trackWallet = () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter a wallet address to track.");
      return;
    }
    
    // Check if already tracking
    if (trackedWallets.some(wallet => wallet.address === walletAddress)) {
      toast.error("You're already tracking this wallet.");
      return;
    }
    
    setTrackedWallets(prev => [{ address: walletAddress }, ...prev]);
    setWalletAddress("");
    toast.success(`Started tracking wallet: ${walletAddress}`);
  };

  const handleCopyTrade = (walletAddress: string) => {
    navigate("/trade", { state: { copyTradeWallet: walletAddress } });
    toast.info(`Redirecting to trade page to setup copy trading for ${walletAddress.substring(0, 8)}...`);
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200 flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Wallet Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Monitor other Solana wallets for activity and copy their trades.
        </p>
        
        <div className="flex space-x-2 mb-6">
          <Input
            type="text"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            placeholder="Enter wallet address to track"
            className="flex-grow"
          />
          
          <Button onClick={trackWallet}>
            Track
          </Button>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium p-3 border-b border-gray-200 dark:border-gray-700">
            Tracked Wallets
          </h3>

          {trackedWallets.length > 0 ? (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {trackedWallets.map((wallet, index) => (
                <div key={index} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-gray-800 dark:text-gray-200">
                      {truncateAddress(wallet.address)}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {wallet.label || "Monitoring activity"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCopyTrade(wallet.address)}
                      className="group"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Trade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-6">
              No wallets being tracked
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedWalletTracker;
