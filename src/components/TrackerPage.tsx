
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedWalletTracker from "@/components/EnhancedWalletTracker";
import TwitterSniper from "@/components/TwitterSniper";
import { motion } from "framer-motion";
import BackButton from "@/components/BackButton";

const TrackerPage = () => {
  const navigate = useNavigate();

  const handleTwitterSnipe = (username: string) => {
    navigate("/trade", { state: { twitterUsername: username } });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="text-2xl font-semibold ml-2">Trackers</h1>
      </div>
      
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
