interface IProps {}

const SameSportTypes = (props: IProps) => {
  return (
    <div className="flex w-full flex-col ">
      <span className="font-bold text-pb-green">Activity types</span>
      <div className="flex flex-wrap p-2">
        <span className="p-2">Running</span>
        <span className="p-2">Swimming</span>
        <span className="p-2">Cycling</span>
        <span className="p-2">Running</span>
        <span className="p-2">Swimming</span>
        <span className="p-2">Cycling</span>
        <span className="p-2">Running</span>
        <span className="p-2">Swimming</span>
        <span className="p-2">Cycling</span>
      </div>
    </div>
  );
};

export default SameSportTypes;
