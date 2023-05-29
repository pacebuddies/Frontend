import Link from 'next/link';
import React, { ReactNode } from 'react';

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
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-pb-green">
              Pace
            </span>
            <span className="self-center whitespace-nowrap font-istok-web text-3xl text-white">
              Buddies
            </span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default PolicyLayout;
