import { FC, useEffect, useRef } from 'react';
import { useEnergyRegeneration } from './useEnergyRegeneration';
import { useBossClickHandler } from './useBossClickHandler';
import ProgressBar from '../../components/ProgressBar';
import ScoreBoard from '../../components/ScoreBoard';
import styles from './Farm.module.scss';
import EnergyBoard from '../../components/EnergyBoard';

import bossImage1 from '../../assets/bosses/1.png';
import bossImage2 from '../../assets/bosses/2.png';
import bossImage3 from '../../assets/bosses/3.png';

const BOSS_IMAGES = [bossImage1, bossImage2, bossImage3];

export const Farm: FC = () => {
  useEnergyRegeneration();

  const {
    level: { level },
    imageRef,
    handleBossClick,
    handleTouchStart,
  } = useBossClickHandler();

  return (
    <div className='flex flex-col flex-grow gap-5 items-center justify-start'>
      <ProgressBar />
      <ScoreBoard />
      <button
        ref={imageRef}
        style={{ backgroundImage: `url(${BOSS_IMAGES[level]})` }}
        className={`${styles.image} relative`}
        onClick={handleBossClick}
        onTouchStart={handleTouchStart}
      ></button>

      <EnergyBoard />
    </div>
  );
};
