import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UnitPreference } from '../internalTypes/interfaces';

interface SettingsStates {
  settings: {
    measurementUnits: UnitPreference;
  };
}

interface SettingsActions {
  setSettings: (settings: SettingsStates) => void;
}

interface SettingsStore extends SettingsStates, SettingsActions {}

const initialSettingsStates: SettingsStates = {
  settings: {
    measurementUnits: 'metric',
  },
};
export const useSetSettingsStore = create<SettingsStore>()(
  persist(
    (set, get) => ({
      ...initialSettingsStates,
      setSettings: (settings) => set((state) => ({ ...state, ...settings })),
    }),
    {
      name: 'settings-store',
    },
  ),
);

export const useSettingsStore = <T extends keyof SettingsStates>(
  selector: (state: SettingsStates) => SettingsStates[T],
): SettingsStates[T] => {
  const [state, setState] = useState(selector(initialSettingsStates));
  const zustandState = useSetSettingsStore((persistedState) =>
    selector(persistedState),
  );

  useEffect(() => {
    setState(zustandState);
  }, [zustandState]);

  return state;
};
