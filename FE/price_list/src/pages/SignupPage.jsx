import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useLanguage } from "../contexts/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";
import { motion, AnimatePresence } from "framer-motion";
import "../styles/LoginPage.css";
const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, signup } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError(t("signup.passwordsDoNotMatch"));
      return;
    }

    setLoading(true);

    try {
      const result = await signup(username, password);

      if (result.success) {
        navigate("/dashboard");
      } else {
        setError(result.message || t("signup.error"));
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError(t("signup.error"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="language-switcher-container">
        <LanguageSwitcher />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="login-form-container"
      >
        <h1 className="login-title">{t("signup.title")}</h1>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="error-message"
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <form className="login-form" onSubmit={handleSubmit}>
          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <label htmlFor="username">{t("signup.username")}</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              className="form-input"
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <label htmlFor="password">{t("signup.password")}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="form-input"
            />
          </motion.div>

          <motion.div
            className="form-group"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <label htmlFor="confirmPassword">
              {t("signup.confirmPassword")}
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              autoComplete="new-password"
              className="form-input"
            />
          </motion.div>

          <motion.button
            type="submit"
            className="login-button"
            disabled={loading}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {loading ? t("signup.creating") : t("signup.submit")}
          </motion.button>
        </form>

        <motion.div
          className="login-links"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          key={`signup-links-${language}`}
        >
          <p>
            {t("signup.alreadyHaveAccount")}{" "}
            <Link to="/" className="signup-link">
              {t("signup.loginHere")}
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
