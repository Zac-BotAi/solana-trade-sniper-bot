
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/sonner"; 
import { toast } from "sonner";
import Dashboard from "@/components/Dashboard";
import TradeSection from "@/components/TradeSection";
import WalletTracker from "@/components/WalletTracker";
import WalletSection from "@/components/WalletSection";
import TokenOperations from "@/components/TokenOperations";
import NavigationBar from "@/components/NavigationBar";
import { AnimatePresence, motion } from "framer-motion";

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

  // Page transition variants
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -10 }
  };

  // Page transition settings
  const pageTransition = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.3
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <NavigationBar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      
      <div className="flex-1 w-full max-w-xl mx-auto px-4 pt-16 pb-20">
        <AnimatePresence mode="wait">
          {currentPage === "dashboard" && (
            <motion.div
              key="dashboard"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <Dashboard 
                walletBalance={walletBalance} 
                totalTrades={totalTrades}
                onNavigate={setCurrentPage} 
              />
            </motion.div>
          )}
          
          {currentPage === "mint" && (
            <motion.div
              key="mint"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <TokenOperations 
                walletBalance={walletBalance}
                updateWalletBalance={updateWalletBalance}
              />
            </motion.div>
          )}
          
          {currentPage === "trade" && (
            <motion.div
              key="trade"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <TradeSection 
                walletBalance={walletBalance}
                updateWalletBalance={updateWalletBalance}
                updateTotalTrades={updateTotalTrades}
              />
            </motion.div>
          )}
          
          {currentPage === "tracker" && (
            <motion.div
              key="tracker"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <WalletTracker />
            </motion.div>
          )}
          
          {currentPage === "wallet" && (
            <motion.div
              key="wallet"
              initial="initial"
              animate="in"
              exit="out"
              variants={pageVariants}
              transition={pageTransition}
            >
              <WalletSection 
                walletAddress={walletAddress}
                walletBalance={walletBalance}
                generateWallet={generateWallet}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
