import { FC } from 'react';

import ScoreBoard from '../../components/ScoreBoard';

import { GiBiceps } from 'react-icons/gi';
import { ImPower } from 'react-icons/im';
import WildCoin from '../../assets/wildCoin.png';
import { useUpgradeStore } from '../../stores/useUpgradeStore';
import { DamageLevels, EnergyCapLevels } from '../../types/upgrades';

export const Upgrades: FC = () => {
  const {
    canUpgradeDamage,
    canUpgradeEnergy,
    currentDamageLevel,
    currentEnergyLevel,
    upgradeEnergyLevel,
    upgradeDamageLevel,
  } = useUpgradeStore();

  const nextDamageUpgradePrice = DamageLevels[currentDamageLevel + 1].price;
  const nextEnergyUpgradePrice = EnergyCapLevels[currentEnergyLevel + 1].price;

  return (
    <div className='flex flex-col items-center gap-7'>
      <h1 className='text-4xl mt-10 font-bold'>Upgrade your stats</h1>

      <ScoreBoard />

      <div className='flex flex-col gap-20 flex-grow p-5'>
        <UpgradeButton
          title='Hit power'
          nextUpgrade={nextDamageUpgradePrice}
          handleUpgrade={canUpgradeDamage ? upgradeDamageLevel : undefined}
          Icon={GiBiceps}
          canUpgrade={canUpgradeDamage}
        />
        <UpgradeButton
          title='Max energy'
          nextUpgrade={nextEnergyUpgradePrice}
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
  nextUpgrade: number;
  Icon: React.ElementType;
  handleUpgrade?: () => void;
}

const UpgradeButton: FC<UpgradeButtonProps> = ({ title, Icon, canUpgrade, nextUpgrade, handleUpgrade }) => {
  return (
    <button
      className='btn p-5 size-full bg-base-100 shadow-xl border-gray-600 border'
      disabled={!canUpgrade && !handleUpgrade}
      onClick={handleUpgrade}
    >
      <div className='flex flex-row justify-between flex-1'>
        <div>
          <h2 className='text-2xl text-start'>{title}</h2>
          <div className='text-xl flex flex-row items-center whitespace-pre-wrap'>
            <span>Upgrade price: </span>
            <span>{nextUpgrade}</span>
            <img
              src={WildCoin}
              className={`inline-block w-8 h-8 ${!canUpgrade && !handleUpgrade && 'filter grayscale'}`}
              alt='Wild Coin'
            />
          </div>
        </div>
        <Icon size={60} />
      </div>
    </button>
  );
};
