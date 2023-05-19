import Image from 'next/image';

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
  return (
    <div {...props}>
      {/*Avatar*/}
      <div className="flex h-32 max-w-md flex-row items-center justify-center ">
        <Image
          src={profile}
          height={128}
          width={128}
          alt={`${firstname + ' ' + lastname} user avatar`}
          className="h-32 w-32"
        />
        <span className="ml-8 truncate text-4xl font-bold text-pb-green">
          {firstname} {lastname}
        </span>
      </div>
      {/*Top block information*/}
      <div className="flex flex-row pr-10">
        <div className="flex h-full flex-col justify-between py-8 pr-4 font-bold text-pb-green">
          <span>Gender</span>
          <span>Location</span>
        </div>
        <div className="flex h-full max-w-[160px] flex-col justify-between py-8 font-bold text-pb-dark-gray">
          <span>{sex}</span>
          <span className="truncate font-bold text-pb-dark-gray">
            {city}, {country}
          </span>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsUserInfo;
