import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INotification } from '../internalTypes/interfaces';

interface NotificationStates {
  notifications: INotification[];
}

interface NotificationActions {
  setNotifications: (notifications: INotification[]) => void;
  updateNotification: (notificationId: string) => void;
  clear: () => void;
}

interface NotificationStore extends NotificationStates, NotificationActions {}

const initialNotificationStates: NotificationStates = {
  notifications: [],
};

export const useSetNotificationStore = create<
  NotificationStore,
  [['zustand/persist', NotificationStore]]
>(
  persist(
    (set, get) => ({
      ...initialNotificationStates,
      setNotifications: (new_notifications: INotification[]) => {
            set((state) => ({ notifications:[
                                    ...(state?.notifications ?? []),
                                    ...new_notifications
                                      .filter((v, i, a) => a.findIndex(v2 => v2.id === v.id) === i)
                                      .sort((n1, n2) => (new Date(n2.date_time)).getTime() - (new Date(n1.date_time)).getTime()),
                                    ],
        })) // Usuwanie duplikatów i sortowanie po dacie (pain)
      },
      updateNotification: (notificationId: string) => {
            const currentState = get();
            if (currentState && currentState.notifications) {
              const idx = currentState.notifications.findIndex(n => n.id === notificationId);
              const notificationsCopy = currentState.notifications.slice();
              if (notificationsCopy && idx !== -1 && notificationsCopy[idx]) {
                notificationsCopy[idx]!.seen = true;
                set({ notifications: notificationsCopy });
              }
            }
      },
      clear: () => {
        set((state) => ({ notifications: []}))
      },
    }),
    {
      name: 'notification-store',
    },
  ),
);


export const useNotificationStore = <T extends keyof NotificationStates>(
  selector: (state: NotificationStates) => NotificationStates[T],
): NotificationStates[T] => {
  const [state, setState] = useState(selector(initialNotificationStates));
  const zustandState = useSetNotificationStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
