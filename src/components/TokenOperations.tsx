
import { useState } from "react";
import TokenMintingForm from "@/components/TokenMintingForm";
import BackButton from "@/components/BackButton";

interface TokenOperationsProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
}

const TokenOperations = ({ walletBalance, updateWalletBalance }: TokenOperationsProps) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="text-2xl font-semibold ml-2">Token Operations</h1>
      </div>
      
      <TokenMintingForm 
        walletBalance={walletBalance} 
        updateWalletBalance={updateWalletBalance} 
      />
    </div>
  );
};

export default TokenOperations;
