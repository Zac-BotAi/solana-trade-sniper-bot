
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Settings = () => {
  const [settings, setSettings] = useState({
    notifications: {
      priceAlerts: true,
      newTokens: true,
      walletActivity: true,
      tradingUpdates: false,
      marketNews: false,
    },
    preferences: {
      theme: "system",
      language: "en",
      currency: "usd",
      slippageTolerance: "2",
    }
  });

  const handleNotificationToggle = (key: keyof typeof settings.notifications) => {
    setSettings({
      ...settings,
      notifications: {
        ...settings.notifications,
        [key]: !settings.notifications[key]
      }
    });
  };

  const handlePreferenceChange = (key: keyof typeof settings.preferences, value: string) => {
    setSettings({
      ...settings,
      preferences: {
        ...settings.preferences,
        [key]: value
      }
    });
  };

  const saveSettings = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Settings | MemesEye</title>
        <meta name="description" content="Customize your MemesEye app settings, notifications, and preferences." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="price-alerts" className="flex-1">
                  <div className="font-medium">Price Alerts</div>
                  <p className="text-sm text-muted-foreground">
                    Get notified when tracked tokens hit your price targets
                  </p>
                </Label>
                <Switch
                  id="price-alerts"
                  checked={settings.notifications.priceAlerts}
                  onCheckedChange={() => handleNotificationToggle("priceAlerts")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="new-tokens" className="flex-1">
                  <div className="font-medium">New Token Listings</div>
                  <p className="text-sm text-muted-foreground">
                    Get notified when new tokens are listed
                  </p>
                </Label>
                <Switch
                  id="new-tokens"
                  checked={settings.notifications.newTokens}
                  onCheckedChange={() => handleNotificationToggle("newTokens")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="wallet-activity" className="flex-1">
                  <div className="font-medium">Wallet Activity</div>
                  <p className="text-sm text-muted-foreground">
                    Get notified about activity in tracked wallets
                  </p>
                </Label>
                <Switch
                  id="wallet-activity"
                  checked={settings.notifications.walletActivity}
                  onCheckedChange={() => handleNotificationToggle("walletActivity")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="trading-updates" className="flex-1">
                  <div className="font-medium">Trading Updates</div>
                  <p className="text-sm text-muted-foreground">
                    Get notified about your trade executions and status
                  </p>
                </Label>
                <Switch
                  id="trading-updates"
                  checked={settings.notifications.tradingUpdates}
                  onCheckedChange={() => handleNotificationToggle("tradingUpdates")}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <Label htmlFor="market-news" className="flex-1">
                  <div className="font-medium">Market News</div>
                  <p className="text-sm text-muted-foreground">
                    Get notified about important market developments
                  </p>
                </Label>
                <Switch
                  id="market-news"
                  checked={settings.notifications.marketNews}
                  onCheckedChange={() => handleNotificationToggle("marketNews")}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="theme">Theme</Label>
                  <Select 
                    value={settings.preferences.theme} 
                    onValueChange={(value) => handlePreferenceChange("theme", value)}
                  >
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="language">Language</Label>
                  <Select 
                    value={settings.preferences.language} 
                    onValueChange={(value) => handlePreferenceChange("language", value)}
                  >
                    <SelectTrigger id="language">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                      <SelectItem value="de">German</SelectItem>
                      <SelectItem value="ja">Japanese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="currency">Display Currency</Label>
                  <Select 
                    value={settings.preferences.currency} 
                    onValueChange={(value) => handlePreferenceChange("currency", value)}
                  >
                    <SelectTrigger id="currency">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="usd">USD</SelectItem>
                      <SelectItem value="eur">EUR</SelectItem>
                      <SelectItem value="gbp">GBP</SelectItem>
                      <SelectItem value="jpy">JPY</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="slippage">Slippage Tolerance (%)</Label>
                  <Select 
                    value={settings.preferences.slippageTolerance} 
                    onValueChange={(value) => handlePreferenceChange("slippageTolerance", value)}
                  >
                    <SelectTrigger id="slippage">
                      <SelectValue placeholder="Select slippage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0.5">0.5%</SelectItem>
                      <SelectItem value="1">1%</SelectItem>
                      <SelectItem value="2">2%</SelectItem>
                      <SelectItem value="3">3%</SelectItem>
                      <SelectItem value="5">5%</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Default Gas Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="justify-center">Normal</Button>
                  <Button variant="outline" className="justify-center">Fast</Button>
                  <Button variant="secondary" className="justify-center">Rapid</Button>
                </div>
              </div>
              
              <div className="space-y-2 pt-4">
                <h3 className="text-sm font-medium">Auto-Approve Transactions</h3>
                <p className="text-sm text-muted-foreground">
                  Enable this to allow automatic approval of certain transaction types.
                  Use with caution.
                </p>
                <Switch id="auto-approve" />
              </div>
            </CardContent>
          </Card>
          
          <div className="flex justify-end">
            <Button size="lg" onClick={saveSettings}>Save Settings</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
