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
    sports: [],
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
