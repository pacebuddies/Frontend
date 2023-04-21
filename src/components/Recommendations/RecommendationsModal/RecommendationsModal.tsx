import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import pacebuddiesApi from '../../../instances/axiosConfigured';
import { RecommendationData } from '../../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../../internalTypes/sportTypeEnum';
import AcceptButton from './AcceptButton';
import DeclineButton from './DeclineButton';
import RecommendationsModalContent from './RecommendationModalContent/RecommendationsModalContent';
import SportSelector from "../../SportSelector/SportSelector";

//import svg

interface IProps {
  opened: boolean;
  onOpenedChange: (opened: boolean) => void;
}

// const data1: RecommendationData[] = [
//   {
//     id: '001',
//     country: 'France',
//     city: 'Paris',
//     profile:
//       'https://dgalywyr863hv.cloudfront.net/pictures/athletes/25373655/10192907/8/large.jpg',
//     firstname: 'John',
//     lastname: 'Doe',
//     sex: 'Male',
//     compatibility: 80,
//   },
//   {
//     id: '002',
//     country: 'Italy',
//     city: 'Rome',
//     profile:
//       'https://dgalywyr863hv.cloudfront.net/pictures/athletes/15118564/22631426/1/large.jpg',
//     firstname: 'Jane',
//     lastname: 'Smith',
//     sex: 'Female',
//     compatibility: 90,
//   },
//   {
//     id: '003',
//     country: 'Japan',
//     city: 'Tokyo',
//     profile:
//       'https://dgalywyr863hv.cloudfront.net/pictures/athletes/9189599/3097105/1/large.jpg',
//     firstname: 'Taro',
//     lastname: 'Yamada',
//     sex: 'Male',
//     compatibility: 70,
//   },
// ];

const RecommendationsModal = ({ opened, onOpenedChange }: IProps) => {
  const [recommendationNumber, setRecommendationNumber] = useState(0);
  const [reRender, setReRender] = useState(0);

  const fetchRecommendations = (): Promise<RecommendationData[]> => {
    return pacebuddiesApi
      .get('recommender/recommendations/list', {
        params: {
          sportType: SportTypeEnum.Run,
          sex: 'M',
        },
      })
      .then((response) => response.data);
  };
  const recommendationQuery = useQuery<RecommendationData[]>({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
    initialData: [],
  });

  const nextRecommendation = () => {
    if (recommendationNumber < recommendationQuery.data.length - 1) {
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
    const index = recommendationQuery.data.findIndex((item) => item.id === id);
    if (index === -1) {
      return;
    }
    recommendationQuery.data.splice(index, 1);
    const newRecommendationNumber = findNextRecommendation(
      recommendationQuery.data,
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

  return (
    <>
      {opened ? (
        <>
          <div className="fixed inset-0 z-50 flex flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative mx-auto my-6 flex h-auto max-h-[80rem] w-auto max-w-7xl flex-row items-center justify-center">
              {/*Content*/}
              <SportSelector onSportChange={(sport) => {console.log(sport)}} />
              <div className="flex flex-col items-center justify-center">
                {/*Upper content*/}
                <div className="flex flex-row items-center justify-center">
                  <div className="w-20 shrink-0">
                    {/*Previous button*/}
                    <button
                      className="relative left-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray"
                      onClick={() => previousRecommendation()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="flex w-full flex-row rounded-full border-0 bg-white/0 shadow-lg outline-none focus:outline-none">
                    {/*UWAGA! Poniższa linia styli ustala szerokość modalu na różnych urządzeniach*/}
                    <div
                      className={
                        'relative h-64 w-128 flex-auto rounded-3xl bg-white p-6 md:h-96 md:w-160 lg:h-128 lg:w-224 xl:h-160 xl:w-288 2xl:h-160 2xl:w-320'
                      }
                    >
                      {recommendationQuery.isSuccess && (
                        <RecommendationsModalContent
                          num={recommendationNumber}
                          data={recommendationQuery.data}
                          reRender={reRender}
                        />
                      )}
                    </div>
                  </div>
                  {/*Next button*/}
                  <button
                    className="relative left-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray"
                    onClick={() => nextRecommendation()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  {/*Close button*/}
                  <button
                    className="relative bottom-28 right-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray md:bottom-28 lg:bottom-44 xl:bottom-60 2xl:bottom-72"
                    onClick={() => onOpenedChange(false)}
                    onKeyDown={(event) => handleEscKeyDown(event)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/*Accept Decline Buttons*/}
                <div>
                  <div className="flex w-128 flex-auto items-center justify-center pt-6 md:w-128 lg:w-192  xl:w-256">
                    {/*Accept Button*/}
                    {recommendationQuery.data.length > 0 && (
                      <AcceptButton
                        userId={
                          recommendationQuery.data[recommendationNumber]?.id ??
                          '0'
                        }
                        sportType={SportTypeEnum.Run}
                        onAccepted={recommendationDecisionHandler}
                      />
                    )}
                    {/*Decline Button*/}
                    {recommendationQuery.data.length > 0 && (
                      <DeclineButton
                        userId={
                          recommendationQuery.data[recommendationNumber]?.id ??
                          '0'
                        }
                        sportType={SportTypeEnum.Run}
                        onDeclined={recommendationDecisionHandler}
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="fixed inset-0 z-40 bg-gray-500/50 backdrop-blur-sm"></div>
        </>
      ) : null}
    </>
  );
};
export default RecommendationsModal;
