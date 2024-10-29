import { useEffect } from 'react';
import { useUserStore } from '../../stores/useUserStore';
import { DamageLevels, EnergyCapLevels, RechargeLevels } from '../../types/upgrades';
import { UpgradeLevelType, Upgrades as UpgradeType, Stats, StatsType } from '../../types/user';
import { handleUpgrade as apiHandleUpgrade } from '../../api';

export const useUpgrades = () => {
  const { userData, checkPossibleUpgrades, upgradeLevel } = useUserStore();

  useEffect(() => {
    if (!userData) return;
    checkPossibleUpgrades();
  }, [userData?.coins, checkPossibleUpgrades]);

  if (!userData) return null;

  const {
    upgrades: { damageLevel, energyLevel, rechargeLevel },
    coins,
    currentScore,
  } = userData;

  const nextDamageUpgradePrice = DamageLevels[damageLevel + 1]?.price;
  const nextEnergyUpgradePrice = EnergyCapLevels[energyLevel + 1]?.price;
  const nextRechargeUpgradePrice = RechargeLevels[rechargeLevel + 1]?.price;

  const canUpgradeDamage = coins >= (nextDamageUpgradePrice || Infinity);
  const canUpgradeEnergy = coins >= (nextEnergyUpgradePrice || Infinity);
  const canUpgradeRecharge = coins >= (nextRechargeUpgradePrice || Infinity);

  const handleUpgrade = async (
    type: UpgradeLevelType,
    newStats: Partial<Stats>,
    newUpgrades: Partial<UpgradeType>,
    updatePrice: number,
  ) => {
    const updatedStats = { ...userData.stats, ...newStats };
    const updatedUpgrades = { ...userData.upgrades, ...newUpgrades };

    const newCoins = coins - updatePrice;
    const newCurrentScore = currentScore - updatePrice;
    upgradeLevel(type, Object.keys(newStats)[0] as StatsType);
    await apiHandleUpgrade(newCoins, newCurrentScore, updatedStats, updatedUpgrades);
  };

  const handleEnergyLevel = async () => {
    if (!userData) return;

    const { energyLevel } = userData.upgrades;
    await handleUpgrade(
      UpgradeLevelType.ENERGY_LEVEL,
      { maxEnergy: EnergyCapLevels[energyLevel + 1].energy },
      { energyLevel: energyLevel + 1 },
      nextEnergyUpgradePrice,
    );
  };

  const handleDamageLevel = async () => {
    if (!userData) return;

    const { damageLevel } = userData.upgrades;
    await handleUpgrade(
      UpgradeLevelType.DAMAGE_LEVEL,
      { damage: DamageLevels[damageLevel + 1].damage },
      { damageLevel: damageLevel + 1 },
      nextDamageUpgradePrice,
    );
  };

  const handleRechargeLevel = async () => {
    if (!userData) return;

    const { rechargeLevel } = userData.upgrades;
    await handleUpgrade(
      UpgradeLevelType.RECHARGE_LEVEL,
      { recharge: RechargeLevels[rechargeLevel + 1].speed },
      { rechargeLevel: rechargeLevel + 1 },
      nextRechargeUpgradePrice,
    );
  };

  return {
    nextDamageUpgradePrice,
    nextEnergyUpgradePrice,
    nextRechargeUpgradePrice,
    canUpgradeDamage,
    canUpgradeEnergy,
    canUpgradeRecharge,
    handleEnergyLevel,
    handleDamageLevel,
    handleRechargeLevel,
  };
};
