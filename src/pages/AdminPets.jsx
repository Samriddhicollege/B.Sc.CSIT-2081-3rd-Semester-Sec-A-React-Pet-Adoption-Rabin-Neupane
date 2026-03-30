import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { usePets } from '../hooks/usePets';
import { useNotification } from '../hooks/useNotification';
import { Link } from 'react-router-dom';
import '../index.css';

export default function AdminPets() {
  const { isAdmin } = useAuth();
  const { pets, addPet, updatePet, deletePet } = usePets();
  const { addNotification } = useNotification();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPet, setEditingPet] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
    type: 'dog',
    image: '',
    personality: [],
    vaccinated: false,
    microchipped: false,
    description: ''
  });

  if (!isAdmin()) {
    return (
      <div className="container">
        <div style={{ textAlign: "center", padding: "4rem 2rem", minHeight: "500px" }}>
          <h2>Access Denied</h2>
          <p>You don't have permission to access this page.</p>
          <Link to="/" style={{ color: "#007bff" }}>Go back to home</Link>
        </div>
      </div>
    );
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePersonalityChange = (e) => {
    const personality = e.target.value.split(',').map(p => p.trim()).filter(p => p);
    setFormData(prev => ({ ...prev, personality }));
  };

  const resetForm = () => {
    setFormData({
      name: '',
      age: '',
      breed: '',
      type: 'dog',
      image: '',
      personality: [],
      vaccinated: false,
      microchipped: false,
      description: ''
    });
    setEditingPet(null);
    setShowAddForm(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.age || !formData.breed || !formData.image || !formData.description) {
      addNotification('Please fill in all required fields', 'error');
      return;
    }

    try {
      if (editingPet) {
        updatePet(editingPet.id, formData);
        addNotification(`Updated ${formData.name} successfully!`, 'success');
      } else {
        addPet(formData);
        addNotification(`Added ${formData.name} successfully!`, 'success');
      }
      resetForm();
    } catch {
      addNotification('Error saving pet', 'error');
    }
  };

  const handleEdit = (pet) => {
    setEditingPet(pet);
    setFormData({
      name: pet.name,
      age: pet.age,
      breed: pet.breed,
      type: pet.type,
      image: pet.image,
      personality: pet.personality || [],
      vaccinated: pet.vaccinated || false,
      microchipped: pet.microchipped || false,
      description: pet.description
    });
    setShowAddForm(true);
  };

  const handleDelete = (petId, petName) => {
    if (window.confirm(`Are you sure you want to delete ${petName}?`)) {
      deletePet(petId);
      addNotification(`Deleted ${petName}`, 'info');
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1>Manage Pets 🐾</h1>
            <p style={{ color: "#6c757d" }}>Add, edit, or remove pet listings</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            style={{
              padding: "12px 24px",
              backgroundColor: showAddForm ? "#6c757d" : "#007bff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "1rem"
            }}
          >
            {showAddForm ? 'Cancel' : '+ Add New Pet'}
          </button>
        </div>

        {/* Add/Edit Form */}
        {showAddForm && (
          <div style={{
            backgroundColor: "#f8f9fa",
            padding: "2rem",
            borderRadius: "8px",
            marginBottom: "2rem",
            border: "1px solid #dee2e6"
          }}>
            <h2>{editingPet ? 'Edit Pet' : 'Add New Pet'}</h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Age *
                  </label>
                  <input
                    type="text"
                    name="age"
                    value={formData.age}
                    onChange={handleInputChange}
                    placeholder="e.g., 2 yrs"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Breed *
                  </label>
                  <input
                    type="text"
                    name="breed"
                    value={formData.breed}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Type
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  >
                    <option value="dog">Dog</option>
                    <option value="cat">Cat</option>
                  </select>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Image URL *
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    placeholder="https://example.com/pet-image.jpg"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Personality Traits
                  </label>
                  <input
                    type="text"
                    value={formData.personality.join(', ')}
                    onChange={handlePersonalityChange}
                    placeholder="Friendly, Energetic, Loyal"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      name="vaccinated"
                      checked={formData.vaccinated}
                      onChange={handleInputChange}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Vaccinated
                  </label>
                </div>

                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    <input
                      type="checkbox"
                      name="microchipped"
                      checked={formData.microchipped}
                      onChange={handleInputChange}
                      style={{ marginRight: "0.5rem" }}
                    />
                    Microchipped
                  </label>
                </div>

                <div style={{ gridColumn: "1 / -1" }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: "bold" }}>
                    Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                    style={{ width: "100%", padding: "8px", borderRadius: "4px", border: "1px solid #ced4da" }}
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: "1rem", display: "flex", gap: "1rem" }}>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  {editingPet ? 'Update Pet' : 'Add Pet'}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    padding: "10px 20px",
                    backgroundColor: "#6c757d",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                    cursor: "pointer"
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Pets List */}
        <div style={{ marginTop: "2rem" }}>
          <h2>All Pets ({pets.length})</h2>
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1rem"
          }}>
            {pets.map(pet => (
              <div key={pet.id} style={{
                border: "1px solid #dee2e6",
                borderRadius: "8px",
                overflow: "hidden",
                backgroundColor: "#fff"
              }}>
                <img
                  src={pet.image}
                  alt={pet.name}
                  style={{ width: "100%", height: "200px", objectFit: "cover" }}
                />
                <div style={{ padding: "1rem" }}>
                  <h3 style={{ margin: "0 0 0.5rem" }}>{pet.name}</h3>
                  <p style={{ margin: "0.25rem 0", color: "#6c757d" }}>
                    {pet.age} • {pet.breed} • {pet.type}
                  </p>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                    <button
                      onClick={() => handleEdit(pet)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        backgroundColor: "#007bff",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pet.id, pet.name)}
                      style={{
                        flex: 1,
                        padding: "8px",
                        backgroundColor: "#fe7a2d",
                        color: "white",
                        border: "none",
                        borderRadius: "4px",
                        cursor: "pointer"
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}