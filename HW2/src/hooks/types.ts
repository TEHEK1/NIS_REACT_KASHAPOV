import type { Dispatch } from 'react';
import type { PetAction } from '../components/PetCard/types';
import type { PetState } from '../types';

export interface UsePetLifecycleParams {
  pet: PetState;
  dispatch: Dispatch<PetAction>;
  addEvent: (message: string) => void;
}