import { Link } from "react-router-dom";
import PetCard from "../components/PetCard";
import { usePets } from "../hooks/usePets";
import bannerImage from "../assets/banner.png";
import "../index.css";

export default function Home() {
  const { pets, loading, error } = usePets();
  // Get 4 random pets for homepage
  const recentPets = pets.slice(0, 4);

  return (
    <>
      <section
        className="hero"
        style={{
          backgroundImage: `linear-gradient(rgba(44,106,184,0.4), rgba(44,106,184,0.1)), url(${bannerImage})`,
        }}
      >
        <div className="hero-content-area">
          <h2>Find Your New Best Friend</h2>
          <p>Discover loving pets looking for a forever home.</p>
          <Link to="/browse" className="hero-cta">
            Browse Pets
          </Link>
        </div>
      </section>

      <section className="featured-pets-section v2">
        <h2>Pets Available for Adoption</h2>
        <p className="featured-subtitle">Meet your new furry friend!</p>
        {loading ? (
          <div className="loading-message">
            <p>Loading pets...</p>
          </div>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
          </div>
        ) : (
          <div className="pet-grid">
            {recentPets.map(pet => <PetCard key={pet.id} pet={pet} />)}
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="feature-card quiz">
          <h3>Find Your Match</h3>
          <p>Take our quiz to find the perfect pet based on your lifestyle!</p>
          <Link to="/quiz">Start Quiz →</Link>
        </div>

        <div className="feature-card favorites">
          <h3>Save Favorites</h3>
          <p>Create a list of your favorite pets and come back to them anytime!</p>
          <Link to="/browse">Start Saving →</Link>
        </div>

        <div className="feature-card stories">
          <h3>Success Stories</h3>
          <p>Read heartwarming adoption stories from our community!</p>
          <Link to="/stories">Read Stories →</Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Give a Pet a Loving Home?</h2>
        <p>
          Start by browsing our available pets or creating an account to save your favorites.
        </p>
        <Link to="/browse">
          <button>Browse Pets Now</button>
        </Link>
      </section>
    </>
  );
}