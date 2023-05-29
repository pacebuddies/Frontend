import {
  ClockIcon,
  ForwardIcon, FunnelIcon,
  MapIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  WrenchScrewdriverIcon
} from "@heroicons/react/24/solid";
import Link from "next/link";

const NoRecommendationsContent = () => {
  return (
    <>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <span className="flex text-pb-orange text-3xl font-bold small-caps text-center">we have no recommendations for you 😢</span>
        <span className="flex text-pb-green text-2xl font-bold small-caps">to get some you could try: </span>
        <ul className="small-caps whitespace-normal space-y-2 font-bold list-disc list-inside text-pb-green text-xl">
          <li className="flex items-center leading-4">
            <WrenchScrewdriverIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
            change your&nbsp;
            <Link href='/settings' className="underline">
              preferences
            </Link>
          </li>
          <li className="flex items-center leading-4">
            <FunnelIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
            change filtered sport type
          </li>
          <li className="flex items-center leading-4">
            <MapIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
            add more activities to your strava account and synchronize it with us
          </li>
          <li className="flex items-center leading-4">
            <ClockIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
            come back in a while 😊
          </li>
        </ul>
      </div>
    </>
  );
};
export default NoRecommendationsContent;
