import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import MenuButton from '../../components/MenuButton';
import RecommendationsButton from '../../components/Recommendations/RecommendationsButton';
import TopNavBar from '../../components/TopNavBar';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';

const StatisticsPage: NextPage = () => {
  const [selectedSport, setSelectedSport] = useState<SportTypeEnum | null>(
    null,
  );
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };
  const sportsQuery = useQuery({
    queryKey: ['sports-statistics'],
    queryFn: fetchSports,
  });
  const capitalizeFirstLetter = (string: string | undefined) => {
    if (string === undefined) {
      return '';
    }
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  useEffect(() => {
    if (sportsQuery.isSuccess) {
      const sport = SportTypeMap.getNumber(
        sportsQuery.data![0]!,
      ) as SportTypeEnum;
      console.log(sport, selectedSport);
      if (selectedSport != sport) {
        setSelectedSport(sport);
      }
    }
  }, [sportsQuery.isSuccess]);

  return (
    <>
      <div className="flex h-screen shrink flex-col items-center justify-center bg-pb-gray">
        <TopNavBar />
        <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
          <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray ">
            STATISTICS
          </span>
        </div>
        <div className="flex h-full w-full justify-center border-2 border-t-pb-green">
          {/*Central content*/}
          <div className="flex h-full w-full flex-col items-center bg-white md:w-2/3">
            {/*Sport select*/}
            <div className="flex h-20 w-full flex-row items-center justify-center border-b-2 border-b-pb-green">
              <span className="pr-2">Statistics for </span>
              <Dropdown
                label={capitalizeFirstLetter(
                  SportTypeMap.getString(selectedSport!)?.toLowerCase(),
                )}
                outline={true}
                pill={true}
                color={'success'}
              >
                {sportsQuery.isSuccess &&
                  sportsQuery.data.map((item) => (
                    <Dropdown.Item
                      key={item}
                      onClick={() =>
                        setSelectedSport(SportTypeMap.getNumber(item)!)
                      }
                    >
                      {' '}
                      {capitalizeFirstLetter(item.toLowerCase())}
                    </Dropdown.Item>
                  ))}
              </Dropdown>
            </div>
            {/*Year summary*/}
            <div className="flex w-full flex-col border-b-2 border-b-pb-green p-4 ">
              {/*Title and year dropdown*/}
              <div className="flex w-full flex-row justify-between pt-4">
                <span className="font-bold text-pb-green">
                  Year&apos;s summary
                </span>
                <Dropdown
                  label={2021}
                  outline={true}
                  pill={true}
                  color={'success'}
                >
                  <Dropdown.Item>2021</Dropdown.Item>
                  <Dropdown.Item>2020</Dropdown.Item>
                  <Dropdown.Item>2019</Dropdown.Item>
                </Dropdown>
              </div>
              {/*List of summaries*/}
              <div className="grid grid-cols-2 gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                {/*Total Time*/}
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="h-8 w-8 "
                      fill={'white'}
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col pl-2">
                    <span className=" text-pb-green">Total Time</span>
                    <span className=" text-pb-dark-gray">00:00:00</span>
                  </div>
                </div>
              </div>
            </div>
            {/*Distance*/}
            <div>
              <span>Distance</span>
            </div>
          </div>
        </div>
      </div>
      <RecommendationsButton />
      <MenuButton />
    </>
  );
};

export default StatisticsPage;
