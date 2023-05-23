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
        className=" flex w-12 md:w-44 flex-row items-center justify-center rounded-full border-[1px] border-pb-green"
        onClick={handleButtonClick}
      >
        <MapIcon className="md:ml-2 md:h-9 w-8 md:w-9 text-pb-green" />
        <span className="flex flex-col small-caps font-bold text-xl/[15px] text-pb-green hidden md:block mr-1">
          switch to map
        </span>
      </button>
    ) : (
      <button
        className=" flex w-12 md:w-44 flex-row items-center justify-center rounded-full border-[1px] border-pb-green"
        onClick={handleButtonClick}
      >
        <PhotoIcon className="md:ml-2 h-8 md:h-9 w-8 md:w-9 text-pb-green" />
        <span className="small-caps text-xl/[15px] font-bold text-pb-green hidden md:block ">
          switch to photos
        </span>
      </button>
    );
  }
  return null;
};

export default PhotoOrMapButton;
