
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { 
  Check, 
  ChevronsRight, 
  ChevronsLeft, 
  Twitter, 
  Globe, 
  Linkedin,
  Github,
  Rocket
} from "lucide-react";

interface TokenMintingFormProps {
  walletBalance: number;
  updateWalletBalance: (newBalance: number) => void;
}

interface TokenData {
  name: string;
  symbol: string;
  image: File | null;
  decimals: number;
  totalSupply: number;
  description: string;
  website: string;
  twitter: string;
  linkedin: string;
  github: string;
  freezeAuthority: boolean;
  mintAuthority: boolean;
  updateAuthority: boolean;
}

const TokenMintingForm = ({ walletBalance, updateWalletBalance }: TokenMintingFormProps) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [tokenData, setTokenData] = useState<TokenData>({
    name: "",
    symbol: "",
    image: null,
    decimals: 9,
    totalSupply: 1000000000,
    description: "",
    website: "",
    twitter: "",
    linkedin: "",
    github: "",
    freezeAuthority: false,
    mintAuthority: false,
    updateAuthority: false,
  });
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  
  const TOKEN_CREATION_FEE = 0.1; // 0.1 SOL for token creation
  const AUTHORITY_FEE = 0.1; // 0.1 SOL per authority

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setTokenData({ ...tokenData, image: file });
      
      // Create image preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target && typeof e.target.result === "string") {
          setImagePreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTokenData({ ...tokenData, [name]: value });
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setTokenData({ ...tokenData, [name]: checked });
  };

  const calculateTotalFees = () => {
    let totalFees = TOKEN_CREATION_FEE;
    
    if (tokenData.freezeAuthority) totalFees += AUTHORITY_FEE;
    if (tokenData.mintAuthority) totalFees += AUTHORITY_FEE;
    if (tokenData.updateAuthority) totalFees += AUTHORITY_FEE;
    
    return totalFees;
  };

  const nextStep = () => {
    if (currentStep === 1) {
      if (!tokenData.name || !tokenData.symbol || !tokenData.image) {
        toast.error("Please fill in all required fields");
        return;
      }
    } else if (currentStep === 2) {
      if (tokenData.totalSupply <= 0) {
        toast.error("Total supply must be greater than 0");
        return;
      }
    }
    
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    const totalFees = calculateTotalFees();
    
    if (walletBalance < totalFees) {
      toast.error(`Insufficient balance. You need at least ${totalFees} SOL`);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate token creation process with a timeout
    setTimeout(() => {
      // Deduct fees and update balance
      updateWalletBalance(walletBalance - totalFees);
      
      toast.success("Token created successfully!");
      setIsSubmitting(false);
      
      // Reset form data
      setTokenData({
        name: "",
        symbol: "",
        image: null,
        decimals: 9,
        totalSupply: 1000000000,
        description: "",
        website: "",
        twitter: "",
        linkedin: "",
        github: "",
        freezeAuthority: false,
        mintAuthority: false,
        updateAuthority: false,
      });
      setImagePreview("");
      setCurrentStep(1);
    }, 2000);
  };

  return (
    <Card className="border-none shadow-lg bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        <CardTitle className="text-xl font-bold">
          {currentStep === 1 && "Create New Token - Basic Info"}
          {currentStep === 2 && "Create New Token - Token Economics"}
          {currentStep === 3 && "Create New Token - Finalize & Launch"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        {/* Step Indicator */}
        <div className="flex items-center justify-center mb-6">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <div 
                className={`rounded-full h-8 w-8 flex items-center justify-center ${
                  currentStep >= step 
                    ? "bg-blue-600 text-white" 
                    : "bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                }`}
              >
                {currentStep > step ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && (
                <div 
                  className={`h-1 w-10 ${
                    currentStep > step 
                      ? "bg-blue-600" 
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}
                ></div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Step 1: Basic Info */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Token Name *</Label>
              <Input 
                id="name" 
                name="name"
                value={tokenData.name} 
                onChange={handleInputChange} 
                placeholder="e.g. Meme Coin" 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="symbol">Token Symbol *</Label>
              <Input 
                id="symbol" 
                name="symbol"
                value={tokenData.symbol} 
                onChange={handleInputChange} 
                placeholder="e.g. MEME" 
                required
                maxLength={10}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Maximum 10 characters, usually all uppercase
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Token Image *</Label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <Input 
                    id="image" 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageChange}
                    className="cursor-pointer"
                    required
                  />
                </div>
                {imagePreview && (
                  <div className="h-12 w-12 rounded-full overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                    <img 
                      src={imagePreview} 
                      alt="Token preview" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Recommended: 512x512px PNG or JPG file
              </p>
            </div>
          </div>
        )}

        {/* Step 2: Token Economics */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="decimals">Decimals</Label>
              <Input 
                id="decimals" 
                name="decimals"
                type="number" 
                value={tokenData.decimals} 
                onChange={handleInputChange} 
                min={0}
                max={18}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                How divisible your token will be (0-18). Standard is 9 for meme coins.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="totalSupply">Total Supply</Label>
              <Input 
                id="totalSupply" 
                name="totalSupply"
                type="number" 
                value={tokenData.totalSupply} 
                onChange={handleInputChange}
                min={1}
              />
              <p className="text-xs text-gray-500 dark:text-gray-400">
                The total number of tokens that will ever exist
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                name="description"
                value={tokenData.description} 
                onChange={handleInputChange}
                placeholder="Describe your token and its purpose"
                rows={4}
              />
            </div>
          </div>
        )}

        {/* Step 3: Finalize */}
        {currentStep === 3 && (
          <div className="space-y-4">
            <div className="space-y-3 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold">Authority Settings</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                Each authority will cost an additional 0.1 SOL
              </p>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Freeze Authority</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ability to freeze token accounts</p>
                </div>
                <Switch
                  checked={tokenData.freezeAuthority}
                  onCheckedChange={(checked) => handleSwitchChange("freezeAuthority", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Mint Authority</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ability to mint more tokens</p>
                </div>
                <Switch
                  checked={tokenData.mintAuthority}
                  onCheckedChange={(checked) => handleSwitchChange("mintAuthority", checked)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Update Authority</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Ability to update token metadata</p>
                </div>
                <Switch
                  checked={tokenData.updateAuthority}
                  onCheckedChange={(checked) => handleSwitchChange("updateAuthority", checked)}
                />
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="font-semibold">Social Links (Optional)</h3>
              
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-gray-400" />
                <Input 
                  name="website"
                  value={tokenData.website} 
                  onChange={handleInputChange}
                  placeholder="Website URL" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Twitter className="h-4 w-4 text-gray-400" />
                <Input 
                  name="twitter"
                  value={tokenData.twitter} 
                  onChange={handleInputChange}
                  placeholder="Twitter Handle" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Linkedin className="h-4 w-4 text-gray-400" />
                <Input 
                  name="linkedin"
                  value={tokenData.linkedin} 
                  onChange={handleInputChange}
                  placeholder="LinkedIn URL" 
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Github className="h-4 w-4 text-gray-400" />
                <Input 
                  name="github"
                  value={tokenData.github} 
                  onChange={handleInputChange}
                  placeholder="GitHub URL" 
                />
              </div>
            </div>

            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
              <h3 className="font-semibold mb-2">Fee Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Token Creation</span>
                  <span>0.1 SOL</span>
                </div>
                {tokenData.freezeAuthority && (
                  <div className="flex justify-between">
                    <span>Freeze Authority</span>
                    <span>0.1 SOL</span>
                  </div>
                )}
                {tokenData.mintAuthority && (
                  <div className="flex justify-between">
                    <span>Mint Authority</span>
                    <span>0.1 SOL</span>
                  </div>
                )}
                {tokenData.updateAuthority && (
                  <div className="flex justify-between">
                    <span>Update Authority</span>
                    <span>0.1 SOL</span>
                  </div>
                )}
                <div className="flex justify-between font-bold pt-2 border-t border-blue-200 dark:border-blue-700">
                  <span>Total</span>
                  <span>{calculateTotalFees()} SOL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        {currentStep > 1 ? (
          <Button 
            variant="outline"
            onClick={prevStep}
            className="flex items-center gap-1"
          >
            <ChevronsLeft className="h-4 w-4" /> Back
          </Button>
        ) : (
          <div></div>
        )}

        {currentStep < 3 ? (
          <Button 
            onClick={nextStep}
            className="flex items-center gap-1"
          >
            Next <ChevronsRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || walletBalance < calculateTotalFees()}
            className="flex items-center gap-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {isSubmitting ? "Processing..." : "Launch Token"} <Rocket className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TokenMintingForm;
