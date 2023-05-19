import Image from 'next/image';
import { ClubsData } from '../../../../internalTypes/recommendationData';
interface IProps {
  clubs: ClubsData[];
}

const SameClubs = ({ clubs }: IProps) => {
  console.log(clubs);
  return (
    <>
      <div className="flex w-full flex-row justify-between">
        <span className="font-bold text-pb-green">Clubs</span>
        <span className="ml-4 font-bold text-pb-dark-gray">
          {clubs.length} mutual clubs
        </span>
      </div>
      <div className="flex flex-col overflow-y-hidden">
        {clubs.map((club) => (
          <div key={club.url} className="flex flex-row items-center ">
            <Image
              src={club.profile_medium}
              height={48}
              width={48}
              alt={club.name}
              className="h-12 w-12 rounded-full bg-pb-orange"
            />
            <span className="p-2 font-bold text-pb-dark-gray">{club.name}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default SameClubs;
