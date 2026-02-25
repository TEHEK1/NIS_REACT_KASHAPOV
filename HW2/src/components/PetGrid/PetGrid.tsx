import type { Pet } from '../../types';
import PetCard from '../PetCard/PetCard';
import styles from '../../styles/PetGrid.module.scss';

interface PetGridProps {
  pets: Pet[];
}

const PetGrid = ({ pets }: PetGridProps) => {
  if (pets.length === 0) {
    return (
      <div className={styles.emptyState}>
        No pets found. Try changing the filter.
      </div>
    );
  }

  return (
    <div className={styles.petGrid}>
      {pets.map((pet) => (
        <PetCard key={pet.id} initialPet={pet} />
      ))}
    </div>
  );
};

export default PetGrid;