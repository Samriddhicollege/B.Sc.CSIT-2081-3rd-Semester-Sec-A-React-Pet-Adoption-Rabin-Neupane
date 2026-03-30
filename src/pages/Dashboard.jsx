import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import '../index.css';

export default function Dashboard() {
  const { user } = useAuth();
  const { favorites } = useFavorites();

  if (!user) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "4rem 2rem", minHeight: "500px" }}>
          <h2>Please log in to access your dashboard</h2>
          <a href="/login" style={{ color: "#007bff", fontSize: "1.1rem", textDecoration: "none" }}>
            Go to Login →
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h2>Welcome, {user.name || user.email}! 👋</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", marginTop: "2rem" }}>
          <div style={{ 
            padding: "2rem", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            border: "2px solid #e9ecef"
          }}>
            <h3 style={{ color: "#495057", margin: "0 0 1rem" }}>Favorite Pets</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#007bff", margin: 0 }}>
              {favorites.length}
            </p>
          </div>

          <div style={{ 
            padding: "2rem", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            border: "2px solid #e9ecef"
          }}>
            <h3 style={{ color: "#495057", margin: "0 0 1rem" }}>Applications</h3>
            <p style={{ fontSize: "2rem", fontWeight: "bold", color: "#28a745", margin: 0 }}>
              0
            </p>
          </div>

          <div style={{ 
            padding: "2rem", 
            backgroundColor: "#f8f9fa", 
            borderRadius: "8px",
            border: "2px solid #e9ecef"
          }}>
            <h3 style={{ color: "#495057", margin: "0 0 1rem" }}>Member Since</h3>
            <p style={{ fontSize: "1rem", color: "#6c757d", margin: 0 }}>
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        <div style={{ marginTop: "3rem" }}>
          <h3>Your Saved Pets</h3>
          {favorites.length === 0 ? (
            <p style={{ color: "#6c757d" }}>No favorites yet. <a href="/browse">Browse pets</a></p>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
              {favorites.map(pet => (
                <div key={pet.id} style={{ 
                  padding: "1rem", 
                  border: "1px solid #ddd", 
                  borderRadius: "8px",
                  textAlign: "center"
                }}>
                  <img src={pet.image} alt={pet.name} style={{ width: "100%", borderRadius: "8px" }} />
                  <h4 style={{ margin: "0.5rem 0" }}>{pet.name}</h4>
                  <p style={{ color: "#6c757d", margin: "0.25rem 0" }}>{pet.breed}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
