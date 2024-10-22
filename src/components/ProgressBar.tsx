import { FC } from 'react';
import { useProgressStore } from '../stores/useProgressStore';

const ProgressBar: FC = () => {
  const { currentScore, level } = useProgressStore();

  return (
    <div className='w-72 mt-5'>
      <p>Level: {level.level + 1}</p>

      <progress className='progress' value={currentScore} max={level.totalPoints}></progress>
    </div>
  );
};

export default ProgressBar;
