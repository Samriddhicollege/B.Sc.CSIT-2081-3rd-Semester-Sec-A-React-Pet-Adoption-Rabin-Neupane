import { useFavorites } from '../hooks/useFavorites';
import PetCard from '../components/PetCard';
import '../index.css';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}>
        My Favorite Pets
      </h2>
      
      {favorites.length === 0 ? (
        <div style={{ textAlign: "center", padding: "3rem", minHeight: "400px" }}>
          <p style={{ fontSize: "1.2rem", color: "#666" }}>
            You haven't added any favorites yet.
          </p>
          <a href="/browse" style={{ color: "#007bff", textDecoration: "none", fontSize: "1.1rem" }}>
            Browse pets to add them to your favorites →
          </a>
        </div>
      ) : (
        <div className="pet-grid">
          {favorites.map(pet => (
            <PetCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}
    </div>
  );
}
