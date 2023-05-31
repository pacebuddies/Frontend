import Link from 'next/link';
import React, { ReactNode } from 'react';
import logo_circle from "./Images/logo_circle.svg";

interface Props {
  children: ReactNode;
}

const PolicyLayout: React.FC = () => {
  return (
    <>
      <nav className="top-0 flex h-auto w-full items-center justify-between border-gray-200 bg-pb-gray px-2 py-2.5">
        <div className="flex w-full flex-nowrap items-center justify-between">
          {/*Name & Logo*/}
          <Link
            href="/"
            className="ml-3 flex flex-wrap items-center justify-between "
          >
            <img
              src={logo_circle.src}
              alt="logo_circle"
              className="w-12 h-12"
            />
            <span className=" md:pl-1 pt-2 self-center whitespace-nowrap font-istok-web text-3xl text-pb-green hidden md:block">
              Pace
            </span>
            <span className=" pt-2 self-center whitespace-nowrap font-istok-web text-3xl text-pb-orange hidden md:block">
              Buddies
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default PolicyLayout;
