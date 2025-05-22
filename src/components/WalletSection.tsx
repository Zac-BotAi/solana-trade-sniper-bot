
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import BackButton from "@/components/BackButton";
import { ArrowRight, ChevronDown, Plus, Wallet, Copy, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

interface WalletSectionProps {
  walletAddress: string;
  walletBalance: number;
  generateWallet: () => void;
}

const WalletSection = ({ walletAddress, walletBalance, generateWallet }: WalletSectionProps) => {
  const [referralLink, setReferralLink] = useState("");
  const [showQR, setShowQR] = useState(false);
  
  // Generate tokens for display
  const tokens = [
    {
      name: "Memecoin",
      symbol: "MEME",
      balance: 444067.27162,
      value: 1113.67,
      change: 255.60,
      logo: "https://cryptologos.cc/logos/pepe-pepe-logo.png"
    },
    {
      name: "Solana",
      symbol: "SOL",
      balance: 0.00995,
      value: 1.41,
      change: -0.01,
      logo: "https://cryptologos.cc/logos/solana-sol-logo.png"
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      balance: 0,
      value: 0.00,
      change: 0.00,
      logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png"
    },
    {
      name: "Polygon",
      symbol: "MATIC",
      balance: 0,
      value: 0.00,
      change: 0.00,
      logo: "https://cryptologos.cc/logos/polygon-matic-logo.png"
    }
  ];
  
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

  // Copy wallet address to clipboard
  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    toast.success("Address copied to clipboard!");
  };

  // Format wallet address for display
  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="space-y-4 pb-20">
      <div className="flex items-center mb-4">
        <BackButton />
        <h1 className="text-2xl font-semibold ml-2 text-white">Wallet</h1>
      </div>
      
      <div className="bg-[#1A1F2C] rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="bg-purple-600/30 w-10 h-10 rounded-full flex items-center justify-center mr-3">
              <span className="text-purple-400 font-bold">A1</span>
            </div>
            <div className="flex items-center">
              <span className="text-white text-lg font-medium">Account 1</span>
              <ChevronDown className="h-5 w-5 ml-1 text-gray-400" />
            </div>
          </div>
          <Button 
            onClick={() => setShowQR(!showQR)} 
            variant="ghost" 
            className="rounded-lg text-white hover:bg-gray-700"
            size="icon"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 3H3V9H9V3ZM7 5H5V7H7V5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M9 15H3V21H9V15ZM7 17H5V19H7V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M21 3H15V9H21V3ZM19 5H17V7H19V5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3H11V4H12V3Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 3H13V4H14V3Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 5H13V6H14V5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 7H13V8H14V7Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 9H13V10H14V9Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 5H11V6H12V5Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 7H11V8H12V7Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 9H11V10H12V9Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 11H11V12H12V11Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 13H11V14H12V13Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 11H13V12H14V11Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 11H15V12H16V11Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 13H15V14H16V13Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 11H17V12H18V11Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 13H17V14H18V13Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 15H17V16H18V15Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 11H19V12H20V11Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 13H19V14H20V13Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 15H19V16H20V15Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 17H19V18H20V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 17H17V18H18V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 17H15V18H16V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 17H13V18H14V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 15H13V16H14V15Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 19H13V20H14V19Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M14 21H13V22H14V21Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 15H11V16H12V15Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 17H11V18H12V17Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 19H11V20H12V19Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M12 21H11V22H12V21Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 19H15V20H16V19Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M16 21H15V22H16V21Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18 21H17V22H18V21Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 21H19V22H20V21Z" fill="currentColor"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M20 19H19V20H20V19Z" fill="currentColor"/>
            </svg>
          </Button>
        </div>
        
        {showQR && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }} 
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 bg-[#111419] p-4 rounded-xl flex flex-col items-center"
          >
            <div className="bg-white p-4 rounded-lg mb-2">
              <svg width="150" height="150" viewBox="0 0 150 150" className="qr-code">
                {/* Simplified QR code visualization */}
                <rect width="150" height="150" fill="white" />
                <rect x="10" y="10" width="20" height="20" fill="black" />
                <rect x="120" y="10" width="20" height="20" fill="black" />
                <rect x="10" y="120" width="20" height="20" fill="black" />
              </svg>
            </div>
            <p className="text-sm text-gray-400">{formatAddress(walletAddress)}</p>
          </motion.div>
        )}
        
        <div className="text-center mb-6">
          <h2 className="text-5xl font-bold text-white">
            ${(walletBalance * 10).toFixed(2)}
          </h2>
          <p className="text-green-400 text-xl mt-1">
            +$255.59 +29.74%
          </p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6">
          <Button variant="secondary" size="lg" className="flex flex-col items-center justify-center h-20 bg-[#2A2F3C] hover:bg-[#343A4A] border-none text-white rounded-xl">
            <svg width="24" height="24" viewBox="0 0 24 24" className="mb-2 text-purple-400" stroke="currentColor" fill="none">
              <path d="M22 2L11 13" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span className="text-sm">Send</span>
          </Button>
          
          <Button variant="secondary" size="lg" className="flex flex-col items-center justify-center h-20 bg-[#2A2F3C] hover:bg-[#343A4A] border-none text-white rounded-xl">
            <Plus className="mb-2 text-purple-400" />
            <span className="text-sm">Receive</span>
          </Button>
          
          <Button variant="secondary" size="lg" className="flex flex-col items-center justify-center h-20 bg-[#2A2F3C] hover:bg-[#343A4A] border-none text-white rounded-xl">
            <Wallet className="mb-2 text-purple-400" />
            <span className="text-sm">Import</span>
          </Button>
        </div>
        
        <div className="space-y-3">
          {tokens.map((token, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-[#252A37] rounded-xl">
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={token.logo} alt={token.name} />
                  <AvatarFallback>{token.symbol.substring(0, 2)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-white font-medium">{token.name}</h3>
                  <p className="text-gray-400 text-sm">{token.balance.toLocaleString()} {token.symbol}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-white font-medium">${token.value.toFixed(2)}</p>
                <p className={token.change >= 0 ? "text-green-400 text-sm" : "text-red-400 text-sm"}>
                  {token.change >= 0 ? "+" : ""}{token.change.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-center mt-6 text-gray-400">
          <Button 
            variant="ghost" 
            className="flex items-center text-gray-400 hover:text-gray-300"
            onClick={() => toast.info("Manage token list feature coming soon")}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
              <path d="M15.5 10C15.5 10.4142 15.1642 10.75 14.75 10.75L5.25 10.75C4.83579 10.75 4.5 10.4142 4.5 10C4.5 9.58579 4.83579 9.25 5.25 9.25L14.75 9.25C15.1642 9.25 15.5 9.58579 15.5 10Z" fill="currentColor"/>
              <path d="M15.5 13C15.5 13.4142 15.1642 13.75 14.75 13.75L5.25 13.75C4.83579 13.75 4.5 13.4142 4.5 13C4.5 12.5858 4.83579 12.25 5.25 12.25L14.75 12.25C15.1642 12.25 15.5 12.5858 15.5 13Z" fill="currentColor"/>
              <path d="M15.5 7C15.5 7.41421 15.1642 7.75 14.75 7.75L5.25 7.75C4.83579 7.75 4.5 7.41421 4.5 7C4.5 6.58579 4.83579 6.25 5.25 6.25L14.75 6.25C15.1642 6.25 15.5 6.58579 15.5 7Z" fill="currentColor"/>
            </svg>
            Manage token list
          </Button>
        </div>
      </div>

      <Card className="border-none shadow-lg bg-[#252A37] p-6">
        <h3 className="text-lg font-semibold text-white mb-4">
          Referral System
        </h3>
        <div className="mb-4">
          <p className="text-gray-300 mb-2">
            Share your referral link and earn rewards:
          </p>
          <div className="flex items-center bg-[#1A1F2C] rounded-lg p-2 mb-2">
            <span className="text-gray-400 text-sm mr-2 truncate flex-1">{referralLink}</span>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0" 
              onClick={copyReferralLink}
            >
              <Copy className="h-4 w-4 text-gray-400" />
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-white font-medium mb-2">Tier Structure:</h4>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mr-2">1</div>
              <span>Tier 1 (Direct): <span className="text-green-400 font-semibold">5%</span> of referred user's trade fees</span>
            </li>
            <li className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center mr-2">2</div>
              <span>Tier 2 (Indirect): <span className="text-blue-400 font-semibold">10%</span> of referred user's trade fees</span>
            </li>
            <li className="flex items-center">
              <div className="h-6 w-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center mr-2">3</div>
              <span>Tier 3 (Extended): <span className="text-purple-400 font-semibold">30%</span> of referred user's trade fees</span>
            </li>
          </ul>
        </div>
        
        <p className="text-xs text-gray-500 mt-4">
          Note: This is a conceptual representation. Actual implementation requires robust backend and blockchain integration.
        </p>
      </Card>
    </div>
  );
};

export default WalletSection;
