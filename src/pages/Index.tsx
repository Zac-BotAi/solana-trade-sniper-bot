
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner"; 
import { toast } from "sonner";
import Dashboard from "@/components/Dashboard";
import TradeSection from "@/components/TradeSection";
import WalletTracker from "@/components/WalletTracker";
import WalletSection from "@/components/WalletSection";
import TokenOperations from "@/components/TokenOperations";
import NavigationBar from "@/components/NavigationBar";

// Main app page
const Index = () => {
  const [currentPage, setCurrentPage] = useState("dashboard");
  const [walletAddress, setWalletAddress] = useState("");
  const [walletBalance, setWalletBalance] = useState(10.0);
  const [totalTrades, setTotalTrades] = useState(0);
  
  // Generate a dummy Solana address
  const generateDummyAddress = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let address = '';
    for (let i = 0; i < 44; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return address;
  };
  
  // Initialize wallet on page load
  useEffect(() => {
    generateWallet();
  }, []);
  
  // Generate wallet function
  const generateWallet = () => {
    const newAddress = generateDummyAddress();
    const newBalance = (Math.random() * 50) + 5; // Random balance between 5 and 55 SOL
    setWalletAddress(newAddress);
    setWalletBalance(newBalance);
    toast.success("New wallet generated successfully!");
  };
  
  // Update wallet balance
  const updateWalletBalance = (newBalance: number) => {
    setWalletBalance(newBalance);
  };
  
  // Update total trades
  const updateTotalTrades = () => {
    setTotalTrades(prev => prev + 1);
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 my-4">
        Solana Trading Bot
      </h1>
      
      <div className="flex-1 w-full max-w-xl mx-auto px-4 pb-20">
        {currentPage === "dashboard" && (
          <Dashboard 
            walletBalance={walletBalance} 
            totalTrades={totalTrades}
            onNavigate={setCurrentPage} 
          />
        )}
        
        {currentPage === "mint" && (
          <TokenOperations 
            walletBalance={walletBalance}
            updateWalletBalance={updateWalletBalance}
          />
        )}
        
        {currentPage === "trade" && (
          <TradeSection 
            walletBalance={walletBalance}
            updateWalletBalance={updateWalletBalance}
            updateTotalTrades={updateTotalTrades}
          />
        )}
        
        {currentPage === "tracker" && (
          <WalletTracker />
        )}
        
        {currentPage === "wallet" && (
          <WalletSection 
            walletAddress={walletAddress}
            walletBalance={walletBalance}
            generateWallet={generateWallet}
          />
        )}
      </div>
      
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Index;
