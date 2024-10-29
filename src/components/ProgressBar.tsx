import { FC } from 'react';
import { useUserStore } from '../stores/useUserStore';

const ProgressBar: FC = () => {
  const { userData } = useUserStore();

  return (
    <div className='w-72 mt-5'>
      <p>Level: {(userData?.level.level ?? 0) + 1}</p>

      <progress className='progress' value={userData?.currentScore} max={userData?.level.totalPoints}></progress>
    </div>
  );
};

export default ProgressBar;
