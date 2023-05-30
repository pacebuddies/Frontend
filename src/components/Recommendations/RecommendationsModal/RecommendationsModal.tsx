import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import { useMediaQuery } from '../../../hooks/useMediaQuery';
import { RecommendationData } from '../../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import BestBuddySvg from './RecommendationModalContent/BuddyIcons/BestBuddy.svg';
import BuddySvg from './RecommendationModalContent/BuddyIcons/Buddy.svg';
import GoodBuddySvg from './RecommendationModalContent/BuddyIcons/GoodBuddy.svg';
import NiceBuddySvg from './RecommendationModalContent/BuddyIcons/NiceBuddy.svg';
import RecommendationsModalContent from './RecommendationModalContent/RecommendationsModalContent';
import RecommendationsSportSelector from './RecommendationsSportSelector';

//import svg

interface IProps {
  data: RecommendationData[];
  onOpenedChange: (opened: boolean) => void;
}

const RecommendationsModal = ({ data, onOpenedChange }: IProps) => {
  const [recommendationNumber, setRecommendationNumber] = useState(0);
  const [reRender, setReRender] = useState(0);
  const [selectedSports, setSelectedSports] = useState<SportTypeEnum[]>([]);
  const [filteredData, setFilteredData] = useState<RecommendationData[]>(
    data ?? [],
  );
  const nextRecommendation = () => {
    if (recommendationNumber < filteredData.length - 1) {
      setRecommendationNumber(recommendationNumber + 1);
    }
  };

  const previousRecommendation = () => {
    if (recommendationNumber > 0) {
      setRecommendationNumber(recommendationNumber - 1);
    }
  };

  const handleEscKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Escape') {
      onOpenedChange(false);
    }
  };

  const handleFilteredSportChange = (sport: SportTypeEnum[]) => {
    setSelectedSports([...sport]);
    setRecommendationNumber(0);
    if (sport.length === 0) {
      setFilteredData([...data]);
    } else {
      setFilteredData([
        ...data.filter((item) => {
          const sport_types = item.sport_types.map(
            (sport) => sport as SportTypeEnum,
          );
          for (const user_sport of sport_types) {
            if (sport.includes(user_sport)) {
              return item;
            }
          }
          return;
        }),
      ]);
    }
  };

  // Loop through the array to find the next recommendation that is not undefined (deleted) and return the index of that recommendation
  // If there is no next recommendation, loop through the array backwards to find the previous recommendation that is not undefined (deleted) and return the index of that recommendation
  // If there is no previous recommendation, return 0
  const findNextRecommendation = (
    data: RecommendationData[],
    num: number,
  ): number => {
    for (let i = num; i < data.length; i++) {
      if (data[i] !== undefined) {
        return i;
      }
    }
    for (let i = num; i > 0; i--) {
      if (data[i] !== undefined) {
        return i;
      }
    }
    return 0;
  };

  const recommendationDecisionHandler = (id: string) => {
    // remove recommendation from list
    const index = filteredData.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    setFilteredData([...filteredData.splice(index, 1)]);
    const newRecommendationNumber = findNextRecommendation(
      filteredData,
      recommendationNumber,
    );
    if (newRecommendationNumber === recommendationNumber) {
      setReRender(reRender + 1);
    } else {
      setRecommendationNumber(newRecommendationNumber);
    }
  };
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
          onOpenedChange(false);
          break;
        case 'ArrowRight':
          nextRecommendation();
          break;
        case 'ArrowLeft':
          previousRecommendation();
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenedChange, nextRecommendation, previousRecommendation]);


  const isMobile = useMediaQuery('(max-width: 1024px)');

  const handlers = useSwipeable({
    onSwipedLeft: () => nextRecommendation(),
    onSwipedRight: () => previousRecommendation(),
    trackMouse: true,
  });

  const showBuddyBadge = (num: number) => {
    if (num < 3) {
      return (
        <Image
          src={BuddySvg.src}
          alt={BuddySvg.name}
          width={260}
          height={146}
          className="h-[96px] lg:h-[146px] lg:w-[260px]"
        />
      );
    } else if (num >= 3 && num < 10) {
      return (
        <Image
          src={NiceBuddySvg.src}
          alt={NiceBuddySvg.name}
          width={260}
          height={146}
          className="h-[96px] lg:h-[146px] lg:w-[260px]"
        />
      );
    } else if (num >= 10 && num < 20) {
      return (
        <Image
          src={GoodBuddySvg.src}
          alt={GoodBuddySvg.name}
          width={260}
          height={146}
          className="h-[96px] lg:h-[146px] lg:w-[260px]"
        />
      );
    } else {
      return (
        <Image
          src={BestBuddySvg.src}
          alt={BestBuddySvg.name}
          width={260}
          height={146}
          className="h-[96px] lg:h-[146px] lg:w-[260px]"
        />
      );
    }
  };

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
          <div className="flex w-9/12 flex-row items-center justify-center  bg-pb-dark-gray/10">
            <RecommendationsSportSelector
              onSportChange={handleFilteredSportChange}
            />
          </div>
          <div className="relative mx-auto flex h-full w-full flex-row items-center justify-center">
            {/*Content*/}
            <div className="absolute -top-1 right-0 z-[2000] translate-x-12 drop-shadow-[0_10px_15px_rgba(0,0,0,0.3)] lg:-translate-x-8">
              {showBuddyBadge(filteredData[recommendationNumber]?.upvotes ?? 0)}
            </div>

            <div className="flex h-full w-full flex-col items-center justify-center">
              {/*Upper content*/}
              <div className="flex h-full w-full flex-row items-center justify-center">
                {!isMobile && (
                  <div className="shrink-0 lg:w-20">
                    {/*Previous button*/}
                    <button
                      className={`relative left-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray ${
                        recommendationNumber === 0 &&
                        'pointer-events-none opacity-0'
                      }`}
                      onClick={() => previousRecommendation()}
                    >
                      <ChevronLeftIcon className="h-6 w-6" />
                    </button>
                  </div>
                )}
                <div className="flex h-full w-full flex-row rounded-full border-0 bg-white/0 shadow-lg outline-none focus:outline-none">
                  <div
                    className={
                      'relative h-full w-full flex-auto rounded-3xl bg-white p-3 lg:p-6'
                    }
                    {...handlers}
                  >
                    <RecommendationsModalContent
                      num={recommendationNumber}
                      data={filteredData}
                      reRender={reRender}
                      selectedSports={selectedSports}
                    />
                  </div>
                </div>
                {/*Next button*/}
                {!isMobile && (
                  <button
                    className={`left-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray lg:relative ${
                      recommendationNumber ==
                        (filteredData.length > 0
                          ? filteredData.length - 1
                          : 0) && 'pointer-events-none opacity-0'
                    }`}
                    onClick={() => nextRecommendation()}
                  >
                    <ChevronRightIcon className="h-6 w-6" />
                  </button>
                )}
              </div>
              {/*Accept Decline Buttons*/}
              <div>
                <div className="flex w-full flex-auto items-center justify-center pt-6">
                  {/*Accept Button*/}
                  <AcceptButton
                    userId={filteredData[recommendationNumber]?.id ?? '0'}
                    sportType={SportTypeEnum.RUN}
                    onAccepted={recommendationDecisionHandler}
                    showed={filteredData.length > 0}
                  />
                  {/*Decline Button*/}
                  <DeclineButton
                    userId={filteredData[recommendationNumber]?.id ?? '0'}
                    sportType={SportTypeEnum.RUN}
                    onDeclined={recommendationDecisionHandler}
                    showed={filteredData.length > 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed inset-0 z-1040 bg-gray-500/50 backdrop-blur-sm"></div>
    </>
  );
};
export default RecommendationsModal;
