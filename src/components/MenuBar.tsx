import Link from 'next/link';
import { animated, useSpring } from 'react-spring';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface IProps {
  open: boolean;
}

const MenuBar = ({ open }: IProps) => {
  const isMinWidth768 = useMediaQuery('(min-width: 768px)');
  const containerSpring = useSpring({
    width: open ? (isMinWidth768 ? '750px' : '250px') : '56px',
    config: { tension: 600, friction: 60 },
  });

  return (
    <>
      <animated.div
        className={`max:w-full fixed bottom-6 z-1010 left-4 flex h-14 w-0 items-center justify-center space-x-3 overflow-hidden rounded-full bg-pb-gray`}
        style={containerSpring}
      >
        {/*Activities*/}
        <div className="ml-14 flex items-center">
          <Link href={'/activities'} className="flex space-x-2">
            {/*SVG Map Icon*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 fill-pb-green"
            >
              <path
                fillRule="evenodd"
                d="M8.161 2.58a1.875 1.875 0 011.678 0l4.993 2.498c.106.052.23.052.336 0l3.869-1.935A1.875 1.875 0 0121.75 4.82v12.485c0 .71-.401 1.36-1.037 1.677l-4.875 2.437a1.875 1.875 0 01-1.676 0l-4.994-2.497a.375.375 0 00-.336 0l-3.868 1.935A1.875 1.875 0 012.25 19.18V6.695c0-.71.401-1.36 1.036-1.677l4.875-2.437zM9 6a.75.75 0 01.75.75V15a.75.75 0 01-1.5 0V6.75A.75.75 0 019 6zm6.75 3a.75.75 0 00-1.5 0v8.25a.75.75 0 001.5 0V9z"
                clipRule="evenodd"
              />
            </svg>
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green md:block">
              ACTIVITIES
            </span>
          </Link>
        </div>
        {/*Statistics*/}
        <div className="flex items-center">
          <Link href={'/statistics'} className="flex space-x-1.5">
            {/*SVG Chart Icon*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 fill-pb-green"
            >
              <path
                fillRule="evenodd"
                d="M2.25 13.5a8.25 8.25 0 018.25-8.25.75.75 0 01.75.75v6.75H18a.75.75 0 01.75.75 8.25 8.25 0 01-16.5 0z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M12.75 3a.75.75 0 01.75-.75 8.25 8.25 0 018.25 8.25.75.75 0 01-.75.75h-7.5a.75.75 0 01-.75-.75V3z"
                clipRule="evenodd"
              />
            </svg>
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green md:block">
              STATISTICS
            </span>
          </Link>
        </div>
        {/*Profile*/}
        <div className="flex items-center">
          <Link href={'/profile'} className="flex space-x-1.5">
            {/*SVG User Icon*/}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-8 w-8 fill-pb-green"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                clipRule="evenodd"
              />
            </svg>
            {/*Text*/}
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green md:block">
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
            <span className="hidden self-center whitespace-nowrap font-istok-web text-2xl text-pb-green md:block">
              SETTINGS
            </span>
          </Link>
        </div>
      </animated.div>
    </>
  );
};

export default MenuBar;
