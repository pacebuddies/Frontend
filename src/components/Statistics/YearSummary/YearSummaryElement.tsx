import React from 'react';

interface IProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const YearSummaryElement = ({ icon, label, value }: IProps) => {
  return (
    <div className="flex flex-row">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pb-orange">
        {icon}
      </div>
      <div className="flex flex-col pl-2">
        <span className=" text-pb-green">{label}</span>
        <span className=" text-pb-dark-gray">{value}</span>
      </div>
    </div>
  );
};
export default YearSummaryElement;
