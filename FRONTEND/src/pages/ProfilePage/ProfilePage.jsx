import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { patch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user, updateUser } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    currentPassword: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Build only the fields the user actually touched
    const payload = {};
    if (form.name.trim() && form.name.trim() !== user?.name)
      payload.name = form.name.trim();
    if (form.currentPassword || form.newPassword) {
      payload.currentPassword = form.currentPassword;
      payload.newPassword = form.newPassword;
    }

    if (Object.keys(payload).length === 0) {
      toast.info("No changes to save.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await patch("/auth/me", payload);
      const updatedUser = response?.data;
      if (updatedUser) updateUser(updatedUser);

      toast.success("Profile updated successfully.");
      setForm((prev) => ({ ...prev, currentPassword: "", newPassword: "" }));
    } catch (err) {
      setError(err.message || "Unable to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <p className="eyebrow">Account</p>
          <h1>Edit Profile</h1>
        </div>

        <div className="profile-card">
          {/* Avatar initial */}
          <div className="profile-avatar">
            {user?.name?.charAt(0)?.toUpperCase() || "U"}
          </div>

          {error && <div className="profile-error">{error}</div>}

          <form className="profile-form" onSubmit={handleSubmit} noValidate>
            {/* Name */}
            <div className="profile-form-group">
              <label htmlFor="name">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                disabled={loading}
              />
            </div>

            {/* Email — read-only */}
            <div className="profile-form-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                value={user?.email || ""}
                disabled
                placeholder="Email cannot be changed"
              />
            </div>

            <hr className="profile-section-divider" />
            <p className="profile-section-title">Change Password (optional)</p>

            <div className="profile-form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <input
                id="currentPassword"
                name="currentPassword"
                type="password"
                value={form.currentPassword}
                onChange={handleChange}
                placeholder="Enter current password"
                disabled={loading}
              />
            </div>

            <div className="profile-form-group">
              <label htmlFor="newPassword">New Password</label>
              <input
                id="newPassword"
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                placeholder="Min. 6 characters"
                disabled={loading}
              />
            </div>

            <button
              type="submit"
              className="profile-submit-btn"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
