import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useApplications } from '../hooks/useApplications';
import { usePets } from '../hooks/usePets';
import { useNotification } from '../hooks/useNotification';
import { Link } from 'react-router-dom';
import '../index.css';

export default function AdminApplications() {
  const { isAdmin } = useAuth();
  const { applications, updateApplicationStatus, deleteApplication } = useApplications();
  const { getPetById } = usePets();
  const { addNotification } = useNotification();
  const [filter, setFilter] = useState('all');
  const [selectedApplication, setSelectedApplication] = useState(null);

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

  const filteredApplications = applications.filter(app => {
    if (filter === 'all') return true;
    return app.status === filter;
  });

  const handleStatusChange = (applicationId, newStatus) => {
    updateApplicationStatus(applicationId, newStatus);
    const app = applications.find(a => a.id === applicationId);
    addNotification(`Application ${newStatus} for ${app.petName}`, 'success');
  };

  const handleDelete = (applicationId) => {
    if (window.confirm('Are you sure you want to delete this application?')) {
      deleteApplication(applicationId);
      addNotification('Application deleted', 'info');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'approved': return '#28a745';
      case 'rejected': return '#fe7a2d';
      default: return '#6c757d';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return '⏳';
      case 'approved': return '✅';
      case 'rejected': return '❌';
      default: return 'Unknown';
    }
  };

  return (
    <div className="container">
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <div>
            <h1>Adoption Applications 📋</h1>
            <p style={{ color: "#6c757d" }}>Review and manage adoption applications</p>
          </div>

          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <label style={{ fontWeight: "bold" }}>Filter:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              style={{
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ced4da"
              }}
            >
              <option value="all">All Applications ({applications.length})</option>
              <option value="pending">Pending ({applications.filter(a => a.status === 'pending').length})</option>
              <option value="approved">Approved ({applications.filter(a => a.status === 'approved').length})</option>
              <option value="rejected">Rejected ({applications.filter(a => a.status === 'rejected').length})</option>
            </select>
          </div>
        </div>

        {/* Applications List */}
        <div style={{ marginTop: "2rem" }}>
          {filteredApplications.length === 0 ? (
            <div style={{
              textAlign: "center",
              padding: "3rem",
              backgroundColor: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #dee2e6"
            }}>
              <p style={{ fontSize: "1.2rem", color: "#6c757d" }}>
                No {filter === 'all' ? '' : filter} applications found
              </p>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {filteredApplications.map(app => {
                const pet = getPetById(app.petId);
                return (
                  <div key={app.id} style={{
                    border: "1px solid #dee2e6",
                    borderRadius: "8px",
                    padding: "1.5rem",
                    backgroundColor: "#fff",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "1rem" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.5rem" }}>
                          <h3 style={{ margin: 0 }}>{app.petName}</h3>
                          <span style={{
                            padding: "4px 12px",
                            borderRadius: "20px",
                            backgroundColor: getStatusColor(app.status),
                            color: "white",
                            fontSize: "0.8rem",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: "0.25rem"
                          }}>
                            {getStatusIcon(app.status)} {app.status}
                          </span>
                        </div>
                        <p style={{ color: "#6c757d", margin: "0.25rem 0" }}>
                          Applied by: <strong>{app.applicantName}</strong> ({app.applicantEmail})
                        </p>
                        <p style={{ color: "#6c757d", margin: "0.25rem 0", fontSize: "0.9rem" }}>
                          Submitted: {new Date(app.submittedAt).toLocaleDateString()} at {new Date(app.submittedAt).toLocaleTimeString()}
                        </p>
                      </div>

                      {pet && (
                        <div style={{ textAlign: "center", marginLeft: "1rem" }}>
                          <img
                            src={pet.image}
                            alt={pet.name}
                            style={{
                              width: "80px",
                              height: "80px",
                              borderRadius: "8px",
                              objectFit: "cover",
                              border: "2px solid #dee2e6"
                            }}
                          />
                          <p style={{ fontSize: "0.8rem", color: "#6c757d", margin: "0.25rem 0" }}>
                            {pet.breed}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Application Details */}
                    <div style={{
                      backgroundColor: "#f8f9fa",
                      padding: "1rem",
                      borderRadius: "6px",
                      marginBottom: "1rem"
                    }}>
                      <h4 style={{ margin: "0 0 0.5rem" }}>Application Details</h4>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem" }}>
                        <div>
                          <strong>Phone:</strong> {app.phone}
                        </div>
                        <div>
                          <strong>Address:</strong> {app.address}
                        </div>
                        <div>
                          <strong>Occupation:</strong> {app.occupation}
                        </div>
                        <div>
                          <strong>Has Other Pets:</strong> {app.hasOtherPets ? 'Yes' : 'No'}
                        </div>
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <strong>Experience:</strong> {app.petExperience}
                      </div>
                      <div style={{ marginTop: "0.5rem" }}>
                        <strong>Why they want this pet:</strong>
                        <p style={{ margin: "0.25rem 0", fontStyle: "italic" }}>{app.reason}</p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                      {app.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(app.id, 'approved')}
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#28a745",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.9rem"
                            }}
                          >
                            ✅ Approve
                          </button>
                          <button
                            onClick={() => handleStatusChange(app.id, 'rejected')}
                            style={{
                              padding: "8px 16px",
                              backgroundColor: "#fe7a2d",
                              color: "white",
                              border: "none",
                              borderRadius: "4px",
                              cursor: "pointer",
                              fontSize: "0.9rem"
                            }}
                          >
                            ❌ Reject
                          </button>
                        </>
                      )}

                      <button
                        onClick={() => setSelectedApplication(selectedApplication?.id === app.id ? null : app)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#007bff",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.9rem"
                        }}
                      >
                        {selectedApplication?.id === app.id ? 'Hide Details' : 'View Full Details'}
                      </button>

                      <button
                        onClick={() => handleDelete(app.id)}
                        style={{
                          padding: "8px 16px",
                          backgroundColor: "#6c757d",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: "0.9rem"
                        }}
                      >
                        🗑️ Delete
                      </button>
                    </div>

                    {/* Full Details Modal */}
                    {selectedApplication?.id === app.id && (
                      <div style={{
                        marginTop: "1rem",
                        padding: "1rem",
                        backgroundColor: "#e9ecef",
                        borderRadius: "6px",
                        border: "1px solid #ced4da"
                      }}>
                        <h4>Full Application Details</h4>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                          <div>
                            <strong>Home Type:</strong> {app.homeType}
                          </div>
                          <div>
                            <strong>Yard Access:</strong> {app.hasYard ? 'Yes' : 'No'}
                          </div>
                          <div>
                            <strong>Daily Hours Alone:</strong> {app.hoursAlone}
                          </div>
                          <div>
                            <strong>Exercise Plan:</strong> {app.exercisePlan}
                          </div>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          <strong>References:</strong>
                          <p>{app.references}</p>
                        </div>
                        <div style={{ marginTop: "1rem" }}>
                          <strong>Additional Comments:</strong>
                          <p>{app.additionalComments || 'None'}</p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}