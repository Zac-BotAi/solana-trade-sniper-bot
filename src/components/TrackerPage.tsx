
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EnhancedWalletTracker from "@/components/EnhancedWalletTracker";
import TwitterSniper from "@/components/TwitterSniper";

const TrackerPage = () => {
  const navigate = useNavigate();

  const handleTwitterSnipe = (username: string) => {
    navigate("/trade", { state: { twitterUsername: username } });
  };

  return (
    <div className="space-y-6">
      <EnhancedWalletTracker />
      <TwitterSniper onSnipe={handleTwitterSnipe} />
    </div>
  );
};

export default TrackerPage;
