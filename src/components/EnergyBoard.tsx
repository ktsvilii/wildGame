import { FC } from 'react';
import { ImPower } from 'react-icons/im';
import { useUserStore } from '../stores/useUserStore';

const EnergyBoard: FC = () => {
  const { userData } = useUserStore();

  return (
    <div className='mt-5 flex flex-row items-center'>
      <p className='text-3xl'>
        {userData?.stats.energy ?? 0} / {userData?.stats.maxEnergy ?? 0}
      </p>
      <ImPower className='ml-2' size={28} />
    </div>
  );
};

export default EnergyBoard;
