import { animated } from '@react-spring/web';
import React from 'react';
import { useSpring } from 'react-spring';

interface IProps extends React.HTMLAttributes<HTMLSpanElement> {
  num: number;
  children?: React.ReactNode;
  springConfig: {mass: number, tension: number, friction: number};
}

const NumberGrow = ({ springConfig,children, num, ...props }: IProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: 100,
    config: { ...springConfig },
  });
  return (
    <>
    <animated.span {...props}>
      {number.to((n) => n.toFixed(0))}
    </animated.span>
      <span {...props}>{children}</span>
</>
  );
};

export default NumberGrow;
