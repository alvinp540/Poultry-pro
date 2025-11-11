import React from "react";

function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center py-12 px-6">
      <div className="max-w-4xl bg-white shadow-lg rounded-2xl p-8 border border-green-100">
        <h1 className="text-3xl font-bold text-green-700 mb-6 text-center">
          Terms and Conditions
        </h1>
        <p className="text-gray-700 mb-4">
          Welcome to <strong>Poultry-pro</strong>. By accessing or using our platform,
          you agree to the following terms and conditions.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-2">1. User Accounts</h2>
        <p className="text-gray-700 mb-4">
          You must register as a farmer or seller to access full platform features.
          You are responsible for maintaining the confidentiality of your account credentials.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-2">2. Acceptable Use</h2>
        <p className="text-gray-700 mb-4">
          You agree not to use Poultry-pro for any unlawful, harmful, or deceptive purposes.
          All content and data shared must be accurate and relevant to agricultural activities.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-2">3. Data and Research</h2>
        <p className="text-gray-700 mb-4">
          By using Poultry-pro, you consent to the use of anonymized data for
          <strong> agricultural research and innovation</strong>. Such insights help improve
          global food production systems and contribute to the advancement of humanity.
        </p>

        <h2 className="text-2xl font-semibold text-green-700 mt-6 mb-2">4. Limitation of Liability</h2>
        <p className="text-gray-700 mb-4">
          Poultry-pro is not liable for losses arising from misuse, inaccurate data entry, or
          third-party interactions. Users should always apply professional discretion when
          acting on platform information.
        </p>

        <p className="text-gray-700 mt-6">
          By continuing to use the  web app, you acknowledge that you have read, understood,
          and agreed to these Terms and Conditions.
        </p>
      </div>
    </div>
  );
}

export default TermsAndConditions;
