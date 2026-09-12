import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./GoogleLoginPage.css";
function GoogleLoginPage() {
  const navigate = useNavigate();
  const [mobileNumber, setMobileNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!mobileNumber.trim()) {
      setError("Mobile number is required");
      return;
    }

    if (!/^\d{10}$/.test(mobileNumber)) {
      setError("Please enter a valid 10-digit mobile number ");
      return;
    }

    if (!agreeTerms) {
      setError("Please agree to Terms of Use and Privacy Policy");
      return;
    }

    setLoading(true);
    setError("");

    setTimeout(() => {
      // This page is a demo OTP flow — not connected to the real backend.
      // Store under a separate key so it doesn't corrupt AuthContext state.
      const demoData = {
        id: Date.now(),
        mobile: mobileNumber,
        loginTime: new Date().toISOString(),
      };

      localStorage.setItem("google_demo_user", JSON.stringify(demoData));

      setLoading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="gmail-login-page">
      <div className="gmail-login-container">
        <div className="promo-banner">
          <div className="promo-content">
            <div className="promo-badge">
              <span className="flat-text">
                FLAT
              </span>
              <span className="discount-amount">
                ₹500 OFF
              </span>
            </div>
            <p className="promo-subtitle">
              + EXCITING OFFERS*
            </p>
            <button className="download-btn">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="7 10 12 15 17 10"></polyline>
                <line x1="12" y1="15" x2="12" y2="3"></line>
              </svg>
              MYNTRA APP
            </button>
          </div>
          <div className="promo-image">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop"
              alt="Shopping"
            />
          </div>
          <div className="promo-badge-corner">
            <span>₹500</span>
            <span>OFF</span>
          </div>
        </div>

        <div className="gmail-login-card">
          <div className="login-header">
            <h1 className="login-title">
              Login{" "}
              <span className="or-text">
                or
              </span>{" "}
              Signup
            </h1>
          </div>

          <form
            onSubmit={handleSubmit}
            className="gmail-login-form"
          >
            <div className="mobile-input-group">
              <div className="country-code">
                +91
              </div>
              <input
                type="tel"
                placeholder="Mobile Number*"
                value={mobileNumber}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "").slice(0, 10);
                  setMobileNumber(value);
                  setError("");
                }}
                maxLength="10"
                className={error ? "error" : ""}
              />
            </div>

            {error && (
              <p className="gmail-error">
                {error}
              </p>
            )}

            <div className="terms-checkbox">
              <label>
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => {
                    setAgreeTerms(e.target.checked);
                    setError("");
                  }}
                />
                <span className="checkbox-text">
                  By continuing, I agree to the{" "}
                  <a
                    href="#terms"
                    className="link-pink"
                  >
                    Terms of Use
                  </a>{" "}
                  &{" "}
                  <a
                    href="#privacy"
                    className="link-pink"
                  >
                    Privacy Policy
                  </a>{" "}
                  and I am above 18 years old.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="continue-btn"
              disabled={loading}
            >
              {loading ? (
                <span className="gmail-spinner"></span>
              ) : (
                "CONTINUE"
              )}
            </button>

            <div className="help-text">
              Have trouble logging in?{" "}
              <a
                href="#help"
                className="link-pink"
              >
                Get help
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GoogleLoginPage;
