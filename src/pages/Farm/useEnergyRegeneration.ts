import { useEffect } from 'react';
import { useEnergyStore } from '../../stores/useEnergyStore';
import { useUpgradeStore } from '../../stores/useUpgradeStore';
import { RechargeLevels } from '../../types/upgrades';

export const useEnergyRegeneration = () => {
  const { currentEnergy, maxEnergy, regenerateEnergy } = useEnergyStore();
  const { currentRechargeLevel } = useUpgradeStore();

  useEffect(() => {
    const timerId = setInterval(regenerateEnergy, RechargeLevels[currentRechargeLevel].speed);

    return () => clearInterval(timerId);
  }, [currentEnergy, currentRechargeLevel, maxEnergy, regenerateEnergy]);
};
