
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Search, Zap, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

interface DashboardProps {
  walletBalance: number;
  totalTrades: number;
  onNavigate: (page: string) => void;
}

interface TokenData {
  id: string;
  name: string;
  symbol: string;
  image: string;
  price: number;
  marketCap: number;
  volume: number;
  change24h: number;
  age: string;
  holders: number;
  uniqueHolders: number;
  volumeChange: number;
}

const Dashboard = ({ walletBalance, totalTrades, onNavigate }: DashboardProps) => {
  const [activeFilter, setActiveFilter] = useState("new-pairs");
  
  const mockTokens: TokenData[] = [
    {
      id: "1",
      name: "Matty Token",
      symbol: "MATTY",
      image: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
      price: 0.12,
      marketCap: 12000,
      volume: 212000,
      change24h: 36,
      age: "0s",
      holders: 68,
      uniqueHolders: 44,
      volumeChange: 10,
    },
    {
      id: "2",
      name: "First Token",
      symbol: "FIRST",
      image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
      price: 0.0001,
      marketCap: 38000,
      volume: 307000,
      change24h: -23,
      age: "1m",
      holders: 297,
      uniqueHolders: 190,
      volumeChange: 0,
    },
    {
      id: "3",
      name: "Chico Token",
      symbol: "CHICO",
      image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
      price: 0.02,
      marketCap: 35000,
      volume: 57000,
      change24h: 15,
      age: "2m",
      holders: 110,
      uniqueHolders: 12,
      volumeChange: 3,
    },
  ];

  return (
    <div className="space-y-4">
      <Card className="border-none shadow-xl bg-[#1A1F2C]">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-xl font-semibold text-white">
              Tokens List
            </CardTitle>
            <div className="flex space-x-2 text-sm">
              <Button 
                variant={activeFilter === "new-pairs" ? "secondary" : "ghost"}
                className={activeFilter === "new-pairs" ? "bg-blue-500/20 text-blue-300" : "text-gray-400"}
                size="sm"
                onClick={() => setActiveFilter("new-pairs")}
              >
                New Pairs
              </Button>
              <Button 
                variant={activeFilter === "final-stretch" ? "secondary" : "ghost"}
                className={activeFilter === "final-stretch" ? "bg-blue-500/20 text-blue-300" : "text-gray-400"}
                size="sm"
                onClick={() => setActiveFilter("final-stretch")}
              >
                Final Stretch
              </Button>
              <Button 
                variant={activeFilter === "migrated" ? "secondary" : "ghost"}
                className={activeFilter === "migrated" ? "bg-blue-500/20 text-blue-300" : "text-gray-400"}
                size="sm"
                onClick={() => setActiveFilter("migrated")}
              >
                Migrated
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockTokens.map((token) => (
              <motion.div 
                key={token.id}
                whileHover={{ scale: 1.02 }}
                className="bg-[#252A37] rounded-xl p-3 border border-gray-800"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12 rounded-full border-2 border-yellow-500">
                      <AvatarImage src={token.image} alt={token.name} className="object-cover" />
                      <AvatarFallback className="bg-gray-800 text-white">
                        {token.symbol.substring(0, 2)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div>
                      <div className="flex items-center">
                        <span className="font-bold text-white mr-2">{token.symbol}</span>
                        <span className="text-gray-400 text-sm">{token.name}</span>
                      </div>
                      <div className="flex items-center text-xs text-gray-400 mt-1">
                        <span>{token.age}</span>
                        <span className="mx-2">•</span>
                        
                        <div className="flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400 mr-1">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z" fill="currentColor"/>
                          </svg>
                          <span>{token.holders}</span>
                        </div>
                        
                        <span className="mx-2">•</span>
                        
                        <div className="flex items-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400 mr-1">
                            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" fill="currentColor"/>
                          </svg>
                          <span>{token.uniqueHolders}</span>
                        </div>
                        
                        <span className="mx-2">•</span>
                        
                        <div className="flex items-center">
                          <span className="text-xs mr-1">#</span>
                          <span>1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-white font-semibold">MC ${token.marketCap.toLocaleString()}</div>
                    <div className="text-gray-400 text-sm">V ${token.volume.toLocaleString()}</div>
                    <div className="mt-1 flex justify-end items-center">
                      <span className="text-xs bg-gray-700 rounded px-1 mr-1 text-gray-300">TX {Math.floor(Math.random() * 2000) + 500}</span>
                      <Button size="sm" variant="outline" className="h-7 w-7 p-0 rounded-full bg-blue-600/20 border-blue-600/30">
                        <Zap className="h-3 w-3 text-blue-400" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="px-2 py-1 rounded bg-red-900/20 text-red-400 text-xs font-medium flex items-center">
                      <span className="mr-1">↓</span>{Math.abs(token.change24h)}%
                    </div>
                    
                    {token.volumeChange > 0 && (
                      <div className="px-2 py-1 rounded bg-green-900/20 text-green-400 text-xs font-medium flex items-center">
                        <span className="mr-1">↑</span>{token.volumeChange}%
                      </div>
                    )}
                    
                    {token.volumeChange === 0 && (
                      <div className="px-2 py-1 rounded bg-blue-900/20 text-blue-400 text-xs font-medium">
                        DS
                      </div>
                    )}
                    
                    <div className="px-2 py-1 rounded bg-green-900/20 text-green-400 text-xs font-medium">
                      0%
                    </div>
                    
                    <div className="px-2 py-1 rounded bg-blue-900/20 text-blue-400 text-xs font-medium">
                      0%
                    </div>
                    
                    <div className="px-2 py-1 rounded bg-purple-900/20 text-purple-400 text-xs font-medium">
                      {Math.floor(Math.random() * 10) + 1}%
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-4 text-center">
            <Button 
              variant="outline" 
              className="text-blue-400 border-blue-500/20 hover:bg-blue-900/20"
              onClick={() => onNavigate("tracker")}
            >
              View All Tokens <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card className="border-none shadow-lg bg-[#1A1F2C]">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-white">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={() => onNavigate("trade")} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            Start Sniping
          </Button>
          <Button onClick={() => onNavigate("mint")} className="w-full bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700">
            Mint New Token
          </Button>
          <Button onClick={() => onNavigate("wallet")} className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700">
            Manage Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
