import { Button } from 'flowbite-react';
import type { NextPage } from 'next';
import StravaLoginButton from '../components/StravaLoginButton';
import StravaWatermark from '../components/StravaWatermark';
import {ForwardIcon, MapIcon, PresentationChartBarIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import logo from '../components/logo.svg';
import Image from "next/image";
import {auto} from "@popperjs/core";

const Login: NextPage = () => {
  return (
    <>
      <div className="flex h-screen shrink-0 flex-nowrap items-center justify-center bg-[url('/img/background_on_login.png')]">
        {/*<Image*/}
        {/*  src={bg_image}*/}
        {/*  alt="people doing sport together"*/}
        {/*  fill={true}*/}
        {/*  placeholder="blur"*/}
        {/*></Image>*/}
        <div className="flex h-screen "></div>
        {/*Center div with login panel*/}
        <div className="flex h-screen shrink-0 basis-1/2 flex-col flex-nowrap items-center justify-center">
          {/*Login panel*/}
          <div className="flex  flex-col h-auto w-full items-center justify-center">
              {/*<Image*/}
              {/*  src={logo.src}*/}
              {/*  alt="logo"*/}
              {/*  width={600}*/}
              {/*  height={300}*/}
              {/*  className="flex flex-auto h-24  w-full drop-shadow-xl bg-gradient-to-r from-pb-orange/60 to-pb-green/60 items-center justify-center pointer-events-none"*/}
              {/*/>*/}
            <div className="flex pt-1 h-96 md:h-[24rem] w-full px-2 flex-auto flex-col justify-between drop-shadow-2xl items-center bg-white/95 border-2 border-pb-green">
              <Image
                src={logo.src}
                alt="logo"
                width={600}
                height={300}
                className="flex flex-auto h-24 w-full items-center justify-center pointer-events-none"
              />
              <span className=" w-full border-t-2 border-t-pb-green small-caps mt-1 items-center justify-center font-bold text-center font-istok-web text-bold text-pb-orange text-3xl">Connect with your buddies!</span>
              <ul className="small-caps whitespace-normal space-y-2 font-bold list-disc list-inside text-pb-green text-xl">
                <li className="flex items-center leading-4">
                  <UserGroupIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
                  find new buddies to train with
                </li>
                <li className="flex items-center leading-4">
                  <ForwardIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
                  train together with similar pace
                </li>
                <li className="flex items-center leading-4">
                  <PresentationChartBarIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
                  analyze your athletic performance with statistics
                </li>
                <li className="flex items-center leading-4">
                  <MapIcon className="w-10 h-10 shrink-0 fill-pb-green pr-2" />
                  browse your activities
                </li>
              </ul>
              <div className="flex items-center justify-center">
                <StravaLoginButton />
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
