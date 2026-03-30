import { useState } from "react";
import { useParams } from "react-router-dom";
import { usePets } from "../hooks/usePets";
import { useFavorites } from "../hooks/useFavorites";
import { useNotification } from "../hooks/useNotification";
import { useApplications } from "../hooks/useApplications";
import { useAuth } from "../hooks/useAuth";
import "../index.css";

export default function PetDetails() {
  const { id } = useParams();
  const { getPetById, loading, error } = usePets();
  const pet = getPetById(id);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showAdoptionForm, setShowAdoptionForm] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const { addNotification } = useNotification();
  const { submitApplication } = useApplications();
  const { user } = useAuth();
  const favorite = isFavorite(pet?.id);

  const [applicationData, setApplicationData] = useState({
    phone: '',
    address: '',
    occupation: '',
    hasOtherPets: false,
    petExperience: '',
    homeType: 'apartment',
    hasYard: false,
    hoursAlone: '',
    exercisePlan: '',
    reason: '',
    references: '',
    additionalComments: ''
  });

  if (loading) {
    return (
      <div className="container">
        <h2 style={{ marginTop: "2rem" }}>Loading pet details...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h2 style={{ marginTop: "2rem" }}>Error loading pet: {error}</h2>
        <a href="/browse" style={{ color: "#007bff" }}>Go back to browse</a>
      </div>
    );
  }

  if (!pet) {
    return (
      <div className="container">
        <h2 style={{ marginTop: "2rem" }}>Pet not found</h2>
        <a href="/browse" style={{ color: "#007bff" }}>Go back to browse</a>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    if (favorite) {
      removeFavorite(pet.id);
      addNotification(`Removed ${pet.name} from favorites`, 'info');
    } else {
      addFavorite(pet);
      addNotification(`Added ${pet.name} to favorites!`, 'success');
    }
  };

  const handleApplicationChange = (e) => {
    const { name, value, type, checked } = e.target;
    setApplicationData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmitApplication = (e) => {
    e.preventDefault();

    if (!user) {
      addNotification('Please log in to submit an application', 'error');
      return;
    }

    // Validate required fields
    const requiredFields = ['phone', 'address', 'occupation', 'petExperience', 'reason'];
    const missingFields = requiredFields.filter(field => !applicationData[field].trim());

    if (missingFields.length > 0) {
      addNotification(`Please fill in: ${missingFields.join(', ')}`, 'error');
      return;
    }

    const application = {
      petId: pet.id,
      petName: pet.name,
      userId: user.id,
      applicantName: user.name,
      applicantEmail: user.email,
      ...applicationData
    };

    submitApplication(application);
    addNotification(`Application submitted for ${pet.name}! We'll review it soon.`, 'success');
    setShowAdoptionForm(false);
    setApplicationData({
      phone: '',
      address: '',
      occupation: '',
      hasOtherPets: false,
      petExperience: '',
      homeType: 'apartment',
      hasYard: false,
      hoursAlone: '',
      exercisePlan: '',
      reason: '',
      references: '',
      additionalComments: ''
    });
  };

  const handleSubmitContact = () => {
    if (contactMessage.trim()) {
      addNotification(`Message sent about ${pet.name}!`, 'success');
      setContactMessage("");
    } else {
      addNotification("Please enter a message", 'error', 2000);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % pet.images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + pet.images.length) % pet.images.length);
  };

  return (
    <div className="container">
      <div style={{ marginTop: "2rem", marginBottom: "3rem" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "2rem",
          alignItems: "start"
        }}>
          {/* Image Gallery */}
          <div>
            <div style={{ position: "relative", marginBottom: "1rem" }}>
              <img
                src={pet.images[currentImageIndex]}
                alt={pet.name}
                style={{
                  width: "100%",
                  borderRadius: "12px",
                  maxHeight: "500px",
                  objectFit: "cover"
                }}
              />
              {pet.images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    style={{
                      position: "absolute",
                      left: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      fontSize: "1.5rem"
                    }}
                  >
                    ❮
                  </button>
                  <button
                    onClick={handleNextImage}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "50%",
                      transform: "translateY(-50%)",
                      backgroundColor: "rgba(0,0,0,0.5)",
                      color: "white",
                      border: "none",
                      borderRadius: "50%",
                      width: "40px",
                      height: "40px",
                      cursor: "pointer",
                      fontSize: "1.5rem"
                    }}
                  >
                    ❯
                  </button>
                </>
              )}
            </div>
            <p style={{ textAlign: "center", color: "#6c757d" }}>
              Image {currentImageIndex + 1} of {pet.images.length}
            </p>
          </div>

          {/* Pet Info */}
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
              <div>
                <h1 style={{ margin: "0 0 0.5rem" }}>{pet.name}</h1>
                <p style={{ color: "#6c757d", margin: 0 }}>{pet.breed}</p>
              </div>
              <button
                onClick={handleFavoriteToggle}
                className={favorite ? "favorite-btn favorite-btn--active" : "favorite-btn"}
                aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
              >
                {favorite ? "★ Favorite" : "☆ Add to Favorites"}
              </button>
            </div>

            {/* Basic Info */}
            <div style={{
              backgroundColor: "#f8f9fa",
              padding: "1.5rem",
              borderRadius: "8px",
              marginBottom: "1.5rem"
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <p style={{ color: "#6c757d", margin: "0 0 0.25rem", fontWeight: "bold" }}>Age</p>
                  <p style={{ margin: 0 }}>{pet.age}</p>
                </div>
                <div>
                  <p style={{ color: "#6c757d", margin: "0 0 0.25rem", fontWeight: "bold" }}>Type</p>
                  <p style={{ margin: 0 }}>{pet.type === 'dog' ? '🐕 Dog' : '🐱 Cat'}</p>
                </div>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>About {pet.name}</h3>
              <p style={{ lineHeight: "1.6", color: "#495057" }}>{pet.description}</p>
            </div>

            {/* Personality */}
            <div style={{ marginBottom: "1.5rem" }}>
              <h3 style={{ marginBottom: "0.5rem" }}>Personality Traits</h3>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {pet.personality.map((trait, idx) => (
                  <span
                    key={idx}
                    style={{
                      backgroundColor: "#007bff",
                      color: "white",
                      padding: "0.5rem 1rem",
                      borderRadius: "20px",
                      fontSize: "0.9rem"
                    }}
                  >
                    {trait}
                  </span>
                ))}
              </div>
            </div>

            {/* Health Info */}
            <div style={{
              backgroundColor: "#e7f3ff",
              padding: "1rem",
              borderRadius: "8px",
              marginBottom: "1.5rem"
            }}>
              <h4 style={{ margin: "0 0 0.5rem" }}>Health Status</h4>
              <p style={{ margin: "0.25rem 0" }}>✓ Vaccinated: {pet.vaccinated ? "Yes" : "No"}</p>
              <p style={{ margin: "0.25rem 0" }}>✓ Microchipped: {pet.microchipped ? "Yes" : "No"}</p>
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={() => setShowAdoptionForm(!showAdoptionForm)}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                {showAdoptionForm ? "Cancel Application" : "Apply to Adopt"}
              </button>
              <button
                onClick={() => setShowAdoptionForm(false)}
                style={{
                  flex: 1,
                  padding: "12px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold"
                }}
              >
                Ask a Question
              </button>
            </div>
          </div>
        </div>

        {/* Adoption Application Form */}
        {showAdoptionForm && (
          <div style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6"
          }}>
            <h3>Adoption Application for {pet.name}</h3>
            {!user && (
              <div style={{
                backgroundColor: "#fff3cd",
                padding: "1rem",
                borderRadius: "6px",
                marginBottom: "1rem",
                border: "1px solid #ffc107"
              }}>
                <p style={{ margin: 0, color: "#856404" }}>
                  ⚠️ You must be logged in to submit an adoption application.
                  <a href="/login" style={{ color: "#0c5bd7", marginLeft: "0.5rem" }}>Login here</a>
                </p>
              </div>
            )}
            <form onSubmit={handleSubmitApplication}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={applicationData.phone}
                    onChange={handleApplicationChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Address *
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={applicationData.address}
                    onChange={handleApplicationChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Occupation *
                  </label>
                  <input
                    type="text"
                    name="occupation"
                    value={applicationData.occupation}
                    onChange={handleApplicationChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Home Type
                  </label>
                  <select
                    name="homeType"
                    value={applicationData.homeType}
                    onChange={handleApplicationChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  >
                    <option value="apartment">Apartment</option>
                    <option value="house">House</option>
                    <option value="townhouse">Townhouse</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      name="hasYard"
                      checked={applicationData.hasYard}
                      onChange={handleApplicationChange}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Do you have yard access?
                  </label>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      name="hasOtherPets"
                      checked={applicationData.hasOtherPets}
                      onChange={handleApplicationChange}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Do you have other pets?
                  </label>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Pet Experience *
                  </label>
                  <textarea
                    name="petExperience"
                    value={applicationData.petExperience}
                    onChange={handleApplicationChange}
                    placeholder="Tell us about your experience with pets..."
                    rows="3"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Hours pet would be alone daily
                  </label>
                  <input
                    type="text"
                    name="hoursAlone"
                    value={applicationData.hoursAlone}
                    onChange={handleApplicationChange}
                    placeholder="e.g., 4-6 hours"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Exercise Plan
                  </label>
                  <input
                    type="text"
                    name="exercisePlan"
                    value={applicationData.exercisePlan}
                    onChange={handleApplicationChange}
                    placeholder="How will you exercise this pet?"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Why do you want to adopt this pet? *
                  </label>
                  <textarea
                    name="reason"
                    value={applicationData.reason}
                    onChange={handleApplicationChange}
                    placeholder="Tell us why you think you'd be a good match..."
                    rows="4"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    References (Optional)
                  </label>
                  <textarea
                    name="references"
                    value={applicationData.references}
                    onChange={handleApplicationChange}
                    placeholder="Previous pet owners, vets, etc."
                    rows="2"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Additional Comments
                  </label>
                  <textarea
                    name="additionalComments"
                    value={applicationData.additionalComments}
                    onChange={handleApplicationChange}
                    placeholder="Anything else you'd like to share..."
                    rows="3"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  />
                </div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem",
                    fontWeight: "bold"
                  }}
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowAdoptionForm(false)}
                  style={{
                    padding: "12px 24px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "1rem"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Contact Form (when not showing adoption form) */}
        {!showAdoptionForm && (
          <div style={{
            marginTop: "2rem",
            padding: "2rem",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
            border: "1px solid #dee2e6"
          }}>
            <h3>Ask a Question about {pet.name}</h3>
            <textarea
              value={contactMessage}
              onChange={(e) => setContactMessage(e.target.value)}
              placeholder="What would you like to know?"
              style={{
                width: "100%",
                minHeight: "120px",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ced4da",
                fontSize: "1rem",
                fontFamily: "inherit",
                marginBottom: "1rem"
              }}
            />
            <div style={{ display: "flex", gap: "1rem" }}>
              <button
                onClick={handleSubmitContact}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer"
                }}
              >
                Send Message
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}