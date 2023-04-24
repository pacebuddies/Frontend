import { ChevronDoubleUpIcon } from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

const ScrollToTop: React.FC = () => {
  const [showButton, setShowButton] = useState<boolean>(false);

  const buttonStyle = useSpring({
    opacity: showButton ? 1 : 0,
    transform: showButton ? 'translateY(0px)' : 'translateY(50px)',
  });

  const handleScroll = () => {
    const currentScrollPosition = window.scrollY;
    setShowButton(currentScrollPosition > 300);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <animated.div
      style={{
        ...buttonStyle,
        position: 'fixed',
        bottom: '4rem',
        right: '1rem',
        zIndex: 1000,
      }}
      onClick={scrollToTop}
      className="cursor-pointer"
    >
      <button className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-green/80 px-4 text-white md:w-auto md:space-x-1">
        <span className="hidden font-semibold md:block">TO TOP</span>
        <ChevronDoubleUpIcon className="h-6 w-6 shrink-0" />
      </button>
    </animated.div>
  );
};

export default ScrollToTop;
