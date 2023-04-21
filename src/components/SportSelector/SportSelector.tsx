import { useQuery } from '@tanstack/react-query';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { SportTypeEnum } from '../../internalTypes/sportTypeEnum';
import ava from './../../../public/img/avatar-example.jpg';
interface IProps {
  onSportChange: (sport: SportTypeEnum) => void;
}

const SportSelector = ({ onSportChange }: IProps) => {
  const fetchSports = (): Promise<string[]> => {
    return pacebuddiesApi
      .get('bridge/athlete/sportTypes')
      .then((response) => response.data);
  };

  const sportsQuery = useQuery({ queryKey: ['sports'], queryFn: fetchSports });



    if (sportsQuery.isSuccess) {

      // const stringArray: string[] = ["RIDE", "RUN", "SWIM"];
      console.log(SportTypeEnum[])
      const enumArray: SportTypeEnum[] = sportsQuery.data.map(
        (item) => {
          const key = Object.keys(SportTypeEnum).find(key => SportTypeEnum[key as any] === item);
          return key ? SportTypeEnum[key as keyof typeof SportTypeEnum] : undefined;
        }
      ).filter((item): item is SportTypeEnum => item !== undefined);


      console.log(enumArray)
      enumArray.map((item) => {

        return (
          <button
            key={item}
            onClick={() => onSportChange(item)}
            className="flex flex-col items-center justify-center"
          >
            <img src={`./img/avatar-example.jpg`} alt={"123"} />
            <span>{item}</span>
          </button>
        );
      });
    } else if (sportsQuery.isError) {
      return <div>error</div>;
    } else if (sportsQuery.isLoading) {
      return <div>loading</div>;
    }
    return <div>empty</div>;


}

export default SportSelector;
