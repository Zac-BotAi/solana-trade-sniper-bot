
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const WalletTracker = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [trackedWallets, setTrackedWallets] = useState<string[]>([]);
  
  // Handle wallet address input change
  const handleWalletAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };
  
  // Track a new wallet
  const trackWallet = () => {
    if (!walletAddress.trim()) {
      toast.error("Please enter a wallet address to track.");
      return;
    }
    
    setTrackedWallets(prev => [walletAddress, ...prev]);
    setWalletAddress("");
    toast.success(`Started tracking wallet: ${walletAddress}`);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Wallet Tracker
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">Monitor other Solana wallets for activity.</p>
        
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            value={walletAddress}
            onChange={handleWalletAddressChange}
            placeholder="Enter wallet address to track"
          />
          
          <Button onClick={trackWallet} className="w-full">
            Track Wallet
          </Button>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-xl border border-gray-200">
          {trackedWallets.length > 0 ? (
            trackedWallets.map((wallet, index) => (
              <div key={index} className="bg-white p-3 rounded-lg shadow-sm mb-2 text-gray-700">
                Tracking: {`${wallet.substring(0, 8)}...${wallet.substring(wallet.length - 8)}`}
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">No wallets being tracked.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WalletTracker;
