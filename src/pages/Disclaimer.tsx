
import React from "react";
import { Helmet } from "react-helmet-async";
import BackButton from "@/components/BackButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Disclaimer = () => {
  return (
    <div className="container max-w-4xl mx-auto px-4 py-12">
      <Helmet>
        <title>Disclaimer | MemesEye</title>
        <meta name="description" content="Important disclaimers and legal information for MemesEye platform users" />
      </Helmet>
      
      <div className="flex items-center mb-6">
        <BackButton />
        <h1 className="text-3xl font-bold ml-2">Disclaimer</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Risk Disclaimer</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            MemesEye provides a platform for tracking and trading cryptocurrencies, but we are not a registered broker-dealer or investment advisor. All content on this website is for informational purposes only and does not constitute financial advice.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">High Risk Investment</h2>
          <p>
            Cryptocurrency investments are highly speculative and involve a significant risk of loss. The cryptocurrency market is volatile and unpredictable. You should never invest more than you can afford to lose.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">No Guarantees</h2>
          <p>
            MemesEye does not guarantee the accuracy of the information provided on our platform. Market data may be delayed. Past performance is not indicative of future results.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">DYOR</h2>
          <p>
            Always conduct your own research before making any investment decisions. Do not rely solely on information provided by MemesEye or other users of the platform.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Regulatory Considerations</h2>
          <p>
            Cryptocurrency regulations vary by jurisdiction. It is your responsibility to ensure compliance with all applicable laws and regulations in your country of residence.
          </p>
          
          <h2 className="text-xl font-semibold mt-6">Changes to Disclaimer</h2>
          <p>
            We reserve the right to modify this disclaimer at any time without notice. By using our platform, you agree to the current version of this disclaimer.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Disclaimer;
