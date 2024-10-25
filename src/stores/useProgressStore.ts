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

  setUpgradeLevels: (newEnergyLevel: number, newDamageLevel: number, newRechargeLevel: number) => void;

  checkPossibleUpgrades: () => { canUpgradeEnergy: boolean; canUpgradeDamage: boolean; canUpgradeRecharge: boolean };
  upgrade: (upgradePrice: number) => void;

  addScore: (points: number) => void;
  addReward: (points: number) => void;
  regenerateEnergy: () => void;

  setScore: (newScore: number) => void;
  setDamage: (newDamage: number) => void;
  setEnergy: (currentEnergy: number, newEnergy: number) => void;
  setStore: (
    coins: number,
    currentDamage: number,
    currentEnergyLevel: number,
    currentDamageLevel: number,
    currentRechargeLevel: number,
  ) => void;
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
  },

  checkPossibleUpgrades: () => {
    const { coins, currentEnergyLevel, currentDamageLevel, currentRechargeLevel } = get();

    const canUpgradeEnergy = canUpgrade(currentEnergyLevel, EnergyCapLevels, coins);
    const canUpgradeDamage = canUpgrade(currentDamageLevel, DamageLevels, coins);
    const canUpgradeRecharge = canUpgrade(currentRechargeLevel, RechargeLevels, coins);

    return { canUpgradeEnergy, canUpgradeDamage, canUpgradeRecharge };
  },

  addScore: points =>
    set(state => {
      if (state.currentEnergy >= points) {
        const newScore = state.coins + points;
        const newLevel = computeLevelByScore(newScore);
        const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

        return {
          coins: newScore,
          level: newLevel,
          currentScore,
          currentEnergy: state.currentEnergy - points,
        };
      }
      return state;
    }),

  addReward: points =>
    set(state => {
      const newScore = state.coins + points;
      const newLevel = computeLevelByScore(newScore);
      const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

      get().checkPossibleUpgrades();
      return {
        coins: newScore,
        currentScore,
      };
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

  setStore: (coins, currentDamage, currentDamageLevel, currentEnergyLevel, currentRechargeLevel) =>
    set({
      coins,
      currentDamage,
      currentDamageLevel,
      currentEnergyLevel,
      currentRechargeLevel,
    }),
}));
