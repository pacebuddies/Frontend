import { animated } from '@react-spring/web';
import { useSpring } from 'react-spring';

interface IProps {
  num: number;
}

const CompatibilityNumber = ({ num }: IProps) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: num,
    delay: 100,
    config: { mass: 1, tension: 20, friction: 10 },
  });
  return (
    <div className="flex flex-row">
      <animated.div>{number.to((n) => n.toFixed(0))}</animated.div>
      <span>%</span>
    </div>
  );
};

export default CompatibilityNumber;
