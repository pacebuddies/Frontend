import { XMarkIcon } from '@heroicons/react/24/solid';
import React, { useEffect } from 'react';
import { LoadingSpinner } from '../../LoadingSpinner';

//import svg

interface IProps {
  onOpenedChange: (opened: boolean) => void;
}

const RecommendationsModal = ({ onOpenedChange }: IProps) => {
  const handleEscKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    console.log(event.key);
    if (event.key === 'Escape') {
      onOpenedChange(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onOpenedChange(false);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenedChange]);

  return (
    <>
      <div className="scrollbar-hide fixed inset-0 z-1050 flex snap-x flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <button
          className="fixed right-2 top-2 z-[2000] flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray lg:right-5 lg:top-5"
          onClick={() => onOpenedChange(false)}
          onKeyDown={(event) => handleEscKeyDown(event)}
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <div className="relative flex h-[90%] max-h-screen w-full flex-col items-center justify-center lg:m-6 lg:w-384">
          <div className="relative mx-auto flex h-full w-full flex-row items-center justify-center">
            {/*Content*/}
            <div className="flex h-full w-full flex-col items-center justify-center">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-1040 bg-gray-500/50 backdrop-blur-sm"></div>
    </>
  );
};
export default RecommendationsModal;
