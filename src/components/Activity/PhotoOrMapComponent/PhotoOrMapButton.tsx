import { MapIcon, PhotoIcon } from '@heroicons/react/24/solid';
import { useState } from 'react';
interface IProps {
  isMap: boolean;
  isPhotos: boolean;
  onClick: () => void;
}
// on true shows map, on false shows photos
const PhotoOrMapButton = ({ onClick, isMap, isPhotos }: IProps) => {
  const [showPhotosOrMap, setShowPhotosOrMap] = useState<boolean>(isMap);

  const handleButtonClick = () => {
    if (isMap && isPhotos) {
      setShowPhotosOrMap((prevState) => !prevState);
      onClick();
    }
    return;
  };

  if (isMap && isPhotos) {
    return !showPhotosOrMap ? (
      <button
        className="ml-2 flex w-40 flex-row items-center justify-center rounded-full border-[1px] border-pb-green"
        onClick={handleButtonClick}
      >
        <MapIcon className="ml-2 h-9 w-9 text-pb-green" />
        <span className="small-caps text-2xl/[15px] text-pb-green ">
          switch to map
        </span>
      </button>
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

export default PhotoOrMapButton;
