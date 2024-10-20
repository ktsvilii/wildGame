import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { canUpgrade } from '../utils';
import { useProgressStore } from './useProgressStore';
import { EnergyCapLevels, DamageLevels } from '../types/upgrades';

interface UpgradeStore {
  canUpgradeEnergy: boolean;
  canUpgradeDamage: boolean;
  currentEnergyLevel: number;
  currentDamageLevel: number;
  upgradeEnergyLevel: () => void;
  upgradeDamageLevel: () => void;
  setUpgradeLevels: (
    newEnergyLevel: number,
    newDamageLevel: number,
    newCanUpgradeEnergy: boolean,
    newCanUpgradeDamage: boolean,
  ) => void;
  checkIsPossibleUpgradeEnergy: () => boolean;
  checkIsPossibleUpgradeDamage: () => boolean;
}

export const useUpgradeStore = create(
  subscribeWithSelector<UpgradeStore>((set, get) => ({
    canUpgradeEnergy: false,
    canUpgradeDamage: false,
    currentEnergyLevel: 1,
    currentDamageLevel: 1,

    setUpgradeLevels: (newEnergyLevel, newDamageLevel, newCanUpgradeEnergy, newCanUpgradeDamage) =>
      set({
        currentEnergyLevel: newEnergyLevel,
        currentDamageLevel: newDamageLevel,
        canUpgradeEnergy: newCanUpgradeEnergy,
        canUpgradeDamage: newCanUpgradeDamage,
      }),

    checkIsPossibleUpgradeEnergy: () => {
      const { currentEnergyLevel } = get();
      const { coins } = useProgressStore.getState();

      const canUpgradeEnergy = canUpgrade(currentEnergyLevel, EnergyCapLevels, coins);

      set({ canUpgradeEnergy });

      return canUpgradeEnergy;
    },

    checkIsPossibleUpgradeDamage: () => {
      const { currentDamageLevel } = get();
      const { coins } = useProgressStore.getState();

      const canUpgradeDamage = canUpgrade(currentDamageLevel, DamageLevels, coins);

      set({ canUpgradeDamage });

      return canUpgradeDamage;
    },

    upgradeEnergyLevel: () =>
      set(state => {
        const nextLevel = state.currentEnergyLevel + 1;
        const nextEnergyCap = EnergyCapLevels[nextLevel];
        const coins = useProgressStore.getState().coins;

        if (nextEnergyCap && coins >= nextEnergyCap.price) {
          useProgressStore.getState().calculateUpgrade(nextEnergyCap.price);

          set({
            currentEnergyLevel: nextLevel,
          });

          return {
            ...state,
            currentEnergyLevel: nextLevel,
            canUpgradeDamage: get().checkIsPossibleUpgradeDamage(),
            canUpgradeEnergy: get().checkIsPossibleUpgradeEnergy(),
          };
        }

        return state;
      }),

    upgradeDamageLevel: () =>
      set(state => {
        const nextLevel = state.currentDamageLevel + 1;
        const nextDamage = DamageLevels[nextLevel];
        const coins = useProgressStore.getState().coins;

        if (nextDamage && coins >= nextDamage.price) {
          useProgressStore.getState().calculateUpgrade(nextDamage.price);

          set({
            currentDamageLevel: nextLevel,
          });

          return {
            ...state,
            currentDamageLevel: nextLevel,
            canUpgradeDamage: get().checkIsPossibleUpgradeDamage(),
            canUpgradeEnergy: get().checkIsPossibleUpgradeEnergy(),
          };
        }

        return state;
      }),
  })),
);
