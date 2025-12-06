export const ENERGY_DECREASE_INTERVAL = 5000; // 5 seconds
export const ENERGY_DECREASE_AMOUNT = 5;
export const FEED_ENERGY_INCREASE = 20;
export const CHEER_MOOD_BOOST = true;

export const MOOD_THRESHOLDS = {
  SLEEPING: 0,
  SAD: 20,
  NEUTRAL: 40,
  HAPPY: 70,
} as const;

export const SPECIES_LABELS: Record<string, string> = {
  'cat': 'Cat',
  'dog': 'Dog',
  'bird': 'Bird',
  'fish': 'Fish',
};