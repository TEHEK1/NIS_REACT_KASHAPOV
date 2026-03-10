import { Movie } from './types';

export const initialMovies: Movie[] = [
  {
    id: 1,
    title: 'Интерстеллар',
    year: 2014,
    posterUrl: '/posters/interstellar.jpg',
    isFavorite: false,
  },
  {
    id: 2,
    title: 'Начало',
    year: 2010,
    posterUrl: '/posters/inception.jpg',
    isFavorite: false,
  },
  {
    id: 3,
    title: 'Зелёная миля',
    year: 1999,
    posterUrl: '/posters/green-mile.jpg',
    isFavorite: false,
  },
  {
    id: 4,
    title: 'Побег из Шоушенка',
    year: 1994,
    posterUrl: '/posters/shawshank.jpg',
    isFavorite: false,
  },
  {
    id: 5,
    title: 'Бойцовский клуб',
    year: 1999,
    posterUrl: '/posters/fight-club.jpg',
    isFavorite: false,
  },
  {
    id: 6,
    title: 'Форрест Гамп',
    year: 1994,
    posterUrl: '/posters/forrest-gump.jpg',
    isFavorite: false,
  },
  {
    id: 7,
    title: 'Тёмный рыцарь',
    year: 2008,
    posterUrl: '/posters/dark-knight.jpg',
    isFavorite: false,
  },
  {
    id: 8,
    title: 'Властелин колец: Возвращение короля',
    year: 2003,
    posterUrl: '/posters/lotr-rotk.jpg',
    isFavorite: false,
  },
];
