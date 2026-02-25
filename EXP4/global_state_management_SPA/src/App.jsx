import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const GlobalContext = createContext();

// Provider Component
const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState("Guest");
  const [theme, setTheme] = useState("light");

  const users = ["Guest", "John Doe", "Alice", "Michael", "Emma"];

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <GlobalContext.Provider
      value={{ user, setUser, theme, toggleTheme, users }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

// Dashboard Component
const Dashboard = () => {
  const { user, setUser, theme, toggleTheme, users } =
    useContext(GlobalContext);

  return (
    <div className="dashboard-card">
      <header style={{ marginBottom: '2rem' }}>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>Welcome back,</p>
        <h1>{user}</h1>
      </header>

      <div className="controls">
        <div style={{ width: '100%', textAlign: 'left' }}>
          <label style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginLeft: '0.5rem' }}>Switch Account</label>
          <select
            value={user}
            onChange={(e) => setUser(e.target.value)}
          >
            {users.map((u, index) => (
              <option key={index} value={u} style={{ color: '#000' }}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "Dark" : "Light"} Mode
        </button>
      </div>
    </div>
  );
};

// Main App
function App() {
  return (
    <GlobalProvider>
      <Dashboard />
    </GlobalProvider>
  );
}

export default App;
