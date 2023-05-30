import { useState } from 'react';
import RecommendationsDataWraper from './RecommendationsDataWraper';
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";

const RecommendationsButton = () => {
  const [recommendationsOpened, setRecommendationsOpened] = useState(false);

  const openedChangeHandler = (opened: boolean) => {
    setRecommendationsOpened(opened);
  };
  return (
    <>
      <button
        className="group/button fixed bottom-24 left-4 z-1020 inline-flex h-14 w-auto items-center drop-shadow-lg"
        onClick={() => setRecommendationsOpened(true)}
      >
        {/*<span className="absolute z-1020 flex h-full w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-2xl text-white">*/}
        {/*  PB*/}
        {/*</span>*/}
        <div className="absolute z-1020 flex h-full w-14 cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-pb-green to-pb-dark-green text-2xl text-white">
          <MagnifyingGlassIcon className="flex w-10 h-10"/>
        </div>
        <span className="relative z-1010 ml-0 flex h-full w-0 cursor-pointer items-center overflow-hidden whitespace-nowrap rounded-full bg-pb-gray pl-14 text-black transition-all duration-300 ease-in-out group-hover/button:ml-2 group-hover/button:w-full group-hover:w-full group-hover/button:pr-4 text-pb-green small-caps font-bold text-xl">
          find your buddy
        </span>
      </button>
      {recommendationsOpened && (
        <RecommendationsDataWraper
          opened={recommendationsOpened}
          onOpenedChange={openedChangeHandler}
        />
      )}
    </>
  );
};

export default RecommendationsButton;
