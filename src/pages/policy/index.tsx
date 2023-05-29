import PolicyLayout from '../../components/PolicyLayout';

const Policy = () => {
  return (
    <>
      <PolicyLayout />
      <div className="flex flex-col w-full md:w-[calc(100%-6rem)] px-4 md:px-20 h-full text-pb-dark-gray text-justify pt-5">
        <h1 className="text-2xl pb-2">
          PaceBuddies.club - Privacy Policy & Terms of Service
        </h1>

        <h1 className="text-xl pb-2">PRIVACY POLICY</h1>

        <h2 className="pb-2">Last Updated: May 28, 2023</h2>

        <p>
          Welcome to PaceBuddies.club. This Privacy Policy outlines how we
          collect, use, and protect your information when you use our website
          and services.
        </p>

        <h2 className="pt-2">1. Collection and Use of Information</h2>

        <p>
          We collect only the minimum amount of data necessary to provide our
          service. This data is sourced exclusively from Strava OAuth v3 API,
          following user permission during account creation or synchronization.
          The information we may collect includes:
        </p>

        <ul className="list-inside list-disc">
          <li>Your name</li>
          <li>Your Strava account information</li>
          <li>Your fitness and activity data</li>
        </ul>

        <p>We use this data to:</p>

        <ul className="list-inside list-disc">
          <li>Create your account on PaceBuddies.club</li>
          <li>Match you with other athletes</li>
          <li>Enhance your user experience</li>
        </ul>

        <h2 className="pt-2">2. Sharing of Information</h2>

        <p>
          We do not share or sell your personal data to third parties. The data
          we collect is solely used to provide and improve our services.
        </p>

        <h2 className="pt-2">3. Protection of Information</h2>

        <p>
          We prioritize the protection of your data. Although no system is 100%
          secure, we implement and maintain appropriate physical, technical, and
          administrative measures to protect your data from unauthorized access,
          use, and disclosure.
        </p>

        <h2 className="pt-2">4. Your Rights</h2>

        <p>
          You have the right to access, correct, delete, and restrict the use of
          your personal data. If you wish to exercise these rights, please
          contact us at contact@pacebuddies.club.
        </p>

        <h1 className="text-xl pb-2 pt-6">TERMS OF SERVICE</h1>

        <h2 className="pb-2">Last Updated: May 28, 2023</h2>

        <p>
          Welcome to PaceBuddies.club. Please read these Terms of Service
          carefully as they govern your use of our website and services.
        </p>

        <h2 className="pt-2">1. Acceptance of Terms</h2>

        <p>
          By accessing our website and using our services, you agree to be bound
          by these Terms of Service. If you do not agree with any part of these
          Terms, you must immediately discontinue your use of our services.
        </p>

        <h2 className="pt-2">2. Use of Services</h2>

        <p>
          You agree to use our services only for lawful purposes and in
          accordance with these Terms. You grant us permission to use your
          public data from Strava for the purpose of providing our services.
        </p>

        <h2 className="pt-2">3. Limitation of Liability</h2>

        <p>
          We are not responsible for any issues that occur outside of our
          services. We make no guarantees regarding the accuracy, reliability,
          and completeness of the information on our site.
        </p>

        <h2 className="pt-2">4. Changes to Terms</h2>

        <p>
          We reserve the right to modify these Terms at any time. Changes will
          become effective immediately upon posting. Continued use of our
          services following any changes signifies your acceptance of the
          revised Terms.
        </p>

        <h2 className="pt-2">5. Contact Us</h2>

        <p>
          If you have any questions about these Terms of Service, please contact
          us at contact@pacebuddies.club.
        </p>
      </div>
    </>
  );
};

export default Policy;
