import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LuxuryDealsSection.css";
/**
 * Myntra-Inspired Luxury Deals Section
 * Premium product showcase with luxury fashion layout
 */
function LuxuryDealsSection() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Luxury deals data with premium brands
  const luxuryDeals = [
    {
      id: 1,
      title: "Little Fashion, Big Smiles",
      brands: ["Nautinauti", "Nap Chief"],
      discount: "Min. 50% Off",
      category: "kids",
      image:
        "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=400&h=500&fit=crop",
    },
    {
      id: 2,
      title: "Trendy Looks for Tiny Stars",
      brands: ["Chicaboo", "StyloBug"],
      discount: "Min. 60% Off",
      category: "kids",
      image:
        "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=400&h=500&fit=crop",
    },
    {
      id: 3,
      title: "Where Elegance Meets Comfort",
      brands: ["K", "House of Kantha"],
      discount: "Min. 65% Off",
      category: "women",
      image:
        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=500&fit=crop",
    },
    {
      id: 4,
      title: "Shine Bright, Wear Beautiful",
      brands: ["GIVA", "PALMONAS"],
      discount: "Min. 65% Off",
      category: "jewelry",
      image:
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=500&fit=crop",
    },
    {
      id: 5,
      title: "Confidence Starts Within",
      brands: ["DAAMENSCH", "Y"],
      discount: "Min. 20% Off",
      category: "men",
      image:
        "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=400&h=500&fit=crop",
    },
  ];

  // Luxury watch brands section
  const luxuryWatches = [
    {
      id: 6,
      brand: "BOSS WATCHES",
      discount: "UP TO 50% OFF",
      image:
        "https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=300&h=300&fit=crop",
    },
    {
      id: 7,
      brand: "COACH | Just cavalli",
      discount: "UP TO 40% OFF",
      image:
        "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=300&h=300&fit=crop",
    },
    {
      id: 8,
      brand: "MICHAEL KORS",
      discount: "UP TO 50% OFF",
      image:
        "https://images.unsplash.com/photo-1509941943102-10c232535736?w=300&h=300&fit=crop",
    },
    {
      id: 9,
      brand: "EMPORIO ARMANI",
      discount: "UP TO 50% OFF",
      image:
        "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=300&h=300&fit=crop",
    },
    {
      id: 10,
      brand: "MASERATI",
      discount: "FLAT 35% OFF",
      image:
        "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=300&h=300&fit=crop",
    },
    {
      id: 11,
      brand: "TRUE RELIGION",
      discount: "MIN. 40% OFF",
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=300&h=300&fit=crop",
    },
  ];

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  const handleProductClick = (category) => {
    navigate(`/products?category=${category}`);
  };

  const handleWatchClick = (brand) => {
    navigate(`/products?search=${encodeURIComponent(brand)}`);
  };

  if (loading) {
    return (
      <div className="luxury-deals-loading">
        <div className="luxury-spinner"></div>
      </div>
    );
  }

  return (
    <div className="luxury-deals-section">
      {/* Top Fashion Deals */}
      <div className="luxury-container">
        <div className="luxury-deals-grid">
          {luxuryDeals.map((deal) => (
            <div
              key={deal.id}
              className="luxury-deal-card"
              onClick={() => handleProductClick(deal.category)}
            >
              <div className="luxury-image-wrapper">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="luxury-image"
                />
                <div className="luxury-overlay"></div>
              </div>
              <div className="luxury-content">
                <div className="luxury-brands">
                  {deal.brands.map((brand, index) => (
                    <span
                      key={index}
                      className="luxury-brand-name"
                    >
                      {brand}
                    </span>
                  ))}
                </div>
                <h3 className="luxury-title">
                  {deal.title}
                </h3>
                <div className="luxury-discount">
                  {deal.discount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Luxury Watches Section */}
      <div className="luxury-container">
        <div className="section-header">
          <h2 className="section-title">
            MEDAL WORTHY BRANDS TO BAG
          </h2>
        </div>
        <div className="luxury-watches-grid">
          {luxuryWatches.map((watch) => (
            <div
              key={watch.id}
              className="luxury-watch-card"
              onClick={() => handleWatchClick(watch.brand)}
            >
              <div className="watch-image-wrapper">
                <img
                  src={watch.image}
                  alt={watch.brand}
                  className="watch-image"
                />
              </div>
              <div className="watch-content">
                <h4 className="watch-brand">
                  {watch.brand}
                </h4>
                <div className="watch-discount">
                  {watch.discount}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LuxuryDealsSection;
