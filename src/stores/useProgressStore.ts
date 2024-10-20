import { create } from 'zustand';

import { useUpgradeStore } from './useUpgradeStore';

export const BASE_LEVEL_SCORE = 50;

const levels = new Array(5).fill(0).map((_, i) => BASE_LEVEL_SCORE * Math.pow(2, i));

const levelScores = levels.map((_, level) => {
  return levels.reduce((acc, value, index) => {
    return index <= level ? acc + value : acc;
  }, 0);
});

const computeLevelByScore = (coins: number) => {
  for (const [index, value] of levelScores.entries()) {
    if (coins <= value) {
      return {
        level: index,
        totalPoints: levels[index],
      };
    }
  }
  return {
    level: levelScores.length - 1,
    totalPoints: levels[levels.length - 1],
  };
};

interface ProgressState {
  coins: number;
  level: { level: number; totalPoints: number };
  currentScore: number;
  addScore: (points: number) => void;
  calculateUpgrade: (upgradePrice: number) => void;
  setScore: (newScore: number) => void;
}

export const useProgressStore = create<ProgressState>(set => ({
  coins: 0,
  currentScore: 0,
  level: computeLevelByScore(0),

  addScore: points =>
    set(state => {
      const newScore = state.coins + points;
      const newLevel = computeLevelByScore(newScore);
      const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

      useUpgradeStore.getState().checkIsPossibleUpgradeEnergy();
      useUpgradeStore.getState().checkIsPossibleUpgradeDamage();
      useUpgradeStore.getState().checkIsPossibleUpgradeRecharge();

      return {
        coins: newScore,
        level: newLevel,
        currentScore,
      };
    }),

  calculateUpgrade: upgradePrice => {
    set(state => ({
      coins: state.coins - upgradePrice,
    }));
  },

  setScore: newScore =>
    set(() => {
      const newLevel = computeLevelByScore(newScore);
      const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

      useUpgradeStore.getState().checkIsPossibleUpgradeEnergy();
      useUpgradeStore.getState().checkIsPossibleUpgradeDamage();
      useUpgradeStore.getState().checkIsPossibleUpgradeRecharge();

      return {
        coins: newScore,
        level: newLevel,
        currentScore,
      };
    }),
}));
