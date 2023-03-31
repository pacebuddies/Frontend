import React, { useEffect, useState } from 'react';
import RecommendationsModalContent from './RecommendationsModalContent';
import stravaApi from "../../../instances/axiosConfigured";
import { toast } from "react-toastify";
//import svg

interface IProps {
  opened: boolean;
  onOpenedChange: (opened: boolean) => void;
}

export interface RecommendationData {
  id: string;
  country: string;
  city: string;
  profile: string;
  firstname: string;
  lastname: string;
  sex: string;
}

const data1: RecommendationData[] = [
  {
    id: '001',
    country: 'France',
    city: 'Paris',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/25373655/10192907/8/large.jpg',
    firstname: 'John',
    lastname: 'Doe',
    sex: 'Male',
  },
  {
    id: '002',
    country: 'Italy',
    city: 'Rome',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/15118564/22631426/1/large.jpg',
    firstname: 'Jane',
    lastname: 'Smith',
    sex: 'Female',
  },
  {
    id: '003',
    country: 'Japan',
    city: 'Tokyo',
    profile:
      'https://dgalywyr863hv.cloudfront.net/pictures/athletes/9189599/3097105/1/large.jpg',
    firstname: 'Taro',
    lastname: 'Yamada',
    sex: 'Male',
  },
];

const RecommendationsModal = ({ opened, onOpenedChange }: IProps) => {
  const [recommendationNumber, setRecommendationNumber] = useState(0);

  const nextRecommendation = () => {
    if (recommendationNumber < data1.length - 1) {
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

  const fechRecommendations = () => {
    stravaApi
      .get('athlete/api/v1/recommendations/list')
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data);
        }
      })
      .catch((err) => {
        toast.error(err);
        console.log(err.response);
      });
  }

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

  useEffect(() => {
    fechRecommendations();
  }, []);

  return (
    <>
      {opened ? (
        <>
          <div className="fixed inset-0 z-50 flex flex-wrap items-center justify-center overflow-y-auto overflow-x-hidden outline-none focus:outline-none">
            <div className="relative my-6 mx-auto flex h-auto max-h-[80rem] w-auto max-w-7xl flex-row items-center justify-center">
              {/*Content*/}
              <div className="flex flex-col items-center justify-center">
                {/*Upper content*/}
                <div className="flex flex-row items-center justify-center">
                  <div className="w-20 shrink-0">
                    {/*Previous button*/}
                    <button className="relative left-7 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="h-6 w-6"
                        onClick={() => previousRecommendation()}
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
                      <RecommendationsModalContent
                        num={recommendationNumber}
                        data={data1}
                      />
                    </div>
                  </div>
                  {/*Next button*/}
                  <button className="relative left-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-6 w-6"
                      onClick={() => nextRecommendation()}
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
                    className="relative right-7 bottom-28 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-pb-gray md:bottom-28 lg:bottom-44 xl:bottom-60 2xl:bottom-72"
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
                    <div className="flex h-10 w-32 items-center justify-center rounded-full bg-pb-gray">
                      <button>Accept</button>
                    </div>
                    {/*Decline Button*/}
                    <div className="ml-20 flex h-10 w-32 items-center justify-center rounded-full bg-pb-gray">
                      <button>Decline</button>
                    </div>
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
