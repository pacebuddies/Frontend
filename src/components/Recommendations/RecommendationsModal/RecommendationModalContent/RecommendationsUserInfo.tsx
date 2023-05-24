import Image from 'next/image';
import { useMediaQuery } from '../../../../hooks/useMediaQuery';

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  profile: string;
  firstname: string;
  lastname: string;
  sex: string;
  city: string;
  country: string;
}

const RecommendationsUserInfo = ({
  profile,
  sex,
  city,
  country,
  firstname,
  lastname,
  ...props
}: IProps) => {
  const isMinWidth1024 = useMediaQuery('(min-width: 1024px)');

  return (
    <div {...props}>
      {isMinWidth1024 ? (
        <>
          {/*Avatar*/}
          <div className="flex h-16 min-w-0 flex-row items-center justify-center lg:h-32 ">
            <Image
              src={profile}
              height={128}
              width={128}
              alt={`${firstname + ' ' + lastname} user avatar`}
              className="h-16 w-16 lg:h-32 lg:w-32"
              title={`${firstname + ' ' + lastname}`}
            />
            <span
              className="mlg:max-h-32 ml-2 max-h-16 overflow-hidden text-ellipsis text-xl font-bold text-pb-green lg:ml-8 lg:truncate lg:text-4xl"
              title={`${firstname + ' ' + lastname} `}
            >
              {firstname} {lastname}
            </span>
          </div>
          {/*Top block information*/}
          <div className="flex min-w-0 flex-row pr-10  lg:pr-20">
            <div className="flex h-full flex-col justify-between pr-4 font-bold text-pb-green lg:py-8">
              <span className="text-sm lg:text-base">Gender</span>
              <span className="text-sm lg:text-base">Location</span>
            </div>
            <div className="flex h-full max-w-[5rem] flex-col justify-between font-bold text-pb-dark-gray lg:max-w-[8rem] lg:py-8 xl:max-w-[8rem] 2xl:max-w-[10rem]">
              <span className="text-sm lg:text-base">{sex}</span>
              <span className="truncate text-sm font-bold text-pb-dark-gray lg:text-base">
                {city}, {country}
              </span>
            </div>
          </div>
        </>
      ) : (
        <>
          <Image
            src={profile}
            height={128}
            width={128}
            alt={`${firstname + ' ' + lastname} user avatar`}
            className="h-16 w-16 lg:h-32 lg:w-32"
            title={`${firstname + ' ' + lastname}`}
          />
          <div className="ml-4 flex w-[calc(100%-4rem)] shrink-0 flex-col">
            <span
              className=" truncate pr-3 text-xl font-bold text-pb-green"
              title={`${firstname + ' ' + lastname}`}
            >
              {firstname} {lastname}
            </span>
            <span className="truncate pr-3 text-sm font-bold text-pb-dark-gray">
              {sex}, {city}, {country}
            </span>
          </div>
        </>
      )}
    </div>
  );
};

export default RecommendationsUserInfo;
