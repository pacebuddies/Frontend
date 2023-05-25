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
          <a
            key={club.url}
            className="flex flex-row items-center"
            href={`https://www.strava.com/clubs/${
              club.url == '' ? club.id : club.url
            }`}
            target={'_blank'}
            rel="noreferrer"
          >
            <Image
              src={club.profile_medium}
              height={48}
              width={48}
              alt={club.name}
              className="h-12 w-12 rounded-full bg-pb-orange"
            />
            <span className="p-2 font-bold text-pb-dark-gray">{club.name}</span>
          </a>
        ))}
      </div>
    </>
  );
};

export default SameClubs;
