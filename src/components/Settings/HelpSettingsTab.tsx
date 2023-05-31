import { NextPage } from 'next';

const HelpSettingsTab: NextPage = () => {
  return (
    <div className="m-2 flex items-center justify-center">
      <div className="flex items-center justify-center text-pb-dark-gray">
        <div className="flex h-full w-full flex-col px-4 pt-5 text-justify text-pb-dark-gray lg:w-[calc(100%-6rem)] md:px-20">
          <h1 className="pb-2 text-2xl">
            Welcome to PaceBuddies - Staging Environment
          </h1>

          <p>
            Thank you for visiting PaceBuddies! We want to inform you that you
            are currently accessing our staging environment. This means that the
            website you are using is a testing version of PaceBuddies, where we
            evaluate new features and improvements before they are released to
            the public.
          </p>

          <p>
            Please note that the data and functionalities on this staging
            environment may differ from the live production version. We
            appreciate your understanding and patience as we work to enhance
            your experience on PaceBuddies.
          </p>

          <h1 className="pb-2 text-xl">Reporting Bugs</h1>

          <p>
            As a staging environment, we value your feedback in identifying and
            resolving any issues you encounter while using PaceBuddies. If you
            come across a bug or experience any unexpected behavior, we
            encourage you to report it to us. Your feedback is crucial in
            helping us improve the platform.
          </p>

          <p>
            To report bugs, please send an email to contact@pacebuddies.club. In
            your email, provide detailed information about the problem you
            encountered, including steps to reproduce the issue if possible.
            Screenshots or error messages are also helpful in understanding the
            problem.
          </p>

          <h1 className="pb-2 text-xl">Using PaceBuddies</h1>

          <p>
            While this staging environment may not reflect the latest updates or
            real-time data, you can still explore and familiarize yourself with
            PaceBuddies&apos; main features and functionalities. PaceBuddies is
            a recommendation website designed to connect athletes from Strava
            who train similarly.
          </p>

          <h2 className="pt-2">
            Here&apos;s a brief overview of what you can expect from
            PaceBuddies:
          </h2>

          <ul className="list-inside list-disc">
            <li>
              <strong>Athlete Matching:</strong> PaceBuddies analyzes your
              training activities on Strava and uses algorithms to find athletes
              whose training patterns align with yours. This allows you to
              discover like-minded athletes who can motivate and challenge you
              in your fitness journey.
            </li>
            <li>
              <strong>Activity Insights:</strong> PaceBuddies provides detailed
              insights into your training activities, such as distance covered,
              pace, elevation gain, and more. These insights can help you track
              your progress and identify areas for improvement.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HelpSettingsTab;
