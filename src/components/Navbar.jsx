import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useFavorites } from "../hooks/useFavorites";
import { useNotification } from "../hooks/useNotification";
import paw from "../assets/Paw.png";
import "../index.css";

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { favorites } = useFavorites();
  const { addNotification } = useNotification();

  const handleLogout = () => {
    logout();
    addNotification("Logged out successfully", 'info', 2000);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        <img src={paw} alt="Pet Adoption Logo" className="navbar-logo" />
        <span className="brand-text">PetAdopt</span>
      </Link>

      {/* Desktop Navigation */}
      <div className="nav-links">

        {user && isAdmin() && (
          <div className="navbar-admin-actions">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
            <NavLink to="/admin" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Admin</NavLink>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        )}

        {user && !isAdmin() && (
          <div className="navbar-user-actions">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Dashboard</NavLink>
            <NavLink to="/quiz" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Quiz</NavLink>
            <NavLink to="/stories" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Stories</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              Logout
            </button>
          </div>
        )}

        {!user && (
          <div className="navbar-user-actions">
            <NavLink to="/" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Home</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>Contact</NavLink>
            <Link to="/login">
              <button className="nav-btn">
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button className="nav-btn">
                Signup
              </button>
            </Link>
            <Link to="/browse">
              <button className="navbar-adopt-btn">
                Adopt Now
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}