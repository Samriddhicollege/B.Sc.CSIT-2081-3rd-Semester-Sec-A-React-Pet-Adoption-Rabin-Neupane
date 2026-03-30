import { useState, useMemo } from "react";
import PetCard from "../components/PetCard";
import { usePets } from "../hooks/usePets";
import "../index.css";

export default function BrowsePets() {
  const { pets, loading, error } = usePets();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPets = useMemo(() => {
    if (!searchTerm.trim()) {
      return pets;
    }

    const search = searchTerm.toLowerCase();
    return pets.filter(pet =>
      pet.name.toLowerCase().includes(search) ||
      pet.breed.toLowerCase().includes(search) ||
      pet.type.toLowerCase().includes(search)
    );
  }, [searchTerm, pets]);

  return (
    <>
      {/* Search and Filter Section */}
      <div className="search-filter-section">
        {/* Modern Search Bar */}
        <div className="modern-search-container">
          <div className="modern-search-bar">
            <div className="search-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L16.5 16.5M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search by name, breed, or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="modern-search-input"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="clear-search-btn"
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      {loading ? (
        <div className="loading-message">
          <p>Loading pets...</p>
        </div>
      ) : error ? (
        <div className="error-message">
          <p>{error}</p>
        </div>
      ) : filteredPets.length === 0 ? (
        <div className="no-pets-message">
          <p>
            No pets found matching your search. Try a different search term!
          </p>
        </div>
      ) : (
        <div className="pet-grid">
          {filteredPets.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </>
  );
}