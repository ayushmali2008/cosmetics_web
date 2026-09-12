import { useLocation, useNavigate } from "react-router-dom";
import "./OrderConfirmationPage.css";

const OrderConfirmationPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order || null;

  return (
    <div className="order-confirmation-page">
      <div className="order-confirmation-card">
        <div className="confirmation-badge">✓</div>
        <p className="eyebrow">Order placed</p>
        <h1>Order placed successfully</h1>

        <div className="confirmation-summary">
          <div>
            <span>Order ID</span>
            <strong>{order?._id || "-"}</strong>
          </div>
          <div>
            <span>Total amount</span>
            <strong>₹{Number(order?.total || 0).toFixed(2)}</strong>
          </div>
          <div>
            <span>Order status</span>
            <strong>{order?.status || "pending"}</strong>
          </div>
        </div>

        <div className="confirmation-actions">
          <button
            type="button"
            className="primary-btn"
            onClick={() => navigate("/orders")}
          >
            View My Orders
          </button>
          <button
            type="button"
            className="secondary-btn"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
