import database from '../services/database';
import { getTelegram } from '../services/telegram';
import { Task } from '../types/tasks';
import { Upgrades, Stats } from '../types/user';
import { computeLevelByScore } from '../utils';

const { user } = getTelegram();

const USER_ID = user?.id || 4242;

export const fetchTasks = async () => {
  const { data } = await database.from('tasks').select('*');
  return data as Task[];
};

export const getOrCreateUser = async () => {
  const potentialUser = await database.from('users').select().eq('telegramId', USER_ID);

  if (potentialUser.data?.length) {
    return potentialUser.data[0];
  }

  const newUser = {
    telegramId: USER_ID,
    level: computeLevelByScore(0),
    coins: 0,
    currentScore: 0,
    upgrades: {
      energyLevel: 1,
      damageLevel: 1,
      rechargeLevel: 1,
    },
    stats: {
      damage: 1,
      energy: 500,
      maxEnergy: 500,
      recharge: 1500,
    },
    fullEnergyRestore: null,
    lastEnergyUpdate: null,
    completedTasks: [],
    friends: {},
  };

  await database.from('users').insert(newUser);
  return newUser;
};

export const updateCoinsAndSettings = async (
  coins: number,
  newStats: Stats,
  fullEnergyRestore: number,
  lastEnergyUpdate: number,
) => {
  await database
    .from('users')
    .update({ coins, stats: newStats, fullEnergyRestore, lastEnergyUpdate })
    .eq('telegramId', USER_ID);
};

export const handleUpgrade = async (
  newCoins: number,
  newCurrentScore: number,
  newStats: Stats,
  newUpgrades: Upgrades,
) => {
  await database
    .from('users')
    .update({
      coins: newCoins,
      currentScore: newCurrentScore,
      upgrades: newUpgrades,
      stats: newStats,
    })
    .eq('telegramId', USER_ID);
};

export const fetchCompletedTasks = async () => {
  await database.from('users').select('completedTasks').eq('telegramId', USER_ID);
};

export const completeTask = async (
  completedTasks: string[],
  task: Task,
  currentCoins: number,
  currentScore: number,
) => {
  const newCoins = currentCoins + task.reward;
  const newScore = currentScore + task.reward;

  await database
    .from('users')
    .update({
      completedTasks: [...completedTasks, task.id],
      coins: newCoins,
      currentScore: newScore,
    })
    .eq('telegramId', USER_ID);
};
