import "./StudioDropdown.css";
function StudioDropdown() {
    return (
        <div className="studio-dropdown">
            <div className="studio-content">

                <div className="studio-logo">
                    <div className="studio-logo-icon"></div>
                    <h2 className="studio-logo-text">Studio</h2>
                </div>

                <p className="studio-tagline">
                    Your daily inspiration for everything fashion
                </p>

                <div className="studio-images">
                    <div className="studio-image-item">
                        <img 
                            src="https://images.unsplash.com/photo-1564859228273-274232fdb516?w=400&h=600&fit=crop" 
                            alt="Fashion Style 1" 
                        />
                    </div>
                    <div className="studio-image-item">
                        <img 
                            src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=400&h=600&fit=crop" 
                            alt="Fashion Style 2" 
                        />
                    </div>
                    <div className="studio-image-item">
                        <img 
                            src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop" 
                            alt="Fashion Style 3" 
                        />
                    </div>
                    <div className="studio-image-item">
                        <img 
                            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop" 
                            alt="Fashion Style 4" 
                        />
                    </div>
                </div>

                <a href="#explore-studio" className="studio-cta">
                    Explore Studio
                    <span className="studio-cta-arrow">→</span>
                </a>
            </div>
        </div>
    );
}

export default StudioDropdown;
