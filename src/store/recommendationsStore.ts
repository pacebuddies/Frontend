import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface RecommendationsStates {
  recommendations: {
    gender: 'Male' | 'Female' | 'All';
    sports: number[];
  };
}

interface RecommendationsActions {
  setRecommendations: (recommendations: RecommendationsStates) => void;
}

interface RecommendationsStore
  extends RecommendationsStates,
    RecommendationsActions {}

const initialRecommendationsStates: RecommendationsStates = {
  recommendations: {
    gender: 'All',
    sports: [12, 30, 39, 44, 26, 0, 1, 5, 7, 9, 10, 17, 22, 24, 29, 26],
  },
};

export const useSetRecommendationsStore = create<
  RecommendationsStore,
  [['zustand/persist', RecommendationsStore]]
>(
  persist(
    (set, get) => ({
      ...initialRecommendationsStates,
      setRecommendations: (recommendations) =>
        set((state) => ({ ...state, ...recommendations })),
    }),
    {
      name: 'recommendations-store',
    },
  ),
);

export const useRecommendationsStore = <T extends keyof RecommendationsStates>(
  selector: (state: RecommendationsStates) => RecommendationsStates[T],
): RecommendationsStates[T] => {
  const [state, setState] = useState(selector(initialRecommendationsStates));
  const zustandState = useSetRecommendationsStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
