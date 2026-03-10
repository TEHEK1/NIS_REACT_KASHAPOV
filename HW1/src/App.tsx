import { useState } from 'react';
import { Movie, FilterMode, ViewMode } from './types';
import { initialMovies } from './data';
import MovieCard from './components/MovieCard';
import FilterBar from './components/FilterBar';
import SearchBar from './components/SearchBar';
import ViewToggle from './components/ViewToggle';

function App() {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);
  const [filterMode, setFilterMode] = useState<FilterMode>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const toggleFavorite = (id: number) => {
    setMovies((prev) =>
      prev.map((movie) =>
        movie.id === id ? { ...movie, isFavorite: !movie.isFavorite } : movie,
      ),
    );
  };

  const filteredMovies = movies.filter((movie) => {
    const matchesFilter = filterMode === 'all' || movie.isFavorite;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <h1 className="app__title">Каталог фильмов</h1>

      <div className="app__controls">
        <SearchBar onSearch={setSearchQuery} />
        <FilterBar filterMode={filterMode} onFilterChange={setFilterMode} />
        <ViewToggle viewMode={viewMode} onViewChange={setViewMode} />
      </div>

      {filteredMovies.length === 0 ? (
        <p className="app__empty">Фильмов нет</p>
      ) : (
        <div className={viewMode === 'grid' ? 'movie-grid' : 'movie-list'}>
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              viewMode={viewMode}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
