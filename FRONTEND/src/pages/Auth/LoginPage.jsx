import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./LoginPage.css";
import { post } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const toast = useToast();

  // Form state - only email and password needed for login
  const [data, setData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // Error state - for showing validation and authentication errors
  const [error, setError] = useState({});

  // Loading state - for showing spinner during authentication
  const [loading, setLoading] = useState(false);

  /**
   * Handle input changes
   * Clear errors when user types
   */
  function getData(e) {
    const { name, value, type, checked } = e.target;

    setData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for the field being edited
    if (error[name] || error.auth) {
      setError((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.auth; // Clear authentication error
        return newErrors;
      });
    }
  }

  /**
   * Validate form inputs
   * Basic validation before authentication attempt
   */
  function validate() {
    let newError = {};

    // Email validation
    if (!data.email.trim()) {
      newError.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      newError.email = "Please enter a valid email";
    }

    // Password validation
    if (!data.password.trim()) {
      newError.password = "Password is required";
    } else if (data.password.length < 6) {
      newError.password = "Password must be at least 6 characters";
    }

    return newError;
  }

  async function showData(e) {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    setLoading(true);
    setError({});

    try {
      const response = await post("/auth/login", {
        email: data.email,
        password: data.password,
      });

      const authData = response?.data || response;

      if (!authData?.token || !authData?.user) {
        throw new Error("Authentication response was invalid.");
      }

      login(authData.token, authData.user);

      toast.success("Login successful! Welcome back.");

      setData({
        email: "",
        password: "",
        remember: false,
      });

      // Redirect back to the page the user came from, or to their role's home
      const from = location.state?.from?.pathname;
      if (from && from !== "/login") {
        navigate(from, { replace: true });
      } else {
        navigate(authData.user.role === "admin" ? "/admin" : "/products", { replace: true });
      }
    } catch (error) {
      console.error("❌ Login error:", error);

      setError({
        auth: error.message || "Invalid email or password",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="brand">
            <h1>NovaPanel</h1>
            <p>Secure access to your dashboard</p>
          </div>

          <form
            onSubmit={showData}
            noValidate
            autoComplete="off"
            className="login-form"
          >
            {/* Show authentication error at the top if exists */}
            {error.auth && (
              <div
                style={{
                  padding: "12px 16px",
                  backgroundColor: "#fee",
                  border: "1px solid #fcc",
                  borderRadius: "6px",
                  marginBottom: "20px",
                  fontSize: "14px",
                  color: "#c33",
                }}
              >
                {error.auth}
              </div>
            )}

            {/* Email Input */}
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={data.email}
                onChange={getData}
                disabled={loading}
              />
              {error.email && (
                <p style={{ color: "red", fontSize: "14px" }}>{error.email}</p>
              )}
            </div>

            {/* Password Input */}
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={data.password}
                onChange={getData}
                disabled={loading}
              />
              {error.password && (
                <p style={{ color: "red", fontSize: "14px" }}>
                  {error.password}
                </p>
              )}
            </div>

            {/* Remember Me Checkbox (optional) */}
            <div className="login-options">
              <label className="remember">
                <input
                  type="checkbox"
                  name="remember"
                  checked={data.remember}
                  onChange={getData}
                  disabled={loading}
                />
                Remember Me
              </label>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="login-btn"
              disabled={loading}
              style={{
                opacity: loading ? 0.6 : 1,
                cursor: loading ? "not-allowed" : "pointer",
              }}
            >
              {loading ? "Logging in..." : "Log In"}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            {/* Google Login Button */}
            <button
              type="button"
              className="google-btn"
              onClick={() => navigate("/google")}
              disabled={loading}
            >
              Continue with Google
            </button>
          </form>

          {/* Signup Link */}
          <p className="signup-text">
            Don't have an account?
            <a href="/signup"> Create Account</a>
          </p>
        </div>

        {/* Right Side Banner */}
        <div className="login-right">
          <div className="overlay">
            <h2>Welcome Back</h2>
            <p>
              Access your projects, analytics and team workspace securely.
              Manage everything from one powerful dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
