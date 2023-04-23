import { useQuery } from '@tanstack/react-query';
import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import LastNWeeksDistanceSumChart from '../../components/Charts/LastNWeeksDistanceSumChart';
import WeekByDayDistanceSumChart from '../../components/Charts/WeekByDayDistanceSumChart';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import Layout from '../../Layout';
import YearSummaryContent from "../../components/Statistics/YearSummary/YearSummaryContent";
import LastNActivitiesPaceAvgChart from "../../components/Charts/LastNActivitiesPaceAvgChart";
import LastNMonthsDistanceAvgChart from "../../components/Charts/LastNMonthsDistanceAvgChart";

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
      <Layout>
        <div className="flex shrink-0 flex-col">
          <div className="flex h-56 w-full shrink-0 flex-col items-center justify-center space-y-3 bg-gradient-to-r from-pb-orange via-white to-pb-green">
            <span className="self-center whitespace-nowrap font-istok-web text-2xl text-pb-dark-gray ">
              STATISTICS
            </span>
          </div>
          <div className="flex h-full w-full justify-center border-2 border-t-pb-green bg-pb-gray">
            {/*Central content*/}
            <div className="flex w-full flex-col items-center bg-white md:w-2/3">
              {/*Sport select*/}
              <div className="flex h-20 w-full shrink-0 flex-row items-center justify-center border-b-2 border-b-pb-green">
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
              <div className="flex w-full shrink-0 flex-col border-b-2 border-b-pb-green p-4 ">
                {/*Title and year dropdown*/}
                <YearSummaryContent selectedSport={selectedSport}/>
              </div>
              {/*Distance*/}
              <div className="flex shrink-0  flex-col">
                <span>Distance</span>
                <WeekByDayDistanceSumChart />
                <LastNWeeksDistanceSumChart selectedSport={selectedSport}/>
                <LastNActivitiesPaceAvgChart selectedSport={selectedSport}/>
                <LastNMonthsDistanceAvgChart selectedSport={selectedSport}/>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default StatisticsPage;
