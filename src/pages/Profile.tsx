
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

const Profile = () => {
  const [profileData, setProfileData] = useState({
    username: "CryptoTrader",
    email: "trader@example.com",
    walletAddress: "8xDRGxnAdJ4ycieKL1WdVH1vWcnJcPxpGouH6V9PTXRs",
    avatar: "https://github.com/shadcn.png",
  });

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>My Profile | MemesEye</title>
        <meta name="description" content="Manage your MemesEye profile, security settings, and wallet connections." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">My Profile</h1>

        <Tabs defaultValue="profile">
          <TabsList className="mb-8">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="wallets">Wallets</TabsTrigger>
            <TabsTrigger value="referrals">Referrals</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <div className="grid gap-6 md:grid-cols-3">
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Picture</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback>{profileData.username.charAt(0).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Button size="sm">Change Avatar</Button>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input 
                      id="username" 
                      value={profileData.username}
                      onChange={(e) => setProfileData({...profileData, username: e.target.value})}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={handleSaveProfile}>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Change Password</h3>
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input id="current-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input id="new-password" type="password" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input id="confirm-password" type="password" />
                  </div>
                  <Button>Update Password</Button>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
                  <Button variant="outline">Enable 2FA</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="wallets">
            <Card>
              <CardHeader>
                <CardTitle>Connected Wallets</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border bg-muted/40">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Primary Wallet</p>
                        <p className="text-sm text-muted-foreground font-mono">
                          {profileData.walletAddress.substring(0, 8)}...{profileData.walletAddress.substring(profileData.walletAddress.length - 8)}
                        </p>
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => copyToClipboard(profileData.walletAddress)}
                      >
                        Copy
                      </Button>
                    </div>
                  </div>
                  
                  <Button className="w-full">Connect Another Wallet</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle>Referral Program</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Your Referral Link</h3>
                  <div className="flex gap-2">
                    <Input 
                      value={`https://t.me/memeseye_bot?start=${profileData.walletAddress.substring(0, 10)}`} 
                      readOnly
                    />
                    <Button 
                      onClick={() => copyToClipboard(`https://t.me/memeseye_bot?start=${profileData.walletAddress.substring(0, 10)}`)}
                    >
                      Copy
                    </Button>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Referral Earnings</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="bg-muted/40 p-4 rounded-lg border text-center">
                      <p className="text-muted-foreground text-sm">Total Referrals</p>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-lg border text-center">
                      <p className="text-muted-foreground text-sm">Active Referrals</p>
                      <p className="text-2xl font-bold">3</p>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-lg border text-center">
                      <p className="text-muted-foreground text-sm">Total Earned</p>
                      <p className="text-2xl font-bold">1.25 SOL</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Referral Tiers</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between p-3 bg-muted/40 rounded-lg border">
                      <span>Tier 1 (Direct)</span>
                      <span className="font-semibold">5% of trading fees</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/40 rounded-lg border">
                      <span>Tier 2 (Indirect)</span>
                      <span className="font-semibold">10% of trading fees</span>
                    </div>
                    <div className="flex justify-between p-3 bg-muted/40 rounded-lg border">
                      <span>Tier 3 (Extended)</span>
                      <span className="font-semibold">30% of trading fees</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;
