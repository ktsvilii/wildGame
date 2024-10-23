import { useEffect } from 'react';
import { fetchTasks, getOrCreateUser } from '../api';
import { useTasksStore } from '../stores/useTasksStore';
import { useProgressStore } from '../stores/useProgressStore';

export const useLayout = () => {
  const { setDamage, setEnergy, setScore, setUpgradeLevels } = useProgressStore();
  const { setTasks } = useTasksStore();

  useEffect(() => {
    const initApp = async () => {
      const { coins, settings, upgrades, fullEnergyRestore } = await getOrCreateUser();
      const tasks = await fetchTasks();

      const now = Date.now();

      if (now >= fullEnergyRestore) {
        setEnergy(settings.maxEnergy, settings.maxEnergy);
      } else {
        const remainingTime = (fullEnergyRestore - now) / 1000;
        const rechargedEnergy = Math.max(0, settings.currentEnergy + remainingTime);

        setEnergy(rechargedEnergy, settings.maxEnergy);
      }

      setScore(coins);
      setDamage(settings.currentDamage);
      setUpgradeLevels(upgrades.currentEnergyLevel, upgrades.currentDamageLevel, upgrades.currentRechargeLevel);
      setTasks(tasks);
    };

    initApp();
  }, [setDamage, setEnergy, setScore, setTasks, setUpgradeLevels]);
};
