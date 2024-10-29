import { FC } from 'react';

import WildCoin from '../assets/wildCoin.png';
import { useUserStore } from '../stores/useUserStore';

const ScoreBoard: FC = () => {
  const { userData } = useUserStore();
  return (
    <div className='flex items-center gap-3'>
      <img src={WildCoin} className='w-16 h-16' alt='Wild Coin' />
      <span className='text-4xl'>{userData?.coins}</span>
    </div>
  );
};

export default ScoreBoard;
