
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Terms of Service | MemesEye</title>
        <meta name="description" content="MemesEye Terms of Service, guidelines, rights and responsibilities for using our Solana trading bot platform." />
        <meta name="keywords" content="MemesEye, terms, conditions, service, agreement, trading, crypto, solana" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="lead">
            These Terms of Service ("Terms") govern your access to and use of the MemesEye platform 
            ("Platform"). Please read these Terms carefully before using our Platform.
          </p>
          
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Platform, you agree to be bound by these Terms. If you do not 
            agree to these Terms, you may not access or use the Platform.
          </p>
          
          <h2>2. Description of Service</h2>
          <p>
            MemesEye provides tools for tracking, analyzing, and trading cryptocurrency tokens on 
            the Solana blockchain. The Platform includes token sniping, wallet tracking, and 
            automated trading features.
          </p>
          
          <h2>3. Eligibility</h2>
          <p>
            You must be at least 18 years old to use the Platform. By using the Platform, you 
            represent and warrant that you meet this eligibility requirement.
          </p>
          
          <h2>4. Registration and Account Security</h2>
          <p>
            When you register for an account, you agree to provide accurate, current, and complete 
            information. You are responsible for maintaining the security of your account and password.
          </p>
          
          <h2>5. Risks and Disclaimers</h2>
          <p>
            Cryptocurrency trading involves significant risk. We do not guarantee any returns or 
            profits. You acknowledge that you use the Platform at your own risk.
          </p>
          
          <h2>6. Fees and Charges</h2>
          <p>
            The Platform charges fees for certain services, including a 1% trading fee and 0.1 SOL 
            for token operations. These fees are subject to change with notice.
          </p>
          
          <h2>7. Prohibited Activities</h2>
          <p>
            You agree not to use the Platform for any illegal or unauthorized purpose, including 
            market manipulation, fraud, or money laundering.
          </p>
          
          <h2>8. Intellectual Property</h2>
          <p>
            All content, features, and functionality of the Platform are owned by MemesEye and 
            are protected by intellectual property laws.
          </p>
          
          <h2>9. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, MemesEye shall not be liable for any indirect, 
            incidental, special, consequential, or punitive damages resulting from your use of the Platform.
          </p>
          
          <h2>10. Changes to Terms</h2>
          <p>
            We may modify these Terms at any time. Your continued use of the Platform after any changes 
            constitutes your acceptance of the modified Terms.
          </p>
          
          <h2>11. Governing Law</h2>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the jurisdiction 
            in which MemesEye operates, without regard to its conflict of law provisions.
          </p>
          
          <h2>12. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us at support@memeseye.com.
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: May 21, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;
