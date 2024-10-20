export type UpgradeLevels =
  | Record<string, { newDamage: number; price: number }>
  | Record<string, { newEnergy: number; price: number }>
  | Record<string, { speed: number; price: number }>;

export const DamageLevels: Record<string, { newDamage: number; price: number }> = {
  '1': { newDamage: 1, price: 0 },
  '2': { newDamage: 2, price: 2 },
  '3': { newDamage: 3, price: 4 },
  '4': { newDamage: 4, price: 4096 },
  '5': { newDamage: 5, price: 8192 },
  '6': { newDamage: 6, price: 16384 },
  '7': { newDamage: 7, price: 32768 },
};

export const EnergyCapLevels: Record<string, { newEnergy: number; price: number }> = {
  '1': { newEnergy: 500, price: 0 },
  '2': { newEnergy: 700, price: 10 },
  '3': { newEnergy: 900, price: 2048 },
  '4': { newEnergy: 1100, price: 4096 },
  '5': { newEnergy: 1300, price: 8192 },
  '6': { newEnergy: 1500, price: 16384 },
  '7': { newEnergy: 1700, price: 32768 },
};

export const RechargeLevels: Record<string, { speed: number; price: number }> = {
  '1': { speed: 1500, price: 0 },
  '2': { speed: 1200, price: 2 },
  '3': { speed: 900, price: 3 },
  '4': { speed: 500, price: 4 },
};
