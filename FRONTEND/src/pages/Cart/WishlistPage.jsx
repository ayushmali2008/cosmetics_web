"use client";

import React, { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import "./WishlistPage.css";
const WishlistPage = () => {
  const location = useLocation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    const wishlistData = JSON.parse(localStorage.getItem("wishlist")) || [];

    setItems(wishlistData);
  }, []);

  const moveToBag = (product) => {
    const oldCart = JSON.parse(localStorage.getItem("cart")) || [];
    const productId = product._id || product.id || product.productId;

    const exists = oldCart.find(
      (item) => (item.productId || item._id || item.id) === productId,
    );

    if (!exists) {
      oldCart.push({
        ...product,
        id: productId,
        _id: productId,
        productId,
        quantity: 1,
      });
      localStorage.setItem("cart", JSON.stringify(oldCart));
    }
  };

  const handleRemove = (id) => {
    const updatedWishlist = items.filter((item) => item.id !== id);

    setItems(updatedWishlist);

    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-container">
      <div className="wishlist-header">
        <h2>
          My Wishlist <span>{items.length} items</span>
        </h2>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => (
          <div
            className="wishlist-card"
            key={item.id}
          >
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              ✕
            </button>

            <div className="wishlist-image">
              <img src={item.image} alt={item.name} />
            </div>

            <div className="wishlist-info">
              <h3>{item.name}</h3>

              <div className="price-row">
                <span className="new-price">
                  ₹{item.price}
                </span>
                <span className="old-price">
                  ₹{item.originalPrice}
                </span>
                <span className="discount">
                  {item.discount}% OFF
                </span>
              </div>
            </div>
            <Link to="/bag">
              <button
                onClick={() => moveToBag(item)}
                className="bag-btn"
              >
                MOVE TO BAG
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
