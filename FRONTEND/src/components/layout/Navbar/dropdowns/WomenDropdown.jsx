import "./WomenDropdown.css";
function WomenDropdown() {
    return (
        <div className="women-dropdown">
            <div className="women-dropdown-container">
                {/* Indian & Fusion Wear Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Indian & Fusion Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#kurtas-suits">Kurtas & Suits</a></li>
                        <li><a href="#kurtis-tunics">Kurtis, Tunics & Tops</a></li>
                        <li><a href="#sarees">Sarees</a></li>
                        <li><a href="#ethnic-wear">Ethnic Wear</a></li>
                        <li><a href="#leggings-salwars">Leggings, Salwars & Churidars</a></li>
                        <li><a href="#skirts-palazzos">Skirts & Palazzos</a></li>
                        <li><a href="#dress-materials">Dress Materials</a></li>
                        <li><a href="#lehenga-cholis">Lehenga Cholis</a></li>
                        <li><a href="#dupattas-shawls">Dupattas & Shawls</a></li>
                        <li><a href="#jackets">Jackets</a></li>
                    </ul>
                    
                    <h3 className="column-title">Belts, Scarves & More</h3>
                    
                    <h3 className="column-title">Watches & Wearables</h3>
                </div>

                {/* Western Wear Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Western Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#dresses">Dresses</a></li>
                        <li><a href="#tops">Tops</a></li>
                        <li><a href="#tshirts">Tshirts</a></li>
                        <li><a href="#jeans">Jeans</a></li>
                        <li><a href="#trousers-capris">Trousers & Capris</a></li>
                        <li><a href="#shorts-skirts">Shorts & Skirts</a></li>
                        <li><a href="#co-ords">Co-ords</a></li>
                        <li><a href="#playsuits">Playsuits</a></li>
                        <li><a href="#jumpsuits">Jumpsuits</a></li>
                        <li><a href="#shrugs">Shrugs</a></li>
                        <li><a href="#sweaters-sweatshirts">Sweaters & Sweatshirts</a></li>
                        <li><a href="#jackets-coats">Jackets & Coats</a></li>
                        <li><a href="#blazers-waistcoats">Blazers & Waistcoats</a></li>
                    </ul>
                    
                    <h3 className="column-title">Plus Size</h3>
                </div>

                {/* Maternity, Footwear & Sports Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Maternity</h3>
                    
                    <h3 className="column-title">Sunglasses & Frames</h3>
                    
                    <h3 className="column-title">Footwear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#flats">Flats</a></li>
                        <li><a href="#casual-shoes">Casual Shoes</a></li>
                        <li><a href="#heels">Heels</a></li>
                        <li><a href="#boots">Boots</a></li>
                        <li><a href="#sports-shoes-floaters">Sports Shoes & Floaters</a></li>
                    </ul>
                    
                    <h3 className="column-title">Sports & Active Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#clothing">Clothing</a></li>
                        <li><a href="#footwear-sports">Footwear</a></li>
                        <li><a href="#sports-accessories">Sports Accessories</a></li>
                        <li><a href="#sports-equipment">Sports Equipment</a></li>
                    </ul>
                </div>

                {/* Lingerie & Beauty Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Lingerie & Sleepwear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#bra">Bra</a></li>
                        <li><a href="#briefs">Briefs</a></li>
                        <li><a href="#shapewear">Shapewear</a></li>
                        <li><a href="#sleepwear-loungewear">Sleepwear & Loungewear</a></li>
                        <li><a href="#swimwear">Swimwear</a></li>
                        <li><a href="#camisoles-thermals">Camisoles & Thermals</a></li>
                    </ul>
                    
                    <h3 className="column-title">Beauty & Personal Care</h3>
                    <ul className="dropdown-list">
                        <li><a href="#makeup">Makeup</a></li>
                        <li><a href="#skincare">Skincare</a></li>
                        <li><a href="#premium-beauty">Premium Beauty</a></li>
                        <li><a href="#lipsticks">Lipsticks</a></li>
                        <li><a href="#fragrances">Fragrances</a></li>
                    </ul>
                </div>

                {/* Gadgets & Accessories Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Gadgets</h3>
                    <ul className="dropdown-list">
                        <li><a href="#smart-wearables">Smart Wearables</a></li>
                        <li><a href="#fitness-gadgets">Fitness Gadgets</a></li>
                        <li><a href="#headphones">Headphones</a></li>
                        <li><a href="#speakers">Speakers</a></li>
                    </ul>
                    
                    <h3 className="column-title">Jewellery</h3>
                    <ul className="dropdown-list">
                        <li><a href="#fashion-jewellery">Fashion Jewellery</a></li>
                        <li><a href="#fine-jewellery">Fine Jewellery</a></li>
                        <li><a href="#earrings">Earrings</a></li>
                    </ul>
                    
                    <h3 className="column-title">Backpacks</h3>
                    
                    <h3 className="column-title">Handbags, Bags & Wallets</h3>
                    
                    <h3 className="column-title">Luggages & Trolleys</h3>
                </div>
            </div>
        </div>
    );
}

export default WomenDropdown;
