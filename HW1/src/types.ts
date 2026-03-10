export interface Movie {
  id: number;
  title: string;
  year: number;
  posterUrl: string;
  isFavorite: boolean;
}

export type FilterMode = 'all' | 'favorites';

export type ViewMode = 'grid' | 'list';
