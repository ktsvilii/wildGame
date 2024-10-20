import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { DamageLevels } from '../types/upgrades';

interface DamageStore {
  currentDamage: number;
  damageLevel: number;
  setDamage: (newDamage: number, newDamageLevel: number) => void;
}

export const useDamageStore = create(
  subscribeWithSelector<DamageStore>(set => ({
    currentDamage: DamageLevels[1].newDamage,
    damageLevel: 1,

    setDamage: (newDamage, newDamageLevel) => set({ currentDamage: newDamage, damageLevel: newDamageLevel }),
  })),
);
