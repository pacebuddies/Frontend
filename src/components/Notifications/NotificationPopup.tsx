import { ArrowPathIcon } from '@heroicons/react/24/solid';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { animated, useSpring } from 'react-spring';
import pacebuddiesApi from '../../instances/axiosConfigured';
import { INotification } from '../../internalTypes/interfaces';
import {
  useNotificationStore,
  useSetNotificationStore,
} from '../../store/notificationStore';
import NotificationSegment from './NotificationSegment';

interface IProps {
  show: boolean;
  onUnreadNotificationsChange: (unreadNotifications: number) => void;
}
const NotificationPopup = ({ show, onUnreadNotificationsChange }: IProps) => {
  const setNotificationStore = useSetNotificationStore(
    (state) => state.setNotifications,
  );
  const updateNotificationsStore = useSetNotificationStore(
    (state) => state.updateNotification,
  );
  const clearNotificationStore = useSetNotificationStore(
    (state) => state.clear,
  );
  const notificationStore =
    useNotificationStore<'notifications'>((state) => state.notifications) ?? [];

  function fetchNotifications(page: number) {
    return pacebuddiesApi
      .get(`/notification?page=${page}`)
      .then((res) => {
        setNotificationStore(res.data);
        onUnreadNotificationsChange(
          res.data.filter((notification: INotification) => !notification.seen)
            .length,
        );
        return res.data;
      })
      .catch((err) => console.error(err));
  }

  const clearNotifications = (): void => {
    pacebuddiesApi
      .delete('notification/all')
      .then(() => clearNotificationStore())
      .catch((err) => console.error(err));
    onUnreadNotificationsChange(0);
  };

  function markAsSeen(id: string) {
    pacebuddiesApi
      .get(`notification/${id}`)
      .then(() => {
        updateNotificationsStore(id);
      })
      .catch((err) => console.log(err));
    onUnreadNotificationsChange(
      notificationStore.filter((notification) => !notification.seen).length,
    );
  }

  const animation = useSpring({
    from: { height: '0rem', opacity: 0 },
    to: {
      height: show ? '32rem' : '0rem',
      opacity: show ? 1 : 0,
    },
    config: { tension: 300, friction: 40 },
  });

  const [page, setPage] = useState<number>(0);
  const {
    data,
    status,
    refetch,
    isError,
    isLoading,
    isFetching,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery<INotification[]>({
    queryKey: ['fetchNotification', page],
    queryFn: () => fetchNotifications(page),
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage && lastPage.length == 5) {
        return lastPage[lastPage.length - 1]?.date_time;
      }
      return null;
    },
    keepPreviousData: true,
    // refetchInterval: 10000, // 1s
    refetchIntervalInBackground: true,
  });

  const loadMore = (): void => {
    setPage(page + 1);
  };

  useEffect(() => {
    if (data != null) {
      setNotificationStore(data.pages.flat());
    }
  }, [data]);

  useEffect(() => {
    if (show) {
      clearNotificationStore();
      setPage(0);
      refetch();
    }
  }, [show]);

  return (
    <div className={`relative z-50 ${!show && 'hidden'}`}>
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
        className="absolute -right-20 top-4 h-[32rem] min-w-[20rem] overflow-hidden border-2 border-pb-green bg-white/95 md:-right-12 md:w-96"
      >
        <div className="flex flex-col items-center justify-between">
          <div className="flex w-full flex-col items-center justify-center">
            <span className="small-caps my-1.5 font-istok-web text-2xl font-bold text-pb-dark-gray">
              Notifications
            </span>
            <hr className="w-full border-pb-green" />
            <span className="mt-1.5 w-full font-istok-web text-xl text-pb-dark-gray">
              {isError && <p>Something went wrong :(</p>}
              {isLoading && (
                <div>
                  <p>Fetching notifications....</p>
                  <ArrowPathIcon className="h-8 w-8 animate-spin rounded-full text-white" />
                </div>
              )}
              {status == 'success' && (
                <div className="scrollbar-hide mx-3 max-h-[21.25rem] overflow-scroll">
                  {notificationStore.length == 0 && (
                    <div className="flex items-center justify-center">
                      {' '}
                      There are no new notifications{' '}
                    </div>
                  )}
                  {notificationStore.map((notification: INotification) => (
                    <NotificationSegment
                      key={notification.id}
                      data={notification}
                      markAsSeen={markAsSeen}
                    />
                  ))}
                </div>
              )}
            </span>
          </div>
          {status == 'success' && notificationStore.length > 0 && (
            <div>
              {hasNextPage && (
                <div className="mt-2 flex flex-row items-center justify-center">
                  <button
                    className="small-caps flex items-center justify-center space-x-2 px-4 text-xl font-bold text-pb-green"
                    onClick={() => loadMore()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="h-7 w-7"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Show more</span>
                  </button>
                </div>
              )}

              <div className="mt-3">
                <button
                  className="small-caps mb-2 flex items-center justify-center space-x-2 bg-pb-green px-4 py-2 text-2xl font-bold text-white"
                  onClick={() => clearNotifications()}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-8 w-8"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Clear notifications</span>
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
