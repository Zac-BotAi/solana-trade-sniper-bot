import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface TradeSectionProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
  updateTotalTrades: () => void;
}

const TradeSection = ({ walletBalance, updateWalletBalance, updateTotalTrades }: TradeSectionProps) => {
  const [tradeAmount, setTradeAmount] = useState<number | string>("");
  const [tradeFee, setTradeFee] = useState(0);
  const [netAmount, setNetAmount] = useState(0);
  const [isSniping, setIsSniping] = useState(false);
  const [tradeLog, setTradeLog] = useState<string[]>([]);
  
  // Ref for snipping interval
  const snipingIntervalRef = useRef<NodeJS.Timeout | null>(null);
  
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
    
    // Generate random trade data for the log
    const tokenName = `TOKEN-${Math.floor(Math.random() * 1000)}`;
    const tradeType = Math.random() > 0.5 ? 'Bought' : 'Sold';
    const tradePrice = (Math.random() * 0.001 + 0.0001).toFixed(6);
    const tradeQuantity = (amount / parseFloat(tradePrice)).toFixed(2);
    
    const newEntry = `${tradeType} ${tradeQuantity} ${tokenName} at ${tradePrice} SOL/token (Fee: ${tradeFee.toFixed(4)} SOL)`;
    
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
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Trading & Sniping
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">1% Trading Fee Applied</p>
        
        <div className="flex flex-col gap-3 mb-4">
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
            className="w-full"
          >
            {isSniping ? "Stop Sniping" : "Start Sniping"}
          </Button>
          
          <p className="text-gray-600 mt-2">
            Trade Fee: <span className="font-bold text-red-500">{tradeFee.toFixed(4)} SOL</span>
          </p>
          <p className="text-gray-600">
            Net Amount: <span className="font-bold text-green-600">{netAmount.toFixed(4)} SOL</span>
          </p>
        </div>
        
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Live Trades</h3>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200 max-h-[250px] overflow-y-auto">
          {tradeLog.length > 0 ? (
            tradeLog.map((entry, index) => (
              <p key={index} className="py-2 border-b border-dashed border-gray-200 last:border-0 text-sm text-gray-700">
                <strong>{entry.split(" ")[0]}</strong> {entry.split(" ").slice(1).join(" ")}
              </p>
            ))
          ) : (
            <p className="text-gray-500 text-center">No trades yet. Click "Start Sniping"!</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TradeSection;
