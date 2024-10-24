import { FC } from 'react';

import ScoreBoard from '../../components/ScoreBoard';

import { GiBiceps } from 'react-icons/gi';
import { ImPower } from 'react-icons/im';
import { FaHourglassHalf } from 'react-icons/fa6';

import WildCoin from '../../assets/wildCoin.png';
import { useUpgradeStore } from '../../stores/useUpgradeStore';
import { DamageLevels, EnergyCapLevels, RechargeLevels } from '../../types/upgrades';
import { handleUpgrade } from '../../api';
import { useEnergyStore } from '../../stores/useEnergyStore';

export const Upgrades: FC = () => {
  const {
    canUpgradeDamage,
    canUpgradeEnergy,
    canUpgradeRecharge,
    currentDamageLevel,
    currentEnergyLevel,
    currentRechargeLevel,
    upgradeEnergyLevel,
    upgradeDamageLevel,
    upgradeRechargeLevel,
  } = useUpgradeStore();

  const { currentEnergy } = useEnergyStore();

  const nextDamageUpgradePrice = DamageLevels[currentDamageLevel + 1]?.price;
  const nextEnergyUpgradePrice = EnergyCapLevels[currentEnergyLevel + 1]?.price;
  const nextRechargeUpgradePrice = RechargeLevels[currentRechargeLevel + 1]?.price;

  const handleEnergyLevel = async () => {
    upgradeEnergyLevel();
    handleUpgrade(
      currentEnergyLevel + 1,
      currentDamageLevel,
      currentRechargeLevel,
      currentEnergy,
      DamageLevels[currentDamageLevel].newDamage,
      EnergyCapLevels[currentEnergyLevel + 1].newEnergy,
    );
  };
  const handleDamageLevel = async () => {
    upgradeDamageLevel();
    handleUpgrade(
      currentEnergyLevel,
      currentDamageLevel + 1,
      currentRechargeLevel,
      currentEnergy,
      DamageLevels[currentDamageLevel + 1].newDamage,
      EnergyCapLevels[currentEnergyLevel].newEnergy,
    );
  };
  const handleRechargeLevel = async () => {
    upgradeRechargeLevel();
    handleUpgrade(
      currentEnergyLevel,
      currentDamageLevel,
      currentRechargeLevel + 1,
      currentEnergy,
      DamageLevels[currentDamageLevel].newDamage,
      EnergyCapLevels[currentEnergyLevel].newEnergy,
    );
  };

  return (
    <div className='flex flex-col items-center gap-7'>
      <h1 className='text-3xl mt-6 font-bold'>Upgrade your stats</h1>

      <ScoreBoard />

      <div className='flex flex-col gap-5 p-5'>
        <UpgradeButton
          title='Hit power'
          nextUpgrade={nextDamageUpgradePrice}
          handleUpgrade={canUpgradeDamage ? handleDamageLevel : undefined}
          Icon={GiBiceps}
          canUpgrade={canUpgradeDamage}
        />

        <UpgradeButton
          title='Max energy'
          nextUpgrade={nextEnergyUpgradePrice}
          handleUpgrade={canUpgradeEnergy ? handleEnergyLevel : undefined}
          Icon={ImPower}
          canUpgrade={canUpgradeEnergy}
        />

        <UpgradeButton
          title='Energy recharge'
          nextUpgrade={nextRechargeUpgradePrice}
          handleUpgrade={canUpgradeRecharge ? handleRechargeLevel : undefined}
          Icon={FaHourglassHalf}
          canUpgrade={canUpgradeRecharge}
        />
      </div>
    </div>
  );
};

interface UpgradeButtonProps {
  title: string;
  canUpgrade: boolean;
  nextUpgrade?: number;
  Icon: React.ElementType;
  handleUpgrade?: () => void;
}

const UpgradeButton: FC<UpgradeButtonProps> = ({ title, Icon, canUpgrade, nextUpgrade, handleUpgrade }) => {
  return (
    <button
      className='btn p-5 w-full h-min min-w-80 flex justify-start bg-base-100 shadow-xl border-gray-600 border'
      disabled={!canUpgrade && !handleUpgrade}
      onClick={handleUpgrade}
    >
      <div className='flex-1'>
        <h2 className='text-xl text-start'>{title}</h2>
        {nextUpgrade ? (
          <div className='text-md flex flex-row justify-between w-100 items-center whitespace-pre-wrap'>
            <span>Upgrade price: </span>
            <div className='flex items-center gap-1'>
              <span>{nextUpgrade}</span>
              <img
                src={WildCoin}
                className={`inline-block w-8 h-8 ${!canUpgrade && !handleUpgrade && 'filter grayscale'}`}
                alt='Wild Coin'
              />
            </div>
          </div>
        ) : (
          <p>You have reached maximum level!</p>
        )}
      </div>
      <div>
        <Icon size={60} />
      </div>
    </button>
  );
};
