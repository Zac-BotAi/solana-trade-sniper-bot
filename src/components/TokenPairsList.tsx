
import { useState } from "react";
import { Search, Filter } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TokenPair {
  id: string;
  name: string;
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
  image: string;
  isMigrated: boolean;
}

const mockTokenPairs: TokenPair[] = [
  {
    id: "1",
    name: "Dogecoin",
    symbol: "DOGE",
    price: 0.12,
    change24h: 5.2,
    volume24h: 1500000,
    marketCap: 15000000,
    image: "https://cryptologos.cc/logos/dogecoin-doge-logo.png",
    isMigrated: false,
  },
  {
    id: "2",
    name: "Shiba Inu",
    symbol: "SHIB",
    price: 0.000028,
    change24h: -2.1,
    volume24h: 890000,
    marketCap: 10500000,
    image: "https://cryptologos.cc/logos/shiba-inu-shib-logo.png",
    isMigrated: true,
  },
  {
    id: "3",
    name: "Pepe",
    symbol: "PEPE",
    price: 0.0000089,
    change24h: 12.3,
    volume24h: 750000,
    marketCap: 5200000,
    image: "https://cryptologos.cc/logos/pepe-pepe-logo.png",
    isMigrated: false,
  },
  {
    id: "4",
    name: "Floki Inu",
    symbol: "FLOKI",
    price: 0.000158,
    change24h: 8.7,
    volume24h: 430000,
    marketCap: 3800000,
    image: "https://cryptologos.cc/logos/floki-inu-floki-logo.png",
    isMigrated: true,
  },
];

const TokenPairsList = () => {
  const [tokens, setTokens] = useState<TokenPair[]>(mockTokenPairs);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMigrated, setShowMigrated] = useState(true);
  const [sortBy, setSortBy] = useState("marketCap");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const toggleMigratedFilter = () => {
    setShowMigrated(!showMigrated);
  };

  const handleSort = (value: string) => {
    setSortBy(value);
  };

  const filteredTokens = tokens
    .filter(token => 
      (showMigrated || !token.isMigrated) && 
      (token.name.toLowerCase().includes(searchQuery) || 
       token.symbol.toLowerCase().includes(searchQuery))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "price":
          return b.price - a.price;
        case "change":
          return b.change24h - a.change24h;
        case "volume":
          return b.volume24h - a.volume24h;
        case "marketCap":
        default:
          return b.marketCap - a.marketCap;
      }
    });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl font-semibold text-gray-700 dark:text-gray-200">
          Token Pairs
        </CardTitle>
        <div className="flex space-x-2">
          <Button 
            variant={showMigrated ? "outline" : "secondary"}
            size="sm"
            onClick={toggleMigratedFilter}
          >
            <Filter className="h-4 w-4 mr-1" />
            {showMigrated ? "All Tokens" : "Hide Migrated"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <Input
                placeholder="Search by name or symbol..."
                className="pl-8"
                value={searchQuery}
                onChange={handleSearch}
              />
            </div>
            <Select defaultValue={sortBy} onValueChange={handleSort}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="marketCap">Market Cap</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="price">Price</SelectItem>
                <SelectItem value="change">24h Change</SelectItem>
                <SelectItem value="volume">Volume</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            {filteredTokens.length > 0 ? (
              filteredTokens.map((token) => (
                <div
                  key={token.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <img 
                      src={token.image} 
                      alt={token.name} 
                      className="w-8 h-8 rounded-full" 
                    />
                    <div>
                      <div className="flex items-center">
                        <h3 className="font-medium text-gray-800 dark:text-gray-200">{token.name}</h3>
                        {token.isMigrated && (
                          <Badge variant="outline" className="ml-2 text-xs">Migrated</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{token.symbol}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">${token.price.toFixed(token.price < 0.001 ? 8 : 6)}</p>
                    <p className={`text-sm ${token.change24h >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                      {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center py-6 text-gray-500 dark:text-gray-400">No tokens found matching your criteria</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TokenPairsList;
