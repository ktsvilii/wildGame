import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { StatsType, UpgradeLevelType, UserData } from '../types/user';
import { computeLevelByScore, levelScores } from '../utils';
import { DamageLevels, EnergyCapLevels, RechargeLevels } from '../types/upgrades';

interface UserStore {
  userData: UserData | null;
  setUserData: (newUserData: UserData) => void;
  hitBoss: (points: number) => void;
  addReward: (points: number) => void;
  regenerateEnergy: () => void;
  checkPossibleUpgrades: () => void;
  upgradeLevel: (statLevel: UpgradeLevelType, stat: StatsType) => void;
}

export const useUserStore = create(
  immer<UserStore>(set => ({
    userData: null,

    setUserData: newUserData =>
      set(state => {
        state.userData = newUserData;

        const newLevel = computeLevelByScore(state.userData.coins);
        const currentScore = state.userData.coins - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

        state.userData.level = newLevel;
        state.userData.currentScore = currentScore;
      }),

    hitBoss: points =>
      set(state => {
        if (state.userData && state.userData.stats.energy >= points) {
          const newScore = state.userData.coins + points;
          const newLevel = computeLevelByScore(newScore);
          const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

          state.userData.coins = newScore;
          state.userData.level = newLevel;
          state.userData.currentScore = currentScore;
          state.userData.stats.energy -= points;
        }
      }),

    addReward: points =>
      set(state => {
        if (state.userData) {
          const newScore = state.userData.coins + points;
          const newLevel = computeLevelByScore(newScore);
          const currentScore = newScore - (newLevel.level === 0 ? 0 : levelScores[newLevel.level - 1]);

          state.userData.coins = newScore;
          state.userData.level = newLevel;
          state.userData.currentScore = currentScore;
        }
      }),

    regenerateEnergy: () =>
      set(state => {
        if (state.userData && state.userData.stats.energy < state.userData.stats.maxEnergy) {
          state.userData.stats.energy += 1;
        }
      }),

    checkPossibleUpgrades: () =>
      set(state => {
        if (!state.userData) return;

        const { coins, upgrades } = state.userData;
        const upgradeAvailability = {
          damageLevel: false,
          energyLevel: false,
          rechargeLevel: false,
        };

        if (DamageLevels[upgrades.damageLevel + 1]?.price <= coins) {
          upgradeAvailability.damageLevel = true;
        }

        if (EnergyCapLevels[upgrades.energyLevel + 1]?.price <= coins) {
          upgradeAvailability.energyLevel = true;
        }

        if (RechargeLevels[upgrades.rechargeLevel + 1]?.price <= coins) {
          upgradeAvailability.rechargeLevel = true;
        }

        return { upgradeAvailability };
      }),

    upgradeLevel: (statLevel, stat) =>
      set(state => {
        if (!state.userData) return;

        const nextLevel = state.userData.upgrades[statLevel] + 1;
        let nextUpgrade;

        switch (statLevel) {
          case UpgradeLevelType.DAMAGE_LEVEL:
            nextUpgrade = DamageLevels[nextLevel];
            break;
          case UpgradeLevelType.ENERGY_LEVEL:
            nextUpgrade = EnergyCapLevels[nextLevel];
            break;
          case UpgradeLevelType.RECHARGE_LEVEL:
            nextUpgrade = RechargeLevels[nextLevel];
            break;
          default:
            return;
        }

        if (nextUpgrade && state.userData.coins >= nextUpgrade.price) {
          state.userData.coins -= nextUpgrade.price;

          if (stat === StatsType.DAMAGE && 'damage' in nextUpgrade) {
            state.userData.stats.damage = nextUpgrade.damage;
          } else if (stat === StatsType.MAX_ENERGY && 'energy' in nextUpgrade) {
            state.userData.stats.maxEnergy = nextUpgrade.energy;
          } else if (stat === StatsType.RECHARGE && 'speed' in nextUpgrade) {
            state.userData.stats.recharge = nextUpgrade.speed;
          }

          state.userData.upgrades[statLevel] = nextLevel;
        }
      }),
  })),
);
