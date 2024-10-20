import { FC } from 'react';

import WildCoin from '../assets/wildCoin.png';
import { useProgressStore } from '../stores/useProgressStore';

const ScoreBoard: FC = () => {
  const { coins } = useProgressStore();
  return (
    <div className='flex items-center gap-3'>
      <img src={WildCoin} className='w-16 h-16' alt='Wild Coin' />
      <span className='text-4xl'>{coins}</span>
    </div>
  );
};

export default ScoreBoard;
