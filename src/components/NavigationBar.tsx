
import { useState } from "react";
import { Home, Wallet, TrendingUp, Eye, CircleDollarSign, Bell, Sun, Moon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import ProfileMenu from "@/components/ProfileMenu";

interface NavigationBarProps {
  currentPage: string;
  setCurrentPage: (page: string) => void;
}

const NavigationBar = ({ currentPage, setCurrentPage }: NavigationBarProps) => {
  const [darkMode, setDarkMode] = useState(false);
  const [hasNotification, setHasNotification] = useState(true);
  const { toast } = useToast();

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.classList.toggle("dark", newMode);
    toast({
      title: `${newMode ? "Dark" : "Light"} mode activated`,
      description: `The app is now in ${newMode ? "dark" : "light"} mode.`,
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have 3 unread notifications",
    });
    setHasNotification(false);
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex justify-between p-3 shadow-md z-50">
        <div className="flex items-center">
          <h1 className="text-xl font-bold text-primary dark:text-gray-200 ml-2">MemesEye</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <Switch 
              checked={darkMode} 
              onCheckedChange={toggleDarkMode} 
            />
            <Moon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
          </div>
          
          <button 
            className="relative"
            onClick={handleNotificationClick}
          >
            <Bell className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            {hasNotification && (
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500 transform translate-x-1 -translate-y-1"></span>
            )}
          </button>
          
          <ProfileMenu />
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 w-full bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 flex justify-around p-2 shadow-lg z-50">
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
    </>
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
      className={`flex flex-col items-center justify-center p-2 rounded-md cursor-pointer transition-colors duration-200 ${
        isActive 
          ? "text-primary dark:text-primary-foreground" 
          : "text-gray-500 dark:text-gray-400"
      }`}
      onClick={onClick}
    >
      {icon}
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
};

export default NavigationBar;
