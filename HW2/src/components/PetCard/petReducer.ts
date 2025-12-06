import type { PetState } from '../../types';
import type { PetAction } from './types';
import { FEED_ENERGY_INCREASE, MOOD_THRESHOLDS } from '../../utils/constants';

export const petReducer = (state: PetState, action: PetAction): PetState => {
  switch (action.type) {
    case 'FEED':
      return {
        ...state,
        energy: Math.min(100, state.energy + FEED_ENERGY_INCREASE),
        isAvailable: true,
      };

    case 'LEVEL_UP':
      return {
        ...state,
        level: state.level + 1,
      };

    case 'CHEER':
      return {
        ...state,
        mood: state.energy > MOOD_THRESHOLDS.NEUTRAL ? 'excited' : 'happy',
        isCheerActive: true,
      };

    case 'RESET':
      return {
        ...action.payload,
        isAvailable: true,
        isCheerActive: false,
      };

    case 'UPDATE_ENERGY':
      const newEnergy = Math.max(0, Math.min(100, state.energy + action.payload));
      return {
        ...state,
        energy: newEnergy,
      };

    case 'UPDATE_MOOD':
      return {
        ...state,
        mood: action.payload,
      };

    case 'SET_AVAILABLE':
      return {
        ...state,
        isAvailable: action.payload,
      };

    case 'SET_CHEER_ACTIVE':
      return {
        ...state,
        isCheerActive: action.payload,
      };

    default:
      return state;
  }
};