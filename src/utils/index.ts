import { UpgradeLevels } from '../types/upgrades';

export const canUpgrade = (level: number, Levels: UpgradeLevels, coins: number) => {
  const nextLevel = level + 1;
  const nextUpgradePrice = Levels[nextLevel]?.price;
  return coins >= (nextUpgradePrice || Infinity);
};
