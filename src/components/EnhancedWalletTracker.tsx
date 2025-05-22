
import { useState } from "react";
import { Eye, Copy, ArrowRight, Check, AlertTriangle, Zap, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface TrackedWallet {
  address: string;
  label?: string;
  type: 'whale' | 'dev' | 'influencer' | 'bot' | 'unknown';
  lastActivity: string;
  averageProfit: number;
  successRate: number;
}

const EnhancedWalletTracker = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [trackedWallets, setTrackedWallets] = useState<TrackedWallet[]>([]);
  const navigate = useNavigate();
  
  // Wallet types with their badge colors
  const walletTypes = {
    whale: { icon: <Award className="h-3 w-3 mr-1" />, color: "bg-blue-600", text: "Whale" },
    dev: { icon: <Zap className="h-3 w-3 mr-1" />, color: "bg-purple-600", text: "Developer" },
    influencer: { icon: <Check className="h-3 w-3 mr-1" />, color: "bg-green-600", text: "Influencer" },
    bot: { icon: <AlertTriangle className="h-3 w-3 mr-1" />, color: "bg-yellow-600", text: "Bot" },
    unknown: { icon: <Clock className="h-3 w-3 mr-1" />, color: "bg-gray-600", text: "Unknown" }
  };
  
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
    
    // Generate random wallet type for demo
    const types = ['whale', 'dev', 'influencer', 'bot', 'unknown'] as const;
    const randomType = types[Math.floor(Math.random() * types.length)];
    
    // Add new wallet with generated data
    const newWallet: TrackedWallet = {
      address: walletAddress,
      type: randomType,
      lastActivity: Math.random() > 0.5 ? 'Just now' : `${Math.floor(Math.random() * 60) + 1}m ago`,
      averageProfit: (Math.random() * 200) - 50, // -50% to +150%
      successRate: Math.floor(Math.random() * 100) + 1 // 1-100%
    };
    
    setTrackedWallets(prev => [newWallet, ...prev]);
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
    <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-[#1a1f2c] to-[#15181e] backdrop-blur-sm">
      <CardHeader className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 backdrop-blur-sm">
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
        
        <div className="bg-purple-800/20 backdrop-blur-sm rounded-xl border border-purple-500/30">
          <h3 className="text-sm font-medium p-3 border-b border-purple-500/30 text-purple-100">
            Tracked Wallets
          </h3>

          {trackedWallets.length > 0 ? (
            <div className="divide-y divide-purple-500/30">
              {trackedWallets.map((wallet, index) => (
                <motion.div 
                  key={index} 
                  className="p-3"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="font-medium text-white flex items-center">
                        {truncateAddress(wallet.address)}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="ml-1 h-6 w-6 p-0 text-gray-400 hover:text-white hover:bg-transparent"
                          onClick={() => {
                            navigator.clipboard.writeText(wallet.address);
                            toast.success("Address copied to clipboard");
                          }}
                        >
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                      </p>
                      <div className="flex items-center mt-1 space-x-2">
                        <Badge 
                          variant="outline"
                          className={`${walletTypes[wallet.type].color} bg-opacity-20 border-none text-xs py-1 flex items-center`}
                        >
                          {walletTypes[wallet.type].icon}
                          {walletTypes[wallet.type].text}
                        </Badge>
                        <span className="text-xs text-gray-400">Last active: {wallet.lastActivity}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <div className={`text-sm font-medium ${wallet.averageProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {wallet.averageProfit >= 0 ? '+' : ''}{wallet.averageProfit.toFixed(1)}% avg
                      </div>
                      <div className="text-xs text-purple-300 mt-1">
                        {wallet.successRate}% success rate
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleCopyTrade(wallet.address)}
                      className="group border-purple-500/50 text-white hover:bg-purple-600 flex-1 h-8"
                    >
                      <Copy className="h-3.5 w-3.5 mr-1" />
                      Copy Trades
                    </Button>
                    
                    <Button 
                      size="sm"
                      onClick={() => window.open(`https://solscan.io/address/${wallet.address}`, '_blank')}
                      className="bg-purple-900/50 hover:bg-purple-700 text-white h-8 px-3"
                    >
                      View on Solscan
                      <ArrowRight className="h-3.5 w-3.5 ml-1" />
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="text-purple-200 text-center py-6">
              No wallets being tracked
            </p>
          )}
        </div>
        
        {trackedWallets.length > 0 && (
          <div className="mt-4 bg-indigo-900/20 rounded-lg p-3 border border-indigo-500/20">
            <h4 className="text-sm font-medium text-indigo-300 mb-2">Wallet Analytics</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-xs text-indigo-300">Average Profit</p>
                <p className="text-lg font-bold text-white">
                  {(trackedWallets.reduce((sum, wallet) => sum + wallet.averageProfit, 0) / trackedWallets.length).toFixed(1)}%
                </p>
              </div>
              <div className="bg-black/20 p-3 rounded-lg">
                <p className="text-xs text-indigo-300">Success Rate</p>
                <p className="text-lg font-bold text-white">
                  {Math.floor(trackedWallets.reduce((sum, wallet) => sum + wallet.successRate, 0) / trackedWallets.length)}%
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EnhancedWalletTracker;
