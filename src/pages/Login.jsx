import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import "../index.css";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      addNotification("Please fill in all fields", 'error', 2000);
      return;
    }

    const loginSuccess = login({
      email: formData.email.trim(),
      password: formData.password.trim()
    });

    if (loginSuccess) {
      addNotification("Logged in successfully!", 'success', 2000);
      navigate("/");
    } else {
      addNotification("Invalid email or password", 'error', 3000);
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Login</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem", color: "#6c757d" }}>
        Don't have an account? <a href="/signup" style={{ color: "#007bff" }}>Sign up</a>
      </p>
    </div>
  );
}