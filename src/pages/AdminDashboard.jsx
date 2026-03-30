import { useAuth } from '../hooks/useAuth';
import { usePets } from '../hooks/usePets';
import { useApplications } from '../hooks/useApplications';
import { Link } from 'react-router-dom';
import '../index.css';

export default function AdminDashboard() {
  const { isAdmin } = useAuth();
  const { pets } = usePets();
  const { applications } = useApplications();

  if (!isAdmin()) {
    return (
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
        <div style={{ textAlign: "center", padding: "4rem 2rem", minHeight: "500px" }}>
          <h2 style={{ color: "#12325b", fontSize: "2rem", marginBottom: "1rem", fontWeight: "700" }}>Access Denied</h2>
          <p style={{ color: "#4f617f", fontSize: "1.05rem", marginBottom: "1.5rem" }}>You don't have permission to access this page.</p>
          <Link to="/" style={{ color: "#2c6ab8", fontSize: "1.05rem", fontWeight: "600", textDecoration: "underline" }}>Go back to home</Link>
        </div>
      </div>
    );
  }

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const approvedApplications = applications.filter(app => app.status === 'approved');
  const rejectedApplications = applications.filter(app => app.status === 'rejected');

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
        <h1 style={{ color: "#12325b", fontSize: "2.5rem", marginBottom: "0.5rem", fontWeight: "700" }}>Admin Dashboard</h1>
        <p style={{ color: "#4f617f", fontSize: "1.05rem" }}>Manage pets and adoption applications</p>

        {/* Stats Cards */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "1.5rem",
          marginTop: "2.5rem",
          marginBottom: "3rem"
        }}>
          <div style={{
            padding: "1.75rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e6ebf2",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"}
          >
            <h3 style={{ color: "#4f617f", margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: "600" }}>Total Pets</h3>
            <p style={{ fontSize: "2.8rem", fontWeight: "700", color: "#2c6ab8", margin: 0 }}>
              {pets.length}
            </p>
          </div>

          <div style={{
            padding: "1.75rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e6ebf2",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"}
          >
            <h3 style={{ color: "#4f617f", margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: "600" }}>Pending Applications</h3>
            <p style={{ fontSize: "2.8rem", fontWeight: "700", color: "#ffa500", margin: 0 }}>
              {pendingApplications.length}
            </p>
          </div>

          <div style={{
            padding: "1.75rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e6ebf2",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"}
          >
            <h3 style={{ color: "#4f617f", margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: "600" }}>Approved</h3>
            <p style={{ fontSize: "2.8rem", fontWeight: "700", color: "#4a9f6f", margin: 0 }}>
              {approvedApplications.length}
            </p>
          </div>

          <div style={{
            padding: "1.75rem",
            backgroundColor: "#ffffff",
            borderRadius: "12px",
            border: "1px solid #e6ebf2",
            textAlign: "center",
            boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
            transition: "all 0.3s ease"
          }}
          onMouseEnter={(e) => e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.1)"}
          onMouseLeave={(e) => e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.06)"}
          >
            <h3 style={{ color: "#4f617f", margin: "0 0 1rem", fontSize: "0.95rem", fontWeight: "600" }}>Rejected</h3>
            <p style={{ fontSize: "2.8rem", fontWeight: "700", color: "#fe7a2d", margin: 0 }}>
              {rejectedApplications.length}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "1.5rem",
          marginBottom: "3rem"
        }}>
          <Link to="/admin/pets" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "2rem",
              background: "linear-gradient(135deg, #2c6ab8 0%, #4a8fc8 100%)",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 16px rgba(44, 106, 184, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(44, 106, 184, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(44, 106, 184, 0.25)";
            }}
            >
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.35rem", fontWeight: "700" }}>Manage Pets</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.95 }}>Add, edit, or remove pet listings</p>
            </div>
          </Link>

          <Link to="/admin/applications" style={{ textDecoration: "none" }}>
            <div style={{
              padding: "2rem",
              background: "linear-gradient(135deg, #4a9f6f 0%, #5bb580 100%)",
              color: "white",
              borderRadius: "12px",
              textAlign: "center",
              cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 6px 16px rgba(74, 159, 111, 0.25)"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-4px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(74, 159, 111, 0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 16px rgba(74, 159, 111, 0.25)";
            }}
            >
              <h3 style={{ margin: "0 0 0.75rem", fontSize: "1.35rem", fontWeight: "700" }}>Review Applications</h3>
              <p style={{ margin: 0, fontSize: "0.95rem", opacity: 0.95 }}>View and manage adoption applications</p>
            </div>
          </Link>
        </div>

        {/* Recent Activity */}
        <div style={{ marginTop: "3rem" }}>
          <h2 style={{ color: "#12325b", fontSize: "1.8rem", marginBottom: "1.5rem", fontWeight: "700" }}>Recent Activity</h2>

          <div style={{ marginTop: "1.5rem" }}>
            <h3 style={{ color: "#12325b", fontSize: "1.25rem", marginBottom: "1rem", fontWeight: "700" }}>Recent Applications</h3>
            {applications.slice(-5).reverse().map(app => (
              <div key={app.id} style={{
                padding: "1.25rem",
                border: "1px solid #e6ebf2",
                borderRadius: "10px",
                marginBottom: "0.75rem",
                backgroundColor: "#ffffff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                transition: "all 0.2s ease"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.08)";
                e.currentTarget.style.transform = "translateX(2px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.04)";
                e.currentTarget.style.transform = "translateX(0)";
              }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <strong style={{ color: "#12325b", fontSize: "1.05rem" }}>{app.petName}</strong> 
                    <span style={{ color: "#4f617f", marginLeft: "0.5rem" }}>— {app.applicantName}</span>
                    <br />
                    <small style={{ color: "#8b9cb5", fontSize: "0.9rem" }}>{app.applicantEmail}</small>
                  </div>
                  <span style={{
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "0.85rem",
                    fontWeight: "600",
                    backgroundColor: app.status === 'pending' ? '#fff4e6' :
                                   app.status === 'approved' ? '#e8f5f0' : '#ffe8e0',
                    color: app.status === 'pending' ? '#ffa500' :
                           app.status === 'approved' ? '#4a9f6f' : '#fe7a2d'
                  }}>
                    {app.status}
                  </span>
                </div>
                <small style={{ color: "#8b9cb5", marginTop: "0.5rem", display: "block" }}>
                  Submitted: {new Date(app.submittedAt).toLocaleDateString()}
                </small>
              </div>
            ))}
            {applications.length === 0 && (
              <p style={{ color: "#8b9cb5", fontStyle: "italic" }}>No applications yet</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}