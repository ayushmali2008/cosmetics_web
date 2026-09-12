import "./BeautyDropdown.css";
function BeautyDropdown() {
    return (
        <div className="beauty-dropdown">
            <div className="beauty-dropdown-container">
                {/* Makeup Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Makeup</h3>
                    <ul className="dropdown-list">
                        <li><a href="#lipstick">Lipstick</a></li>
                        <li><a href="#lip-gloss">Lip Gloss</a></li>
                        <li><a href="#lip-liner">Lip Liner</a></li>
                        <li><a href="#mascara">Mascara</a></li>
                        <li><a href="#eyeliner">Eyeliner</a></li>
                        <li><a href="#kajal">Kajal</a></li>
                        <li><a href="#eyeshadow">Eyeshadow</a></li>
                        <li><a href="#foundation">Foundation</a></li>
                        <li><a href="#primer">Primer</a></li>
                        <li><a href="#concealer">Concealer</a></li>
                        <li><a href="#compact">Compact</a></li>
                        <li><a href="#nail-polish">Nail Polish</a></li>
                    </ul>
                </div>

                {/* Skincare, Bath & Body Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Skincare, Bath & Body</h3>
                    <ul className="dropdown-list">
                        <li><a href="#face-moisturiser">Face Moisturiser</a></li>
                        <li><a href="#cleanser">Cleanser</a></li>
                        <li><a href="#masks-peel">Masks & Peel</a></li>
                        <li><a href="#sunscreen">Sunscreen</a></li>
                        <li><a href="#serum">Serum</a></li>
                        <li><a href="#face-wash">Face Wash</a></li>
                        <li><a href="#eye-cream">Eye Cream</a></li>
                        <li><a href="#lip-balm">Lip Balm</a></li>
                        <li><a href="#body-lotion">Body Lotion</a></li>
                        <li><a href="#body-wash">Body Wash</a></li>
                        <li><a href="#body-scrub">Body Scrub</a></li>
                        <li><a href="#hand-cream">Hand Cream</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Baby Care</h3>
                    
                    <h3 className="column-title cyan-title">Masks</h3>
                </div>

                {/* Haircare & Fragrances Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Haircare</h3>
                    <ul className="dropdown-list">
                        <li><a href="#shampoo">Shampoo</a></li>
                        <li><a href="#conditioner">Conditioner</a></li>
                        <li><a href="#hair-cream">Hair Cream</a></li>
                        <li><a href="#hair-oil">Hair Oil</a></li>
                        <li><a href="#hair-gel">Hair Gel</a></li>
                        <li><a href="#hair-color">Hair Color</a></li>
                        <li><a href="#hair-serum">Hair Serum</a></li>
                        <li><a href="#hair-accessory">Hair Accessory</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Fragrances</h3>
                    <ul className="dropdown-list">
                        <li><a href="#perfume">Perfume</a></li>
                        <li><a href="#deodorant">Deodorant</a></li>
                        <li><a href="#body-mist">Body Mist</a></li>
                    </ul>
                </div>

                {/* Appliances & Men's Grooming Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Appliances</h3>
                    <ul className="dropdown-list">
                        <li><a href="#hair-straightener">Hair Straightener</a></li>
                        <li><a href="#hair-dryer">Hair Dryer</a></li>
                        <li><a href="#epilator">Epilator</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Men's Grooming</h3>
                    <ul className="dropdown-list">
                        <li><a href="#trimmers">Trimmers</a></li>
                        <li><a href="#beard-oil">Beard Oil</a></li>
                        <li><a href="#hair-wax">Hair Wax</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Beauty Gift & Makeup Set</h3>
                    <ul className="dropdown-list">
                        <li><a href="#beauty-gift">Beauty Gift</a></li>
                        <li><a href="#makeup-kit">Makeup Kit</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Premium Beauty</h3>
                    
                    <h3 className="column-title cyan-title">Wellness & Hygiene</h3>
                </div>

                {/* Top Brands Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Top Brands</h3>
                    <ul className="dropdown-list">
                        <li><a href="#lakme">Lakme</a></li>
                        <li><a href="#maybelline">Maybelline</a></li>
                        <li><a href="#loreal">LOreal</a></li>
                        <li><a href="#philips">Philips</a></li>
                        <li><a href="#bath-body-works">Bath & Body Works</a></li>
                        <li><a href="#the-body-shop">THE BODY SHOP</a></li>
                        <li><a href="#biotique">Biotique</a></li>
                        <li><a href="#mamaearth">Mamaearth</a></li>
                        <li><a href="#mcaffeine">MCaffeine</a></li>
                        <li><a href="#nivea">Nivea</a></li>
                        <li><a href="#lotus-herbals">Lotus Herbals</a></li>
                        <li><a href="#loreal-professionnel">LOreal Professionnel</a></li>
                        <li><a href="#kama-ayurveda">KAMA AYURVEDA</a></li>
                        <li><a href="#mac">M.A.C</a></li>
                        <li><a href="#forest-essentials">Forest Essentials</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default BeautyDropdown;
