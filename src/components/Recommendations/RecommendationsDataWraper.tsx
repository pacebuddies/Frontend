import { useQuery } from '@tanstack/react-query';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { RecommendationData } from '../../internalTypes/recommendationData';
import { useRecommendationsStore } from '../../store/recommendationsStore';
import NoRecommendationsModal from './RecommendationsModal/NoRecommendationsModal';
import RecommendationsModal from './RecommendationsModal/RecommendationsModal';
import RecommendationsModalLoading from './RecommendationsModal/RecommendationsModalLoading';
import { useSetMatchRecommendationStore } from "../../store/matchRecommendationsStore";
import { useAthleteSportsStore } from "../../store/athleteSportsStore";

interface IProps {
  opened: boolean;
  onOpenedChange: (opened: boolean) => void;
}
const qs = require('qs');
const RecommendationsDataWraper = ({ onOpenedChange }: IProps) => {
  const getSelectedSportTypes = useRecommendationsStore(
    (state) => state.recommendations,
  ).sports;
  const getAthleteSportTypes = useAthleteSportsStore(state => state.athleteSports);
  const fetchRecommendations = (): Promise<RecommendationData[]> => {

    //check if getSelectedSportTypes includes getAthleteSportTypes
    console.log(getSelectedSportTypes, getAthleteSportTypes);
    const filteredSports = getSelectedSportTypes.filter((sport) => getAthleteSportTypes.includes(sport));
    console.log(filteredSports);


    return pacebuddiesApi
      .get('recommender/recommendations/listByFewSportTypes', {
        params: {
          sport_type: filteredSports.length==0 ? getSelectedSportTypes : filteredSports,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      })
      .then((response) => response.data);
  };
  const { data, isSuccess, isLoading } = useQuery<RecommendationData[]>({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });
  const setMatchedRecommendations = useSetMatchRecommendationStore(state => state.setRecommendations);
  if (isSuccess) {
    setMatchedRecommendations({matches: [...data]});
  }
  return (
    <>
      {isSuccess &&
        (data.length > 0 ? (
          <RecommendationsModal data={data} onOpenedChange={onOpenedChange} />
        ) : (
          <NoRecommendationsModal onOpenedChange={onOpenedChange} />
        ))}
      {isLoading && (
        <RecommendationsModalLoading onOpenedChange={onOpenedChange} />
      )}
    </>
  );
};

export default RecommendationsDataWraper;
