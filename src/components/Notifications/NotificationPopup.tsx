import { useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { animated, useSpring, useTransition } from 'react-spring';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { INotification } from '../../internalTypes/interfaces.ts';
import NotificationSegment from './NotificationSegment.tsx';
import pacebuddiesApi from '../../instances/axiosConfigured.ts';

// import {
//   useSetSynchronizationStore,
//   useSynchronizationStore,
// } from '../../store/synchronizeStore';

interface IProps {
  show: boolean
}
const NotificationPopup = ({ show }: IProps) => {

  // const handleFetch = () => {
  //   return fetchNotifications();
  //   // const date = new Date();
  //   // setNotificationStore(date);
  // };

  function fetchNotifications(page: number) {
    return pacebuddiesApi
      .get(`/notification?page=${page}`)
      .then((res) => {
        return res.data
      })
      .catch((err) => console.error(err)) 
  }

  const clearNotifications = (): void => {
    pacebuddiesApi
      .delete("notification/all")
      .catch((err) => console.error(err))
  }

  const animation = useSpring({
    from: { height: '0rem', opacity: 0 },
    to: { 
      height: show ? '45rem' : '0rem', 
      opacity: show ? 1 : 0
    },
    config: { tension: 300, friction: 40 },
  });

  const [page, setPage] = useState<number>(0)
  const {data, status, isError, isLoading, isFetching, isFetchingNextPage, hasNextPage} = useInfiniteQuery<INotification>( {
    queryKey: ["fetchNotification", page],
    queryFn: () => fetchNotifications(page),
    keepPreviousData: true
  })

  const nextPage = (): void => {
    setPage(page + 5)
  }

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
      <animated.div
        style={animation}
        className="absolute -right-12 top-0 w-96 overflow-hidden"
      >
      <svg
        width="18"
        height="15"
        viewBox="0 0 18 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute right-[4.7rem] top-0"
      >
        <path d="M9 0L17.6603 15H0.339746L9 0Z" fill="#4CBD17" />
      </svg>
        <div className="relative flex h-[43rem] w-full flex-col items-center justify-between top-3.5 overflow-hidden border-2 border-pb-green bg-white">
          <div className="flex flex-col w-full items-center justify-center">
            <span className="small-caps my-1.5 font-istok-web text-2xl font-bold text-pb-dark-gray">
              Notifications
            </span>
            <hr className="w-full border-pb-green"/>
            <span className="w-full mt-1.5 font-istok-web text-xl text-pb-dark-gray">
              {isError && <p>Something went wrong :(</p>}
              {isLoading && ( 
                <div>
                    <p>Fetching notifications....</p>
                     <ArrowPathIcon
                        className="h-8 w-8 rounded-full text-white animate-spin"
                    />
                </div>
                
                )}
              {status == "success" && (
                <div className="overflow-scroll scrollbar-hide h-96 mx-3">
                    {data.length == 0 && (<div> There are no new notifications </div>)}
                    {
                      data.pages.map(page => 
                         page.map((notification: INotification) => <NotificationSegment key={notification.id} data={notification}/>
                         ))
                    }
                </div>

              )}
            </span>
          </div>
          { status == "success" && data.pages.length > 0 && (
            <div>
              { !hasNextPage && (
                <div className="mt-4">
                    <button
                    className="small-caps mb-4 px-4 text-xl font-bold text-pb-green"
                    onClick={() => nextPage()}
                    >
                    Show more
                  </button>
                </div>
              )}
            
            <div className="mt-4">
                <button
                className="small-caps mb-4 bg-pb-green px-4 py-2 text-2xl font-bold text-white"
                onClick={() => clearNotifications()}
                >
                Clear notifications
                </button>
            </div>
          </div>
          )}
          </div>
      </animated.div>
    </div>
  );
};

export default NotificationPopup;
