import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { IAthlete } from '../internalTypes/interfaces';

interface AthleteStates {
  athlete: IAthlete | null;
}

interface AthleteActions {
  setAthlete: (athlete: AthleteStates) => void;
}

interface AthleteStore extends AthleteStates, AthleteActions {}

const initialAthleteStates: AthleteStates = {
  athlete: null,
};

export const useSetAthleteStore = create<
  AthleteStore,
  [['zustand/persist', AthleteStore]]
>(
  persist(
    (set, get) => ({
      ...initialAthleteStates,
      setAthlete: (athlete) => set((state) => ({ ...state, ...athlete })),
    }),
    {
      name: 'athlete-store',
    },
  ),
);

export const useAthleteStore = <T extends keyof AthleteStates>(
  selector: (state: AthleteStates) => AthleteStates[T],
): AthleteStates[T] => {
  const [state, setState] = useState(selector(initialAthleteStates));
  const zustandState = useSetAthleteStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
