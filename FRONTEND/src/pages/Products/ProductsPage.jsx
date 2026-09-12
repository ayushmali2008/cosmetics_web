import { useState, useEffect, useCallback, useRef } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import "./ProductsPage.css";
import Pagination from "../../components/common/Pagination/Pagination";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import { get } from "../../services/api";
import { resolveImage } from "../../utils/resolveImage.js";

const LIMIT = 12;

// Map UI sort values → backend sort param
const SORT_MAP = {
  recommended: "",
  "price-low": "price_asc",
  "price-high": "price_desc",
  rating: "name_asc", // backend doesn't have rating sort, fall back to name
};

function ProductsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const toast = useToast();

  // ── filters / sort ──────────────────────────────────────────────
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState(3500);
  const [sortBy, setSortBy] = useState("recommended");

  // ── pagination ──────────────────────────────────────────────────
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  // ── data ────────────────────────────────────────────────────────
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ── sidebar facets (unique values for filter checkboxes) ─────────
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);

  // debounce timer ref
  const debounceRef = useRef(null);

  // ── read search param from URL ────────────────────────────────
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const s = params.get("search") || "";
    setSearchQuery(s);
    setCurrentPage(1);
  }, [location.search]);

  // ── fetch products from backend ───────────────────────────────
  const fetchProducts = useCallback(async (page = 1) => {
    setLoading(true);
    setError("");
    try {
      const params = new URLSearchParams();
      params.set("page", page);
      params.set("limit", LIMIT);

      if (searchQuery) params.set("search", searchQuery);
      if (selectedCategories.length === 1)
        params.set("category", selectedCategories[0]);
      if (selectedBrands.length === 1)
        params.set("brand", selectedBrands[0]);
      if (minPrice) params.set("minPrice", minPrice);
      if (maxPrice && maxPrice < 3500) params.set("maxPrice", maxPrice);
      const sort = SORT_MAP[sortBy];
      if (sort) params.set("sort", sort);

      const response = await get(`/products?${params.toString()}`);
      setProducts(response?.data || []);
      const pagination = response?.pagination || {};
      setTotalProducts(pagination.totalProducts || 0);
      setTotalPages(pagination.totalPages || 1);
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setLoading(false);
    }
  }, [searchQuery, selectedCategories, selectedBrands, minPrice, maxPrice, sortBy]);

  // ── load sidebar facets once (all categories + brands) ──────────
  useEffect(() => {
    const loadFacets = async () => {
      try {
        // Fetch a larger set just for facets — backend limit max 100
        const res = await get("/products?limit=100");
        const items = res?.data || [];
        setAllCategories([...new Set(items.map((p) => p.category).filter(Boolean))]);
        setAllBrands([...new Set(items.map((p) => p.brand).filter(Boolean))]);
      } catch {
        // facets are non-critical — silently ignore
      }
    };
    loadFacets();
  }, []);

  // ── debounced fetch when filters change ──────────────────────
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchProducts(1);
      setCurrentPage(1);
    }, 350);
    return () => clearTimeout(debounceRef.current);
  }, [fetchProducts]);

  // ── pagination click ──────────────────────────────────────────
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchProducts(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── filter helpers ────────────────────────────────────────────
  const toggleCategory = (cat) =>
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );

  const toggleBrand = (brand) =>
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );

  const clearAllFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setMinPrice("");
    setMaxPrice(3500);
    setCurrentPage(1);
  };

  // ── cart ──────────────────────────────────────────────────────
  const addToBag = (product) => {
    const productId = product?._id;
    if (!productId) {
      toast.error("Invalid product.");
      return;
    }
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(
      (item) => (item.productId || item._id || item.id) === productId
    );
    if (exists) {
      toast.info("Already in your bag.");
      navigate("/bag");
      return;
    }
    cart.push({ ...product, id: productId, _id: productId, productId, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    toast.success("Product added to your bag.");
  };

  // ── wishlist ─────────────────────────────────────────────────
  const addToWishlist = (e, product) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const exists = wishlist.find(
      (item) => (item._id || item.id) === (product._id || product.id)
    );
    if (exists) {
      toast.info("Already in wishlist.");
      return;
    }
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    toast.success("Added to wishlist.");
  };

  // ── discount % helper ────────────────────────────────────────
  const discountPct = (p) =>
    p.originalPrice && p.originalPrice > p.price
      ? Math.round(((p.originalPrice - p.price) / p.originalPrice) * 100)
      : 0;

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <a href="/">Home</a> / <a href="/products">Products</a> /{" "}
          <span>All Products</span>
        </div>

        {/* Header */}
        <div className="cart-header">
          <h1>
            {searchQuery ? `Results for "${searchQuery}"` : "All Products"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span className="item-count">
              {loading ? "Loading..." : `${totalProducts} Items`}
            </span>
            {user?.role === "admin" && (
              <Link to="/admin" className="admin-link-button">
                Admin tools
              </Link>
            )}
          </div>
        </div>

        {/* Active search badge */}
        {searchQuery && (
          <div className="search-query-badge">
            <span className="search-label">Searching for:</span>
            <span className="search-term">{searchQuery}</span>
            <button
              className="clear-search-btn"
              onClick={() => {
                setSearchQuery("");
                window.history.pushState({}, "", "/products");
              }}
            >
              ✕
            </button>
          </div>
        )}

        {/* Main layout */}
        <div className="cart-content">
          {/* ── Sidebar filters ──────────────────────────────── */}
          <aside className="cart-sidebar">
            <div className="filter-header">
              <h3>FILTERS</h3>
              <button className="clear-all" onClick={clearAllFilters}>
                CLEAR ALL
              </button>
            </div>

            {/* Categories */}
            {allCategories.length > 0 && (
              <div className="filter-section">
                <h4>CATEGORIES</h4>
                <div className="filter-options">
                  {allCategories.map((cat) => (
                    <label key={cat} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => toggleCategory(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Brands */}
            {allBrands.length > 0 && (
              <div className="filter-section">
                <h4>BRAND</h4>
                <div className="filter-options">
                  {allBrands.map((brand) => (
                    <label key={brand} className="filter-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Price */}
            <div className="filter-section">
              <h4>MAX PRICE</h4>
              <div className="price-range">
                <input
                  type="range"
                  min="0"
                  max="3500"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="price-slider"
                />
                <div className="price-labels">
                  <span>₹0</span>
                  <span>₹{maxPrice}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* ── Main content ─────────────────────────────────── */}
          <main className="cart-main">
            {/* Sort bar */}
            <div className="sort-bar">
              <div className="active-filters">
                {selectedCategories.map((cat) => (
                  <span key={cat} className="filter-tag">
                    {cat}{" "}
                    <button onClick={() => toggleCategory(cat)}>×</button>
                  </span>
                ))}
                {selectedBrands.map((b) => (
                  <span key={b} className="filter-tag">
                    {b}{" "}
                    <button onClick={() => toggleBrand(b)}>×</button>
                  </span>
                ))}
              </div>
              <select
                className="sort-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Sort by: Recommended</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Name A–Z</option>
              </select>
            </div>

            {/* Product grid */}
            {loading ? (
              <div className="loading-container">
                <div className="loading-spinner"></div>
                <p>Loading products...</p>
              </div>
            ) : error ? (
              <div className="no-products">
                <p>{error}</p>
                <button onClick={() => fetchProducts(currentPage)} className="reset-filters-btn">
                  Retry
                </button>
              </div>
            ) : products.length === 0 ? (
              <div className="no-products">
                <p>No products found matching your filters.</p>
                <button onClick={clearAllFilters} className="reset-filters-btn">
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="product-grid">
                {products.map((product) => {
                  const pct = discountPct(product);
                  return (
                    <div
                      key={product._id}
                      className="product-card"
                      onClick={() => addToBag(product)}
                    >
                      <div className="product-image">
                        <img
                          src={resolveImage(product.image)}
                          alt={product.name}
                          onError={(e) => {
                            e.target.src =
                              "https://via.placeholder.com/300x300?text=No+Image";
                          }}
                        />
                        {pct >= 10 && (
                          <span className="discount-badge">{pct}% OFF</span>
                        )}
                      </div>
                      <div className="product-info">
                        <h3 className="product-brand">{product.brand}</h3>
                        <p className="product-name">
                          {product.name.length > 50
                            ? product.name.slice(0, 50) + "…"
                            : product.name}
                        </p>
                        <div className="product-rating">
                          <span className="rating">{product.rating ?? 0} ★</span>
                          <span className="reviews">
                            | {product.stock > 0 ? `${product.stock} left` : "Out of stock"}
                          </span>
                        </div>
                        <div className="product-price">
                          <span className="current-price">₹{product.price}</span>
                          {product.originalPrice > product.price && (
                            <>
                              <span className="original-price">
                                ₹{product.originalPrice}
                              </span>
                              {pct > 0 && (
                                <span className="discount-percent">
                                  ({pct}% OFF)
                                </span>
                              )}
                            </>
                          )}
                          <div className="cart-btn-wrapper">
                            <button
                              className="premium-cart-btn"
                              onClick={(e) => addToWishlist(e, product)}
                            >
                              <span className="btn-content">
                                <span className="btn-icon">♡</span>
                                <span className="btn-text">Wishlist</span>
                              </span>
                              <div className="btn-glow-effect"></div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Backend-driven pagination */}
            {!loading && totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
                itemsPerPage={LIMIT}
                totalItems={totalProducts}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
