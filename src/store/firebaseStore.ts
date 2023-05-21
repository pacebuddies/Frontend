import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface FCMStates {
  fcm_token: string | null;
}

interface FCMActions {
  setFCMToken: (fcm_token: string) => void;
}

interface FCMStore extends FCMStates, FCMActions {}

const initialFCMStates: FCMStates = {
  fcm_token: null
};

export const useSetFCMStore = create<
  FCMStore,
  [['zustand/persist', FCMStore]]
>(
  persist(
    (set, get) => ({
      ...initialFCMStates,
      setFCMToken: (token: string) => {
            set((state) => ({ fcm_token: token }))
      }
    }),
    {
      name: 'firebase-cloud-messaging-store',
    },
  ),
);


export const useFCMStore = <T extends keyof FCMStates>(
  selector: (state: FCMStates) => FCMStates[T],
): FCMStates[T] => {
  const [state, setState] = useState(selector(initialFCMStates));
  const zustandState = useSetFCMStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
