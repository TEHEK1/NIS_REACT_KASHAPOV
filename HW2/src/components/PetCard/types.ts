import type { Pet, Mood } from '../../types';

export type PetAction =
  | { type: 'FEED' }
  | { type: 'LEVEL_UP' }
  | { type: 'CHEER' }
  | { type: 'RESET'; payload: Pet }
  | { type: 'UPDATE_ENERGY'; payload: number }
  | { type: 'UPDATE_MOOD'; payload: Mood }
  | { type: 'SET_AVAILABLE'; payload: boolean }
  | { type: 'SET_CHEER_ACTIVE'; payload: boolean };

export interface PetCardProps {
  initialPet: Pet;
}