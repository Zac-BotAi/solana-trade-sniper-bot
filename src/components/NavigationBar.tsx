
import { Home, Wallet, TrendingUp, Eye, CircleDollarSign } from "lucide-react";

interface NavigationBarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NavigationBar = ({ currentPage, setCurrentPage }: NavigationBarProps) => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full bg-white border-t border-gray-200 flex justify-around p-2 shadow-lg z-50">
      <NavItem 
        icon={<Home className="h-5 w-5" />}
        label="Dashboard"
        isActive={currentPage === "dashboard"}
        onClick={() => setCurrentPage("dashboard")}
      />
      <NavItem 
        icon={<CircleDollarSign className="h-5 w-5" />}
        label="Mint Token"
        isActive={currentPage === "mint"}
        onClick={() => setCurrentPage("mint")}
      />
      <NavItem 
        icon={<TrendingUp className="h-5 w-5" />}
        label="Trade"
        isActive={currentPage === "trade"}
        onClick={() => setCurrentPage("trade")}
      />
      <NavItem 
        icon={<Eye className="h-5 w-5" />}
        label="Tracker"
        isActive={currentPage === "tracker"}
        onClick={() => setCurrentPage("tracker")}
      />
      <NavItem 
        icon={<Wallet className="h-5 w-5" />}
        label="Wallet"
        isActive={currentPage === "wallet"}
        onClick={() => setCurrentPage("wallet")}
      />
    </nav>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const NavItem = ({ icon, label, isActive, onClick }: NavItemProps) => {
  return (
    <div 
      className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer ${
        isActive ? "text-primary" : "text-gray-500"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default NavigationBar;
