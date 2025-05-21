
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { User, Settings, LogOut, HelpCircle, FileText, AlertCircle, Shield } from "lucide-react";
import { toast } from "sonner";

interface AvatarOption {
  id: string;
  name: string;
  imageUrl: string;
}

interface ProfileMenuProps {
  userImageUrl?: string;
  username?: string;
}

const ProfileMenu = ({ userImageUrl, username = "User" }: ProfileMenuProps) => {
  const navigate = useNavigate();
  const [isAvatarDialogOpen, setIsAvatarDialogOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState<string | undefined>(userImageUrl);
  
  const avatarOptions: AvatarOption[] = [
    { id: "1", name: "Default", imageUrl: "https://github.com/shadcn.png" },
    { id: "2", name: "Crypto Cat", imageUrl: "https://i.imgur.com/JyD5YZ1.png" },
    { id: "3", name: "Doge", imageUrl: "https://i.imgur.com/vJ8oTc9.png" },
    { id: "4", name: "Pepe", imageUrl: "https://i.imgur.com/y4Ntdif.png" },
    { id: "5", name: "Robot", imageUrl: "https://i.imgur.com/xJyYt2h.png" },
    { id: "6", name: "Alien", imageUrl: "https://i.imgur.com/QpZsE5i.png" },
    { id: "7", name: "Astronaut", imageUrl: "https://i.imgur.com/V7ONqH2.png" },
    { id: "8", name: "Panda", imageUrl: "https://i.imgur.com/Q1vRnQI.png" },
  ];
  
  const handleAvatarChange = (imageUrl: string) => {
    setSelectedAvatar(imageUrl);
    setIsAvatarDialogOpen(false);
    toast.success("Avatar changed successfully!");
  };
  
  const handleLogout = () => {
    toast.success("Logged out successfully");
    navigate("/");
  };
  
  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Avatar className="h-8 w-8 cursor-pointer hover:ring-2 hover:ring-primary transition-all">
            <AvatarImage src={selectedAvatar || userImageUrl || "https://github.com/shadcn.png"} />
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
            <Avatar className="h-16 w-16 cursor-pointer hover:ring-2 hover:ring-primary transition-all" onClick={() => setIsAvatarDialogOpen(true)}>
              <AvatarImage src={selectedAvatar || userImageUrl || "https://github.com/shadcn.png"} />
              <AvatarFallback>
                {username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-2" 
              onClick={() => setIsAvatarDialogOpen(true)}
            >
              Change Avatar
            </Button>
            <h2 className="mt-2 text-lg font-semibold">{username}</h2>
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

            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/docs">
                <FileText className="mr-2 h-4 w-4" />
                Documentation
              </Link>
            </Button>

            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/disclaimer">
                <AlertCircle className="mr-2 h-4 w-4" />
                Disclaimer
              </Link>
            </Button>

            <Button variant="ghost" className="justify-start" asChild>
              <Link to="/terms">
                <Shield className="mr-2 h-4 w-4" />
                Terms & Privacy
              </Link>
            </Button>
          </div>

          <SheetFooter className="mt-auto pt-4">
            <Button variant="destructive" className="w-full" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
      
      <Dialog open={isAvatarDialogOpen} onOpenChange={setIsAvatarDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Choose an Avatar</DialogTitle>
            <DialogDescription>
              Select an avatar for your profile from the options below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 py-4">
            {avatarOptions.map((avatar) => (
              <div 
                key={avatar.id} 
                className={`flex flex-col items-center p-2 cursor-pointer rounded-lg transition-all ${
                  selectedAvatar === avatar.imageUrl ? 'bg-primary/20 ring-2 ring-primary' : 'hover:bg-secondary'
                }`}
                onClick={() => handleAvatarChange(avatar.imageUrl)}
              >
                <Avatar className="h-16 w-16 mb-2">
                  <AvatarImage src={avatar.imageUrl} />
                  <AvatarFallback>{avatar.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="text-xs text-center">{avatar.name}</span>
              </div>
            ))}
          </div>
          <DialogClose asChild>
            <Button variant="outline" className="w-full">Cancel</Button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProfileMenu;
