import { IActivity } from '../../../internalTypes/interfaces';
import MapComponent from './MapComponent';
import Slider from './Slider';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  activity: IActivity;
  showMap: boolean;
}

const PhotoOrMapComponent = ({ showMap, activity, ...props }: IProps) => {
  return (
    <div {...props}>
      <div className="flex h-full w-full items-start">
        {!showMap ? (
          <Slider photos={activity.photos} />
        ) : (
          <div className="h-full w-full bg-gray-400">
            <MapComponent activity={activity} pathOptions={{ color: 'red' }} />
          </div>
        )}
      </div>
    </div>
  );
};
export default PhotoOrMapComponent;
