
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedWalletTracker from "@/components/EnhancedWalletTracker";
import TwitterSniper from "@/components/TwitterSniper";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";
import { HelpCircle, Zap } from "lucide-react";

const TrackerPage = () => {
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);

  const handleTwitterSnipe = (username: string) => {
    navigate("/trade", { state: { twitterUsername: username } });
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <BackButton />
          <h1 className="text-2xl font-semibold ml-2 text-white">Trackers</h1>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 text-sm bg-blue-600/20 text-blue-400 py-2 px-4 rounded-full"
          onClick={() => setShowGuide(!showGuide)}
        >
          <HelpCircle className="h-4 w-4" />
          {showGuide ? "Hide Guide" : "Show Guide"}
        </motion.button>
      </div>
      
      {showGuide && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-800/50 rounded-lg p-4"
        >
          <div className="flex items-center mb-3">
            <Zap className="h-5 w-5 text-blue-400 mr-2" />
            <h3 className="text-lg font-medium text-white">Tracker Guide</h3>
          </div>
          
          <div className="space-y-4 text-gray-300 text-sm">
            <div>
              <h4 className="font-medium text-blue-300 mb-1">Wallet Tracker</h4>
              <p>Enter a wallet address to track trading activity from known whales and traders. Copy their trades automatically to gain an edge in the market.</p>
              <ul className="list-disc list-inside mt-1 ml-2 text-gray-400">
                <li>Track multiple wallets simultaneously</li>
                <li>See trader classification (dev, whale, influencer)</li>
                <li>Set up automatic copy trading with one click</li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium text-blue-300 mb-1">Twitter Tweet Tracker</h4>
              <p>Track Twitter accounts for token mentions and quickly snipe tokens as soon as they're promoted by influencers.</p>
              <ul className="list-disc list-inside mt-1 ml-2 text-gray-400">
                <li>View full tweets including images and links</li>
                <li>Extract token contract addresses automatically</li>
                <li>Set up alerts for specific keywords or accounts</li>
              </ul>
            </div>
            
            <div className="bg-blue-900/30 border border-blue-700/30 rounded p-3">
              <p className="text-blue-300 font-medium">Pro Tips:</p>
              <ul className="list-disc list-inside text-blue-200/80 space-y-1 mt-1">
                <li>The fastest traders make the most profit</li>
                <li>Follow multiple top traders to spot market patterns</li>
                <li>Set up alerts for key influencers in the Solana ecosystem</li>
              </ul>
            </div>
          </div>
        </motion.div>
      )}
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <EnhancedWalletTracker />
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <TwitterSniper onSnipe={handleTwitterSnipe} />
      </motion.div>
    </div>
  );
};

export default TrackerPage;
