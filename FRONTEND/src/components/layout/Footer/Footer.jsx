import "./Footer.css";
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h3 className="footer-title">
            ONLINE SHOPPING
          </h3>
          <ul className="footer-list">
            <li>
              <a href="#men">Men</a>
            </li>
            <li>
              <a href="#women">Women</a>
            </li>
            <li>
              <a href="#kids">Kids</a>
            </li>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#beauty">Beauty</a>
            </li>
            <li>
              <a href="#genz">Genz</a>
            </li>
            <li>
              <a href="#gift-cards">Gift Cards</a>
            </li>
            <li>
              <a href="#myntra-insider">Myntra Insider</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">
            CUSTOMER POLICIES
          </h3>
          <ul className="footer-list">
            <li>
              <a href="#contact">Contact Us</a>
            </li>
            <li>
              <a href="#faq">FAQ</a>
            </li>


            
            <li>
              <a href="#tnc">T&C</a>
            </li>
            <li>
              <a href="#terms">Terms Of Use</a>
            </li>
            <li>
              <a href="#track">Track Orders</a>
            </li>
            <li>
              <a href="#shipping">Shipping</a>
            </li>
            <li>
              <a href="#cancellation">Cancellation</a>
            </li>
            <li>
              <a href="#privacy">Privacy policy</a>
            </li>
            <li>
              <a href="#grievance">Grievance Redressal</a>
            </li>
            <li>
              <a href="#fssai">FSSAI Food Safety</a>
            </li>
            <li>
              <a href="#connect">Connect app</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">
            EXPERIENCE MYNTRA APP ON MOBILE
          </h3>
          <div className="app-buttons">
            <a
              href="#google-play"
              className="app-button"
            >
              <img
                src="https://constant.myntassets.com/web/assets/img/80cc455a-92d2-4b5c-a038-7da0d92af33f1539674178924-google_play.png"
                alt="Google Play"
              />
            </a>
            <a
              href="#app-store"
              className="app-button"
            >
              <img
                src="https://constant.myntassets.com/web/assets/img/bc5e11ad-0250-420a-ac71-115a57ca35d51539674178941-apple_store.png"
                alt="App Store"
              />
            </a>
          </div>

          <h3 className="footer-title footer-social-title">
            KEEP IN TOUCH
          </h3>
          <div className="social-icons">
            <a
              href="#facebook"
              className="social-icon"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            <a
              href="#twitter"
              className="social-icon"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </a>
            <a
              href="#youtube"
              className="social-icon"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
            <a
              href="#instagram"
              className="social-icon"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-column footer-guarantees">
          <div className="guarantee-item">
            <div className="guarantee-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="guarantee-text">
              <strong>100% ORIGINAL</strong> guarantee
              <br />
              for all products at myntra.com
            </div>
          </div>
          <div className="guarantee-item">
            <div className="guarantee-icon">
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
            <div className="guarantee-text">
              <strong>Return within 14days</strong> of
              <br />
              receiving your order
            </div>
          </div>
        </div>

        <div className="footer-column">
          <h3 className="footer-title">
            USEFUL LINKS
          </h3>
          <ul className="footer-list">
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#sitemap">Site Map</a>
            </li>
            <li>
              <a href="#corporate">Corporate Information</a>
            </li>
            <li>
              <a href="#whitehat">Whitehat</a>
            </li>
            <li>
              <a href="#cleartrip">Cleartrip</a>
            </li>
            <li>
              <a href="#myntra-global">Myntra Global</a>
            </li>
          </ul>
        </div>
      </div>
      {/* 
            <div className="footer-bottom">
                <div className="footer-container">
                    <h3 className="footer-title">POPULAR SEARCHES</h3>
                    <p className="popular-searches">
                        Makeup | Dresses For Girls | T-Shirts | Sandals | Headphones | Babydolls | Blazers For Men | Handbags | Ladies Watches | Bags | Sport Shoes | Reebok Shoes | Puma Shoes | Boxers | Wallets | Tops | Earrings | Fastrack Watches | Kurtis | Nike | Smart Watches | Titan Watches | Designer Blouse | Gowns | Rings | Cricket Shoes | Forever 21 | Eye Makeup | Photo Frames | Punjabi Suits | Bikini | Myntra Fashion Show | Lipstick | Saree | Watches | Dresses | Lehenga | Nike Shoes | Goggles | Bras | Suit | Chinos | Shoes | Adidas Shoes | Woodland Shoes | Jewellery | Designers Sarees
                    </p>
                </div>
            </div> */}
    </footer>
  );
}

export default Footer;
