import { useEffect } from 'react';
import { useUserStore } from '../../stores/useUserStore';

export const useEnergyRegeneration = () => {
  const { regenerateEnergy, userData } = useUserStore();

  useEffect(() => {
    const timerId = setInterval(regenerateEnergy, userData?.stats.recharge);

    return () => clearInterval(timerId);
  }, [userData?.stats.energy, userData?.upgrades.rechargeLevel, userData?.stats.maxEnergy, regenerateEnergy]);
};
