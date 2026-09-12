import "./ProfileDropdown.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";
import { useToast } from "../../../../components/common/Toast/Toast.jsx";

function ProfileDropdown() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast.info("You have been logged out.");
    navigate("/");
  };

  return (
    <div className="profile-dropdown">
      {isAuthenticated ? (
        <>
          <div className="profile-welcome">
            <h3 className="profile-welcome-title">Hi, {user?.name}</h3>
            <p className="profile-welcome-subtitle">{user?.email}</p>
            {user?.role === "admin" && (
              <span className="profile-admin-badge">Admin</span>
            )}
          </div>

          <ul className="profile-menu">
            <li className="profile-menu-item">
              <Link to="/orders">My Orders</Link>
            </li>
            <li className="profile-menu-item">
              <Link to="/wishlist">Wishlist</Link>
            </li>
            <li className="profile-menu-item">
              <Link to="/profile">Edit Profile</Link>
            </li>
            {user?.role === "admin" && (
              <>
                <li className="profile-menu-item">
                  <Link to="/admin">Admin Panel</Link>
                </li>
                <li className="profile-menu-item">
                  <Link to="/admin/users">Manage Users</Link>
                </li>
              </>
            )}
          </ul>

          <div className="profile-divider"></div>

          <button className="profile-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <div className="profile-welcome">
            <h3 className="profile-welcome-title">Welcome</h3>
            <p className="profile-welcome-subtitle">
              To access account and manage orders
            </p>
            <Link to="/login" className="profile-login-btn">
              LOGIN / SIGNUP
            </Link>
          </div>

          <ul className="profile-menu">
            <li className="profile-menu-item">
              <Link to="/orders">Orders</Link>
            </li>
            <li className="profile-menu-item">
              <Link to="/wishlist">Wishlist</Link>
            </li>
          </ul>
        </>
      )}
    </div>
  );
}

export default ProfileDropdown;
