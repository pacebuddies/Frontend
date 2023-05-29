import {
  ForwardIcon,
  MapIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
} from '@heroicons/react/24/solid';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import logo from '../components/Images/logo.svg';
import StravaLoginButton from '../components/StravaLoginButton';
import StravaWatermark from '../components/StravaWatermark';

const Login: NextPage = () => {
  const [disabled, setDisabled] = useState<boolean>(false);

  return (
    <>
      <div className="flex h-screen shrink-0 flex-nowrap items-center justify-center bg-[url('/img/background_on_login.png')]">
        <div className="flex h-screen "></div>
        {/*Center div with login panel*/}
        <div className="flex h-screen shrink-0 basis-1/2 flex-col flex-nowrap items-center justify-center">
          {/*Login panel*/}
          <div className="flex  h-auto w-full flex-col items-center justify-center">
            <div className="flex h-[28rem] w-full flex-auto flex-col items-center justify-between border-2 border-pb-green bg-white/95 px-2 pt-1 drop-shadow-2xl md:h-[26rem]">
              <Image
                src={logo.src}
                alt="logo"
                width={600}
                height={300}
                className="pointer-events-none flex h-24 w-full flex-auto items-center justify-center"
              />
              <span className=" small-caps text-bold mt-1 w-full items-center justify-center border-t-2 border-t-pb-green text-center font-istok-web text-3xl font-bold text-pb-orange">
                Connect with your buddies!
              </span>
              <ul className="small-caps list-inside list-disc space-y-2 whitespace-normal text-xl font-bold text-pb-green">
                <li className="flex items-center leading-4">
                  <UserGroupIcon className="h-10 w-10 shrink-0 fill-pb-green pr-2" />
                  find new buddies to train with
                </li>
                <li className="flex items-center leading-4">
                  <ForwardIcon className="h-10 w-10 shrink-0 fill-pb-green pr-2" />
                  train together with similar pace
                </li>
                <li className="flex items-center leading-4">
                  <PresentationChartBarIcon className="h-10 w-10 shrink-0 fill-pb-green pr-2" />
                  analyze your athletic performance with statistics
                </li>
                <li className="flex items-center leading-4">
                  <MapIcon className="h-10 w-10 shrink-0 fill-pb-green pr-2" />
                  browse your activities
                </li>
              </ul>
              <div className="flex ">
                <input
                  id="policy"
                  type="checkbox"
                  checked={disabled}
                  onChange={() => setDisabled(!disabled)}
                  className="h-4 w-4 mt-1 mr-2 rounded border-2 border-pb-orange bg-gray-100 accent-pb-green focus:ring-2 focus:ring-pb-green"
                />

                <label htmlFor="policy" className="text-xl text-pb-green small-caps font-bold leading-4 mt-1">
                  to continue, accept our{' '}
                  <Link href={'/policy'} className="underline">policy</Link>
                </label>
              </div>
              <div className="flex items-center justify-center">
                <StravaLoginButton disabled={!disabled} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex h-screen "></div>
      </div>
      <StravaWatermark />
    </>
  );
};

export default Login;
