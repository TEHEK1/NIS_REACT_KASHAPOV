import { FilterMode } from '../types';

interface FilterBarProps {
  filterMode: FilterMode;
  onFilterChange: (mode: FilterMode) => void;
}

function FilterBar({ filterMode, onFilterChange }: FilterBarProps) {
  return (
    <div className="filter-bar">
      <button
        className={`filter-bar__btn ${filterMode === 'all' ? 'filter-bar__btn--active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        Все
      </button>
      <button
        className={`filter-bar__btn ${filterMode === 'favorites' ? 'filter-bar__btn--active' : ''}`}
        onClick={() => onFilterChange('favorites')}
      >
        Только избранные
      </button>
    </div>
  );
}

export default FilterBar;
