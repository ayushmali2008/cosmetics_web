import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { get } from "../../services/api";
import "./OrdersPage.css";

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    const fetchOrders = async () => {
      try {
        const response = await get("/orders/my-orders");
        setOrders(response?.data || []);
      } catch (err) {
        setError(err.message || "Unable to load your orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="orders-page">
      <div className="orders-container">
        <div className="orders-header">
          <div>
            <p className="eyebrow">Account</p>
            <h1>My Orders</h1>
          </div>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/products")}
          >
            Start Shopping
          </button>
        </div>

        {error && <div className="orders-error">{error}</div>}

        {loading ? (
          <div className="orders-empty">Loading your orders...</div>
        ) : orders.length === 0 ? (
          <div className="orders-empty">
            <h3>No orders yet</h3>
            <button
              type="button"
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div className="order-card" key={order._id}>
                <div className="order-card-header">
                  <div>
                    <span className="order-label">Order ID</span>
                    <strong>{order._id}</strong>
                  </div>
                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>

                <div className="order-card-meta">
                  <div>
                    <span className="order-label">Date</span>
                    <strong>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </strong>
                  </div>
                  <div>
                    <span className="order-label">Items</span>
                    <strong>{order.items?.length || 0}</strong>
                  </div>
                  <div>
                    <span className="order-label">Total</span>
                    <strong>₹{Number(order.total || 0).toFixed(2)}</strong>
                  </div>
                </div>

                <div className="order-card-actions">
                  <button
                    type="button"
                    className="primary-btn"
                    onClick={() => navigate(`/orders/${order._id}`)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
