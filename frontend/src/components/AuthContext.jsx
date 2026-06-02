import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedRole = localStorage.getItem("role");

    if (storedToken) setToken(storedToken);
    if (storedRole) setRole(storedRole);

    setLoading(false);
  }, []);

  const login = (token) => {
    const payload = JSON.parse(
      atob(token.split(".")[1])
    );

    localStorage.setItem("token", token);
    localStorage.setItem("role", payload.role);

    setToken(token);
    setRole(payload.role);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        loading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);