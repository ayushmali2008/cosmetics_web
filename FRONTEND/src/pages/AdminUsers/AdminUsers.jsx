import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { get, patch } from "../../services/api";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./AdminUsers.css";

const AdminUsers = () => {
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [actionLoadingId, setActionLoadingId] = useState(null);

  const isAdmin = user?.role === "admin";

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await get("/admin/users");
      const userList = response?.data || [];
      setUsers(userList);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load user list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchUsers();
    }
  }, [isAuthenticated, isAdmin]);

  const handleRoleChange = async (userId, action) => {
    if (
      !window.confirm(
        action === "promote"
          ? "Promote this user to admin?"
          : "Remove admin role from this user?",
      )
    ) {
      return;
    }

    setActionLoadingId(userId);
    setError("");

    try {
      const endpoint =
        action === "promote"
          ? `/admin/users/${userId}/promote`
          : `/admin/users/${userId}/remove-admin`;

      await patch(endpoint, {});
      toast.success(
        action === "promote"
          ? "User promoted to admin successfully."
          : "Admin role removed successfully."
      );
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Unable to update this user.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-users-page">
        <div className="admin-users-panel">
          <p className="eyebrow">Access</p>
          <h2>Please log in</h2>
          <p>You need to sign in before viewing the admin user list.</p>
          <a href="/login" className="admin-users-link">
            Go to login
          </a>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-users-page">
        <div className="admin-users-panel">
          <p className="eyebrow">Access denied</p>
          <h2>Admin access required</h2>
          <p>This page is only available to administrators.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-users-page">
      <div className="admin-users-panel">
        <div className="admin-users-header">
          <div>
            <p className="eyebrow">Management</p>
            <h2>User management</h2>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={fetchUsers}
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh users"}
          </button>
        </div>

        {error && <div className="admin-users-error">{error}</div>}

        {loading ? (
          <p>Loading users...</p>
        ) : users.length === 0 ? (
          <p>No users found.</p>
        ) : (
          <div className="admin-users-list">
            {users.map((member) => {
              const isCurrentUser = member._id === user?._id;
              const memberIsAdmin = member.role === "admin";

              return (
                <div
                  className="admin-user-item"
                  key={member._id || member.email}
                >
                  <div className="admin-user-main">
                    <div className="admin-user-avatar">
                      {member.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>
                    <div className="admin-user-copy">
                      <strong>{member.name}</strong>
                      <span>{member.email}</span>
                      <span
                        className={`admin-role-badge ${memberIsAdmin ? "admin" : "user"}`}
                      >
                        {memberIsAdmin ? "Admin" : "User"}
                      </span>
                    </div>
                  </div>

                  <div className="admin-user-actions">
                    {isCurrentUser ? (
                      <span className="admin-self-tag">You</span>
                    ) : memberIsAdmin ? (
                      <button
                        type="button"
                        className="secondary-button"
                        onClick={() =>
                          handleRoleChange(member._id, "remove-admin")
                        }
                        disabled={actionLoadingId === member._id}
                      >
                        {actionLoadingId === member._id
                          ? "Updating..."
                          : "Remove admin"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="primary-button"
                        onClick={() => handleRoleChange(member._id, "promote")}
                        disabled={actionLoadingId === member._id}
                      >
                        {actionLoadingId === member._id
                          ? "Updating..."
                          : "Make admin"}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminUsers;
