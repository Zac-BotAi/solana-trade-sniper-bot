import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ArrowRight, Copy, Twitter } from "lucide-react";
import { useLocation } from "react-router-dom";

interface EnhancedTradeSectionProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
  updateTotalTrades: () => void;
}

interface TradeToken {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  change24h: number;
}

const mockTokens: TradeToken[] = [
  {
    id: "1",
    name: "Dogecoin",
    symbol: "DOGE",
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    price: 0.12,
    change24h: 5.2,
  },
  {
    id: "2",
    name: "Shiba Inu",
    symbol: "SHIB",
    image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    price: 0.000028,
    change24h: -2.1,
  },
  {
    id: "3",
    name: "Pepe",
    symbol: "PEPE",
    image: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    price: 0.0000089,
    change24h: 12.3,
  },
  {
    id: "4",
    name: "Floki Inu",
    symbol: "FLOKI",
    image: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    price: 0.000158,
    change24h: 8.7,
  },
];

const EnhancedTradeSection = ({ walletBalance, updateWalletBalance, updateTotalTrades }: EnhancedTradeSectionProps) => {
  const [tradeAmount, setTradeAmount] = useState<number | string>("");
  const [tradeFee, setTradeFee] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [isSniping, setIsSniping] = useState(false);
  const [tradeLog, setTradeLog] = useState<string[]>([]);
  const [selectedToken, setSelectedToken] = useState<TradeToken | null>(null);
  const [copyTradeWallet, setCopyTradeWallet] = useState<string | null>(null);
  const [twitterUsername, setTwitterUsername] = useState<string | null>(null);
  
  const location = useLocation();
  
  // Ref for snipping interval
  const snipingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle location state for copy trade or twitter snipe
  useEffect(() => {
    const state = location.state as { copyTradeWallet?: string; twitterUsername?: string } | null;
    
    if (state?.copyTradeWallet) {
      setCopyTradeWallet(state.copyTradeWallet);
      toast.info(`Setting up copy trading for wallet: ${state.copyTradeWallet.substring(0, 8)}...`);
    }
    
    if (state?.twitterUsername) {
      setTwitterUsername(state.twitterUsername);
      toast.info(`Setting up Twitter sniping for @${state.twitterUsername}`);
    }
    
    // Clear state after handling
    if (state) {
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  
  // Calculate fee and net amount when trade amount changes
  useEffect(() => {
    const amount = typeof tradeAmount === "string" ? parseFloat(tradeAmount) : tradeAmount;
    if (!isNaN(amount) && amount > 0) {
      const fee = amount * 0.01; // 1% fee
      setTradeFee(fee);
      setNetAmount(amount - fee);
    } else {
      setTradeFee(0);
      setNetAmount(0);
    }
  }, [tradeAmount]);
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (snipingIntervalRef.current) {
        clearInterval(snipingIntervalRef.current);
      }
    };
  }, []);
  
  // Handle trade amount input change
  const handleTradeAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTradeAmount(e.target.value);
  };
  
  // Handle token selection
  const handleTokenSelect = (token: TradeToken) => {
    setSelectedToken(token);
    toast.success(`Selected ${token.name} (${token.symbol}) for trading`);
  };
  
  // Simulate a single trade
  const simulateSingleTrade = () => {
    const amount = typeof tradeAmount === "string" ? parseFloat(tradeAmount) : tradeAmount;
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid trade amount.');
      stopSniping();
      return;
    }
    
    if (walletBalance < amount) {
      toast.error('Insufficient SOL balance for this trade. Stopping sniping.');
      stopSniping();
      return;
    }
    
    // Deduct the full trade amount and update wallet balance
    updateWalletBalance(walletBalance - amount);
    updateTotalTrades();
    
    // Generate token for the trade - either use selected token or random one
    const token = selectedToken || mockTokens[Math.floor(Math.random() * mockTokens.length)];
    
    // Generate random trade data for the log
    const tradeType = Math.random() > 0.5 ? 'Bought' : 'Sold';
    const tradePrice = (token.price * (1 + (Math.random() * 0.1 - 0.05))).toFixed(token.price < 0.001 ? 8 : 6);
    const tradeQuantity = (amount / parseFloat(tradePrice)).toFixed(2);
    
    const newEntry = `${tradeType} ${tradeQuantity} ${token.symbol} at ${tradePrice} SOL/token (Fee: ${tradeFee.toFixed(4)} SOL)`;
    
    // Add to trade log, keeping only the latest 10 entries
    setTradeLog(prev => [newEntry, ...prev.slice(0, 9)]);
  };
  
  // Toggle sniping on/off
  const toggleSniping = () => {
    if (isSniping) {
      stopSniping();
    } else {
      startSniping();
    }
  };
  
  // Start sniping process
  const startSniping = () => {
    const amount = typeof tradeAmount === "string" ? parseFloat(tradeAmount) : tradeAmount;
    
    if (isNaN(amount) || amount <= 0) {
      toast.error('Please enter a valid trade amount to start sniping.');
      return;
    }
    
    if (walletBalance < amount) {
      toast.error('Insufficient SOL balance for sniping.');
      return;
    }
    
    setIsSniping(true);
    
    // Show appropriate toast based on mode
    if (copyTradeWallet) {
      toast.success(`Started copy trading for wallet ${copyTradeWallet.substring(0, 8)}...`);
    } else if (twitterUsername) {
      toast.success(`Started sniping tweets from @${twitterUsername}`);
    } else {
      toast.success(`Started token sniping with ${amount} SOL`);
    }
    
    simulateSingleTrade(); // Run one immediately
    
    // Set up interval for automatic trades
    snipingIntervalRef.current = setInterval(simulateSingleTrade, 2000);
  };
  
  // Stop sniping process
  const stopSniping = () => {
    if (snipingIntervalRef.current) {
      clearInterval(snipingIntervalRef.current);
      snipingIntervalRef.current = null;
      setIsSniping(false);
    }
  };

  return (
    <div className="space-y-6">
      {(copyTradeWallet || twitterUsername) && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-200 dark:border-blue-800">
          {copyTradeWallet && (
            <div className="flex items-center text-blue-700 dark:text-blue-300">
              <Copy className="h-5 w-5 mr-2" />
              <span>
                Copy Trading Mode: Following wallet {copyTradeWallet.substring(0, 8)}...{copyTradeWallet.substring(copyTradeWallet.length - 8)}
              </span>
            </div>
          )}
          {twitterUsername && (
            <div className="flex items-center text-blue-700 dark:text-blue-300">
              <Twitter className="h-5 w-5 mr-2" />
              <span>Twitter Snipe Mode: Following @{twitterUsername}</span>
            </div>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
            Trading & Sniping
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">1% Trading Fee Applied</p>
          
          <div className="flex flex-col gap-3 mb-6">
            <Input
              type="number"
              id="tradeAmount"
              value={tradeAmount}
              onChange={handleTradeAmountChange}
              placeholder="Enter trade amount (SOL)"
              min="0.01"
              step="0.01"
            />
            
            <Button 
              onClick={toggleSniping}
              variant={isSniping ? "destructive" : "default"}
              className="w-full relative overflow-hidden"
              disabled={!tradeAmount}
            >
              {isSniping ? "Stop Sniping" : "Start Sniping"}
              {isSniping && (
                <span className="absolute inset-0 animate-pulse bg-white/10 rounded-md" />
              )}
            </Button>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Trade Fee</p>
                <p className="text-lg font-bold text-red-500">{tradeFee.toFixed(4)} SOL</p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">Net Amount</p>
                <p className="text-lg font-bold text-green-600">{netAmount.toFixed(4)} SOL</p>
              </div>
            </div>
          </div>
          
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">
              Select Token
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {mockTokens.map((token) => (
                <div 
                  key={token.id}
                  className={`flex flex-col items-center p-3 rounded-xl border cursor-pointer transition-all card-hover ${
                    selectedToken?.id === token.id 
                      ? "border-primary bg-primary/5" 
                      : "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50"
                  }`}
                  onClick={() => handleTokenSelect(token)}
                >
                  <img 
                    src={token.image} 
                    alt={token.symbol} 
                    className="w-12 h-12 mb-2 rounded-full"
                  />
                  <p className="font-medium text-sm">{token.symbol}</p>
                  <p className={`text-xs ${token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(1)}%
                  </p>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-3">Live Trades</h3>
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-200 dark:border-gray-700 max-h-[250px] overflow-y-auto">
              {tradeLog.length > 0 ? (
                tradeLog.map((entry, index) => (
                  <div key={index} className="py-2 border-b border-dashed border-gray-200 dark:border-gray-700 last:border-0 text-sm text-gray-700 dark:text-gray-300">
                    <span className={`font-bold ${entry.startsWith('Bought') ? 'text-green-500' : 'text-red-500'}`}>
                      {entry.split(" ")[0]}
                    </span>{" "}
                    {entry.split(" ").slice(1).join(" ")}
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">No trades yet. Click "Start Sniping"!</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EnhancedTradeSection;
