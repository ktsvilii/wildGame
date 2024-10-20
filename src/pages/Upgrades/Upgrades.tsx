import { FC } from 'react';

import ScoreBoard from '../../components/ScoreBoard';

import { GiBiceps } from 'react-icons/gi';
import { ImPower } from 'react-icons/im';
import { useUpgradeStore } from '../../stores/useUpgradeStore';

export const Upgrades: FC = () => {
  const { canUpgradeDamage, canUpgradeEnergy, upgradeEnergyLevel, upgradeDamageLevel } = useUpgradeStore();

  return (
    <div className='flex flex-col items-center gap-7'>
      <h1 className='text-4xl mt-10 font-bold'>Upgrade your stats</h1>

      <ScoreBoard />

      <div className='flex flex-col gap-20 flex-grow p-5'>
        <UpgradeButton
          title='Get stronger!'
          handleUpgrade={canUpgradeDamage ? upgradeDamageLevel : undefined}
          Icon={GiBiceps}
          canUpgrade={canUpgradeDamage}
        />
        <UpgradeButton
          title='Get more resilient!'
          handleUpgrade={canUpgradeEnergy ? upgradeEnergyLevel : undefined}
          Icon={ImPower}
          canUpgrade={canUpgradeEnergy}
        />
      </div>
    </div>
  );
};

interface UpgradeButtonProps {
  title: string;
  canUpgrade: boolean;
  Icon: React.ElementType;
  handleUpgrade?: () => void;
}

const UpgradeButton: FC<UpgradeButtonProps> = ({ title, Icon, canUpgrade, handleUpgrade }) => {
  return (
    <button
      className='btn p-10 size-full card bg-base-100 w-full shadow-xl border-gray-600 border'
      disabled={!canUpgrade && !handleUpgrade}
      onClick={handleUpgrade}
    >
      <div className='flex flex-row justify-center items-center gap-10'>
        <h2 className='flex-1 text-2xl '>{title}</h2>
        <Icon size={100} />
      </div>
    </button>
  );
};
