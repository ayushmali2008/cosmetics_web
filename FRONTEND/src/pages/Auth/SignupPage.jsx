import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignupPage.css";
import { post } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";

function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const toast = useToast();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validate = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password =
        "Password must contain uppercase, lowercase and number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      const response = await post("/auth/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      const authData = response?.data || response;

      if (authData?.token && authData?.user) {
        login(authData.token, authData.user);
      }

      toast.success("Account created successfully! Welcome.");

      navigate(authData?.user?.role === "admin" ? "/admin" : "/products");
    } catch (error) {
      console.error("Signup error:", error);

      setErrors({
        email: error.message || "Registration failed",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <div className="signup-banner">
          <div className="banner-overlay">
            <div className="banner-content">
              <span>
                <h1 className="banner-title">
                  Join the Fashion Revolution
                </h1>
              </span>
              <p className="banner-subtitle">
                Create your account and unlock exclusive deals, personalized
                recommendations, and a seamless shopping experience.
              </p>

              <div className="benefits-list">
                <div className="benefit-item">
                  <div className="benefit-icon">
                    🎁
                  </div>
                  <div className="benefit-text">
                    <h3>Welcome Offer</h3>
                    <p>Get ₹500 OFF on your first order</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    🚚
                  </div>
                  <div className="benefit-text">
                    <h3>Free Delivery</h3>
                    <p>On orders above ₹999</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    ⭐
                  </div>
                  <div className="benefit-text">
                    <h3>Exclusive Access</h3>
                    <p>Early access to sales & new arrivals</p>
                  </div>
                </div>

                <div className="benefit-item">
                  <div className="benefit-icon">
                    💳
                  </div>
                  <div className="benefit-text">
                    <h3>Easy Returns</h3>
                    <p>30-day return & exchange policy</p>
                  </div>
                </div>
              </div>

              <div className="trust-badges">
                <div className="trust-badge">
                  <span className="badge-number">
                    10M+
                  </span>
                  <span className="badge-label">
                    Happy Customers
                  </span>
                </div>
                <div className="trust-badge">
                  <span className="badge-number">
                    50K+
                  </span>
                  <span className="badge-label">
                    Products
                  </span>
                </div>
                <div className="trust-badge">
                  <span className="badge-number">
                    4.8★
                  </span>
                  <span className="badge-label">
                    Rating
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="signup-form-section">
          <div className="form-header">
            <h2 className="form-title">
              Create Account
            </h2>
            <p className="form-subtitle">
              Sign up to start shopping
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="signup-form"
            noValidate
          >
            <div className="form-group">
              <label
                htmlFor="name"
                className="form-label"
              >
                Name <span className="required">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`form-input ${errors.name ? "error" : ""} [width:100%] [padding:14px_16px] [border:1px_solid_var(--border-color,_#d4d5d9)] [border-radius:6px] [font-size:15px] [color:var(--text-primary,_#282c3f)] [background:var(--input-bg,_#fff)] [transition:all_0.3s_ease] [font-family:inherit] hover:[border-color:#ff3f6c] focus:[outline:none] focus:[border-color:#ff3f6c] focus:[box-shadow:0_0_0_3px_rgba(255,_63,_108,_0.1)] [color:var(--text-tertiary,_#94969f)] [color:#9aa0a6] [background:#fff5f7]`}
              />
              {errors.name && (
                <span className="error-message">
                  {errors.name}
                </span>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email Address{" "}
                <span className="required">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`form-input ${errors.email ? "error" : ""} [width:100%] [padding:14px_16px] [border:1px_solid_var(--border-color,_#d4d5d9)] [border-radius:6px] [font-size:15px] [color:var(--text-primary,_#282c3f)] [background:var(--input-bg,_#fff)] [transition:all_0.3s_ease] [font-family:inherit] hover:[border-color:#ff3f6c] focus:[outline:none] focus:[border-color:#ff3f6c] focus:[box-shadow:0_0_0_3px_rgba(255,_63,_108,_0.1)] [color:var(--text-tertiary,_#94969f)] [color:#9aa0a6] [background:#fff5f7]`}
              />
              {errors.email && (
                <span className="error-message">
                  {errors.email}
                </span>
              )}
            </div>

            <div className="form-group">
              <label
                htmlFor="password"
                className="form-label"
              >
                Password <span className="required">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  className={`form-input ${errors.password ? "error" : ""} [width:100%] [padding:14px_16px] [border:1px_solid_var(--border-color,_#d4d5d9)] [border-radius:6px] [font-size:15px] [color:var(--text-primary,_#282c3f)] [background:var(--input-bg,_#fff)] [transition:all_0.3s_ease] [font-family:inherit] hover:[border-color:#ff3f6c] focus:[outline:none] focus:[border-color:#ff3f6c] focus:[box-shadow:0_0_0_3px_rgba(255,_63,_108,_0.1)] [color:var(--text-tertiary,_#94969f)] [color:#9aa0a6] [background:#fff5f7]`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.password && (
                <span className="error-message">
                  {errors.password}
                </span>
              )}
              <span className="input-hint">
                Must be 8+ characters with uppercase, lowercase & number
              </span>
            </div>

            <div className="form-group">
              <label
                htmlFor="confirmPassword"
                className="form-label"
              >
                Confirm Password{" "}
                <span className="required">*</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className={`form-input ${errors.confirmPassword ? "error" : ""} [width:100%] [padding:14px_16px] [border:1px_solid_var(--border-color,_#d4d5d9)] [border-radius:6px] [font-size:15px] [color:var(--text-primary,_#282c3f)] [background:var(--input-bg,_#fff)] [transition:all_0.3s_ease] [font-family:inherit] hover:[border-color:#ff3f6c] focus:[outline:none] focus:[border-color:#ff3f6c] focus:[box-shadow:0_0_0_3px_rgba(255,_63,_108,_0.1)] [color:var(--text-tertiary,_#94969f)] [color:#9aa0a6] [background:#fff5f7]`}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-message">
                  {errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              type="submit"
              className="submit-btn"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Creating Account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

            <div className="form-footer">
              <p className="footer-text">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="footer-link"
                >
                  Login here
                </button>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
