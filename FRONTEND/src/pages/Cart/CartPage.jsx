import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./CartPage.css";

function CartPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const toast = useToast();

  const [bagItems, setBagItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [showCouponInput, setShowCouponInput] = useState(false);

  const availableCoupons = [
    {
      code: "SAVE10",
      discount: 10,
      minOrder: 50,
      type: "percent",
      description: "10% off on orders above ₹50",
    },
    {
      code: "SAVE20",
      discount: 20,
      minOrder: 100,
      type: "percent",
      description: "20% off on orders above ₹100",
    },
    {
      code: "FLAT50",
      discount: 50,
      minOrder: 200,
      type: "flat",
      description: "Flat ₹50 off on orders above ₹200",
    },
    {
      code: "FIRST25",
      discount: 25,
      minOrder: 0,
      type: "percent",
      description: "25% off for first order",
    },
  ];

  useEffect(() => {
    try {
      const cartData = JSON.parse(localStorage.getItem("cart")) || [];
      const normalizedItems = Array.isArray(cartData)
        ? cartData.map((item) => ({
          ...item,
          id: item.id || item._id || item.productId,
          _id: item._id || item.id || item.productId,
          productId: item.productId || item._id || item.id,
        }))
        : [];
      setBagItems(normalizedItems);
    } catch {
      setBagItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const updateQuantity = (id, change) => {
    const updatedItems = bagItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, Math.min(10, item.quantity + change));
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setBagItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    toast.info("Quantity updated.");
  };

  const removeFromBag = (id) => {
    const updatedItems = bagItems.filter((item) => item.id !== id);
    setBagItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
    toast.info("Product removed from your bag.");
  };

  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      (c) => c.code === couponCode.toUpperCase(),
    );

    if (!coupon) {
      toast.error("Invalid coupon code.");
      return;
    }

    if (subtotal < coupon.minOrder) {
      toast.error(`Minimum order of ₹${coupon.minOrder} required.`);
      return;
    }

    setAppliedCoupon(coupon);
    toast.success(`Coupon ${coupon.code} applied!`);
    setShowCouponInput(false);
    setCouponCode("");
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.info("Coupon removed.");
  };

  const subtotal = bagItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const discount = appliedCoupon
    ? appliedCoupon.type === "flat"
      ? appliedCoupon.discount
      : (subtotal * appliedCoupon.discount) / 100
    : 0;
  const deliveryFee = subtotal > 100 ? 0 : 5;
  const total = subtotal - discount + deliveryFee;

  if (loading) {
    return (
      <div className="bag-loading">
        <div className="bag-spinner"></div>
        <p>Loading your bag...</p>
      </div>
    );
  }

  return (
    <div className="add-to-bag-page">
      <div className="bag-container">
        <div className="bag-breadcrumb">
          <span onClick={() => navigate("/")}>Home</span>
          <span className="separator">/</span>
          <span className="active">Shopping Bag</span>
        </div>

        {bagItems.length === 0 ? (
          <div className="empty-bag">
            <div className="empty-bag-icon">
              <svg
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
            </div>
            <h2>Your bag is empty</h2>
            <p>Add items to get started</p>
            <button
              className="shop-now-btn"
              onClick={() => navigate("/products")}
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="bag-content">
            <div className="bag-items-section">
              <div className="bag-items-container">
                <div className="section-header">
                  <h2>
                    Shopping Bag ({bagItems.length}{" "}
                    {bagItems.length === 1 ? "item" : "items"})
                  </h2>
                </div>

                <div className="bag-items-list">
                  {bagItems.map((item, index) => (
                    <div
                      key={item.id}
                      className="bag-item"
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="item-image">
                        <img
                          src={item.image}
                          alt={item.name || item.title}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/100x100?text=No+Image";
                          }}
                        />
                      </div>

                      <div className="item-details">
                        <div className="item-header">
                          <h3 className="item-title">
                            {item.name || item.title}
                          </h3>
                          <button
                            className="item-remove"
                            onClick={() => removeFromBag(item.id)}
                            title="Remove item"
                          >
                            ✕
                          </button>
                        </div>

                        <p className="item-category">{item.category}</p>

                        <div className="item-actions">
                          <div className="quantity-control">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              disabled={item.quantity === 1}
                            >
                              −
                            </button>
                            <span className="quantity">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              disabled={item.quantity === 10}
                            >
                              +
                            </button>
                          </div>

                          <div className="item-price">
                            <span className="current-price">
                              ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                            {item.quantity > 1 && (
                              <span className="unit-price">
                                ₹{item.price.toFixed(2)} each
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bag-summary-section">
              <div className="price-summary">
                <h3>Price Summary</h3>

                <div className="summary-row">
                  <span>Subtotal ({bagItems.length} items)</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>

                {appliedCoupon && (
                  <div className="summary-row discount">
                    <span>
                      Discount ({appliedCoupon.code})
                      <button className="remove-coupon" onClick={removeCoupon}>
                        ✕
                      </button>
                    </span>
                    <span className="discount-amount">
                      -₹{discount.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="summary-row">
                  <span>
                    Delivery Fee
                    {deliveryFee === 0 && (
                      <span className="free-badge">FREE</span>
                    )}
                  </span>
                  <span>
                    {deliveryFee === 0 ? "FREE" : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>

                <div className="summary-divider"></div>

                <div className="summary-row total">
                  <span>Total Amount</span>
                  <span>₹{total.toFixed(2)}</span>
                </div>

                {discount > 0 && (
                  <div className="savings-badge">
                    You saved ₹{discount.toFixed(2)}! 🎉
                  </div>
                )}

                <button
                  className="checkout-btn"
                  onClick={() => {
                    if (!isAuthenticated) {
                      navigate("/login");
                      return;
                    }
                    navigate("/checkout");
                  }}
                  disabled={bagItems.length === 0}
                >
                  Proceed to Checkout
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </button>

                <div className="coupon-section">
                  {!showCouponInput ? (
                    <button
                      className="apply-coupon-btn"
                      onClick={() => setShowCouponInput(true)}
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <rect
                          x="1"
                          y="4"
                          width="22"
                          height="16"
                          rx="2"
                          ry="2"
                        ></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      Apply Coupon
                    </button>
                  ) : (
                    <div className="coupon-input-container">
                      <input
                        type="text"
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) =>
                          setCouponCode(e.target.value.toUpperCase())
                        }
                        onKeyPress={(e) => e.key === "Enter" && applyCoupon()}
                      />
                      <button onClick={applyCoupon}>Apply</button>
                      <button
                        className="cancel-coupon"
                        onClick={() => {
                          setShowCouponInput(false);
                          setCouponCode("");
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  )}

                  <div className="available-coupons">
                    <p className="coupons-title">Available Coupons:</p>
                    {availableCoupons.map((coupon) => (
                      <div key={coupon.code} className="coupon-card">
                        <div className="coupon-code">{coupon.code}</div>
                        <div className="coupon-desc">{coupon.description}</div>
                        <button
                          className="apply-this-coupon"
                          onClick={() => {
                            setAppliedCoupon(coupon);
                            setShowCouponInput(false);
                            setCouponCode("");
                            toast.success(`Coupon ${coupon.code} applied!`);
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="trust-badges">
                  <div className="trust-item">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    </svg>
                    <span>Secure Payment</span>
                  </div>
                  <div className="trust-item">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span>Easy Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
