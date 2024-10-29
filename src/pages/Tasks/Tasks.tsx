import { FC } from 'react';
import { useTasksStore } from '../../stores/useTasksStore';
import { completeTask } from '../../api';
import { Task } from '../../types/tasks';
import { getTelegram } from '../../services/telegram';
import { useUserStore } from '../../stores/useUserStore';

export const Tasks: FC = () => {
  const { tasks, completedTasks, addCompletedTask } = useTasksStore();
  const { userData, addReward, checkPossibleUpgrades } = useUserStore();
  const { tg } = getTelegram();

  const handleStoreUpdate = (
    completedTasks: string[],
    task: Task,
    coins: number,
    currentScore: number,
    reward: number,
    id: string,
  ) => {
    completeTask(completedTasks, task, coins, currentScore);
    addReward(reward);
    addCompletedTask(id);
    checkPossibleUpgrades();
  };

  const handleTaskClick = (task: Task) => {
    if (!userData) return;

    const { id, href, reward } = task;
    const isInternalLink = href.includes('t.me/');
    const { coins, currentScore } = userData;

    if (isInternalLink) {
      tg.openTelegramLink(href);
    } else {
      tg.openLink(href);
    }
    handleStoreUpdate(completedTasks, task, coins, currentScore, reward, id);
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
