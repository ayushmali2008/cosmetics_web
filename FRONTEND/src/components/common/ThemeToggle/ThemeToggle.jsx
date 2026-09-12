import { useTheme } from "../../../context/ThemeContext";
import "./ThemeToggle.css";
function ThemeToggle() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <div className="theme-toggle-wrapper">
      <button
        className={`theme-toggle-btn ${isDark ? "dark" : "light"} [background:transparent] [border:none] [cursor:pointer] [padding:0] [display:flex] [align-items:center] [justify-content:center] [transition:transform_0.2s_ease] hover:[transform:scale(1.05)] active:[transform:scale(0.95)] focus:[outline:none] [opacity:1] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1)] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1),_rotateSun_20s_linear_infinite]`}
        onClick={toggleTheme}
        aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
        title={`Switch to ${isDark ? "light" : "dark"} mode`}
      >
        <div className="toggle-track">
          <div className="toggle-thumb">
            <div className="icon-container">
              <svg
                className={`icon sun-icon ${!isDark ? "active" : ""} [position:absolute] [top:50%] [left:50%] [transform:translate(-50%,_-50%)] [color:white] [transition:all_0.3s_cubic-bezier(0.4,_0,_0.2,_1)] [opacity:0] [transform-origin:center] [opacity:1] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1)] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1),_rotateSun_20s_linear_infinite] [stroke-width:2.5]`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>

              <svg
                className={`icon moon-icon ${isDark ? "active" : ""} [position:absolute] [top:50%] [left:50%] [transform:translate(-50%,_-50%)] [color:white] [transition:all_0.3s_cubic-bezier(0.4,_0,_0.2,_1)] [opacity:0] [transform-origin:center] [opacity:1] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1)] [animation:iconPop_0.4s_cubic-bezier(0.4,_0,_0.2,_1),_rotateSun_20s_linear_infinite] [stroke-width:2.5]`}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

export default ThemeToggle;
