import { useState } from 'react';
import MenuBar from './MenuBar';

const MenuButton = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <button
        className="group/menuButton fixed bottom-6 left-4 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-pb-gray"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          className="h-10 w-10 stroke-pb-green"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
      <MenuBar open={isMenuOpen} />
    </>
  );
};

export default MenuButton;
