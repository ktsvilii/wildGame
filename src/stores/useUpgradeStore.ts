import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';

import { canUpgrade } from '../utils';
import { useProgressStore } from './useProgressStore';
import { useEnergyStore } from './useEnergyStore';
import { useDamageStore } from './useDamageStore';
import { EnergyCapLevels, DamageLevels, RechargeLevels } from '../types/upgrades';

interface UpgradeStore {
  canUpgradeEnergy: boolean;
  canUpgradeDamage: boolean;
  canUpgradeRecharge: boolean;

  currentEnergyLevel: number;
  currentDamageLevel: number;
  currentRechargeLevel: number;

  upgradeEnergyLevel: () => void;
  upgradeDamageLevel: () => void;
  upgradeRechargeLevel: () => void;

  setUpgradeLevels: (newEnergyLevel: number, newDamageLevel: number, newRechargeLevel: number) => void;

  checkIsPossibleUpgradeEnergy: () => boolean;
  checkIsPossibleUpgradeDamage: () => boolean;
  checkIsPossibleUpgradeRecharge: () => boolean;
}

export const useUpgradeStore = create(
  subscribeWithSelector<UpgradeStore>((set, get) => ({
    canUpgradeEnergy: false,
    canUpgradeDamage: false,
    canUpgradeRecharge: false,
    currentEnergyLevel: 1,
    currentDamageLevel: 1,
    currentRechargeLevel: 1,

    setUpgradeLevels: (newEnergyLevel, newDamageLevel, newRechargeLevel) => {
      set({
        currentEnergyLevel: newEnergyLevel,
        currentDamageLevel: newDamageLevel,
        currentRechargeLevel: newRechargeLevel,
      });

      get().checkIsPossibleUpgradeEnergy();
      get().checkIsPossibleUpgradeDamage();
      get().checkIsPossibleUpgradeRecharge();
    },

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

    checkIsPossibleUpgradeRecharge: () => {
      const { currentRechargeLevel } = get();
      const { coins } = useProgressStore.getState();

      const canUpgradeRecharge = canUpgrade(currentRechargeLevel, RechargeLevels, coins);

      set({ canUpgradeRecharge });

      return canUpgradeRecharge;
    },

    upgradeEnergyLevel: () =>
      set(state => {
        const nextLevel = state.currentEnergyLevel + 1;
        const nextEnergyCap = EnergyCapLevels[nextLevel];
        const coins = useProgressStore.getState().coins;

        if (nextEnergyCap && coins >= nextEnergyCap.price) {
          useProgressStore.getState().upgrade(nextEnergyCap.price);

          set({ currentEnergyLevel: nextLevel });

          useEnergyStore.getState().setEnergy(useEnergyStore.getState().currentEnergy, nextEnergyCap.newEnergy);

          return {
            ...state,
            currentEnergyLevel: nextLevel,
            canUpgradeDamage: get().checkIsPossibleUpgradeDamage(),
            canUpgradeEnergy: get().checkIsPossibleUpgradeEnergy(),
            canUpgradeRecharge: get().checkIsPossibleUpgradeRecharge(),
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
          useProgressStore.getState().upgrade(nextDamage.price);

          set({ currentDamageLevel: nextLevel });

          useDamageStore.getState().setDamage(nextDamage.newDamage);

          return {
            ...state,
            currentDamageLevel: nextLevel,
            canUpgradeDamage: get().checkIsPossibleUpgradeDamage(),
            canUpgradeEnergy: get().checkIsPossibleUpgradeEnergy(),
            canUpgradeRecharge: get().checkIsPossibleUpgradeRecharge(),
          };
        }

        return state;
      }),

    upgradeRechargeLevel: () =>
      set(state => {
        const nextLevel = state.currentRechargeLevel + 1;
        const nextRecharge = RechargeLevels[nextLevel];
        const coins = useProgressStore.getState().coins;

        if (nextRecharge && coins >= nextRecharge.price) {
          useProgressStore.getState().upgrade(nextRecharge.price);

          set({ currentRechargeLevel: nextLevel });

          return {
            ...state,
            currentRechargeLevel: nextLevel,
            canUpgradeDamage: get().checkIsPossibleUpgradeDamage(),
            canUpgradeEnergy: get().checkIsPossibleUpgradeEnergy(),
            canUpgradeRecharge: get().checkIsPossibleUpgradeRecharge(),
          };
        }

        return state;
      }),
  })),
);
