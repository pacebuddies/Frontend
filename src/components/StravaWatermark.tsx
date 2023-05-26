import { NextPage } from 'next';
import Image from 'next/image';
import stravaWatermarkSvg from '../../public/img/api_logo_pwrdBy_strava_stack_gray.svg';

const StravaWatermark: NextPage = () => {
  return (
    <Image
      className="fixed bottom-0 right-0"
      src={stravaWatermarkSvg}
      alt="Powered by Strava"
    />
  );
};

export default StravaWatermark;
