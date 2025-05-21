
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardProps {
  walletBalance: number;
  totalTrades: number;
  onNavigate: (page: string) => void;
}

const Dashboard = ({ walletBalance, totalTrades, onNavigate }: DashboardProps) => {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Welcome to Your Dashboard!
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Here you can get a quick overview of your activities and wallet status.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-indigo-700">Current Balance</p>
              <p className="text-2xl font-bold text-indigo-800" id="dashboardBalance">
                {walletBalance.toFixed(2)} SOL
              </p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl shadow-sm">
              <p className="text-sm text-green-700">Total Trades</p>
              <p className="text-2xl font-bold text-green-800" id="dashboardTrades">
                {totalTrades}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-700">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button onClick={() => onNavigate("trade")} className="w-full">
            Start Sniping
          </Button>
          <Button onClick={() => onNavigate("mint")} className="w-full">
            Mint New Token
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
