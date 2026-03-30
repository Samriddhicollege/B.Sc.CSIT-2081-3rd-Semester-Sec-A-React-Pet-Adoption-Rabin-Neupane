import { SUCCESS_STORIES } from '../data/petsData';
import '../index.css';

export default function SuccessStories() {
  return (
    <div className="container">
      <h2 style={{ textAlign: "center", marginTop: "2rem", marginBottom: "1rem" }}>
        Success Stories
      </h2>
      <p style={{ textAlign: "center", color: "#6c757d", marginBottom: "3rem" }}>
        Read about happy adoptions and the families who found their perfect companions
      </p>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "3rem"
      }}>
        {SUCCESS_STORIES.map(story => (
          <div 
            key={story.id}
            style={{
              backgroundColor: "#f8f9fa",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              transition: "transform 0.3s ease"
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-5px)"}
            onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
          >
            <img 
              src={story.image} 
              alt={story.petName}
              style={{ width: "100%", height: "250px", objectFit: "cover" }}
            />
            <div style={{ padding: "1.5rem" }}>
              <h3 style={{ margin: "0 0 0.5rem", color: "#212529" }}>
                {story.petName}
              </h3>
              <p style={{ margin: "0 0 1rem", color: "#6c757d", fontStyle: "italic" }}>
                Adopted by {story.adopterName}
              </p>
              <p style={{ margin: 0, lineHeight: "1.6", color: "#495057" }}>
                "{story.story}"
              </p>
            </div>
          </div>
        ))}
      </div>

      <div style={{
        backgroundColor: "#e7f3ff",
        padding: "2rem",
        borderRadius: "12px",
        textAlign: "center",
        marginBottom: "2rem",
        border: "2px solid #b3d9ff"
      }}>
        <h3>Want to Share Your Success Story?</h3>
        <p style={{ color: "#0c5bd7" }}>
          After adoption, we'd love to hear about your new companion!
        </p>
        <button style={{
          padding: "10px 20px",
          backgroundColor: "#0c5bd7",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontSize: "1rem"
        }}>
          Share Your Story
        </button>
      </div>
    </div>
  );
}
