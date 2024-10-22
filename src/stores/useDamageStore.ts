import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { DamageLevels } from '../types/upgrades';

interface DamageStore {
  currentDamage: number;
  setDamage: (newDamage: number) => void;
}

export const useDamageStore = create(
  subscribeWithSelector<DamageStore>(set => ({
    currentDamage: DamageLevels[1].newDamage,

    setDamage: newDamage => set({ currentDamage: newDamage }),
  })),
);
