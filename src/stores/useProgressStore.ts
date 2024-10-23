import { create } from 'zustand';

import { canUpgrade, computeLevelByScore, levelScores } from '../utils';
import { DamageLevels, EnergyCapLevels, RechargeLevels } from '../types/upgrades';

interface ProgressState {
  coins: number;
  level: { level: number; totalPoints: number };
  currentScore: number;

  currentDamage: number;
  currentEnergy: number;
  maxEnergy: number;

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

  checkPossibleUpgrades: () => { canUpgradeEnergy: boolean; canUpgradeDamage: boolean; canUpgradeRecharge: boolean };
  upgrade: (upgradePrice: number) => void;

  addScore: (points: number) => void;
  regenerateEnergy: () => void;

  setScore: (newScore: number) => void;
  setDamage: (newDamage: number) => void;
  setEnergy: (currentEnergy: number, newEnergy: number) => void;
}

export const useProgressStore = create<ProgressState>((set, get) => ({
  coins: 0,
  currentScore: 0,
  level: computeLevelByScore(0),

  currentDamage: DamageLevels[1].newDamage,
  currentEnergy: EnergyCapLevels[1].newEnergy,
  maxEnergy: EnergyCapLevels[1].newEnergy,

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

    get().checkPossibleUpgrades();
  },

  checkPossibleUpgrades: () => {
    const { coins, currentEnergyLevel, currentDamageLevel, currentRechargeLevel } = get();

    const canUpgradeEnergy = canUpgrade(currentEnergyLevel, EnergyCapLevels, coins);
    const canUpgradeDamage = canUpgrade(currentDamageLevel, DamageLevels, coins);
    const canUpgradeRecharge = canUpgrade(currentRechargeLevel, RechargeLevels, coins);

    return { canUpgradeEnergy, canUpgradeDamage, canUpgradeRecharge };
  },

  upgradeEnergyLevel: () =>
    set(state => {
      const nextLevel = state.currentEnergyLevel + 1;
      const nextEnergyCap = EnergyCapLevels[nextLevel];
      const { coins } = state;

      if (nextEnergyCap && coins >= nextEnergyCap.price) {
        state.upgrade(nextEnergyCap.price);

        get().checkPossibleUpgrades();

        return { currentEnergyLevel: nextLevel, maxEnergy: nextEnergyCap.newEnergy };
      }

      return state;
    }),

  upgradeDamageLevel: () =>
    set(state => {
      const nextLevel = state.currentDamageLevel + 1;
      const nextDamage = DamageLevels[nextLevel];
      const { coins } = state;

      if (nextDamage && coins >= nextDamage.price) {
        state.upgrade(nextDamage.price);

        get().checkPossibleUpgrades();

        return { currentDamageLevel: nextLevel, currentDamage: nextDamage.newDamage };
      }

      return state;
    }),

  upgradeRechargeLevel: () =>
    set(state => {
      const nextLevel = state.currentRechargeLevel + 1;
      const nextRecharge = RechargeLevels[nextLevel];
      const { coins } = state;

      if (nextRecharge && coins >= nextRecharge.price) {
        state.upgrade(nextRecharge.price);

        get().checkPossibleUpgrades();

        return { currentRechargeLevel: nextLevel };
      }

      return state;
    }),

  addScore: points =>
    set(state => {
      if (state.currentEnergy >= points) {
        const newScore = state.coins + points;
        const newLevel = computeLevelByScore(newScore);
        const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

        get().checkPossibleUpgrades();

        return {
          coins: newScore,
          level: newLevel,
          currentScore,
          currentEnergy: state.currentEnergy - points,
        };
      }
      return state;
    }),

  upgrade: upgradePrice => {
    set(({ coins }) => ({
      coins: coins - upgradePrice,
      currentScore: coins - upgradePrice,
    }));
  },

  setScore: newScore =>
    set(() => {
      const newLevel = computeLevelByScore(newScore);
      const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

      get().checkPossibleUpgrades();

      return {
        coins: newScore,
        level: newLevel,
        currentScore,
      };
    }),

  regenerateEnergy: () =>
    set(state => {
      if (state.currentEnergy < state.maxEnergy) {
        return { currentEnergy: state.currentEnergy + 1 };
      }
      return state;
    }),

  setDamage: newDamage => set({ currentDamage: newDamage }),

  setEnergy: (newEnergy, newMaxEnergy) => set({ currentEnergy: newEnergy, maxEnergy: newMaxEnergy }),
}));
