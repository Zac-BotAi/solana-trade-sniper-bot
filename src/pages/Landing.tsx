
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Wallet, Mail, ArrowRight, Zap, Shield, Eye, TrendingUp, Copy, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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

  // Feature cards data
  const features = [
    {
      title: "Real-time Token Tracking",
      description: "Monitor thousands of tokens across Solana with live price updates and market movements.",
      icon: <Eye className="h-10 w-10 text-blue-400" />,
    },
    {
      title: "Twitter Integration",
      description: "Automatically track tweets from crypto influencers to spot the next big token before everyone else.",
      icon: <svg width="42" height="42" viewBox="0 0 24 24" className="text-blue-400" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>,
    },
    {
      title: "Whale Wallet Tracking",
      description: "Follow top traders and automatically copy their trades for maximum profit potential.",
      icon: <TrendingUp className="h-10 w-10 text-green-400" />,
    },
    {
      title: "Token Sniping Bot",
      description: "Set parameters and let our bot execute trades at lightning speed when opportunities arise.",
      icon: <Zap className="h-10 w-10 text-yellow-400" />,
    },
    {
      title: "Token Creation",
      description: "Launch your own meme token on Solana with just a few clicks. No coding required.",
      icon: <svg width="42" height="42" viewBox="0 0 24 24" className="text-purple-400" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21v-2a5 5 0 0 0-5-5H9a5 5 0 0 0-5 5v2" />
        <path d="M12 8L12 13" />
        <path d="M15 11L9 11" />
      </svg>,
    },
    {
      title: "Secure Multi-wallet",
      description: "Connect multiple wallets and keep your assets secure with our advanced security features.",
      icon: <Shield className="h-10 w-10 text-red-400" />,
    },
  ];

  return (
    <div className="min-h-screen w-full bg-[#0A0B0E] flex flex-col items-center text-white">
      <Helmet>
        <title>MemesEye - The Ultimate Meme Token Trading Platform</title>
        <meta name="description" content="MemesEye - Track, trade, and create meme tokens on Solana with real-time data and automatic trading bots" />
        <meta name="keywords" content="meme tokens, solana, crypto trading, defi, crypto bot, trading bot" />
        <meta property="og:title" content="MemesEye - The Ultimate Meme Token Trading Platform" />
        <meta property="og:description" content="Track, trade, and create meme tokens on Solana with real-time data and automatic trading bots" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="MemesEye - The Ultimate Meme Token Trading Platform" />
        <meta name="twitter:description" content="Track, trade, and create meme tokens on Solana with real-time data and automatic trading bots" />
      </Helmet>

      <header className="w-full py-6 px-4 flex justify-between items-center z-10 backdrop-blur-md bg-black/20 fixed top-0">
        <div className="text-white text-2xl font-bold flex items-center">
          <div className="mr-2 relative">
            <div className="absolute inset-0 blur-md bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            <svg viewBox="0 0 24 24" className="h-8 w-8 relative text-white" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="8" />
              <circle cx="12" cy="12" r="3" />
              <line x1="12" y1="1" x2="12" y2="3" />
              <line x1="12" y1="21" x2="12" y2="23" />
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
              <line x1="1" y1="12" x2="3" y2="12" />
              <line x1="21" y1="12" x2="23" y2="12" />
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
            </svg>
          </div>
          MemesEye
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <a href="#features" className="text-gray-300 hover:text-white transition-colors">Features</a>
          <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
          <a href="/docs" className="text-gray-300 hover:text-white transition-colors">Docs</a>
        </div>
        <div>
          <Button 
            variant="ghost" 
            className="text-white hover:text-blue-200 md:hidden"
            onClick={() => navigate("/docs")}
          >
            Docs
          </Button>
          <Button 
            className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-none"
            onClick={() => navigate("/login")}
          >
            Launch App
          </Button>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl px-4 pt-32 pb-20">
        <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 text-white mb-16 lg:mb-0 lg:pr-10"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
                  The Ultimate Meme Token Trading Platform
                </span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="text-lg text-gray-300 mb-8 leading-relaxed"
            >
              Discover, track, and trade meme tokens with real-time analytics, Twitter tracking, 
              and advanced copy trading. Get ahead of the market with MemesEye.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8 py-6"
                onClick={() => navigate("/signup")}
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="text-white border-white/20 hover:bg-white/10 text-lg px-8 py-6"
                onClick={() => navigate("/docs")}
              >
                Learn More
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl"></div>
              
              <Card className="bg-gray-900/70 backdrop-blur-xl border-gray-800/50 overflow-hidden">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-semibold text-white mb-6 text-center">Sign Up to MemesEye</h2>
                  
                  <div className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full bg-black/30 text-white hover:bg-black/40 border-gray-700 flex items-center justify-center h-14 text-lg"
                      onClick={() => handleSignIn('Phantom')}
                      disabled={loading}
                    >
                      <Wallet className="mr-2 h-5 w-5" />
                      Connect with Phantom
                    </Button>
                    
                    <Button 
                      variant="outline" 
                      className="w-full bg-black/30 text-white hover:bg-black/40 border-gray-700 flex items-center justify-center h-14 text-lg"
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
                      className="w-full bg-black/30 text-white hover:bg-black/40 border-gray-700 flex items-center justify-center h-14 text-lg"
                      onClick={() => handleSignIn('Email')}
                      disabled={loading}
                    >
                      <Mail className="mr-2 h-5 w-5" />
                      Sign Up with Email
                    </Button>
                  </div>
                  
                  <p className="text-xs text-center mt-6 text-gray-400">
                    By signing up, you agree to our <a href="/terms" className="underline text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="/privacy" className="underline text-blue-400 hover:text-blue-300">Privacy Policy</a>
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </section>
        
        <section id="features" className="py-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Platform Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Experience the most advanced tools for meme token trading and analytics on Solana
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="rounded-full bg-gray-800/80 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>
        
        <section id="how-it-works" className="py-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              How It Works
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Get started in minutes and begin trading meme tokens like a pro
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Connect Your Wallet</h3>
              <p className="text-gray-400 mb-4">
                Link your Phantom wallet or create a new one to get started with MemesEye.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-900/20"
              >
                Connect Wallet <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Track Tokens & Wallets</h3>
              <p className="text-gray-400 mb-4">
                Follow influencers, track whale wallets, and monitor Twitter for token mentions.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-purple-500/30 text-purple-400 hover:bg-purple-900/20"
              >
                Start Tracking <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6 relative"
            >
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Trade & Profit</h3>
              <p className="text-gray-400 mb-4">
                Execute trades manually or use our automated sniping bots to maximize your profits.
              </p>
              <Button 
                variant="outline" 
                className="w-full border-green-500/30 text-green-400 hover:bg-green-900/20"
              >
                Start Trading <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          </div>
        </section>
        
        <section className="py-16 max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-800/30 rounded-xl p-8 flex flex-col lg:flex-row items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2 text-white">
                Ready to start trading meme tokens?
              </h2>
              <p className="text-gray-300">
                Join thousands of traders already using MemesEye to find the next 100x gem.
              </p>
            </div>
            <Button 
              size="lg" 
              className="mt-6 lg:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-lg px-8"
              onClick={() => navigate("/signup")}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </section>
        
        <section className="py-16 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              Testimonials
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Hear what our users have to say about MemesEye
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alex Thompson",
                position: "Full-time Trader",
                avatar: "https://i.pravatar.cc/150?img=1",
                testimonial: "MemesEye has changed the way I trade. The Twitter tracking feature helped me catch multiple 10x tokens before they pumped."
              },
              {
                name: "Sarah Williams",
                position: "Crypto Investor",
                avatar: "https://i.pravatar.cc/150?img=5",
                testimonial: "The copy trading feature is amazing! I've been following top traders and my portfolio has grown 300% in just two months."
              },
              {
                name: "Michael Chen",
                position: "DeFi Developer",
                avatar: "https://i.pravatar.cc/150?img=8",
                testimonial: "As a developer, I appreciate the clean interface and powerful API. I was able to launch my token in minutes with zero coding."
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, amount: 0.2 }}
                className="bg-gray-900/70 backdrop-blur-sm border border-gray-800/50 rounded-xl p-6"
              >
                <div className="flex items-center mb-4">
                  <Avatar className="h-12 w-12 mr-4">
                    <AvatarImage src={testimonial.avatar} />
                    <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-300 italic">"{testimonial.testimonial}"</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      <footer className="w-full py-12 px-4 bg-gray-900/90 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mb-8">
            <div>
              <h3 className="font-medium mb-4 text-white">Product</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="/docs" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-white">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="/terms" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="/privacy" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="/disclaimer" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4 text-white">Connect</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="https://twitter.com" className="hover:text-white transition-colors">Twitter</a></li>
                <li><a href="https://discord.com" className="hover:text-white transition-colors">Discord</a></li>
                <li><a href="https://telegram.org" className="hover:text-white transition-colors">Telegram</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col md:flex-row justify-between items-center">
            <p>© 2023 MemesEye. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <a href="/terms" className="hover:text-gray-300">Terms</a>
              <a href="/privacy" className="hover:text-gray-300">Privacy</a>
              <a href="/disclaimer" className="hover:text-gray-300">Disclaimer</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
