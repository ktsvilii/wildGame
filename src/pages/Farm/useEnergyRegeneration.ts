import { useEffect } from 'react';
import { useEnergyStore } from '../../stores/useEnergyStore';

export const useEnergyRegeneration = () => {
  const { currentEnergy, maxEnergy, regenerateEnergy } = useEnergyStore();

  useEffect(() => {
    const timerId = setInterval(regenerateEnergy, 1000);

    return () => clearInterval(timerId);
  }, [currentEnergy, maxEnergy, regenerateEnergy]);
};
