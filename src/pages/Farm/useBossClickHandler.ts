import { useRef } from 'react';
import styles from './Farm.module.scss';
import { useProgressStore } from '../../stores/useProgressStore';
import { useDamageStore } from '../../stores/useDamageStore';
import { useEnergyStore } from '../../stores/useEnergyStore';
import { updateCoinsAndSettings } from '../../api';
import { useUpgradeStore } from '../../stores/useUpgradeStore';
import { RechargeLevels } from '../../types/upgrades';
import { useDebounce } from '../../hooks/useDebounce';

export const useBossClickHandler = () => {
  const { level, coins, addScore } = useProgressStore();
  const { currentDamage } = useDamageStore();
  const { currentEnergy, maxEnergy, spendEnergy } = useEnergyStore();
  const { currentRechargeLevel } = useUpgradeStore();

  const imageRef = useRef<HTMLButtonElement | null>(null);
  const debouncedUpdateCoinsAndSettings = useDebounce(updateCoinsAndSettings, 300);

  const handleBossInteraction = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (currentEnergy - currentDamage >= 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
      const y = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

      addScore(currentDamage);
      spendEnergy(currentDamage);

      const lastEnergyUpdate = new Date().getTime();
      const fullEnergyRestore =
        lastEnergyUpdate + (maxEnergy - (currentEnergy + currentDamage)) * RechargeLevels[currentRechargeLevel].speed;

      debouncedUpdateCoinsAndSettings(
        coins + currentDamage,
        currentEnergy,
        currentDamage,
        maxEnergy,
        fullEnergyRestore,
        lastEnergyUpdate,
      );

      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;

      const plusOne = document.createElement('div');
      plusOne.classList.add(`${styles.increment}`);
      plusOne.textContent = `${currentDamage}`;
      plusOne.style.left = `${x + randomX}px`;
      plusOne.style.top = `${y + randomY}px`;

      imageRef.current?.appendChild(plusOne);

      if (imageRef.current) {
        imageRef.current.style.transition = 'transform 0.1s';
        imageRef.current.style.transform = 'rotate(5deg)';
      }

      setTimeout(() => {
        if (imageRef.current) {
          imageRef.current.style.transform = 'rotate(0deg)';
        }
      }, 50);

      setTimeout(() => {
        plusOne.style.opacity = '0';
        setTimeout(() => plusOne.remove(), 250);
      }, 500);
    }
  };

  const handleTouchStart = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleBossInteraction(event);
  };

  return { handleBossClick: handleBossInteraction, handleTouchStart, imageRef, level };
};
