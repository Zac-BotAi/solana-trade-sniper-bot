
import { Helmet } from "react-helmet-async";

const Privacy = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <Helmet>
        <title>Privacy Policy | MemesEye</title>
        <meta name="description" content="MemesEye Privacy Policy explains how we collect, use, and protect your personal information when using our Solana trading bot platform." />
        <meta name="keywords" content="MemesEye, privacy, policy, data protection, security, trading, crypto, solana" />
      </Helmet>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
        
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="lead">
            At MemesEye, we are committed to protecting your privacy. This Privacy Policy explains 
            how we collect, use, and safeguard your information when you use our platform.
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            We collect the following types of information:
          </p>
          <ul>
            <li>
              <strong>Account Information:</strong> When you create an account, we collect your email address, 
              username, and password.
            </li>
            <li>
              <strong>Blockchain Information:</strong> We collect public blockchain data, including wallet addresses 
              and transaction history that you choose to connect or monitor.
            </li>
            <li>
              <strong>Usage Data:</strong> We collect information about how you interact with our platform, 
              including the features you use and the actions you take.
            </li>
            <li>
              <strong>Device Information:</strong> We collect information about the device you use to access 
              our platform, including browser type, IP address, and device identifiers.
            </li>
          </ul>
          
          <h2>2. How We Use Your Information</h2>
          <p>
            We use your information for the following purposes:
          </p>
          <ul>
            <li>To provide and maintain our platform</li>
            <li>To process your trading transactions</li>
            <li>To personalize your experience and improve our platform</li>
            <li>To communicate with you about updates and changes</li>
            <li>To detect and prevent fraud and security issues</li>
            <li>To comply with legal obligations</li>
          </ul>
          
          <h2>3. Data Sharing and Disclosure</h2>
          <p>
            We may share your information in the following circumstances:
          </p>
          <ul>
            <li>With service providers who help us operate our platform</li>
            <li>With other users when you use social features, such as referrals</li>
            <li>When required by law or to protect our rights</li>
            <li>In connection with a business transaction, such as a merger or acquisition</li>
          </ul>
          <p>
            We do not sell your personal information to third parties.
          </p>
          
          <h2>4. Data Security</h2>
          <p>
            We implement reasonable security measures to protect your information from unauthorized 
            access, alteration, disclosure, or destruction. However, no internet transmission is 
            completely secure, and we cannot guarantee the security of your information.
          </p>
          
          <h2>5. Your Rights</h2>
          <p>
            Depending on your jurisdiction, you may have the following rights regarding your personal information:
          </p>
          <ul>
            <li>Right to access and obtain a copy of your personal information</li>
            <li>Right to correct inaccurate information</li>
            <li>Right to delete your personal information</li>
            <li>Right to restrict or object to processing</li>
            <li>Right to data portability</li>
          </ul>
          <p>
            To exercise these rights, please contact us at privacy@memeseye.com.
          </p>
          
          <h2>6. Cookies and Similar Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage patterns, 
            and improve our platform. You can control cookies through your browser settings.
          </p>
          
          <h2>7. Children's Privacy</h2>
          <p>
            Our platform is not intended for children under 18 years of age. We do not knowingly 
            collect personal information from children under 18.
          </p>
          
          <h2>8. Changes to This Privacy Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. We will notify you of any significant 
            changes by posting the new Privacy Policy on this page.
          </p>
          
          <h2>9. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at privacy@memeseye.com.
          </p>
          
          <p className="text-sm text-gray-500 mt-8">
            Last updated: May 21, 2025
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
