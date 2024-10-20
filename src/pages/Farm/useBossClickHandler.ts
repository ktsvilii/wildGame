import { useRef } from 'react';
import styles from './Farm.module.scss';
import { useProgressStore } from '../../stores/useProgressStore';
import { useDamageStore } from '../../stores/useDamageStore';
import { useEnergyStore } from '../../stores/useEnergyStore';

export const useBossClickHandler = () => {
  const { level, addScore } = useProgressStore();
  const { currentDamage } = useDamageStore();
  const { currentEnergy, spendEnergy } = useEnergyStore();

  const imageRef = useRef<HTMLButtonElement | null>(null);

  const handleBossClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (currentEnergy - currentDamage >= 0) {
      const rect = event.currentTarget.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      addScore(currentDamage);
      spendEnergy(currentDamage);

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

  return { handleBossClick, imageRef, level };
};
