import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { SPECIES_LABELS } from '../../utils/constants';

interface FilterBarProps {
  selectedSpecies: string;
  onFilterChange: (species: string) => void;
  availableSpecies: string[];
}

const FilterBar = ({ selectedSpecies, onFilterChange, availableSpecies }: FilterBarProps) => {
  const handleChange = (event: SelectChangeEvent) => {
    onFilterChange(event.target.value);
  };

  return (
    <FormControl style={{ minWidth: 200, marginTop: '10px' }}>
      <InputLabel>Filter by Species</InputLabel>
      <Select
        value={selectedSpecies}
        label="Filter by Species"
        onChange={handleChange}
      >
        <MenuItem value="all">All Species</MenuItem>
        {availableSpecies.map((species) => (
          <MenuItem key={species} value={species}>
            {SPECIES_LABELS[species] || species}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FilterBar;