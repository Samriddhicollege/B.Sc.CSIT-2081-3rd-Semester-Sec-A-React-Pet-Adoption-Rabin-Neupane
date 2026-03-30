import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useNotification } from "../hooks/useNotification";
import "../index.css";

export default function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const { signup } = useAuth();
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      addNotification("Please fill in all fields", 'error', 2000);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      addNotification("Passwords don't match", 'error', 2000);
      return;
    }

    if (formData.password.length < 6) {
      addNotification("Password must be at least 6 characters", 'error', 2000);
      return;
    }

    const signupSuccess = signup({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (signupSuccess) {
      addNotification("Account created successfully! Welcome!", 'success', 2000);
      navigate("/");
    } else {
      addNotification("Email already registered. Please use a different email or login.", 'error', 3000);
    }
  };

  return (
    <div className="form-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="email"
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
        />
        <button type="submit">Create Account</button>
      </form>
      <p style={{ textAlign: "center", marginTop: "1rem", color: "#6c757d" }}>
        Already have an account? <a href="/login" style={{ color: "#007bff" }}>Login</a>
      </p>
    </div>
  );
}