import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SynchronizeStates {
  lastSynchronizationDate: Date | null;
}

interface SynchronizeActions {
  setLastSynchronizationDate: (date: Date) => void;
}

interface SynchronizeStore extends SynchronizeStates, SynchronizeActions {}

const initialSynchronizeStates: SynchronizeStates = {
  lastSynchronizationDate: null,
};

export const useSetSynchronizationStore = create<
  SynchronizeStore,
  [['zustand/persist', SynchronizeStore]]
>(
  persist(
    (set, get) => ({
      ...initialSynchronizeStates,
      setLastSynchronizationDate: (date) =>
        set((state) => ({ ...state, lastSynchronizationDate: date })),
    }),
    {
      name: 'synchronize-store',
    },
  ),
);

export const useSynchronizationStore = <T extends keyof SynchronizeStates>(
  selector: (state: SynchronizeStates) => SynchronizeStates[T],
): SynchronizeStates[T] => {
  const [state, setState] = useState(selector(initialSynchronizeStates));
  const zustandState = useSetSynchronizationStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
