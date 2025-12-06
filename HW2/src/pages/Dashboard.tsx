import { useState, useEffect, useMemo, useCallback } from 'react';
import type { Pet } from '../types';
import FilterBar from '../components/FilterBar/FilterBar';
import PetGrid from '../components/PetGrid/PetGrid';
import EventLog from '../components/EventLog/EventLog';
import SkeletonLoader from '../components/SkeletonLoader/SkeletonLoader';
import petsData from '../data/pets.json';

const Dashboard = () => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecies, setSelectedSpecies] = useState('all');

  useEffect(() => {
    const loadPets = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      setPets(petsData as Pet[]);
      setLoading(false);
    };
    loadPets();
  }, []);

  const availableSpecies = useMemo(() => {
    const speciesSet = new Set(pets.map(pet => pet.species));
    return Array.from(speciesSet);
  }, [pets]);

  const filteredPets = useMemo(() => {
    if (selectedSpecies === 'all') return pets;
    return pets.filter(pet => pet.species === selectedSpecies);
  }, [pets, selectedSpecies]);

  const handleFilterChange = useCallback((species: string) => {
    setSelectedSpecies(species);
  }, []);

  return (
    <div style={{ padding: '20px', background: '#f0f0f0', minHeight: '100vh' }}>
      <header style={{ marginBottom: '20px' }}>
        <h1>Cyber-Zoo 2077</h1>
        {!loading && (
          <FilterBar
            selectedSpecies={selectedSpecies}
            onFilterChange={handleFilterChange}
            availableSpecies={availableSpecies}
          />
        )}
      </header>

      <main style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '20px' }}>
        <div>
          {loading ? <SkeletonLoader /> : <PetGrid pets={filteredPets} />}
        </div>
        <div>
          <EventLog />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;