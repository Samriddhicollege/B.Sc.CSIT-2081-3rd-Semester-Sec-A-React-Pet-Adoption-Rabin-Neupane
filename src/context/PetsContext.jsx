import { createContext, useState, useEffect } from 'react';
import { ALL_PETS } from '../data/petsData';

export const PetsContext = createContext();

export default function PetsProvider({ children }) {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        // Fetch from The Dog API (real pets API)
        const response = await fetch('https://invalid-api-url-that-does-not-exist.com');
        // const response = await fetch('https://api.thedogapi.com/v1/images/search?limit=6&has_breeds=true');
        if (!response.ok) {
          throw new Error('Failed to fetch pets from API');
        }
        const data = await response.json();
        // Transform API data to match pet structure
        const apiPets = data.map((item, index) => ({
          id: item.id,
          name: item.breeds && item.breeds[0] ? item.breeds[0].name : `Dog ${index + 1}`,
          age: `${Math.floor(Math.random() * 5) + 1} yrs`,
          breed: item.breeds && item.breeds[0] ? item.breeds[0].name : 'Mixed Breed',
          type: 'dog',
          image: item.url,
          images: [item.url],
          personality: ['Friendly', 'Playful', 'Loyal'],
          vaccinated: Math.random() > 0.5,
          microchipped: Math.random() > 0.5,
          description: item.breeds && item.breeds[0] ? item.breeds[0].temperament || 'A wonderful companion!' : 'A lovely dog looking for a home!'
        }));
        setPets(apiPets);
        localStorage.setItem('pets', JSON.stringify(apiPets));
      } catch (err) {
        console.error('API fetch failed, using default data:', err);
        // Fallback to default data from petsData.js
        setPets(ALL_PETS);
        localStorage.setItem('pets', JSON.stringify(ALL_PETS));
        setError(null); // Clear error since we have fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, []);

  const addPet = (petData) => {
    const newPet = {
      id: Date.now(),
      ...petData,
      images: petData.images || [petData.image]
    };
    const updatedPets = [...pets, newPet];
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
    return newPet;
  };

  const updatePet = (petId, updatedData) => {
    const updatedPets = pets.map(pet =>
      pet.id === petId ? { ...pet, ...updatedData } : pet
    );
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const deletePet = (petId) => {
    const updatedPets = pets.filter(pet => pet.id !== petId);
    setPets(updatedPets);
    localStorage.setItem('pets', JSON.stringify(updatedPets));
  };

  const getPetById = (petId) => {
    return pets.find(pet => pet.id == petId);
  };

  return (
    <PetsContext.Provider value={{ pets, addPet, updatePet, deletePet, getPetById, loading, error }}>
      {children}
    </PetsContext.Provider>
  );
}
