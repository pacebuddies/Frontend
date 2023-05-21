import React from 'react';

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  valueName: string;
  value: string;
  valueUnit: string;
}

const DataTextSpan = ({ valueName, value, valueUnit }: IProps) => {
  return (
    <div>
      <span className="small-caps font-bold text-pb-dark-gray">{valueName} </span>
      <span className="small-caps font-bold text-sm text-pb-dark-gray">{value}</span>
      <span className="small-caps font-bold text-pb-dark-gray">{valueUnit}</span>
    </div>
  );
};

export default DataTextSpan;
