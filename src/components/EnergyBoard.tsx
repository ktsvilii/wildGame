import { FC } from 'react';
import { useEnergyStore } from '../stores/useEnergyStore';
import { ImPower } from 'react-icons/im';

const EnergyBoard: FC = () => {
  const { currentEnergy, maxEnergy } = useEnergyStore();

  return (
    <div className='mt-5 flex flex-row items-center'>
      <p className='text-3xl'>
        {currentEnergy} / {maxEnergy}
      </p>
      <ImPower className='ml-2' size={28} />
    </div>
  );
};

export default EnergyBoard;
