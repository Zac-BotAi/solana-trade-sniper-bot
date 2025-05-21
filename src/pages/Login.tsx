
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Wallet, Mail } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setLoading(false);
      toast.success("Logged in successfully");
      navigate("/");
    }, 1500);
  };

  const handleWalletLogin = () => {
    setLoading(true);
    
    // Simulate wallet login
    setTimeout(() => {
      setLoading(false);
      toast.success("Wallet connected successfully");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center justify-center p-4">
      <Helmet>
        <title>Login - MemesEye</title>
      </Helmet>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-6">
          <Link to="/" className="text-white text-2xl font-bold flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-8 w-8 mr-2 text-purple-400" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
            </svg>
            MemesEye
          </Link>
          <h1 className="text-2xl font-bold text-white mt-4">Welcome Back</h1>
          <p className="text-purple-200">Log in to your account to continue</p>
        </div>

        <Card className="w-full max-w-md bg-white/10 backdrop-blur-lg border-white/20">
          <CardContent className="p-6">
            <div className="grid gap-4">
              <Button
                variant="outline"
                className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20 h-12"
                onClick={handleWalletLogin}
                disabled={loading}
              >
                <Wallet className="mr-2 h-5 w-5" />
                Connect with Phantom
              </Button>

              <div className="relative flex justify-center text-xs uppercase">
                <span className="px-2 text-purple-300 bg-transparent">or</span>
                <div className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-purple-300/20"></div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password" className="text-white">Password</Label>
                    <Link to="/forgot-password" className="text-xs text-purple-300 hover:text-white">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                    required
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
                  disabled={loading}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </Button>
              </form>
            </div>

            <div className="mt-6 text-center text-sm">
              <p className="text-purple-200">
                Don't have an account?{" "}
                <Link to="/signup" className="font-semibold text-white hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-8 text-center">
          <Link to="/" className="text-purple-300 text-sm hover:text-white">
            &larr; Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
