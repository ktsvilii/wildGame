export interface UserData {
  telegramId: number | null;
  level: { level: number; totalPoints: number };
  coins: number;
  currentScore: number;
  upgrades: Upgrades;
  stats: Stats;
  fullEnergyRestore: string | null;
  lastEnergyUpdate: string | null;
  completedTasks: string[];
  friends: string[];
}

export interface Stats {
  damage: number;
  maxEnergy: number;
  recharge: number;
  energy: number;
}

export interface Upgrades {
  damageLevel: number;
  energyLevel: number;
  rechargeLevel: number;
}

export const UpgradeLevelType = {
  DAMAGE_LEVEL: 'damageLevel',
  ENERGY_LEVEL: 'energyLevel',
  RECHARGE_LEVEL: 'rechargeLevel',
} as const;

export type UpgradeLevelType = (typeof UpgradeLevelType)[keyof typeof UpgradeLevelType];

export const StatsType = {
  DAMAGE: 'damage',
  ENERGY: 'energy',
  MAX_ENERGY: 'maxEnergy',
  RECHARGE: 'recharge',
} as const;

export type StatsType = (typeof StatsType)[keyof typeof StatsType];
