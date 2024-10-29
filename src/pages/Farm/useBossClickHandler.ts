import { useRef } from 'react';
import { updateCoinsAndSettings } from '../../api';
import { useDebounce } from '../../hooks/useDebounce';
import { useUserStore } from '../../stores/useUserStore';
import styles from './Farm.module.scss';

export const useBossClickHandler = () => {
  const { hitBoss, userData } = useUserStore();

  const imageRef = useRef<HTMLButtonElement | null>(null);
  const debouncedUpdateCoinsAndSettings = useDebounce(updateCoinsAndSettings, 300);

  const handleBossInteraction = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    if (userData && userData.stats.energy - userData.stats.damage >= 0) {
      const {
        coins,
        stats: { energy, damage, maxEnergy, recharge },
      } = userData;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = 'touches' in event ? event.touches[0].clientX - rect.left : event.clientX - rect.left;
      const y = 'touches' in event ? event.touches[0].clientY - rect.top : event.clientY - rect.top;

      hitBoss(damage);

      const lastEnergyUpdate = new Date().getTime();
      const fullEnergyRestore = lastEnergyUpdate + (maxEnergy - (energy + damage)) * recharge;

      debouncedUpdateCoinsAndSettings(
        coins + damage,
        { energy, damage, maxEnergy, recharge },
        fullEnergyRestore,
        lastEnergyUpdate,
      );

      const randomX = (Math.random() - 0.5) * 20;
      const randomY = (Math.random() - 0.5) * 20;

      const plusOne = document.createElement('div');
      plusOne.classList.add(`${styles.increment}`);
      plusOne.textContent = `${damage}`;
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

  return { handleBossClick: handleBossInteraction, handleTouchStart, imageRef, level: userData?.level };
};
