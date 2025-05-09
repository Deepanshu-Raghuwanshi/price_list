import { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const baseURL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/['"]+/g, "");
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up axios interceptor for authentication
    const interceptor = axios.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Check if token is valid on initial load
    const validateToken = async () => {
      if (token) {
        try {
          // Make a request to validate the token
          const response = await axios.get(`${baseURL}/products`);
          if (response.data.success) {
            // If successful, we know the token is valid
            const userData = JSON.parse(localStorage.getItem("user"));
            setUser(userData);
          } else {
            // If not successful, clear the token
            logout();
          }
        } catch (error) {
          console.log(error);
          // If there's an error, clear the token
          logout();
        }
      }
      setLoading(false);
    };

    validateToken();

    return () => {
      // Clean up interceptor on unmount
      axios.interceptors.request.eject(interceptor);
    };
  }, [token]);

  const login = async (username, password) => {
    try {
      console.log(baseURL);
      const response = await axios.post(`${baseURL}/auth/login`, {
        username,
        password,
      });

      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;

        // Save token and user data to localStorage
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update state
        setToken(newToken);
        setUser(userData);

        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || "Login failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const signup = async (username, password) => {
    try {
      const response = await axios.post(`${baseURL}/auth/signup`, {
        username,
        password,
      });

      if (response.data.success) {
        const { token: newToken, user: userData } = response.data;

        // Save token and user data to localStorage
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(userData));

        // Update state
        setToken(newToken);
        setUser(userData);

        return { success: true };
      } else {
        return {
          success: false,
          message: response.data.message || "Signup failed",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Signup failed",
      };
    }
  };

  const logout = () => {
    // Clear token and user data from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Update state
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, token, login, signup, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
