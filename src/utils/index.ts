import { UpgradeLevels } from '../types/upgrades';

export const canUpgrade = (level: number, Levels: UpgradeLevels, coins: number) => {
  const nextLevel = level + 1;
  const nextUpgradePrice = Levels[nextLevel]?.price;
  return coins >= (nextUpgradePrice || Infinity);
};

export const BASE_LEVEL_SCORE = 150;

export const levels = new Array(5).fill(0).map((_, i) => BASE_LEVEL_SCORE * Math.pow(2, i));

export const levelScores = levels.map((_, level) => {
  return levels.reduce((acc, value, index) => {
    return index <= level ? acc + value : acc;
  }, 0);
});

export const computeLevelByScore = (coins: number) => {
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
