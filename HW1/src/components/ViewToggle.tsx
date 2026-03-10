import { ViewMode } from '../types';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewChange: (mode: ViewMode) => void;
}

function ViewToggle({ viewMode, onViewChange }: ViewToggleProps) {
  return (
    <div className="view-toggle">
      <button
        className={`view-toggle__btn ${viewMode === 'grid' ? 'view-toggle__btn--active' : ''}`}
        onClick={() => onViewChange('grid')}
      >
        ▦ Плитка
      </button>
      <button
        className={`view-toggle__btn ${viewMode === 'list' ? 'view-toggle__btn--active' : ''}`}
        onClick={() => onViewChange('list')}
      >
        ☰ Список
      </button>
    </div>
  );
}

export default ViewToggle;
