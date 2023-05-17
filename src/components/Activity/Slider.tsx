import { Carousel } from 'flowbite-react';
import { useState } from 'react';
import { IPhoto } from '../../internalTypes/interfaces';
interface SliderProps {
  photos: IPhoto[];
}

const Slider = ({ photos }: SliderProps) => {
  const [isLoading, setIsLoading] = useState<boolean[]>(photos.map(() => true));

  // On image load, set loading state to false
  const handleImageLoad = (index: number) => {
    setIsLoading((prevState) => {
      const newState = [...prevState];
      newState[index] = false;
      return newState;
    });
  };

  // Reset loading state when currentIndex changes

  return (
    <>
      <Carousel slide={false} className="border-[1px] border-pb-green">
        {photos.map((photo, index) => (
          <div
            key={photo.urls['2048']}
            className="flex h-full items-center justify-center "
          >
            <svg
              className={`-ml-1 mr-3 h-12 w-12 animate-spin text-gray-400 ${
                !isLoading[index] && 'absolute opacity-0'
              }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>

            <img
              src={photo.urls['2048']}
              // height={2048}
              // width={2048}
              className={`h-full ${isLoading[index] && 'absolute opacity-0'}`}
              alt={`Slide ${index}`}
              loading={'lazy'}
              onLoad={() => handleImageLoad(index)}
            />
          </div>
        ))}
        {/*<img src={loading_icon.src}/>*/}
      </Carousel>
    </>
  );
};

export default Slider;
