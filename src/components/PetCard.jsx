import { Link } from "react-router-dom";
import "../index.css";

export default function PetCard({ pet }) {
  return (
    <div className="pet-card">
      <img src={pet.image} alt={pet.name} />
      <div className="pet-card-content">
        <h3>{pet.name}</h3>
        <p>{pet.age} | {pet.breed}</p>
        <Link to={`/pets/${pet.id}`}>
          <button>View Details</button>
        </Link>
      </div>
    </div>
  );
}