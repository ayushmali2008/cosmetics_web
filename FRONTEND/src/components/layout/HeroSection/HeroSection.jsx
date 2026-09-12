import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useNavigate } from "react-router-dom";
import { useToast } from "../../../components/common/Toast/Toast.jsx";
import "./HeroSection.css";
function HeroSection() {
  const navigate = useNavigate();
  const toast = useToast();
  const products = [
    {
      id: 1,
      title: "Premium Wireless Headphones",
      category: "Electronics",
      price: 129.99,
      originalPrice: 169.99,
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 245,
      discount: 23,
      badge: "Best Seller",
    },
    {
      id: 2,
      title: "Designer Leather Handbag",
      category: "Fashion",
      price: 199.99,
      originalPrice: 299.99,
      image:
        "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
      rating: 4.9,
      reviews: 189,
      discount: 33,
      badge: "Trending",
    },
    {
      id: 3,
      title: "Smart Fitness Watch",
      category: "Wearables",
      price: 249.99,
      originalPrice: 349.99,
      image:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop",
      rating: 4.7,
      reviews: 312,
      discount: 29,
      badge: "Hot Deal",
    },
    {
      id: 4,
      title: "Classic Denim Jacket",
      category: "Clothing",
      price: 89.99,
      originalPrice: 149.99,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&h=600&fit=crop",
      rating: 4.6,
      reviews: 156,
      discount: 40,
      badge: "Sale",
    },
    {
      id: 5,
      title: "Professional Camera Lens",
      category: "Photography",
      price: 599.99,
      originalPrice: 799.99,
      image:
        "https://images.unsplash.com/photo-1606400082777-ef05f3c5cde2?w=600&h=600&fit=crop",
      rating: 4.9,
      reviews: 98,
      discount: 25,
      badge: "Premium",
    },
    {
      id: 6,
      title: "Luxury Perfume Set",
      category: "Beauty",
      price: 149.99,
      originalPrice: 199.99,
      image:
        "https://images.unsplash.com/photo-1541643600914-78b084683601?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 267,
      discount: 25,
      badge: "New",
    },
    {
      id: 7,
      title: "Running Sneakers Pro",
      category: "Sports",
      price: 119.99,
      originalPrice: 179.99,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&h=600&fit=crop",
      rating: 4.7,
      reviews: 423,
      discount: 33,
      badge: "Popular",
    },
    {
      id: 8,
      title: "Minimalist Backpack",
      category: "Accessories",
      price: 79.99,
      originalPrice: 119.99,
      image:
        "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=600&fit=crop",
      rating: 4.5,
      reviews: 178,
      discount: 33,
      badge: "Eco-Friendly",
    },
    {
      id: 9,
      title: "Vintage Sunglasses",
      category: "Eyewear",
      price: 159.99,
      originalPrice: 229.99,
      image:
        "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop",
      rating: 4.6,
      reviews: 134,
      discount: 30,
      badge: "Limited",
    },
    {
      id: 10,
      title: "Wireless Earbuds Pro",
      category: "Audio",
      price: 179.99,
      originalPrice: 249.99,
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop",
      rating: 4.8,
      reviews: 289,
      discount: 28,
      badge: "Top Rated",
    },
  ];

  const handleAddToCart = (product) => {
    // Hero section products are curated showcase items, not real DB products.
    // We show a toast and redirect to products page so they can buy real items.
    toast.info("Browse our real products to add them to your bag!");
    navigate("/products");
  };

  const showNotification = () => { }; // kept for backwards compat — replaced by toast

  return (
    <section className="product-carousel-section">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="header-content">
          <motion.span
            className="section-tag"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            ✨ Featured Collection
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Trending Products
          </motion.h2>
          <motion.p
            className="section-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover our handpicked collection of premium products
          </motion.p>
        </div>
        <motion.button
          className="view-all-btn"
          onClick={() => navigate("/products")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          View All
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </motion.button>
      </motion.div>

      <motion.div
        className="carousel-wrapper"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView="auto"
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
          }}
          navigation={{
            prevEl: ".product-nav-prev",
            nextEl: ".product-nav-next",
          }}
          pagination={{
            el: ".product-pagination",
            clickable: true,
            dynamicBullets: true,
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          loop={true}
          speed={800}
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
              effect: "slide",
              centeredSlides: true,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30,
              effect: "slide",
              centeredSlides: false,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40,
              effect: "coverflow",
              centeredSlides: true,
            },
          }}
          className="products-swiper"
        >
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <motion.div
                className="product-card"
                whileHover={{ y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {product.badge && (
                  <div className="product-badge-tag">
                    <span>{product.badge}</span>
                  </div>
                )}

                <div className="product-img-wrapper">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="product-img"
                    loading="lazy"
                  />

                  <div className="quick-view-overlay">
                    <button
                      className="quick-view-btn"
                      onClick={() =>
                        navigate(`/products?search=${product.category}`)
                      }
                    >
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      Quick View
                    </button>
                  </div>

                  {product.discount && (
                    <div className="discount-tag">
                      <span>-{product.discount}%</span>
                    </div>
                  )}
                </div>

                <div className="product-details">
                  <div className="product-category">{product.category}</div>
                  <h3 className="product-title">{product.title}</h3>

                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < Math.floor(product.rating) ? "filled" : ""} [font-size:16px] [color:#e2e8f0] [transition:color_0.3s_ease] [color:#fbbf24]`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating-text">
                      {product.rating} ({product.reviews})
                    </span>
                  </div>

                  <div className="product-price-row">
                    <div className="price-group">
                      <span className="current-price">${product.price}</span>
                      <span className="original-price">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>

                  <motion.button
                    className="add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <motion.button
          className="product-nav-prev product-nav-btn"
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <motion.button
          className="product-nav-next product-nav-btn"
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </motion.div>

      <div className="product-pagination" />
    </section>
  );
}

export default HeroSection;
