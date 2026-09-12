// import "./Navbar.css";
// import { useState, useEffect, useRef } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import MenDropdown from "./dropdowns/MenDropdown";
// import WomenDropdown from "./dropdowns/WomenDropdown";
// import KidsDropdown from "./dropdowns/KidsDropdown";
// import HomeDropdown from "./dropdowns/HomeDropdown";
// import BeautyDropdown from "./dropdowns/BeautyDropdown";
// import GenZDropdown from "./dropdowns/GenZDropdown";
// import ProfileDropdown from "./dropdowns/ProfileDropdown";
// import ThemeToggle from "../../common/ThemeToggle/ThemeToggle";
// import myntraLogo from "../../../assets/logos/myntra-logo.jpg";

// function Navbar() {
//   const [search, setsearch] = useState("");
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [cartCount, setCartCount] = useState(false);
//   const searchRef = useRef(null);
//   const navigate = useNavigate();

//   // Sync cart count from localStorage
//   useEffect(() => {
//     const syncCart = () => {
//       try {
//         const cart = JSON.parse(localStorage.getItem("cart")) || [];
//         const count = cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
//         setCartCount(count);
//       } catch {
//         setCartCount(0);
//       }
//     };

//     syncCart();
//     window.addEventListener("storage", syncCart);
//     // Also poll on focus so count updates after navigation
//     window.addEventListener("focus", syncCart);
//     return () => {
//       window.removeEventListener("storage", syncCart);
//       window.removeEventListener("focus", syncCart);
//     };
//   }, []);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const response = await fetch("https://fakestoreapi.com/products");
//         const data = await response.json();
//         setProducts(data);
//       } catch (error) {
//         console.error("Error fetching products:", error);
//       }
//     };

//     fetchProducts();
//   }, []);

//   useEffect(() => {
//     if (search.trim()) {
//       setLoading(true);

//       const timer = setTimeout(() => {
//         const filtered = products.filter(
//           (product) =>
//             product.title.toLowerCase().includes(search.toLowerCase()) ||
//             product.category.toLowerCase().includes(search.toLowerCase()),
//         );
//         setFilteredProducts(filtered.slice(0, 6));
//         setShowSuggestions(true);
//         setLoading(false);
//       }, 300);

//       return () => clearTimeout(timer);
//     } else {
//       setFilteredProducts([]);
//       setShowSuggestions(false);
//       setLoading(false);
//     }
//   }, [search, products]);

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (searchRef.current && !searchRef.current.contains(event.target)) {
//         setShowSuggestions(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   // Handle search submit
//   const handleSearch = (searchTerm) => {
//     if (searchTerm.trim()) {
//       navigate(`/products?search=${encodeURIComponent(searchTerm)}`);
//       setShowSuggestions(false);
//       setsearch("");
//     }
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === "Enter") {
//       handleSearch(search);
//     }
//   };

//   const handleProductClick = (productTitle) => {
//     navigate(`/products?search=${encodeURIComponent(productTitle)}`);
//     setShowSuggestions(false);
//     setsearch("");
//   };

//   const handleViewAll = () => {
//     handleSearch(search);
//   };

//   return (
//     <nav className="navbar">
//       <div className="nav-container">
//         <div className="logo">
//           <a href="/" className="logo-link">
//             <img src={myntraLogo} alt="Logo" className="logo-img" />
//           </a>
//         </div>

//         <ul className="nav-links">
//           <li className="nav-item-with-dropdown">
//             <MenDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#women" className="nav-link">
//               WOMEN
//             </a>
//             <WomenDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#kids" className="nav-link">
//               KIDS
//             </a>
//             <KidsDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#home" className="nav-link">
//               HOME
//             </a>
//             <HomeDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#beauty" className="nav-link">
//               BEAUTY
//             </a>
//             <BeautyDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#genz" className="nav-link">
//               GENZ
//             </a>
//             <GenZDropdown />
//           </li>
//           <li className="nav-item-with-dropdown">
//             <a href="#studio" className="studio-link">
//               STUDIO
//               <span className="new-badge">NEW</span>
//             </a>
//           </li>
//         </ul>

//         <div className="search-container" ref={searchRef}>
//           <svg
//             className="search-icon"
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             fill="none"
//             stroke="currentColor"
//             onClick={() => handleSearch(search)}
//           >
//             <circle cx="11" cy="11" r="8"></circle>
//             <path d="m21 21-4.35-4.35"></path>
//           </svg>
//           <input
//             type="search"
//             placeholder="Search for products, brands and more"
//             className="search-input"
//             value={search}
//             onChange={(e) => setsearch(e.target.value)}
//             onFocus={() => setShowSuggestions(true)}
//             onKeyPress={handleKeyPress}
//           />

//           {showSuggestions && (
//             <div className="search-suggestions">
//               <div className="suggestions-header">
//                 <span>
//                   {loading
//                     ? "Searching..."
//                     : `Found ${filteredProducts.length} products`}
//                 </span>
//                 {filteredProducts.length > 0 && (
//                   <button className="view-all-btn" onClick={handleViewAll}>
//                     View All
//                   </button>
//                 )}
//               </div>

//               {loading ? (
//                 <div className="search-loading">
//                   <div className="spinner"></div>
//                   <p>Searching products...</p>
//                 </div>
//               ) : (
//                 <div className="search-product-list">
//                   {filteredProducts.length > 0 ? (
//                     filteredProducts.map((product) => (
//                       <div
//                         key={product.id}
//                         className="search-product-item"
//                         onClick={() => handleProductClick(product.title)}
//                       >
//                         <div className="search-product-image">
//                           <img src={product.image} alt={product.title} />
//                         </div>
//                         <div className="search-product-info">
//                           <h4 className="search-product-title">
//                             {product.title}
//                           </h4>
//                           <p className="search-product-category">
//                             {product.category}
//                           </p>
//                           <div className="search-product-price">
//                             <span className="price-value">
//                               ${product.price}
//                             </span>
//                             {product.rating && (
//                               <span className="product-rating-badge">
//                                 ⭐ {product.rating.rate}
//                               </span>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     ))
//                   ) : (
//                     <div className="no-products-found">
//                       <svg
//                         width="42"
//                         height="42"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="2"
//                       >
//                         <circle cx="11" cy="11" r="8"></circle>
//                         <path d="m21 21-4.35-4.35"></path>
//                         <line x1="11" y1="8" x2="11" y2="14"></line>
//                         <line x1="11" y1="16" x2="11.01" y2="16"></line>
//                       </svg>
//                       <h3>No products found</h3>
//                       <p>Try searching with different keywords</p>
//                     </div>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>

//         <div className="nav-actions">
//           <ThemeToggle />

//   {/* <div className="profile-action">
//   <div className="action-link profile-trigger">
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
//       <circle cx="12" cy="7" r="4"></circle>
//     </svg>

//     <span>Profile</span>
//   </div>

//   <ProfileDropdown />
// </div> */}

// <div
//   className="profile-action"
//   onMouseEnter={() => setShowProfile(true)}
//   onMouseLeave={() => setShowProfile(false)}
// >
//   <button
//     type="button"
//     className="action-link profile-trigger"
//     onClick={() => setShowProfile((prev) => !prev)}
//   >
//     <svg
//       width="20"
//       height="20"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="1.8"
//     >
//       <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>

//       <circle
//         cx="12"
//         cy="7"
//         r="4"
//       ></circle>
//     </svg>

//     <span>Profile</span>
//   </button>

//   {/* {showProfile && <ProfileDropdown />} */}
// </div>

//           <Link to="/wishlist" className="action-link">
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//             >
//               <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
//             </svg>
//             <span>Wishlist</span>
//           </Link>

//           <Link to="/bag" className="action-link" style={{ position: "relative" }}>
//             <svg
//               width="20"
//               height="20"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//             >
//               <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
//               <line x1="3" y1="6" x2="21" y2="6"></line>
//               <path d="M16 10a4 4 0 0 1-8 0"></path>
//             </svg>
//             {cartCount > 0 && (
//               <span
//                 style={{
//                   position: "absolute",
//                   top: "-6px",
//                   right: "-6px",
//                   background: "#ff3f6c",
//                   color: "#fff",
//                   borderRadius: "50%",
//                   fontSize: "10px",
//                   fontWeight: "700",
//                   width: "18px",
//                   height: "18px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   lineHeight: "1",
//                 }}
//               >
//                 {cartCount > 99 ? "99+" : cartCount}
//               </span>
//             )}
//             <span>Bag</span>
//           </Link>
//         </div>
//       </div>
//     </nav>
//   );
// }

// export default Navbar;
//   ai code he age 



import "./Navbar.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";

import MenDropdown from "./dropdowns/MenDropdown";
import WomenDropdown from "./dropdowns/WomenDropdown";
import KidsDropdown from "./dropdowns/KidsDropdown";
import HomeDropdown from "./dropdowns/HomeDropdown";
import BeautyDropdown from "./dropdowns/BeautyDropdown";
import GenZDropdown from "./dropdowns/GenZDropdown";
import ProfileDropdown from "./dropdowns/ProfileDropdown";

import ThemeToggle from "../../common/ThemeToggle/ThemeToggle";
import myntraLogo from "../../../assets/logos/myntra-logo.jpg";

function Navbar() {
  const [search, setSearch] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Profile dropdown state
  const [showProfile, setShowProfile] = useState(false);

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cartCount, setCartCount] = useState(false);

  const searchRef = useRef(null);
  const profileRef = useRef(null);

  const navigate = useNavigate();

  // =====================================================
  // CART COUNT
  // =====================================================

  useEffect(() => {
    const syncCart = () => {
      try {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];

        const count = cart.reduce(
          (sum, item) => sum + (item.quantity || 1),
          0,
        );

        setCartCount(count);
      } catch {
        setCartCount(0);
      }
    };

    syncCart();

    window.addEventListener("storage", syncCart);
    window.addEventListener("focus", syncCart);

    return () => {
      window.removeEventListener("storage", syncCart);
      window.removeEventListener("focus", syncCart);
    };
  }, []);

  // =====================================================
  // FETCH PRODUCTS FOR SEARCH
  // =====================================================

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products",
        );

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  // =====================================================
  // SEARCH FILTER
  // =====================================================

  useEffect(() => {
    if (search.trim()) {
      setLoading(true);

      const timer = setTimeout(() => {
        const searchValue = search.toLowerCase();

        const filtered = products.filter((product) => {
          const title = product.title?.toLowerCase() || "";
          const category = product.category?.toLowerCase() || "";

          return (
            title.includes(searchValue) ||
            category.includes(searchValue)
          );
        });

        setFilteredProducts(filtered.slice(0, 6));

        setShowSuggestions(true);
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }

    setFilteredProducts([]);
    setShowSuggestions(false);
    setLoading(false);
  }, [search, products]);

  // =====================================================
  // CLICK OUTSIDE
  // =====================================================

  useEffect(() => {
    const handleClickOutside = (event) => {
      // Search dropdown close
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }

      // Profile dropdown close
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setShowProfile(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside,
      );
    };
  }, []);

  // =====================================================
  // SEARCH
  // =====================================================

  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) return;

    navigate(
      `/products?search=${encodeURIComponent(searchTerm)}`,
    );

    setShowSuggestions(false);
    setSearch("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(search);
    }
  };

  const handleProductClick = (productTitle) => {
    navigate(
      `/products?search=${encodeURIComponent(productTitle)}`,
    );

    setShowSuggestions(false);
    setSearch("");
  };

  const handleViewAll = () => {
    handleSearch(search);
  };

  // =====================================================
  // RENDER
  // =====================================================

  return (
    <nav className="navbar">
      <div className="nav-container">

        {/* =================================================
            LOGO
        ================================================= */}

        <div className="logo">
          <Link to="/" className="logo-link">
            <img
              src={myntraLogo}
              alt="Logo"
              className="logo-img"
            />
          </Link>
        </div>

        {/* =================================================
            NAVIGATION
        ================================================= */}

        <ul className="nav-links">

          <li className="nav-item-with-dropdown">
            <MenDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#women" className="nav-link">
              WOMEN
            </a>
            <WomenDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#kids" className="nav-link">
              KIDS
            </a>
            <KidsDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#home" className="nav-link">
              HOME
            </a>
            <HomeDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#beauty" className="nav-link">
              BEAUTY
            </a>
            <BeautyDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#genz" className="nav-link">
              GENZ
            </a>
            <GenZDropdown />
          </li>

          <li className="nav-item-with-dropdown">
            <a href="#studio" className="studio-link">
              STUDIO
              <span className="new-badge">NEW</span>
            </a>
          </li>

        </ul>

        {/* =================================================
            SEARCH
        ================================================= */}

        <div
          className="search-container"
          ref={searchRef}
        >
          <svg
            className="search-icon"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            onClick={() => handleSearch(search)}
          >
            <circle
              cx="11"
              cy="11"
              r="8"
            />

            <path d="m21 21-4.35-4.35" />
          </svg>

          <input
            type="search"
            placeholder="Search for products, brands and more"
            className="search-input"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            onFocus={() => {
              if (search.trim()) {
                setShowSuggestions(true);
              }
            }}
            onKeyDown={handleKeyPress}
          />

          {/* SEARCH SUGGESTIONS */}

          {showSuggestions && (
            <div className="search-suggestions">

              <div className="suggestions-header">
                <span>
                  {loading
                    ? "Searching..."
                    : `Found ${filteredProducts.length} products`}
                </span>

                {filteredProducts.length > 0 && (
                  <button
                    type="button"
                    className="view-all-btn"
                    onClick={handleViewAll}
                  >
                    View All
                  </button>
                )}
              </div>

              {loading ? (
                <div className="search-loading">
                  <div className="search-spinner"></div>

                  <p>Searching products...</p>
                </div>
              ) : (
                <div className="search-product-list">

                  {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="search-product-item"
                        onClick={() =>
                          handleProductClick(product.title)
                        }
                      >
                        <div className="search-product-image">
                          <img
                            src={product.image}
                            alt={product.title}
                          />
                        </div>

                        <div className="search-product-info">

                          <h4 className="search-product-title">
                            {product.title}
                          </h4>

                          <p className="search-product-category">
                            {product.category}
                          </p>

                          <div className="search-product-price">

                            <span className="price-value">
                              ${product.price}
                            </span>

                            {product.rating && (
                              <span className="product-rating-badge">
                                ⭐ {product.rating.rate}
                              </span>
                            )}

                          </div>

                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="no-products-found">

                      <svg
                        width="42"
                        height="42"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <circle
                          cx="11"
                          cy="11"
                          r="8"
                        />

                        <path d="m21 21-4.35-4.35" />

                        <line
                          x1="11"
                          y1="8"
                          x2="11"
                          y2="14"
                        />

                        <line
                          x1="11"
                          y1="16"
                          x2="11.01"
                          y2="16"
                        />
                      </svg>

                      <h3>No products found</h3>

                      <p>
                        Try searching with different keywords
                      </p>

                    </div>
                  )}

                </div>
              )}

            </div>
          )}
        </div>

        {/* =================================================
            NAV ACTIONS
        ================================================= */}

        <div className="nav-actions">

          {/* THEME */}

          <ThemeToggle />

          {/* =================================================
              PROFILE
          ================================================= */}

          <div
            className="profile-action"
            ref={profileRef}
            onMouseEnter={() => setShowProfile(true)}
            onMouseLeave={() => setShowProfile(false)}
          >

            <button
              type="button"
              className="action-link profile-trigger"
              onClick={() =>
                setShowProfile((previous) => !previous)
              }
            >

              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />

                <circle
                  cx="12"
                  cy="7"
                  r="4"
                />
              </svg>

              <span>Profile</span>

            </button>

            {/* IMPORTANT:
                DO NOT COMMENT THIS */}
            {showProfile && <ProfileDropdown />}

          </div>

          {/* =================================================
              WISHLIST
          ================================================= */}

          <Link
            to="/wishlist"
            className="action-link"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>

            <span>Wishlist</span>
          </Link>

          {/* =================================================
              BAG
          ================================================= */}

          <Link
            to="/bag"
            className="action-link bag-action"
          >

            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />

              <line
                x1="3"
                y1="6"
                x2="21"
                y2="6"
              />

              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>

            {cartCount > 0 && (
              <span className="cart-count">
                {cartCount > 99 ? "99+" : cartCount}
              </span>
            )}

            <span>Bag</span>

          </Link>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;