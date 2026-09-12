import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { del, get, patch, postForm, putForm } from "../../services/api";
import { useToast } from "../../components/common/Toast/Toast.jsx";
import "./AdminPage.css";
const emptyForm = {
  name: "",
  brand: "",
  description: "",
  price: "",
  originalPrice: "",
  category: "",
  stock: "",
  rating: "",
};

const normalizeProduct = (product) => ({
  ...product,
  image: product.image?.startsWith("http")
    ? product.image
    : `http://localhost:5000${product.image || ""}`,
});

const AdminPage = () => {
  const { user, isAuthenticated } = useAuth();
  const toast = useToast();
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [selectedFile, setSelectedFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchingProducts, setFetchingProducts] = useState(true);
  const [fetchingOrders, setFetchingOrders] = useState(true);
  const [error, setError] = useState("");

  const isAdmin = user?.role === "admin";

  const fetchProducts = async () => {
    try {
      setFetchingProducts(true);
      const response = await get("/products?limit=10");
      const productList = response?.data || [];
      setProducts(productList.map(normalizeProduct));
    } catch (err) {
      setError(err.message || "Failed to load products.");
    } finally {
      setFetchingProducts(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setFetchingOrders(true);
      const response = await get("/orders/admin/all");
      setOrders(response?.data || []);
    } catch (err) {
      setError(err.message || "Failed to load orders.");
    } finally {
      setFetchingOrders(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProducts();
      fetchOrders();
    }
  }, [isAuthenticated]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setSelectedFile(null);
    setEditingId(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isAuthenticated || !isAdmin) {
      setError("Please log in as an admin before creating products.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const payload = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      if (selectedFile) {
        payload.append("image", selectedFile);
      }

      if (editingId) {
        await putForm(`/products/${editingId}`, payload);
        toast.success("Product updated successfully.");
      } else {
        await postForm("/products", payload);
        toast.success("Product created successfully.");
      }

      resetForm();
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Unable to save the product.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setForm({
      name: product.name || "",
      brand: product.brand || "",
      description: product.description || "",
      price: product.price ?? "",
      originalPrice: product.originalPrice ?? "",
      category: product.category || "",
      stock: product.stock ?? "",
      rating: product.rating ?? "",
    });
    setSelectedFile(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (productId) => {
    if (!window.confirm("Delete this product from the MongoDB collection?")) {
      return;
    }

    try {
      await del(`/products/${productId}`);
      toast.success("Product deleted successfully.");
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Could not delete the product.");
    }
  };

  const handleStatusChange = async (orderId, status) => {
    try {
      await patch(`/orders/admin/${orderId}/status`, { status });
      toast.success(`Order status updated to "${status}".`);
      await fetchOrders();
    } catch (err) {
      setError(err.message || "Unable to update order status.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-page" style={{ minHeight: 400 }}>
        <div className="admin-panel">
          <h2>Admin Product Testing</h2>
          <p>Please log in to access the real MongoDB product APIs.</p>
          <a href="/login" className="admin-login-link">
            Go to login
          </a>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="admin-page" style={{ minHeight: 400 }}>
        <div className="admin-panel">
          <h2>Admin access required</h2>
          <p>
            This page is for authenticated admins to test product CRUD
            operations.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-panel">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Backend testing</p>
            <h2>MongoDB Product Manager</h2>
          </div>
          <div className="form-actions">
            <a href="/admin/users" className="secondary-button">
              Manage users
            </a>
            <button
              type="button"
              className="secondary-button"
              onClick={fetchProducts}
            >
              Refresh products
            </button>
          </div>
        </div>

        {error && <div className="admin-error">{error}</div>}

        <form className="admin-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Product name
              <input
                name="name"
                value={form.name}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Brand
              <input
                name="brand"
                value={form.brand}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Category
              <input
                name="category"
                value={form.category}
                onChange={handleInputChange}
                required
              />
            </label>
            <label>
              Price
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </label>
            <label>
              Original price
              <input
                type="number"
                name="originalPrice"
                value={form.originalPrice}
                onChange={handleInputChange}
                required
                min="0"
                step="0.01"
              />
            </label>
            <label>
              Stock
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleInputChange}
                min="0"
                step="1"
              />
            </label>
            <label>
              Rating
              <input
                type="number"
                name="rating"
                value={form.rating}
                onChange={handleInputChange}
                min="0"
                max="5"
                step="0.1"
              />
            </label>
            <label className="file-field">
              Image file
              <input
                type="file"
                accept="image/*"
                onChange={(event) => setSelectedFile(event.target.files[0])}
              />
            </label>
          </div>

          <label>
            Description
            <textarea
              name="description"
              value={form.description}
              onChange={handleInputChange}
              required
              rows={4}
            />
          </label>

          <div className="form-actions">
            <button type="submit" className="primary-button" disabled={loading}>
              {loading
                ? "Saving..."
                : editingId
                  ? "Update product"
                  : "Create product"}
            </button>
            <button
              type="button"
              className="secondary-button"
              onClick={resetForm}
            >
              Clear
            </button>
          </div>
        </form>
      </div>

      <div className="admin-products-panel">
        <h3>Current products</h3>
        {fetchingProducts ? (
          <p>Loading MongoDB products...</p>
        ) : products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          <div className="admin-product-list">
            {products.map((product) => (
              <div
                className="admin-product-item"
                key={product._id || product.id}
              >
                <img src={product.image} alt={product.name} />
                <div className="admin-product-copy">
                  <strong>{product.name}</strong>
                  <span>{product.brand}</span>
                  <span>{product.category}</span>
                  <span>₹{product.price}</span>
                </div>
                <div className="admin-product-actions">
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() => handleEdit(product)}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="admin-products-panel">
        <div className="admin-header">
          <div>
            <p className="eyebrow">Orders</p>
            <h3>Order management</h3>
          </div>
          <button
            type="button"
            className="secondary-button"
            onClick={fetchOrders}
          >
            Refresh orders
          </button>
        </div>

        {fetchingOrders ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="admin-order-list">
            {orders.map((order) => (
              <div className="admin-order-item" key={order._id}>
                <div className="admin-order-main">
                  <div>
                    <strong>{order.user?.name || "Customer"}</strong>
                    <span>{order.user?.email || "No email"}</span>
                  </div>
                  <div>
                    <span>Order ID</span>
                    <strong>{order._id}</strong>
                  </div>
                  <div>
                    <span>Total</span>
                    <strong>₹{Number(order.total || 0).toFixed(2)}</strong>
                  </div>
                </div>
                <div className="admin-order-actions">
                  <select
                    value={order.status}
                    onChange={(event) =>
                      handleStatusChange(order._id, event.target.value)
                    }
                  >
                    <option value="pending">pending</option>
                    <option value="confirmed">confirmed</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                    <option value="cancelled">cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPage;
