import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";

interface WalletSectionProps {
  walletAddress: string;
  walletBalance: number;
  generateWallet: () => void;
}

const WalletSection = ({ walletAddress, walletBalance, generateWallet }: WalletSectionProps) => {
  const [referralLink, setReferralLink] = useState("");
  
  // Generate referral link when wallet address changes
  useEffect(() => {
    if (walletAddress) {
      const userId = walletAddress.substring(0, 10);
      setReferralLink(`https://t.me/your_bot_username?start=${userId}`);
    }
  }, [walletAddress]);
  
  // Copy referral link to clipboard
  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success("Referral link copied to clipboard!");
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="text-2xl font-semibold ml-2">Wallet</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Your Wallet
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">
            Address: <span className="font-mono text-sm break-all">{walletAddress}</span>
          </p>
          <p className="text-gray-600 mb-4">
            Balance: <span className="font-bold text-indigo-600">{walletBalance.toFixed(2)} SOL</span>
          </p>
          <Button onClick={generateWallet} className="w-full">
            Generate New Wallet
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Referral System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-2">
            Your Referral Link: <span className="font-mono text-sm break-all">{referralLink}</span>
          </p>
          <Button onClick={copyReferralLink} className="w-full mb-4">
            Copy Link
          </Button>

          <h3 className="text-lg font-semibold text-gray-700 mb-2">Tier Structure:</h3>
          <ul className="list-disc list-inside text-gray-600">
            <li>Tier 1 (Direct): <span className="font-semibold">5%</span> of referred user's trade fees</li>
            <li>Tier 2 (Indirect): <span className="font-semibold">10%</span> of referred user's trade fees</li>
            <li>Tier 3 (Extended): <span className="font-semibold">30%</span> of referred user's trade fees</li>
          </ul>
          <p className="text-sm text-gray-500 mt-4">
            Note: This is a conceptual representation. Actual implementation requires robust backend and blockchain integration.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WalletSection;
