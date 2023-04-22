interface IProps {
  clubs: string[];
}

const SameClubs = ({ clubs }: IProps) => {
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
          <div key={club} className="flex flex-row items-center ">
            <div className="h-12 w-12 rounded-full bg-gradient-to-b from-red-400 to-white"></div>
            <span className="p-2 font-bold text-pb-dark-gray">{club}</span>
          </div>
        ))}
        <div className="flex flex-row items-center ">
          <div className="h-12 w-12 rounded-full bg-gradient-to-b from-red-400 to-white"></div>
          <span className="p-2 font-bold text-pb-dark-gray">Test club</span>
        </div>
      </div>
    </>
  );
};

export default SameClubs;
