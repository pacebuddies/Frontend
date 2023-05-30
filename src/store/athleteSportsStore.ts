import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SportTypeEnum } from '../internalTypes/sportTypeEnum';

interface AthleteSportsStates {
  athleteSports: number[];
}

interface AthleteSportsActions {
  setAthleteSports: (athleteSports: number[]) => void;
}

interface AthleteSportsStore
  extends AthleteSportsStates,
    AthleteSportsActions {}

const initialAthleteSportsStates: AthleteSportsStates = {
  athleteSports: [],
};

export const useSetAthleteSportsStore = create<
  AthleteSportsStore,
  [['zustand/persist', AthleteSportsStore]]
>(
  persist(
    (set, get) => ({
      ...initialAthleteSportsStates,
      setAthleteSports: (athleteSports) => set(() => ({ athleteSports })),
    }),
    {
      name: 'athlete-sports-store',
    },
  ),
);

export const useAthleteSportsStore = <T extends keyof AthleteSportsStates>(
  selector: (state: AthleteSportsStates) => AthleteSportsStates[T],
): AthleteSportsStates[T] => {
  const [state, setState] = useState(selector(initialAthleteSportsStates));
  const zustandState = useSetAthleteSportsStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
