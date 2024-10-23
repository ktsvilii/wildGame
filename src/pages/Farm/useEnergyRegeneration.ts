import { useEffect } from 'react';

import { RechargeLevels } from '../../types/upgrades';
import { useProgressStore } from '../../stores/useProgressStore';

export const useEnergyRegeneration = () => {
  const { currentEnergy, maxEnergy, currentRechargeLevel, regenerateEnergy } = useProgressStore();

  useEffect(() => {
    const timerId = setInterval(regenerateEnergy, RechargeLevels[currentRechargeLevel].speed);

    return () => clearInterval(timerId);
  }, [currentEnergy, currentRechargeLevel, maxEnergy, regenerateEnergy]);
};
