import Image from 'next/image';

interface IProps {
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
}: IProps) => {
  return (
    <div className="mb-8 flex w-4/5 flex-row justify-between border border-green-500 bg-white">
      {/*Avatar*/}
      <div className="flex flex-row">
        <Image src={profile} height={128} width={128} alt={'user avatar'} />
        <div className="ml-8 flex h-full items-center justify-center text-4xl font-bold text-pb-green">
          <span>
            {firstname} {lastname}
          </span>
        </div>
      </div>
      {/*Top block information*/}
      <div className="mr-20 flex flex-row">
        <div className="flex h-full flex-col justify-between py-8 pr-4 font-bold text-pb-green">
          <span>Gender</span>
          <span>Location</span>
        </div>
        <div className="flex h-full max-w-sm flex-col justify-between py-8 font-bold text-pb-dark-gray">
          <span>{sex}</span>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap font-bold text-pb-dark-gray">
            {city}, {country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsUserInfo;
