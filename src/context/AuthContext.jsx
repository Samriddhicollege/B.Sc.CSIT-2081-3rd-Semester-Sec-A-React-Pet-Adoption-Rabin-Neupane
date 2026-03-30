import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    const savedUsers = localStorage.getItem('users');
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const login = (userData) => {
    // Check if admin login (simple check for demo)
    if (userData.email === 'admin@petadoption.com' && userData.password === 'admin123') {
      const adminUser = {
        id: 'admin',
        name: 'Admin',
        email: 'admin@petadoption.com',
        role: 'admin'
      };
      localStorage.setItem('user', JSON.stringify(adminUser));
      setUser(adminUser);
      return true;
    }

    // Check against registered users
    const foundUser = users.find(u => u.email === userData.email && u.password === userData.password);
    if (foundUser) {
      const userWithRole = {
        ...foundUser,
        role: 'user'
      };
      localStorage.setItem('user', JSON.stringify(userWithRole));
      setUser(userWithRole);
      return true;
    }

    return false; // Login failed
  };

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const signup = (userData) => {
    // Check if email already exists
    const existingUser = users.find(u => u.email === userData.email);
    if (existingUser) {
      return false; // Email already registered
    }

    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      role: 'user'
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Auto-login after signup
    const userWithRole = {
      ...newUser,
      role: 'user'
    };
    localStorage.setItem('user', JSON.stringify(userWithRole));
    setUser(userWithRole);

    return true;
  };

  const isAdmin = () => user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}
