import { useRef } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

function SearchBar({ onSearch }: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInput = () => {
    const value = inputRef.current?.value ?? '';
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <input
        ref={inputRef}
        className="search-bar__input"
        type="text"
        placeholder="Поиск по названию..."
        onInput={handleInput}
      />
    </div>
  );
}

export default SearchBar;
