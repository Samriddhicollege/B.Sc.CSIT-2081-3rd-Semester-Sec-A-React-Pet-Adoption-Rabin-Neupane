import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import FavoritesProvider from "./context/FavoritesContext";
import NotificationProvider from "./context/NotificationContext";
import PetsProvider from "./context/PetsContext";
import ApplicationsProvider from "./context/ApplicationsContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import NotificationContainer from "./components/NotificationContainer";
import Home from "./pages/Home";
import BrowsePets from "./pages/BrowsePets";
import PetDetails from "./pages/PetDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Favorites from "./pages/Favorites";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import SuccessStories from "./pages/SuccessStories";
import AdminDashboard from "./pages/AdminDashboard";
import AdminPets from "./pages/AdminPets";
import AdminApplications from "./pages/AdminApplications";
import About from "./pages/About";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <ApplicationsProvider>
          <FavoritesProvider>
            <NotificationProvider>
              <Router>
                <Navbar />
                <NotificationContainer />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/browse" element={<BrowsePets />} />
                  <Route path="/pets/:id" element={<PetDetails />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/quiz" element={<Quiz />} />
                  <Route path="/stories" element={<SuccessStories />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/admin/pets" element={<AdminPets />} />
                  <Route path="/admin/applications" element={<AdminApplications />} />
                </Routes>
                <Footer />
              </Router>
            </NotificationProvider>
          </FavoritesProvider>
        </ApplicationsProvider>
      </PetsProvider>
    </AuthProvider>
  );
}