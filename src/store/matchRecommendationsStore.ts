import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { RecommendationData } from '../internalTypes/recommendationData';

interface MatchRecommendationsStates {
  matches: RecommendationData[];
}

interface MatchRecommendationsActions {
  setRecommendations: (recommendations: MatchRecommendationsStates) => void;
  findMatch: (id: string) => RecommendationData | undefined;
}

interface MatchRecommendationsStore
  extends MatchRecommendationsStates,
    MatchRecommendationsActions {}

const initialRecommendationsStates: MatchRecommendationsStates = {
  matches: [],
};

export const useSetMatchRecommendationStore = create<
  MatchRecommendationsStore,
  [['zustand/persist', MatchRecommendationsStore]]
>(
  persist(
    (set, get) => ({
      ...initialRecommendationsStates,
      setRecommendations: (recommendations) =>
        set((state) => ({ ...state, ...recommendations })),
      findMatch: (id: string): RecommendationData | undefined => {
        console.log(get().matches.find((match) => {console.log(match.id, id); return match.id === id}));
        return get().matches.find((match) => match.id === id);
      },
    }),
    {
      name: 'match-recommendations-store',
    },
  ),
);

export const useMatchRecommendationStore = <
  T extends keyof MatchRecommendationsStates,
>(
  selector: (
    state: MatchRecommendationsStates,
  ) => MatchRecommendationsStates[T],
): MatchRecommendationsStates[T] => {
  const [state, setState] = useState(selector(initialRecommendationsStates));
  const zustandState = useSetMatchRecommendationStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
