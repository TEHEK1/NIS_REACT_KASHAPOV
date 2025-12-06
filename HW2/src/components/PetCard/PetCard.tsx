import { useReducer, useRef, useCallback, memo, useEffect } from 'react';
import type { CSSProperties } from 'react';
import type { PetCardProps } from './types';
import { petReducer } from './petReducer';
import { usePetLifecycle } from '../../hooks/usePetLifecycle';
import { useEventLog } from '../../hooks/useEventLog';
import { getMoodColor } from '../../utils/petHelpers';
import { MOOD_THRESHOLDS } from '../../utils/constants';
import PetActions from '../PetActions/PetActions';
import styles from '../../styles/PetCard.module.scss';

const PetCard = ({ initialPet }: PetCardProps) => {
  const [pet, dispatch] = useReducer(petReducer, { ...initialPet, isAvailable: true, isCheerActive: false });
  const { addEvent } = useEventLog();
  const avatarRef = useRef<HTMLDivElement>(null);
  const cheerTimerRef = useRef<number | null>(null);
  const previousMoodRef = useRef<typeof pet.mood>(pet.mood);

  usePetLifecycle({ pet, dispatch, addEvent });

  const handleFeed = useCallback(() => {
    dispatch({ type: 'FEED' });
    addEvent(`${pet.name} was fed (+20 energy)`);
  }, [pet.name, addEvent]);

  const handleLevelUp = useCallback(() => {
    dispatch({ type: 'LEVEL_UP' });
    addEvent(`${pet.name} leveled up to level ${pet.level + 1}`);
  }, [pet.name, pet.level, addEvent]);

  const handleCheer = useCallback(() => {
    if (pet.energy <= MOOD_THRESHOLDS.SAD) {
      addEvent(`${pet.name} is too tired to cheer (energy too low)`);
      return;
    }

    if (cheerTimerRef.current) {
      clearTimeout(cheerTimerRef.current);
    }

    previousMoodRef.current = pet.mood;

    dispatch({ type: 'CHEER' });
    addEvent(`${pet.name} was cheered (mood improved for 1 second)`);

    cheerTimerRef.current = setTimeout(() => {
      dispatch({ type: 'UPDATE_MOOD', payload: previousMoodRef.current });
      dispatch({ type: 'SET_CHEER_ACTIVE', payload: false });
      addEvent(`${pet.name}'s mood returned to normal`);
    }, 1000) as unknown as number;
  }, [pet.name, pet.energy, pet.mood, addEvent]);

  useEffect(() => {
    return () => {
      if (cheerTimerRef.current) {
        clearTimeout(cheerTimerRef.current);
      }
    };
  }, []);

  const handleReset = useCallback(() => {
    dispatch({ type: 'RESET', payload: initialPet });
    addEvent(`${pet.name} was reset to initial state`);
  }, [pet.name, initialPet, addEvent]);

  const cardStyle: CSSProperties = {
    boxShadow: `0 0 20px ${getMoodColor(pet.mood)}`,
    opacity: pet.isAvailable ? 1 : 0.6,
    transform: pet.mood === 'excited' ? 'scale(1.02)' : 'scale(1)',
  };

  const avatarStyle: CSSProperties = {
    animation: pet.mood === 'excited' ? 'bounce 0.5s infinite' : 'none',
  };

  const getEnergyBarClass = () => {
    if (pet.energy <= MOOD_THRESHOLDS.SAD) return styles.low;
    if (pet.energy <= MOOD_THRESHOLDS.NEUTRAL) return styles.medium;
    return '';
  };

  return (
    <div 
      className={`${styles.petCard} ${!pet.isAvailable ? styles.unavailable : ''}`}
      style={cardStyle}
    >
      <div ref={avatarRef} className={styles.avatar} style={avatarStyle}>
        {pet.avatar}
      </div>
      
      <h3 className={styles.name}>{pet.name}</h3>
      <p className={styles.species}>{pet.species}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Level:</span>
          <span className={styles.statValue}>{pet.level}</span>
        </div>

        <div className={styles.stat}>
          <span className={styles.statLabel}>Energy:</span>
          <span className={styles.statValue}>{pet.energy}%</span>
        </div>

        <div className={styles.energyBar}>
          <div 
            className={`${styles.energyFill} ${getEnergyBarClass()}`}
            style={{ width: `${pet.energy}%` }}
          />
        </div>

        <div className={styles.moodIndicator} style={{ borderColor: getMoodColor(pet.mood) }}>
          <span>Mood: {pet.mood}</span>
        </div>
      </div>

      {!pet.isAvailable && (
        <div className={styles.unavailableMessage}>
          Pet is sleeping. Feed to wake up!
        </div>
      )}

      <PetActions
        onFeed={handleFeed}
        onLevelUp={handleLevelUp}
        onCheer={handleCheer}
        onReset={handleReset}
        disabled={!pet.isAvailable}
      />
    </div>
  );
};

export default memo(PetCard);