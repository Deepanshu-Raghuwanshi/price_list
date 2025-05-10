import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ToastContainer } from "react-toastify";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import DashboardPage from "./pages/DashboardPage";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

// Component to handle protected routes and redirects
const AppRoutes = () => {
  const { user, loading } = useAuth();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!loading) {
      setIsInitialized(true);
    }
  }, [loading]);

  if (!isInitialized) {
    return null; // Show nothing while checking authentication
  }

  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />}
      />
      <Route
        path="/signup"
        element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />}
      />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/products" element={<DashboardPage />} />
      <Route path="/profile" element={<DashboardPage />} />
      <Route path="/settings" element={<DashboardPage />} />
      <Route
        path="*"
        element={<Navigate to={user ? "/dashboard" : "/"} replace />}
      />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <LanguageProvider>
        <AuthProvider>
          <AppRoutes />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            toastStyle={{
              borderRadius: "10px",
              fontWeight: "500",
              fontSize: "16px",
              boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
            }}
          />
        </AuthProvider>
      </LanguageProvider>
    </Router>
  );
}

export default App;
