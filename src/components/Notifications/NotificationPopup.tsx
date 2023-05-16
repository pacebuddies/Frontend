import { useEffect, useState, useCallback } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';
import { animated, useSpring, useTransition } from 'react-spring';
import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { INotification } from '../../internalTypes/interfaces.ts';
import NotificationSegment from './NotificationSegment.tsx';
import pacebuddiesApi from '../../instances/axiosConfigured.ts';
import { useSetNotificationStore, useNotificationStore } from '../../store/notificationStore.ts';

interface IProps {
  show: boolean,
  page: number,
  setPage: any
}
const NotificationPopup = ({ show }: IProps) => {
  const setNotificationStore = useSetNotificationStore((state) => state.setNotifications)
  const updateNotificationsStore = useSetNotificationStore((state) => state.updateNotification)
  const clearNotificationStore = useSetNotificationStore((state) => state.clear)
  const notificationStore = useNotificationStore(
    (state) => state.notifications,
  );

  function fetchNotifications(page: number) {
    return pacebuddiesApi
      .get(`/notification?page=${page}`)
      .then((res) => {
        setNotificationStore(res.data)
        return res.data
      })
      .catch((err) => console.error(err)) 
  }

  const clearNotifications = (): void => {
    pacebuddiesApi
      .delete("notification/all")
      .then(() => clearNotificationStore())
      .catch((err) => console.error(err))

  }

  function markAsSeen(id: string) {
    pacebuddiesApi
        .get(`notification/${id}`)
        .then(() => {
          updateNotificationsStore(id)
        })
        .catch((err) => console.log(err))
  }

  const animation = useSpring({
    from: { height: '0rem', opacity: 0 },
    to: { 
      height: show ? '32rem' : '0rem',
      opacity: show ? 1 : 0
    },
    config: { tension: 300, friction: 40 },
  });
  // useEffect(() => clearNotificationStore(), [])
  const [page, setPage] = useState<number>(0)
  const {data, status, isError, isLoading, isFetching, isFetchingNextPage, hasNextPage} = useInfiniteQuery<INotification>( {
    queryKey: ["fetchNotification", page],
    queryFn: () => fetchNotifications(page),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length == 5 ? lastPage[lastPage.length - 1].date_time : undefined
    },
    keepPreviousData: true
  })

  const loadMore = (): void => {
    setPage(page + 1)
  }

  useEffect(() => {
    if(data != null) {
      setNotificationStore(data.pages)
    }
  }, [data])

  const clearCallback = useCallback(() => clearNotificationStore())

  // useEffect(() => {
  //     clearCallback()
  // }, [clearCallback])

  return (
    <div className="relative z-50">
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
        className="absolute -right-12 top-4 h-[32rem] w-96 overflow-hidden border-2 border-pb-green bg-white/95"
      >
        <div className="flex flex-col items-center justify-between">
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
                <div className="overflow-scroll scrollbar-hide max-h-[21.25rem] mx-3">
                    {notificationStore.length == 0 && (<div className="flex items-center justify-center"> There are no new notifications </div>)}
                    {notificationStore.map((notification: INotification) =>
                        <NotificationSegment
                          key={notification.id}
                          data={notification}
                          markAsSeen={markAsSeen}
                        />)
                    }
                </div>

              )}
            </span>
          </div>
          { status == "success" && notificationStore.length > 0 && (
            <div>
              { hasNextPage && (
                <div className="flex flex-row mt-2 items-center justify-center">
                    <button
                    className="flex small-caps px-4 text-xl font-bold text-pb-green items-center justify-center space-x-2"
                    onClick={() => loadMore()}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-7 h-7">
                        <path
                          fillRule="evenodd"
                          d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                          clipRule="evenodd"/>
                      </svg>
                      <span>
                        Show more
                      </span>
                  </button>
                </div>
              )}
            
            <div className="mt-3">
                <button
                className="flex small-caps mb-2 bg-pb-green px-4 py-2 text-2xl font-bold text-white items-center justify-center space-x-2"
                onClick={() => clearNotifications()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-8 h-8">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"/>
                  </svg>
                  <span>
                    Clear notifications
                  </span>
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
