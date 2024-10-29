import { useEffect, useState } from 'react';
import { fetchTasks, getOrCreateUser } from '../api';
import { useTasksStore } from '../stores/useTasksStore';
import { useUserStore } from '../stores/useUserStore';

export const useLayout = () => {
  const { setTasks, setCompletedTasks } = useTasksStore();
  const { setUserData } = useUserStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      setLoading(true);
      const userData = await getOrCreateUser();
      const tasks = await fetchTasks();

      const now = Date.now();
      let energy = 0;

      if (now >= userData.full) {
        energy = userData.stats.maxEnergy;
      } else {
        const elapsedTime = (now - userData.lastEnergyUpdate) / 1000;
        const rechargeSpeed = userData.stats.recharge / 1000;

        const rechargedEnergy = userData.stats.energy + elapsedTime * rechargeSpeed;

        const finalEnergy = Math.floor(Math.min(rechargedEnergy, userData.stats.maxEnergy));

        energy = finalEnergy;
      }

      setUserData({ ...userData, stats: { ...userData.stats, energy } });
      setTasks(tasks);

      setLoading(false);
    };

    initApp();
  }, [setCompletedTasks, setTasks, setUserData]);

  return { loading };
};
