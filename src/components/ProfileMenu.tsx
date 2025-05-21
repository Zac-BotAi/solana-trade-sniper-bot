
import React from "react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Settings, LogOut, HelpCircle } from "lucide-react";

interface ProfileMenuProps {
  userImageUrl?: string;
  username?: string;
}

const ProfileMenu = ({ userImageUrl, username = "User" }: ProfileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
          <AvatarImage src={userImageUrl || "https://github.com/shadcn.png"} />
          <AvatarFallback>
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Profile</SheetTitle>
        </SheetHeader>
        <div className="py-6 flex flex-col items-center">
          <Avatar className="h-16 w-16">
            <AvatarImage src={userImageUrl || "https://github.com/shadcn.png"} />
            <AvatarFallback>
              {username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <h2 className="mt-4 text-lg font-semibold">{username}</h2>
          <p className="text-sm text-muted-foreground">Premium Member</p>
        </div>

        <div className="flex flex-col gap-2">
          <Button variant="ghost" className="justify-start" asChild>
            <Link to="/profile">
              <User className="mr-2 h-4 w-4" />
              My Profile
            </Link>
          </Button>
          
          <Button variant="ghost" className="justify-start" asChild>
            <Link to="/settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
          
          <Button variant="ghost" className="justify-start" asChild>
            <Link to="/help">
              <HelpCircle className="mr-2 h-4 w-4" />
              Help & Support
            </Link>
          </Button>
        </div>

        <div className="mt-auto pt-4">
          <Button variant="destructive" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileMenu;
