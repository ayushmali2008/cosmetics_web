import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { get, patch } from "../../services/api";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./OrderDetailsPage.css";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [canceling, setCanceling] = useState(false);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await get(`/orders/${id}`);
      setOrder(response?.data || null);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to load order details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    fetchOrder();
  }, [id, isAuthenticated, navigate]);

  const handleCancelOrder = async () => {
    if (!window.confirm("Cancel this order?")) {
      return;
    }

    try {
      setCanceling(true);
      const response = await patch(`/orders/${id}/cancel`, {});
      setOrder(response?.data || order);
      setError("");
      toast.success("Order cancelled successfully.");
    } catch (err) {
      setError(err.message || "Unable to cancel this order.");
    } finally {
      setCanceling(false);
    }
  };

  const canCancel = order && ["pending", "confirmed"].includes(order.status);

  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return <div className="order-details-empty">Loading order details...</div>;
  }

  if (error && !order) {
    return (
      <div className="order-details-page">
        <div className="order-details-card">
          <div className="order-details-error">{error}</div>
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/orders")}
          >
            Back to Orders
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="order-details-page">
      <div className="order-details-card">
        <div className="order-details-header">
          <div>
            <p className="eyebrow">Order details</p>
            <h1>{order?._id}</h1>
          </div>
          <span className={`order-status ${order?.status}`}>
            {order?.status}
          </span>
        </div>

        <div className="order-meta-grid">
          <div>
            <span className="order-label">Order Date</span>
            <strong>
              {order && new Date(order.createdAt).toLocaleString()}
            </strong>
          </div>
          <div>
            <span className="order-label">Customer</span>
            <strong>{order?.user?.name || user?.name}</strong>
          </div>
        </div>

        {error && <div className="order-details-error">{error}</div>}

        <div className="order-product-list">
          {order?.items?.map((item) => (
            <div
              className="order-product-row"
              key={`${order._id}-${item.product}`}
            >
              <img
                src={item.image}
                alt={item.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/80x80?text=No+Image";
                }}
              />
              <div className="order-product-copy">
                <strong>{item.name}</strong>
                <span>Qty: {item.quantity}</span>
              </div>
              <div className="order-product-pricing">
                <span>₹{Number(item.price || 0).toFixed(2)} each</span>
                <strong>₹{Number(item.itemTotal || 0).toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>

        <div className="order-summary-box">
          <div className="summary-row">
            <span>Subtotal</span>
            <strong>₹{Number(order?.subtotal || 0).toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <strong>-₹{Number(order?.discount || 0).toFixed(2)}</strong>
          </div>
          <div className="summary-row">
            <span>Delivery fee</span>
            <strong>
              {Number(order?.deliveryFee || 0) === 0
                ? "FREE"
                : `₹${Number(order?.deliveryFee || 0).toFixed(2)}`}
            </strong>
          </div>
          <div className="summary-row total-row">
            <span>Total</span>
            <strong>₹{Number(order?.total || 0).toFixed(2)}</strong>
          </div>
        </div>

        {canCancel && (
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancelOrder}
            disabled={canceling}
          >
            {canceling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}

        <button
          type="button"
          className="secondary-btn"
          onClick={() => navigate("/orders")}
        >
          Back to Orders
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
