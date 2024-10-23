import { useEffect } from 'react';
import { fetchTasks, getOrCreateUser } from '../api';
import { useTasksStore } from '../stores/useTasksStore';
import { useProgressStore } from '../stores/useProgressStore';
import { useDamageStore } from '../stores/useDamageStore';
import { useEnergyStore } from '../stores/useEnergyStore';
import { useUpgradeStore } from '../stores/useUpgradeStore';

export const useLayout = () => {
  const { setScore } = useProgressStore();
  const { setDamage } = useDamageStore();
  const { setEnergy } = useEnergyStore();
  const { setTasks } = useTasksStore();
  const { setUpgradeLevels } = useUpgradeStore();

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
      setDamage(settings.damage);
      setUpgradeLevels(upgrades.currentEnergyLevel, upgrades.currentDamageLevel, upgrades.currentRechargeLevel);
      setTasks(tasks);
    };

    initApp();
  }, [setDamage, setEnergy, setScore, setTasks, setUpgradeLevels]);
};
