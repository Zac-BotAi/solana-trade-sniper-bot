
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Disclaimer | MemesEye</title>
        <meta name="description" content="Important disclaimers and risk warnings for using the MemesEye platform." />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Disclaimer</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">Risk Warning</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-gray dark:prose-invert max-w-none">
            <p className="mb-4">
              The content on MemesEye platform is provided for informational purposes only and should not be construed as financial, investment, tax, or legal advice.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">High-Risk Investment</h3>
            <p className="mb-4">
              Cryptocurrency and token trading involves substantial risk. The value of crypto assets can fluctuate significantly, and past performance is not indicative of future results. You could lose a substantial portion or all of your investment.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">No Investment Advice</h3>
            <p className="mb-4">
              MemesEye does not provide personalized investment advice. The copy trading, token tracking, and other features are tools to help users make their own decisions, but they should not be considered investment recommendations.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Twitter/Social Media Tracking</h3>
            <p className="mb-4">
              Our Twitter Tweet Tracker and social media tracking features collect publicly available information. We do not claim any affiliation with the accounts being tracked, nor do we guarantee the accuracy or completeness of the information obtained.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Third-Party Information</h3>
            <p className="mb-4">
              Information displayed on MemesEye may come from third-party sources. While we strive to provide accurate information, we make no representations about the accuracy, completeness, or timeliness of this information.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Trading Fees and Costs</h3>
            <p className="mb-4">
              MemesEye charges a 1% trading fee on all transactions. Additional network fees may apply for blockchain transactions. Token creation and other operations may incur additional fees as specified in the platform.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Security</h3>
            <p className="mb-4">
              While we implement security measures to protect your information and assets, no system is completely secure. Users are responsible for maintaining the security of their accounts and private keys.
            </p>
            
            <h3 className="text-xl font-semibold mb-3 mt-6">Regulatory Compliance</h3>
            <p className="mb-4">
              Users are responsible for understanding and complying with the laws and regulations in their jurisdiction regarding cryptocurrency trading, taxes, and related activities. MemesEye is not responsible for ensuring users' compliance with local laws.
            </p>
            
            <p className="mt-8 text-sm italic">
              Last updated: May 21, 2023
            </p>
            
            <p className="mt-8">
              By using the MemesEye platform, you acknowledge that you have read, understood, and agree to this disclaimer. If you do not agree, please do not use our services.
            </p>
            
            <div className="mt-12">
              <Link to="/terms" className="text-primary hover:underline mr-8">Terms of Service</Link>
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Disclaimer;
