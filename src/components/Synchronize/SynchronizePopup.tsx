import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';

import {
  useSetSynchronizationStore,
  useSynchronizationStore,
} from '../../store/synchronizeStore';

interface IProps {
  synchronize: () => void;
}
const SynchronizePopup = ({ synchronize }: IProps) => {
  const [date, setDate] = useState<Date | null>(null);
  const [daysDifference, setDaysDifference] = useState<number>(0);
  const setSynchronizationStore = useSetSynchronizationStore(
    (state) => state.setLastSynchronizationDate,
  );
  const getSynchronizationStore = useSynchronizationStore(
    (state) => state.lastSynchronizationDate,
  );

  const handleSynchronize = () => {
    synchronize();
    const date = new Date();
    setSynchronizationStore(date);
    setDate(date);
  };

  const animation = useSpring({
    from: { height: '0rem', opacity: 0 },
    to: { height: '13rem', opacity: 1 },
    config: { tension: 300, friction: 40 },
  });

  useEffect(() => {
    const storeDate: Date | null = getSynchronizationStore;

    if (storeDate !== null) {
      const storeDateObj = new Date(storeDate);

      setDate(storeDateObj);
      setDaysDifference(
        Math.round(
          (new Date().getTime() - storeDateObj.getTime()) /
            (1000 * 60 * 60 * 24),
        ),
      );
    }
  }, [getSynchronizationStore]);

  return (
    <div className="relative z-1010">
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[1.7rem] top-[2px]"
      >
        <path d="M9 0L17.6603 15H0.339746L9 0Z" fill="#4CBD17" />
      </svg>
      <animated.div
        style={animation}
        className="absolute -right-12 top-4 h-52 w-80 overflow-hidden border-2 border-pb-green bg-white/95"
      >
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <span className="small-caps my-1.5 font-istok-web text-2xl font-bold text-pb-dark-gray">
              last synchronization
            </span>
            <span className="small-caps my-1.5 font-istok-web text-3xl font-bold  text-pb-green">
              {daysDifference} day(s) ago
            </span>
            <span className="small-caps mt-1.5 font-istok-web text-xl capitalize text-pb-dark-gray">
              {date === null
                ? 'not synchronized'
                : `on ${date.getDate()}/${
                    date.getMonth() + 1
                  }/${date.getFullYear()}`}
            </span>
          </div>
          <div className="mt-4">
            <button
              className="small-caps mb-4 bg-pb-green px-4 py-2 text-2xl capitalize font-bold text-white"
              onClick={() => handleSynchronize()}
            >
              Synchronize
            </button>
          </div>
        </div>
      </animated.div>
    </div>
  );
};

export default SynchronizePopup;
