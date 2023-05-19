import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid';
import React, { useEffect, useState } from 'react';
import { RecommendationData } from '../../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
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
    console.log(event.key);
    if (event.key === 'Escape') {
      onOpenedChange(false);
    }
  };

  const handleFilteredSportChange = (sport: SportTypeEnum[]) => {
    console.log(sport);
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
      if (event.key === 'Escape') {
        onOpenedChange(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onOpenedChange]);

  console.log(data);

  return (
    <>
      <div className="fixed inset-0 z-1050 flex flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
        <div className="relative m-6  flex h-180 w-384 flex-col items-center justify-center">
          <div className="flex w-9/12 flex-row items-center justify-center rounded-t-3xl bg-pb-green">
            <RecommendationsSportSelector
              onSportChange={handleFilteredSportChange}
            />
          </div>
          <div className="relative mx-auto flex w-full h-full flex-row items-center justify-center">
            {/*Content*/}
            <div className="flex flex-col items-center justify-center w-full h-full">
              {/*Upper content*/}
              <div className="flex w-full h-full flex-row items-center justify-center">
                <div className="w-20 shrink-0">
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
                <div className="flex w-full h-full flex-row rounded-full border-0 bg-white/0 shadow-lg outline-none focus:outline-none">
                  {/*UWAGA! Poniższa linia styli ustala szerokość modalu na różnych urządzeniach*/}
                  <div
                    className={
                      'relative flex-auto rounded-3xl bg-white p-6 w-full h-full'
                    }
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
                <button
                  className={`relative left-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray ${
                    recommendationNumber ==
                      (filteredData.length > 0 ? filteredData.length - 1 : 0) &&
                    'pointer-events-none opacity-0'
                  }`}
                  onClick={() => nextRecommendation()}
                >
                  <ChevronRightIcon className="h-6 w-6" />
                </button>
                {/*Close button*/}
                <button
                  className="relative right-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray bottom-[20.5rem]"
                  onClick={() => onOpenedChange(false)}
                  onKeyDown={(event) => handleEscKeyDown(event)}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              {/*Accept Decline Buttons*/}
              <div>
                <div className="flex w-128 flex-auto items-center justify-center pt-6 md:w-128 lg:w-192  xl:w-256">
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
