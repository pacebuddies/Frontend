import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { animated, useSpring } from 'react-spring';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { INotification } from '../../internalTypes/interfaces.ts';
import NotificationSegment from './NotificationSegment.tsx';

// import {
//   useSetSynchronizationStore,
//   useSynchronizationStore,
// } from '../../store/synchronizeStore';

interface IProps {
  fetchNotifications: () => void;
}
const NotificationPopup = ({ fetchNotifications }: IProps) => {

  const handleFetch = () => {
    return fetchNotifications();
    // const date = new Date();
    // setNotificationStore(date);
  };

  const animation = useSpring({
    from: { height: '0rem', opacity: 0 },
    to: { height: '45rem', opacity: 1 },
    config: { tension: 300, friction: 40 },
  });

  const {data, status} = useQuery( ["fetchNotification"], fetchNotifications)

//   useEffect(() => {
//     const storeDate: Date | null = getSynchronizationStore;

//     if (storeDate !== null) {
//       const storeDateObj = new Date(storeDate);

//       setDate(storeDateObj);
//       setDaysDifference(
//         Math.round(
//           (new Date().getTime() - storeDateObj.getTime()) /
//             (1000 * 60 * 60 * 24),
//         ),
//       );
//     }
//   }, [getSynchronizationStore]);

  return (
    <div className="relative">
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
        className="absolute -right-12 top-4 h-52 w-96 overflow-hidden border-2 border-pb-green bg-white"
      >
        <div className="flex h-full w-full flex-col items-center justify-between">
          <div className="flex flex-col w-full items-center justify-center">
            <span className="small-caps my-1.5 font-istok-web text-2xl font-bold text-pb-dark-gray">
              Notifications
            </span>
            <hr className="w-full border-pb-green"/>
            <span className="w-full mt-1.5 font-istok-web text-xl text-pb-dark-gray">
              {status == "error" && <p>Coś jebło</p>}
              {status == "loading" && ( 
                <div>
                    <p>Fetching notifications....</p>
                     <ArrowPathIcon
                        className="h-8 w-8 rounded-full text-white animate-spin"
                    />
                </div>
                
                )}
              {status == "success" && (
                <div>
                    {data.length == 0 && (<div> There are no new notifications </div>)}
                    {data.map((notification: INotification) => {
                        return <NotificationSegment key={notification.id} data={notification}/>
                    })}
                </div>

              )}
            </span>
          </div>
          { status == "success" && data.length > 0 && (
            <div className="mt-4">
                <button
                className="small-caps mb-4 bg-pb-green px-4 py-2 text-2xl font-bold text-white"
                onClick={() => handleSynchronize()}
                >
                Clear notifications
                </button>
          </div>
          )}
          
        </div>
      </animated.div>
    </div>
  );
};

export default NotificationPopup;
