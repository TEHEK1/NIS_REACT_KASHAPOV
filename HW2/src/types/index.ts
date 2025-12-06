export type Species = 'cat' | 'dog' | 'bird' | 'fish';
export type Mood = 'happy' | 'neutral' | 'sad' | 'excited' | 'sleeping';

export interface Pet {
  id: string;
  name: string;
  species: Species;
  mood: Mood;
  energy: number;
  level: number;
  avatar: string;
}

export interface PetState extends Pet {
  isAvailable: boolean;
  isCheerActive: boolean;
}