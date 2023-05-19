import { useQuery } from '@tanstack/react-query';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { RecommendationData } from '../../internalTypes/recommendationData';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import RecommendationsModal from './RecommendationsModal/RecommendationsModal';

interface IProps {
  opened: boolean;
  onOpenedChange: (opened: boolean) => void;
}
const qs = require('qs');
const RecommendationsDataWraper = ({ onOpenedChange }: IProps) => {
  const fetchRecommendations = (): Promise<RecommendationData[]> => {
    return pacebuddiesApi
      .get('recommender/recommendations/listByFewSportTypes', {
        params: {
          sport_type: SportTypeEnum.RUN,
        },
        paramsSerializer: (params) => {
          return qs.stringify(params, { arrayFormat: 'repeat' });
        },
      })
      .then((response) => response.data);
  };
  const { data, isSuccess } = useQuery<RecommendationData[]>({
    queryKey: ['recommendations'],
    queryFn: fetchRecommendations,
  });

  return (
    <>
      {isSuccess && (
        <RecommendationsModal data={data} onOpenedChange={onOpenedChange} />
      )}
    </>
  );
};

export default RecommendationsDataWraper;
