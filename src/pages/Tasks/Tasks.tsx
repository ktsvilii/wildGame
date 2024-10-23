import { FC, useState } from 'react';
import { useTasksStore } from '../../stores/useTasksStore';

export const Tasks: FC = () => {
  const { tasks } = useTasksStore();

  return (
    <div className='flex flex-col items-center gap-7'>
      <h1 className='text-3xl mt-6 font-bold'>Tasks</h1>
      <div className='flex flex-col gap-5'>
        {tasks?.map(({ id, href, title, description, reward, completed }) => {
          return (
            <Task key={id} href={href} title={title} description={description} reward={reward} completed={completed} />
          );
        })}
      </div>
    </div>
  );
};

interface TaskProps {
  href: string;
  title: string;
  description: string;
  reward: number;
  completed: boolean;
}

export const Task: FC<TaskProps> = ({ href, title, description, reward, completed }) => {
  const [isSubscribed, setIsSubscribed] = useState<boolean | null>(null);

  const handleLinkClick = () => {
    console.log(href);
    return;
  };

  return (
    <button
      onClick={handleLinkClick}
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
