import { Movie, ViewMode } from '../types';

interface MovieCardProps {
  movie: Movie;
  viewMode: ViewMode;
  onToggleFavorite: (id: number) => void;
}

function MovieCard({ movie, viewMode, onToggleFavorite }: MovieCardProps) {
  const isGrid = viewMode === 'grid';

  return (
    <div className={isGrid ? 'movie-card' : 'movie-card movie-card--list'}>
      <img
        className={isGrid ? 'movie-card__poster' : 'movie-card__poster movie-card__poster--list'}
        src={movie.posterUrl}
        alt={movie.title}
      />
      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__year">{movie.year}</p>
        <button
          className={`movie-card__fav-btn ${movie.isFavorite ? 'movie-card__fav-btn--active' : ''}`}
          onClick={() => onToggleFavorite(movie.id)}
        >
          {movie.isFavorite ? '⭐' : '☆'}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
