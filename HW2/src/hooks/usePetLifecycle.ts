import { useEffect, useRef } from 'react';
import type { UsePetLifecycleParams } from './types';
import { getMoodFromEnergy } from '../utils/petHelpers';
import { ENERGY_DECREASE_INTERVAL, ENERGY_DECREASE_AMOUNT } from '../utils/constants';

export const usePetLifecycle = ({ pet, dispatch, addEvent }: UsePetLifecycleParams) => {
  const timerRef = useRef<number | null>(null);
  const previousEnergyRef = useRef(pet.energy);

  useEffect(() => {
    if (!pet.isAvailable) {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      return;
    }

    timerRef.current = setInterval(() => {
      dispatch({ type: 'UPDATE_ENERGY', payload: -ENERGY_DECREASE_AMOUNT });
    }, ENERGY_DECREASE_INTERVAL) as unknown as number;

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [pet.isAvailable, dispatch]);

  useEffect(() => {
    if (pet.isCheerActive) {
      return;
    }

    const newMood = getMoodFromEnergy(pet.energy);
    
    if (newMood !== pet.mood) {
      dispatch({ type: 'UPDATE_MOOD', payload: newMood });
      addEvent(`${pet.name}'s mood changed to ${newMood}`);
    }

    if (pet.energy === 0 && previousEnergyRef.current > 0) {
      dispatch({ type: 'SET_AVAILABLE', payload: false });
      addEvent(`${pet.name} ran out of energy and fell asleep`);
    }

    if (pet.energy <= 20 && previousEnergyRef.current > 20) {
      addEvent(`${pet.name}'s energy is low!`);
    }

    previousEnergyRef.current = pet.energy;
  }, [pet.energy, pet.mood, pet.name, pet.isCheerActive, dispatch, addEvent]);
};