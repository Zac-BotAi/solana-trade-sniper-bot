
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
    toast.success(`Started tracking wallet: ${walletAddress.substring(0, 8)}...`);
  };

  const handleCopyTrade = (walletAddress: string) => {
    navigate("/trade", { state: { copyTradeWallet: walletAddress } });
    toast.info(`Redirecting to trade page to setup copy trading for ${walletAddress.substring(0, 8)}...`);
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  };
  
  return (
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-purple-900/80 to-indigo-700/80 backdrop-blur-sm">
      <CardHeader className="bg-purple-900/30 backdrop-blur-sm">
        <CardTitle className="text-xl font-semibold text-white flex items-center">
          <Eye className="h-5 w-5 mr-2" />
          Wallet Tracker
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="text-sm text-purple-100 mb-4">
          Monitor other Solana wallets for activity and copy their trades.
        </p>
        
        <div className="flex space-x-2 mb-6">
          <Input
            type="text"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            placeholder="Enter wallet address to track"
            className="flex-grow bg-white/10 border-purple-500/30 text-white placeholder:text-purple-200/60"
          />
          
          <Button 
            onClick={trackWallet}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Track
          </Button>
        </div>
        
        <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl border border-purple-500/30">
          <h3 className="text-sm font-medium p-3 border-b border-purple-500/30 text-purple-100">
            Tracked Wallets
          </h3>

          {trackedWallets.length > 0 ? (
            <div className="divide-y divide-purple-500/30">
              {trackedWallets.map((wallet, index) => (
                <div key={index} className="p-3 flex justify-between items-center">
                  <div>
                    <p className="font-medium text-white">
                      {truncateAddress(wallet.address)}
                    </p>
                    <p className="text-xs text-purple-300">
                      {wallet.label || "Monitoring activity"}
                    </p>
                  </div>
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCopyTrade(wallet.address)}
                      className="group border-purple-500/50 text-white hover:bg-purple-600"
                    >
                      <Copy className="h-4 w-4 mr-1" />
                      Copy Trade
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-purple-200 text-center py-6">
              No wallets being tracked
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EnhancedWalletTracker;
