import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get } from "../../services/api";
import { useToast } from "../common/Toast/Toast.jsx";
import { resolveImage } from "../../utils/resolveImage.js";
import "./MongoProducts.css";

const MongoProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchMongoProducts = async () => {
      try {
        const response = await get("/products?limit=20");
        setProducts(response?.data || []);
      } catch (err) {
        console.error("MongoDB products error:", err);
        setError(err.message || "Failed to load products");
      } finally {
        setLoading(false);
      }
    };

    fetchMongoProducts();
  }, []);

  const addToBag = (product) => {
    const productId = product?._id;

    if (!productId) {
      toast.error("Invalid product — missing ID.");
      return;
    }

    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];

    const exists = oldCart.find(
      (item) => (item.productId || item._id || item.id) === productId
    );

    if (exists) {
      toast.info("Product is already in your bag.");
      navigate("/bag");
      return;
    }

    oldCart.push({
      ...product,
      id: productId,
      _id: productId,
      productId: productId,
      quantity: 1,
    });

    localStorage.setItem("cart", JSON.stringify(oldCart));
    toast.success("Product added to your bag.");
  };

  if (loading) {
    return (
      <p className="mongo-products-message">Loading products...</p>
    );
  }

  if (error) {
    return (
      <p className="mongo-products-message">{error}</p>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mongo-products">
      <div className="mongo-products-header">
        <h2>Our Latest Products</h2>
        <p>Products from our database</p>
      </div>

      <div className="products-grid">
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <div className="product-image">
              <img
                src={resolveImage(product.image)}
                alt={product.name}
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/300x300?text=No+Image";
                }}
              />
            </div>

            <div className="product-info">
              <div className="product-brand">{product.brand}</div>
              <h3 className="product-name">{product.name}</h3>

              <div className="product-rating">
                <span className="rating-star">★</span>
                {product.rating || 0}
              </div>

              <div className="product-price">
                <span className="current-price">₹{product.price}</span>
                {product.originalPrice && (
                  <span className="original-price">
                    ₹{product.originalPrice}
                  </span>
                )}
                {product.originalPrice &&
                  product.originalPrice > product.price && (
                    <span className="discount-badge">
                      {Math.round(
                        ((product.originalPrice - product.price) /
                          product.originalPrice) *
                        100
                      )}
                      % OFF
                    </span>
                  )}
              </div>

              <div className="product-stock">
                {product.stock > 0
                  ? `${product.stock} available`
                  : "Out of stock"}
              </div>

              <button
                className="add-cart-btn"
                disabled={product.stock <= 0}
                onClick={() => addToBag(product)}
              >
                {product.stock > 0 ? "ADD TO BAG" : "OUT OF STOCK"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default MongoProducts;
