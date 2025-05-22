
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { toast } from "sonner";
import { ArrowRight, Copy, Twitter, Zap, ChevronDown, TrendingUp, TrendingDown } from "lucide-react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import BackButton from "./BackButton";

// Import TradingViewWidget component (created below)
import TradingViewWidget from "./TradingViewWidget";

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
  marketCap: number;
  volume: number;
}

const mockTokens: TradeToken[] = [
  {
    id: "1",
    name: "Dogecoin",
    symbol: "DOGE",
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    price: 0.12,
    change24h: 5.2,
    marketCap: 15000000,
    volume: 1500000
  },
  {
    id: "2",
    name: "Shiba Inu",
    symbol: "SHIB",
    image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    price: 0.000028,
    change24h: -2.1,
    marketCap: 10500000,
    volume: 890000
  },
  {
    id: "3",
    name: "Pepe",
    symbol: "PEPE",
    image: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    price: 0.0000089,
    change24h: 12.3,
    marketCap: 5200000,
    volume: 750000
  },
  {
    id: "4",
    name: "Floki Inu",
    symbol: "FLOKI",
    image: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    price: 0.000158,
    change24h: 8.7,
    marketCap: 3800000,
    volume: 430000
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
  const [showTradingView, setShowTradingView] = useState(false);
  
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
    setShowTradingView(true);
    toast.success(`Selected ${token.name} (${token.symbol}) for trading`);
  };
  
  // Copy token metadata
  const handleCopyTokenMetadata = (token: TradeToken) => {
    const metadata = `Token: ${token.name} (${token.symbol})
Price: $${token.price}
24h Change: ${token.change24h >= 0 ? '+' : ''}${token.change24h}%
Market Cap: $${token.marketCap.toLocaleString()}
Volume: $${token.volume.toLocaleString()}`;
    
    navigator.clipboard.writeText(metadata);
    toast.success(`Copied ${token.symbol} metadata to clipboard`);
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
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-2xl font-semibold ml-2 text-white">Trading & Sniping</h1>
        </div>
        {selectedToken && (
          <Badge 
            variant="outline" 
            className="text-sm py-1 px-3 rounded-full border-green-500/30 text-green-400 bg-green-900/20"
          >
            Selected: {selectedToken.symbol}
          </Badge>
        )}
      </div>

      {(copyTradeWallet || twitterUsername) && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-r from-blue-500/20 to-indigo-500/20 dark:from-blue-900/30 dark:to-indigo-900/30 p-4 rounded-xl border border-blue-200 dark:border-blue-800 backdrop-blur-sm"
        >
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
              <span>Twitter Tracker Mode: Following @{twitterUsername}</span>
            </div>
          )}
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {showTradingView && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-[#1a1f2c] rounded-xl border border-gray-800 overflow-hidden h-[500px]"
            >
              <div className="flex items-center justify-between bg-[#252A37] p-3 border-b border-gray-800">
                <div className="flex items-center">
                  {selectedToken && (
                    <>
                      <Avatar className="h-8 w-8 mr-2">
                        <AvatarImage src={selectedToken.image} alt={selectedToken.symbol} />
                        <AvatarFallback>{selectedToken.symbol.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <span className="text-white font-medium">{selectedToken.symbol}/USD</span>
                        <div className="flex items-center">
                          <Badge 
                            variant="outline" 
                            className={`mr-2 py-0 px-1.5 ${selectedToken.change24h >= 0 ? 'bg-green-900/20 text-green-400 border-green-500/30' : 'bg-red-900/20 text-red-400 border-red-500/30'}`}
                          >
                            {selectedToken.change24h >= 0 ? '+' : ''}{selectedToken.change24h}%
                          </Badge>
                          <span className="text-gray-300 text-xs">
                            MC ${selectedToken.marketCap.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" className="h-8 border-blue-500/30 bg-blue-900/20 text-blue-400">
                    1m
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-gray-400">
                    5m
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-gray-400">
                    15m
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 text-gray-400">
                    1h
                  </Button>
                </div>
              </div>
              
              <TradingViewWidget symbol={selectedToken ? `${selectedToken.symbol}USD` : "BTCUSD"} />
            </motion.div>
          )}

          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-[#1a1f2c] to-[#15181e] backdrop-blur-md">
            <CardHeader className="bg-[#252A37]">
              <CardTitle className="text-xl font-semibold text-white flex items-center">
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                Trading Controls
              </CardTitle>
            </CardHeader>
            
            <CardContent className="pt-6">
              <p className="text-sm text-gray-300 mb-4">1% Trading Fee Applied</p>
              
              <div className="flex flex-col gap-3 mb-6">
                <Input
                  type="number"
                  id="tradeAmount"
                  value={tradeAmount}
                  onChange={handleTradeAmountChange}
                  placeholder="Enter trade amount (SOL)"
                  min="0.01"
                  step="0.01"
                  className="bg-white/10 border-gray-700 text-white placeholder:text-gray-400"
                />
                
                <Button 
                  onClick={toggleSniping}
                  variant={isSniping ? "destructive" : "default"}
                  className={`w-full relative overflow-hidden ${isSniping ? "bg-red-600 hover:bg-red-700" : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"}`}
                  disabled={!tradeAmount}
                >
                  {isSniping ? "Stop Sniping" : "Start Sniping"}
                  {isSniping && (
                    <span className="absolute inset-0 animate-pulse bg-white/10 rounded-md" />
                  )}
                </Button>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 backdrop-blur-lg p-3 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Trade Fee</p>
                    <p className="text-lg font-bold text-red-500">{tradeFee.toFixed(4)} SOL</p>
                  </div>
                  <div className="bg-black/40 backdrop-blur-lg p-3 rounded-lg border border-gray-700">
                    <p className="text-gray-400">Net Amount</p>
                    <p className="text-lg font-bold text-green-500">{netAmount.toFixed(4)} SOL</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Live Trades</h3>
                <div className="bg-black/40 backdrop-blur-lg p-4 rounded-xl border border-gray-700 max-h-[250px] overflow-y-auto">
                  {tradeLog.length > 0 ? (
                    tradeLog.map((entry, index) => (
                      <motion.div 
                        key={index} 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="py-2 border-b border-dashed border-gray-700 last:border-0 text-sm text-gray-300"
                      >
                        <span className={`font-bold ${entry.startsWith('Bought') ? 'text-green-500' : 'text-red-500'}`}>
                          {entry.split(" ")[0]}
                        </span>{" "}
                        {entry.split(" ").slice(1).join(" ")}
                      </motion.div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-center">No trades yet. Click "Start Sniping"!</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-[#1a1f2c] to-[#15181e] backdrop-blur-md">
            <CardHeader className="bg-[#252A37]">
              <CardTitle className="text-lg font-semibold text-white">
                Select Token
              </CardTitle>
            </CardHeader>
            <CardContent className="py-4">
              <div className="space-y-3">
                {mockTokens.map((token) => (
                  <motion.div 
                    key={token.id}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer relative overflow-hidden ${
                      selectedToken?.id === token.id 
                        ? "border-blue-500 bg-blue-900/20" 
                        : "border-gray-700 bg-gray-800/50 hover:border-gray-500"
                    }`}
                    onClick={() => handleTokenSelect(token)}
                  >
                    <div className="flex items-center">
                      <Avatar className="h-10 w-10 mr-3">
                        <AvatarImage src={token.image} alt={token.name} className="object-cover" />
                        <AvatarFallback className="bg-gray-800 text-white">
                          {token.symbol.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-white">{token.symbol}</p>
                        <div className="flex items-center">
                          <p className={`text-xs ${token.change24h >= 0 ? 'text-green-500' : 'text-red-500'} mr-2`}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                          </p>
                          <p className="text-xs text-gray-400">${token.price.toFixed(token.price < 0.001 ? 8 : 4)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      {token.change24h >= 0 ? (
                        <TrendingUp className="h-4 w-4 text-green-500 mr-2" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-500 mr-2" />
                      )}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 p-0 w-7 text-gray-400 hover:text-white hover:bg-gray-700/70 rounded-full"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCopyTokenMetadata(token);
                        }}
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              <Button className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700">
                View All Tokens
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden border-none shadow-lg bg-gradient-to-br from-[#1a1f2c] to-[#15181e] backdrop-blur-md">
            <CardHeader className="bg-[#252A37]">
              <CardTitle className="text-lg font-semibold text-white">
                Trading Stats
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-green-900/30 flex items-center justify-center mr-3">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Total PnL</p>
                      <p className="text-white font-medium">+$1,245.67</p>
                    </div>
                  </div>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">+12.3%</Badge>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-blue-900/30 flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-blue-400">
                        <path d="M19 5H5v14h14V5z" />
                        <path d="M19 5L5 19" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Success Rate</p>
                      <p className="text-white font-medium">78%</p>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm">Last 30d</p>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full bg-purple-900/30 flex items-center justify-center mr-3">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-purple-400">
                        <circle cx="12" cy="12" r="10" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-300 text-sm">Avg Hold Time</p>
                      <p className="text-white font-medium">3.2 hours</p>
                    </div>
                  </div>
                  <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">-15%</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EnhancedTradeSection;
