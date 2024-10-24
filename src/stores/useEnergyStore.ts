import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { EnergyCapLevels } from '../types/upgrades';
import { useUpgradeStore } from './useUpgradeStore';

interface EnergyStore {
  currentEnergy: number;
  maxEnergy: number;
  spendEnergy: (amountToUse: number) => void;
  regenerateEnergy: () => void;
  setEnergy: (newEnergy: number, newMaxEnergy: number) => void;
}

export const useEnergyStore = create(
  subscribeWithSelector<EnergyStore>(set => ({
    currentEnergy: EnergyCapLevels[1].newEnergy,
    maxEnergy: EnergyCapLevels[1].newEnergy,

    spendEnergy: amountToUse =>
      set(state => {
        if (state.currentEnergy >= amountToUse) {
          useUpgradeStore.getState().checkIsPossibleUpgradeEnergy();
          useUpgradeStore.getState().checkIsPossibleUpgradeDamage();
          useUpgradeStore.getState().checkIsPossibleUpgradeRecharge();
          return { currentEnergy: state.currentEnergy - amountToUse };
        }
        return state;
      }),

    regenerateEnergy: () =>
      set(state => {
        if (state.currentEnergy < state.maxEnergy) {
          return { currentEnergy: state.currentEnergy + 1 };
        }
        return state;
      }),

    setEnergy: (newEnergy, newMaxEnergy) => set({ currentEnergy: newEnergy, maxEnergy: newMaxEnergy }),
  })),
);
