import { PropsWithChildren } from 'react';

interface IProps {}

const BorderStyle = (props: PropsWithChildren<IProps>) => {
  return (
    <div className="rounded-lg border-2 border-solid border-pb-green shadow-border shadow-pb-green/50">
      {props.children}
    </div>
  );
};
export default BorderStyle;
