import { useState } from 'react';
import RecommendationsModal from './RecommendationsModal/RecommendationsModal';

const RecommendationsButton = () => {
  const [recommendationsOpened, setRecommendationsOpened] = useState(false);

  const openedChangeHandler = (opened: boolean) => {
    setRecommendationsOpened(opened);
  };
  return (
    <>
      <button
        className="group/button fixed bottom-24 left-4 inline-flex h-14 w-auto items-center"
        onClick={() => setRecommendationsOpened(true)}
      >
        <span className=" absolute z-20 flex h-full w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-2xl text-white">
          PB
        </span>
        <span className="relative z-10 ml-0 flex h-full w-0 cursor-pointer items-center overflow-hidden whitespace-nowrap rounded-full bg-pb-gray pl-14 text-black transition-all duration-300 ease-in-out group-hover/button:ml-2 group-hover/button:w-full group-hover:w-full group-hover/button:pr-4">
          Find your buddy
        </span>
      </button>
      {recommendationsOpened && (
        <RecommendationsModal
          opened={recommendationsOpened}
          onOpenedChange={openedChangeHandler}
        />
      )}
    </>
  );
};

export default RecommendationsButton;
