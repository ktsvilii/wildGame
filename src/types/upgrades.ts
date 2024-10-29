export type UpgradeLevels =
  | Record<string, { damage: number; price: number }>
  | Record<string, { energy: number; price: number }>
  | Record<string, { speed: number; price: number }>;

export const DamageLevels: Record<string, { damage: number; price: number }> = {
  '1': { damage: 1, price: 0 },
  '2': { damage: 2, price: 2 },
  '3': { damage: 3, price: 4 },
  '4': { damage: 4, price: 4096 },
  '5': { damage: 5, price: 8192 },
  '6': { damage: 6, price: 16384 },
  '7': { damage: 7, price: 32768 },
};

export const EnergyCapLevels: Record<string, { energy: number; price: number }> = {
  '1': { energy: 500, price: 0 },
  '2': { energy: 700, price: 10 },
  '3': { energy: 900, price: 2048 },
  '4': { energy: 1100, price: 4096 },
  '5': { energy: 1300, price: 8192 },
  '6': { energy: 1500, price: 16384 },
  '7': { energy: 1700, price: 32768 },
};

export const RechargeLevels: Record<string, { speed: number; price: number }> = {
  '1': { speed: 1500, price: 0 },
  '2': { speed: 1200, price: 2 },
  '3': { speed: 900, price: 3 },
  '4': { speed: 500, price: 4 },
};
