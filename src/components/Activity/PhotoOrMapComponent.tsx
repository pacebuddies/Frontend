import { IActivity } from '../../internalTypes/interfaces';
import MapComponent from './MapComponent';
import Slider from "./Slider";

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  activity: IActivity;
}

const PhotoOrMapComponent = ({ activity, ...props }: IProps) => {
  return (
    <div {...props}>
      {activity.map.summary_polyline != '' && (
        <div className="h-full w-full bg-gray-400">
          <MapComponent activity={activity} pathOptions={{ color: 'red' }} />
        </div>
      )}
      {activity.photos.length>0 && <Slider photos={activity.photos} />}
    </div>
  );
};
export default PhotoOrMapComponent;
