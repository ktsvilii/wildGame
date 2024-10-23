import database from '../services/database';
import { getTelegram } from '../services/telegram';
import { Task } from '../types/tasks';

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
    level: { level: 1, totalPoints: 50 },
    coins: 0,
    currentScore: 0,
    upgrades: {
      currentEnergyLevel: 1,
      currentDamageLevel: 1,
      currentRechargeLevel: 1,
    },
    settings: {
      currentDamage: 1,
      currentEnergy: 500,
      maxEnergy: 500,
    },
    fullEnergyRestore: null,
    friends: {},
  };

  await database.from('users').insert(newUser);
  return newUser;
};

export const updateCoinsAndSettings = async (
  coins: number,
  currentEnergy: number,
  currentDamage: number,
  maxEnergy: number,
  fullEnergyRestore: number,
) => {
  await database
    .from('users')
    .update({ coins, settings: { currentEnergy, currentDamage, maxEnergy }, fullEnergyRestore })
    .eq('telegramId', USER_ID);
};
