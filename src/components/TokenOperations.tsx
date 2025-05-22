
import { useState } from "react";
import TokenMintingForm from "@/components/TokenMintingForm";
import BackButton from "@/components/BackButton";
import { motion } from "framer-motion";
import { Book, HelpCircle } from "lucide-react";

interface TokenOperationsProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
}

const TokenOperations = ({ walletBalance, updateWalletBalance }: TokenOperationsProps) => {
  const [showGuide, setShowGuide] = useState(false);
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-2xl font-semibold ml-2">Token Operations</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sm bg-indigo-600/20 text-indigo-400 py-2 px-4 rounded-full"
          onClick={() => setShowGuide(!showGuide)}
        >
          <Book className="h-4 w-4" />
          {showGuide ? "Hide Guide" : "Show Guide"}
        </motion.button>
      </div>
      
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-indigo-900/30 to-purple-900/30 border border-indigo-800/50 rounded-lg p-4"
        >
          <div className="flex items-center mb-3">
            <HelpCircle className="h-5 w-5 text-indigo-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Token Minting Guide</h3>
          </div>
          
          <div className="space-y-4 text-gray-300 text-sm">
            <div>
              <h4 className="font-medium text-indigo-300 mb-1">Step 1: Basic Info</h4>
              <p>Enter your token's name, symbol and upload a logo. Choose a memorable name and a short symbol (typically 3-5 uppercase letters).</p>
            </div>
            
            <div>
              <h4 className="font-medium text-indigo-300 mb-1">Step 2: Token Economics</h4>
              <p>Define your token's decimals (usually 9 for meme tokens) and total supply. Add a description to explain your token's purpose.</p>
            </div>
            
            <div>
              <h4 className="font-medium text-indigo-300 mb-1">Step 3: Launch Details</h4>
              <p>Choose which authorities you want to maintain (Freeze, Mint, Update). Each authority costs 0.1 SOL. Add social links to increase credibility.</p>
            </div>
            
            <div className="bg-yellow-900/30 border border-yellow-700/30 rounded p-3">
              <p className="text-yellow-300 font-medium">Important:</p>
              <ul className="list-disc list-inside text-yellow-200/80 space-y-1 mt-1">
                <li>Token creation base fee: 0.1 SOL</li>
                <li>Each authority adds 0.1 SOL</li>
                <li>You'll need to sign a transaction to complete the process</li>
                <li>The token will be minted directly to your connected wallet</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      <TokenMintingForm 
        walletBalance={walletBalance} 
        updateWalletBalance={updateWalletBalance} 
      />
    </div>
  );
};

export default TokenOperations;
