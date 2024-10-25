import { FC } from 'react';
import { useTasksStore } from '../../stores/useTasksStore';
import { useProgressStore } from '../../stores/useProgressStore';
import { completeTask } from '../../api';
import { Task } from '../../types/tasks';
import { getTelegram } from '../../services/telegram';
import { useUpgradeStore } from '../../stores/useUpgradeStore';

export const Tasks: FC = () => {
  const { tasks, completedTasks, addCompletedTask } = useTasksStore();
  const { coins, currentScore, addReward } = useProgressStore();
  const { checkIsPossibleUpgradeEnergy, checkIsPossibleUpgradeDamage, checkIsPossibleUpgradeRecharge } =
    useUpgradeStore();
  const { tg } = getTelegram();

  const handleTaskClick = (task: Task) => {
    const { id, href, reward } = task;
    const isInternalLink = href.includes('t.me/');

    if (isInternalLink) {
      tg.openTelegramLink(href);
      completeTask(completedTasks, task, coins, currentScore);
      addReward(reward);
      addCompletedTask(id);
      checkIsPossibleUpgradeEnergy();
      checkIsPossibleUpgradeDamage();
      checkIsPossibleUpgradeRecharge();
    } else {
      tg.openLink(href);
      completeTask(completedTasks, task, coins, currentScore);
      addReward(reward);
      addCompletedTask(id);
      checkIsPossibleUpgradeEnergy();
      checkIsPossibleUpgradeDamage();
      checkIsPossibleUpgradeRecharge();
    }

    return;
  };

  return (
    <div className='flex flex-col items-center gap-7'>
      <h1 className='text-3xl mt-6 font-bold'>Tasks</h1>
      <div className='flex flex-col gap-5'>
        {tasks?.map(task => {
          return (
            <TaskItem
              key={task.id}
              task={task}
              handleTaskClick={handleTaskClick}
              completed={completedTasks?.includes(task.id)}
            />
          );
        })}
      </div>
    </div>
  );
};

interface TaskItemProps {
  task: Task;
  completed: boolean;
  handleTaskClick: (task: Task) => void;
}

export const TaskItem: FC<TaskItemProps> = ({ task, completed, handleTaskClick }) => {
  const { title, description, reward } = task;

  return (
    <button
      onClick={() => handleTaskClick(task)}
      className={`btn btn-outline min-w-80 justify-between ${completed && 'disabled'}`}
      disabled={completed}
    >
      <div className='text-start'>
        <p className='text-md text-start'>{title}</p>
        <p className='text-sm'>{description}</p>
      </div>
      <p className='text-lg'>Reward: {reward}</p>
    </button>
  );
};
