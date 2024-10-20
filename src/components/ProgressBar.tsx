import { FC } from 'react';
import { useProgressStore } from '../stores/useProgressStore';

const ProgressBar: FC = () => {
  const { coins, level } = useProgressStore();

  return (
    <div className='w-72 mt-10'>
      <p>Level: {level.level + 1}</p>

      <progress className='progress' value={coins} max={level.totalPoints + coins}></progress>
    </div>
  );
};

export default ProgressBar;
