import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./TrendingProductsSection.css";
import Pagination from "../../../../components/common/Pagination/Pagination";

function TrendingProductsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8); // 8 products per page
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  const handleProductClick = () => {
    navigate("/products");
  };

  const calculateDiscount = (price) => {
    const discounts = [20, 30, 40, 50, 60, 65];
    return discounts[Math.floor(Math.random() * discounts.length)];
  };

  // Pagination calculations
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loader-spinner"></div>
        <p className="loading-text">
          Loading amazing products...
        </p>
      </div>
    );
  }

  return (
    <div className="product-showcase-section">
      <div className="product-showcase-container">
        {/* Section Header */}
        <div className="showcase-header">
          <h2 className="showcase-title">
            TRENDING PRODUCTS
          </h2>
          <p className="showcase-subtitle">
            Discover our curated collection of premium products
          </p>
        </div>

        {/* Products Grid */}
        <div className="product-showcase-grid">
          {currentProducts.map((item) => {
            const discount = calculateDiscount(item.price);
            const originalPrice = Math.floor(item.price * (1 + discount / 100));

            return (
              <div
                key={item.id}
                className="product-showcase-card"
                onClick={handleProductClick}
              >
                <div className="showcase-image-wrapper">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="showcase-image"
                  />
                  <div className="showcase-overlay"></div>
                  {discount >= 50 && (
                    <div className="showcase-badge">
                      HOT DEAL
                    </div>
                  )}
                </div>
                <div className="showcase-content">
                  <div className="showcase-category">
                    {item.category}
                  </div>
                  <h3 className="showcase-product-title">
                    {item.title}
                  </h3>
                  <div className="showcase-rating">
                    <span className="rating-stars">
                      ⭐ {item.rating?.rate || 4.5}
                    </span>
                    <span className="rating-count">
                      ({item.rating?.count || 100})
                    </span>
                  </div>
                  <div className="showcase-price-section">
                    <div className="showcase-prices">
                      <span className="showcase-current-price">
                        ${Math.floor(item.price)}
                      </span>
                      <span className="showcase-original-price">
                        ${originalPrice}
                      </span>
                    </div>
                    <div className="showcase-discount">
                      Min. {discount}% Off
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Pagination */}
        {products.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            itemsPerPage={itemsPerPage}
            totalItems={products.length}
          />
        )}
      </div>
    </div>
  );
}

export default TrendingProductsSection;
