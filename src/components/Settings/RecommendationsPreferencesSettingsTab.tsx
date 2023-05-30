import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Dropdown } from 'flowbite-react';
import { NextPage } from 'next';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import { SportTypeMap } from '../../internalTypes/SportTypeMap';
import {
  useRecommendationsStore,
  useSetRecommendationsStore,
} from '../../store/recommendationsStore';
import { capitalizeFirstLetter } from '../../utils/capitalizeFirstLetter';
import { isAllowedSportTypeNumber } from '../../utils/isAllowedSportType';
import FilterRideTypeSportBlock from './FilterSportBlock/FilterRideTypeSportBlock';
import FilterRunTypeSportBlock from './FilterSportBlock/FilterRunTypeSportBlock';
import FilterSwimTypeSportBlock from './FilterSportBlock/FilterSwimTypeSportBlock';

export type RecommendedSportsCheckbox = Record<string, boolean>;

const RecommendationsPreferencesSettingsTab: NextPage = () => {
  const setRecommendationsPreferences = useSetRecommendationsStore(
    (state) => state.setRecommendations,
  );
  const getRecommendationsPreferences = useRecommendationsStore(
    (state) => state.recommendations,
  );
  const queryClient = useQueryClient();
  const handlePreferredGenderChange = (gender: 'Male' | 'Female' | 'All') => {
    setRecommendationsPreferences({
      recommendations: {
        gender: gender,
        sports: getRecommendationsPreferences.sports,
      },
    });
    queryClient.invalidateQueries(['recommendations']);
  };
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };
  const { isSuccess, data } = useQuery({
    queryKey: ['user-sports'],
    queryFn: fetchSports,
  });

  const RUN_TYPE_SPORTS = [
    SportTypeEnum.HIKE,
    SportTypeEnum.SNOWSHOE,
    SportTypeEnum.TRAIL_RUN,
    SportTypeEnum.WALK,
    SportTypeEnum.RUN,
  ];
  const RIDE_TYPE_SPORTS = [
    SportTypeEnum.ALPINE_SKI,
    SportTypeEnum.BACKCOUNTRY_SKI,
    SportTypeEnum.E_BIKE_RIDE,
    SportTypeEnum.E_MOUNTAIN_BIKE_RIDE,
    SportTypeEnum.GRAVEL_RIDE,
    SportTypeEnum.HANDCYCLE,
    SportTypeEnum.MOUNTAIN_BIKE_RIDE,
    SportTypeEnum.RIDE,
    SportTypeEnum.ROLLER_SKI,
    SportTypeEnum.SNOWBOARD,
  ];
  const SWIM_TYPE_SPORTS = [SportTypeEnum.SWIM];

  const handleSportTypeChange = (sport: string) => {
    const sportNumber = SportTypeMap.getNumber(sport)!;
    let newSports = [...getRecommendationsPreferences.sports];
    if (newSports.includes(sportNumber)) {
      newSports = newSports.filter((sport) => sport !== sportNumber);
    } else {
      newSports.push(sportNumber);
    }

    setRecommendationsPreferences({
      recommendations: {
        gender: getRecommendationsPreferences.gender,
        sports: [...newSports],
      },
    });
    queryClient.invalidateQueries(['recommendations']);
  };
  return (
    <>
      <div>
        <span className="small-caps mt-2 flex items-center justify-center text-2xl font-bold text-pb-dark-gray">
          preferences
        </span>

        <div className="flex flex-col w-full">
          <div className="flex flex-row items-center space-x-2 px-2">
            <span className="small-caps text-xl font-bold text-pb-dark-gray ">preferred gender</span>
            <Dropdown
              label={getRecommendationsPreferences.gender}
              gradientDuoTone="greenToDarkGreen"
              outline={true}
            >
              <Dropdown.Item
                onClick={() => handlePreferredGenderChange('Female')}
              >
                Female
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handlePreferredGenderChange('Male')}
              >
                Male
              </Dropdown.Item>
              <Dropdown.Item onClick={() => handlePreferredGenderChange('All')}>
                All
              </Dropdown.Item>
            </Dropdown>
          </div>
          <div className="flex flex-col p-2 space-x-2 border-b-2 border-b-pb-green">
            <span  className="small-caps text-xl font-bold text-pb-dark-gray">recommendations on sport type</span>
            <div className="flex flex-col items-start ">
              {isSuccess &&
                data.map((sport) => {
                  const sportNumber = SportTypeMap.getNumber(sport)!;
                  const sportName = capitalizeFirstLetter(sport.toLowerCase());
                  if (isAllowedSportTypeNumber(sportNumber)) {
                    return (
                      <div className="flex items-center justify-center" key={sport}>
                        <input
                          type="checkbox"
                          id={sport}
                          checked={getRecommendationsPreferences.sports.includes(
                            sportNumber,
                          )}
                          onChange={() => handleSportTypeChange(sport)}
                          className="h-4 w-4 rounded border border-gray-300 bg-gray-100 accent-pb-green focus:ring-2 focus:ring-pb-green"
                        />
                        <label className="pl-1 pt-1 text-pb-dark-gray font-bold" htmlFor={sport}>
                          {sportName}
                        </label>
                      </div>
                    );
                  } else return null;
                })}
            </div>
          </div>
        </div>
      </div>
      <div>
        <span className="text-md  flex items-center justify-center pt-2 px-2 font-bold text-pb-dark-gray ">
          Here you can adjust your recommendation&apos;s filters to the
          preferred level for each sport type.
          <br />
        </span>
        <span className="text-md flex items-center justify-center px-2 text-pb-dark-gray ">
          Under every slider you can see current range calculated from our
          algorithm and your preferences.
          <br />
          After changes remember to save your new settings.
        </span>
      </div>
      <div className="w-full pt-4">
        <div className="flex flex-col pl-8">{/*<PreferenceSlider />*/}</div>
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {isSuccess &&
          data.map((sport) => {
            const sportNumber = SportTypeMap.getNumber(sport)!;
            if (isAllowedSportTypeNumber(sportNumber)) {
              {
                /*TODO: title - podane małymi literami*/
              }
              if (SWIM_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterSwimTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else if (RUN_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterRunTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else if (RIDE_TYPE_SPORTS.includes(sportNumber)) {
                return (
                  <FilterRideTypeSportBlock
                    key={sportNumber}
                    title={sport}
                    sportType={sportNumber}
                  />
                );
              } else {
                return null;
              }
            } else {
              return null;
            }
          })}
      </div>
    </>
  );
};

export default RecommendationsPreferencesSettingsTab;
