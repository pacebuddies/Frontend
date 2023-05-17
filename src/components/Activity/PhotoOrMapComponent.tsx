import { MapIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
import { IActivity } from '../../internalTypes/interfaces';
import MapComponent from './MapComponent';
import Slider from './Slider';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  activity: IActivity;
}

const PhotoOrMapComponent = ({ activity, ...props }: IProps) => {
  const [showPhotosOrMap, setShowPhotosOrMap] = useState<boolean>(
    activity.photos.length > 0 ? true : false,
  );

  const isMap = activity.map.summary_polyline != '';
  const isPhotos = activity.photos.length > 0;

  const handleButtonClick = () => {
    if (isMap && isPhotos) {
      setShowPhotosOrMap((prevState) => !prevState);
    }
    return;
  };

  const showPhotosOrMapButton = () => {
    if (isMap && isPhotos) {
      return showPhotosOrMap ? (
        <>
          <button
            className="ml-2 flex w-40 flex-row items-center justify-center rounded-full border-[1px] border-pb-green"
            onClick={handleButtonClick}
          >
            <MapIcon className="ml-2 h-9 w-9 text-pb-green" />
            <span className="small-caps text-2xl/[15px] text-pb-green ">
              switch to map
            </span>
          </button>
        </>
      ) : (
        <button
          className="ml-2 flex w-40 flex-row items-center justify-center rounded-full border-[1px] border-pb-green"
          onClick={handleButtonClick}
        >
          <PhotoIcon className="ml-2 h-9 w-9 text-pb-green" />
          <span className="small-caps text-2xl/[15px] text-pb-green ">
            switch to photos
          </span>
        </button>
      );
    }
    return null;
  };

  return (
    <div {...props}>
      <div className="flex h-full w-full items-start">
        {showPhotosOrMap ? (
          <Slider photos={activity.photos} />
        ) : (
          isMap && (
            <div className="h-full w-full bg-gray-400">
              <MapComponent
                activity={activity}
                pathOptions={{ color: 'red' }}
              />
            </div>
          )
        )}
        {showPhotosOrMapButton()}
      </div>
    </div>
  );
};
export default PhotoOrMapComponent;
