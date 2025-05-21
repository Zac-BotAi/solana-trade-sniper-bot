
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface TokenOperationsProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
}

const TokenOperations = ({ walletBalance, updateWalletBalance }: TokenOperationsProps) => {
  const FEE = 0.1; // 0.1 SOL fee for token operations
  
  // Handle token operations
  const performTokenOperation = (operationType: string) => {
    if (walletBalance < FEE) {
      toast.error('Insufficient SOL balance for this operation.');
      return;
    }

    // Deduct fee and update balance
    updateWalletBalance(walletBalance - FEE);

    // Show success message based on operation type
    switch (operationType) {
      case 'create':
        toast.success(`Successfully created token. ${FEE} SOL fee deducted.`);
        break;
      case 'revokeFreeze':
        toast.success(`Successfully revoked Freeze Authority. ${FEE} SOL fee deducted.`);
        break;
      case 'revokeMint':
        toast.success(`Successfully revoked Mint Authority. ${FEE} SOL fee deducted.`);
        break;
      case 'revokeUpdate':
        toast.success(`Successfully revoked Update Authority. ${FEE} SOL fee deducted.`);
        break;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-700">
          Token Operations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Fees: {FEE} SOL per operation
        </p>
        <div className="flex flex-col gap-3">
          <Button 
            onClick={() => performTokenOperation('create')} 
            className="w-full"
          >
            Create New Token
          </Button>
          <Button 
            onClick={() => performTokenOperation('revokeFreeze')} 
            className="w-full"
          >
            Revoke Freeze Authority
          </Button>
          <Button 
            onClick={() => performTokenOperation('revokeMint')} 
            className="w-full"
          >
            Revoke Mint Authority
          </Button>
          <Button 
            onClick={() => performTokenOperation('revokeUpdate')} 
            className="w-full"
          >
            Revoke Update Authority
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenOperations;
