import Link from 'next/link';
import { animated, useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { ChartPieIcon, MapIcon, UserIcon, UsersIcon } from "@heroicons/react/24/solid";

interface IProps {
  open: boolean;
}

const MenuBar = ({ open }: IProps) => {
  const isMinWidth768 = useMediaQuery('(min-width: 1024px)');
  const containerSpring = useSpring({
    width: open ? (isMinWidth768 ? '900px' : '300px') : '56px',
    config: { tension: 600, friction: 60 },
  });

  return (
    <>
      <animated.div
        className={`max:w-full fixed bottom-6 z-1010 left-4 flex h-14 w-0 items-center justify-center space-x-3 overflow-hidden rounded-full bg-pb-gray drop-shadow-lg`}
        style={containerSpring}
      >
        {/*Matches*/}
        <div className="ml-14 flex items-center">
          <Link href={'/matches'} className="flex space-x-2">
            <UsersIcon className="h-8 w-8 fill-pb-green" />
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green lg:block">
              MATCHES
            </span>
          </Link>
        </div>
        {/*Activities*/}
        <div className="ml-14 flex items-center">
          <Link href={'/activities'} className="flex space-x-2">
            {/*SVG Map Icon*/}
            <MapIcon className="h-8 w-8 fill-pb-green" />
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green lg:block">
              ACTIVITIES
            </span>
          </Link>
        </div>
        {/*Statistics*/}
        <div className="flex items-center">
          <Link href={'/statistics'} className="flex space-x-1.5">
            {/*SVG Chart Icon*/}
            <ChartPieIcon className="h-8 w-8 fill-pb-green" />
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green lg:block">
              STATISTICS
            </span>
          </Link>
        </div>
        {/*Profile*/}
        <div className="flex items-center">
          <Link href={'/profile'} className="flex space-x-1.5">
            {/*SVG User Icon*/}
            <UserIcon className="h-8 w-8 fill-pb-green" />
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green lg:block">
              PROFILE
            </span>
          </Link>
        </div>
        {/*Settings*/}
        <div className="flex items-center">
          <Link href={'/settings'} className="flex space-x-1.5 pr-4">
            {/*SVG Wrench-Screwdriver Icon*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 fill-pb-green"
            >
              <path
                fillRule="evenodd"
                d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                clipRule="evenodd"
              />
              <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
              <path
                fillRule="evenodd"
                d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>

            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green lg:block">
              SETTINGS
            </span>
          </Link>
        </div>
      </animated.div>
    </>
  );
};

export default MenuBar;
