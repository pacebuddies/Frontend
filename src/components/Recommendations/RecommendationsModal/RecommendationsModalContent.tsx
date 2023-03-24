import { RecommendationData } from './RecommendationsModal';

interface IProps {
  data?: RecommendationData[];
  num?: number;
}
const RecommendationsModalContent = ({ data, num }: IProps) => {
  var number = num ?? 0;
  console.log(number);
  return (
    <div className="gab-4 grid w-full grid-cols-3 grid-rows-2 rounded-3xl">
      <div className="col-span-2 h-1/5  w-full bg-green-500">top</div>
      <div className=" col-start-1 bg-red-700">1</div>
      <div className=" col-start-2 bg-yellow-700">{data ? data[number]?.name : ""}</div>
      <div className=" col-start-3 bg-purple-500">3</div>
    </div>
  );
};

export default RecommendationsModalContent;
