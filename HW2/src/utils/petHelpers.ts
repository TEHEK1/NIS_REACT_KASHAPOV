import type { Mood } from '../types';
import { MOOD_THRESHOLDS } from './constants';

export const getMoodFromEnergy = (energy: number): Mood => {
  if (energy === MOOD_THRESHOLDS.SLEEPING) return 'sleeping';
  if (energy <= MOOD_THRESHOLDS.SAD) return 'sad';
  if (energy <= MOOD_THRESHOLDS.NEUTRAL) return 'neutral';
  if (energy <= MOOD_THRESHOLDS.HAPPY) return 'happy';
  return 'excited';
};

export const getMoodColor = (mood: Mood): string => {
  const colors: Record<Mood, string> = {
    happy: '#00ff00',
    excited: '#ff00ff',
    neutral: '#00ffff',
    sad: '#ff0000',
    sleeping: '#666666',
  };
  return colors[mood];
};

export const getMoodEmoji = (mood: Mood): string => {
  const emojis: Record<Mood, string> = {
    happy: '😊',
    excited: '🤩',
    neutral: '😐',
    sad: '😢',
    sleeping: '😴',
  };
  return emojis[mood];
};

export const formatTimestamp = (): string => {
  return new Date().toLocaleTimeString('ru-RU');
};