import { useEffect, useState } from 'react';
import { fetchTasks, getOrCreateUser } from '../api';
import { useTasksStore } from '../stores/useTasksStore';
import { useProgressStore } from '../stores/useProgressStore';
import { useDamageStore } from '../stores/useDamageStore';
import { useEnergyStore } from '../stores/useEnergyStore';
import { useUpgradeStore } from '../stores/useUpgradeStore';
import { RechargeLevels } from '../types/upgrades';

export const useLayout = () => {
  const { setScore } = useProgressStore();
  const { setDamage } = useDamageStore();
  const { setEnergy } = useEnergyStore();
  const { setTasks } = useTasksStore();
  const { setUpgradeLevels } = useUpgradeStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      const { coins, settings, upgrades, fullEnergyRestore, lastEnergyUpdate } = await getOrCreateUser();
      const tasks = await fetchTasks();

      const now = Date.now();

      if (now >= fullEnergyRestore) {
        setEnergy(settings.maxEnergy, settings.maxEnergy);
      } else {
        const elapsedTime = (now - lastEnergyUpdate) / 1000;
        const rechargeSpeed = RechargeLevels[upgrades.currentRechargeLevel].speed / 1000;

        const rechargedEnergy = settings.currentEnergy + elapsedTime * rechargeSpeed;

        const finalEnergy = Math.floor(Math.min(rechargedEnergy, settings.maxEnergy));

        setEnergy(finalEnergy, settings.maxEnergy);
      }

      setScore(coins);
      setDamage(settings.currentDamage);
      setUpgradeLevels(upgrades.currentEnergyLevel, upgrades.currentDamageLevel, upgrades.currentRechargeLevel);
      setTasks(tasks);

      setLoading(false);
    };

    initApp();
  }, [setDamage, setEnergy, setScore, setTasks, setUpgradeLevels]);

  return { loading };
};
