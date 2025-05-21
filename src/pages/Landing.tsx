
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Wallet, Mail, ArrowRight, Github } from "lucide-react";

const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = (method: string) => {
    setLoading(true);
    // Simulate auth process
    setTimeout(() => {
      setLoading(false);
      toast.success(`Signed in with ${method}`);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-900 via-purple-900 to-purple-800 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex flex-col items-center">
      <Helmet>
        <title>MemesEye - The Ultimate Meme Token Trading Platform</title>
      </Helmet>

      <header className="w-full py-6 px-4 flex justify-between items-center">
        <div className="text-white text-2xl font-bold flex items-center">
          <svg viewBox="0 0 24 24" className="h-8 w-8 mr-2 text-purple-400" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
          </svg>
          MemesEye
        </div>
        <div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-purple-200"
            onClick={() => navigate("/docs")}
          >
            Docs
          </Button>
          <Button 
            className="ml-2 bg-white text-purple-900 hover:bg-purple-100"
            onClick={() => navigate("/login")}
          >
            Log In
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl px-4 py-16 flex flex-col md:flex-row items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:w-1/2 text-white mb-10 md:mb-0 md:pr-10"
        >
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-200">
            The Ultimate Meme Token Trading Platform
          </h1>
          <p className="text-lg text-purple-100 mb-8">
            Discover, track, and trade meme tokens with real-time analytics, Twitter tracking, 
            and advanced copy trading. Get ahead of the market with MemesEye.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
              onClick={() => navigate("/signup")}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="text-white border-white hover:bg-white/10"
              onClick={() => navigate("/docs")}
            >
              Learn More
            </Button>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:w-1/2"
        >
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 overflow-hidden">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign Up to MemesEye</h2>
              
              <div className="space-y-4">
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20 flex items-center justify-center h-14 text-lg"
                  onClick={() => handleSignIn('Phantom')}
                  disabled={loading}
                >
                  <Wallet className="mr-2 h-5 w-5" />
                  Connect with Phantom
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20 flex items-center justify-center h-14 text-lg"
                  onClick={() => handleSignIn('Google')}
                  disabled={loading}
                >
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  Continue with Google
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full bg-white/10 text-white hover:bg-white/20 border-white/20 flex items-center justify-center h-14 text-lg"
                  onClick={() => handleSignIn('Email')}
                  disabled={loading}
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Sign Up with Email
                </Button>
              </div>
              
              <p className="text-xs text-center mt-6 text-purple-200">
                By signing up, you agree to our <a href="/terms" className="underline">Terms of Service</a> and <a href="/privacy" className="underline">Privacy Policy</a>
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      <footer className="w-full py-8 px-4 text-center text-purple-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-left mb-8">
            <div>
              <h3 className="font-medium mb-2">Product</h3>
              <ul className="space-y-2 text-sm text-purple-300">
                <li><a href="/features" className="hover:text-white">Features</a></li>
                <li><a href="/pricing" className="hover:text-white">Pricing</a></li>
                <li><a href="/docs" className="hover:text-white">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Company</h3>
              <ul className="space-y-2 text-sm text-purple-300">
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="/careers" className="hover:text-white">Careers</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Legal</h3>
              <ul className="space-y-2 text-sm text-purple-300">
                <li><a href="/terms" className="hover:text-white">Terms</a></li>
                <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
                <li><a href="/disclaimer" className="hover:text-white">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Connect</h3>
              <ul className="space-y-2 text-sm text-purple-300">
                <li><a href="https://twitter.com" className="hover:text-white">Twitter</a></li>
                <li><a href="https://discord.com" className="hover:text-white">Discord</a></li>
                <li><a href="https://telegram.org" className="hover:text-white">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-4 border-t border-purple-800 text-sm">
            <p>© 2023 MemesEye. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
