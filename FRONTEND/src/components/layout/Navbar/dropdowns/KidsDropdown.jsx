import "./KidsDropdown.css";
function KidsDropdown() {
    return (
        <div className="kids-dropdown">
            <div className="kids-dropdown-container">
                {/* Boys Clothing Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Boys Clothing</h3>
                    <ul className="dropdown-list">
                        <li><a href="#boys-tshirts">T-Shirts</a></li>
                        <li><a href="#boys-shirts">Shirts</a></li>
                        <li><a href="#boys-shorts">Shorts</a></li>
                        <li><a href="#boys-jeans">Jeans</a></li>
                        <li><a href="#boys-trousers">Trousers</a></li>
                        <li><a href="#boys-clothing-sets">Clothing Sets</a></li>
                        <li><a href="#boys-ethnic">Ethnic Wear</a></li>
                        <li><a href="#boys-track-pants">Track Pants & Pyjamas</a></li>
                        <li><a href="#boys-jacket">Jacket, Sweater & Sweatshirts</a></li>
                        <li><a href="#boys-party">Party Wear</a></li>
                        <li><a href="#boys-innerwear">Innerwear & Thermals</a></li>
                        <li><a href="#boys-nightwear">Nightwear & Loungewear</a></li>
                        <li><a href="#boys-value">Value Packs</a></li>
                    </ul>
                </div>

                {/* Girls Clothing Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Girls Clothing</h3>
                    <ul className="dropdown-list">
                        <li><a href="#girls-dresses">Dresses</a></li>
                        <li><a href="#girls-tops">Tops</a></li>
                        <li><a href="#girls-tshirts">Tshirts</a></li>
                        <li><a href="#girls-clothing-sets">Clothing Sets</a></li>
                        <li><a href="#girls-lehenga">Lehenga choli</a></li>
                        <li><a href="#girls-kurta">Kurta Sets</a></li>
                        <li><a href="#girls-party">Party wear</a></li>
                        <li><a href="#girls-dungarees">Dungarees & Jumpsuits</a></li>
                        <li><a href="#girls-skirts">Skirts & shorts</a></li>
                        <li><a href="#girls-tights">Tights & Leggings</a></li>
                        <li><a href="#girls-jeans">Jeans, Trousers & Capris</a></li>
                        <li><a href="#girls-jacket">Jacket, Sweater & Sweatshirts</a></li>
                        <li><a href="#girls-innerwear">Innerwear & Thermals</a></li>
                        <li><a href="#girls-nightwear">Nightwear & Loungewear</a></li>
                        <li><a href="#girls-value">Value Packs</a></li>
                    </ul>
                </div>

                {/* Footwear & Toys Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Footwear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#kids-casual-shoes">Casual Shoes</a></li>
                        <li><a href="#kids-flipflops">Flipflops</a></li>
                        <li><a href="#kids-sports-shoes">Sports Shoes</a></li>
                        <li><a href="#kids-flats">Flats</a></li>
                        <li><a href="#kids-sandals">Sandals</a></li>
                        <li><a href="#kids-heels">Heels</a></li>
                        <li><a href="#kids-school-shoes">School Shoes</a></li>
                        <li><a href="#kids-socks">Socks</a></li>
                    </ul>
                    
                    <h3 className="column-title">Toys & Games</h3>
                    <ul className="dropdown-list">
                        <li><a href="#learning-development">Learning & Development</a></li>
                        <li><a href="#activity-toys">Activity Toys</a></li>
                        <li><a href="#soft-toys">Soft Toys</a></li>
                        <li><a href="#action-figure">Action Figure / Play set</a></li>
                    </ul>
                </div>

                {/* Infants & Home Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Infants</h3>
                    <ul className="dropdown-list">
                        <li><a href="#bodysuits">Bodysuits</a></li>
                        <li><a href="#rompers">Rompers & Sleepsuits</a></li>
                        <li><a href="#infant-clothing-sets">Clothing Sets</a></li>
                        <li><a href="#infant-tshirts">Tshirts & Tops</a></li>
                        <li><a href="#infant-dresses">Dresses</a></li>
                        <li><a href="#infant-bottom">Bottom wear</a></li>
                        <li><a href="#infant-winter">Winter Wear</a></li>
                        <li><a href="#infant-innerwear">Innerwear & Sleepwear</a></li>
                        <li><a href="#infant-care">Infant Care</a></li>
                    </ul>
                    
                    <h3 className="column-title">Home & Bath</h3>
                    
                    <h3 className="column-title">Personal Care</h3>
                </div>

                {/* Kids Accessories & Brands Section */}
                <div className="dropdown-column">
                    <h3 className="column-title">Kids Accessories</h3>
                    <ul className="dropdown-list">
                        <li><a href="#bags-backpacks">Bags & Backpacks</a></li>
                        <li><a href="#kids-watches">Watches</a></li>
                        <li><a href="#jewellery-hair">Jewellery & Hair accessory</a></li>
                        <li><a href="#kids-sunglasses">Sunglasses</a></li>
                        <li><a href="#masks-protective">Masks & Protective Gears</a></li>
                        <li><a href="#caps-hats">Caps & Hats</a></li>
                    </ul>
                    
                    <h3 className="column-title">Brands</h3>
                    <ul className="dropdown-list">
                        <li><a href="#hm">H&M</a></li>
                        <li><a href="#max-kids">Max Kids</a></li>
                        <li><a href="#pantaloons">Pantaloons</a></li>
                        <li><a href="#ucb-kids">United Colors Of Benetton Kids</a></li>
                        <li><a href="#yk">YK</a></li>
                        <li><a href="#uspolo-kids">U.S. Polo Assn. Kids</a></li>
                        <li><a href="#mothercare">Mothercare</a></li>
                        <li><a href="#hrx">HRX</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default KidsDropdown;
