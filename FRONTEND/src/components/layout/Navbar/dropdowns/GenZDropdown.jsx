import "./GenZDropdown.css";
function GenZDropdown() {
    return (
        <div className="genz-dropdown">
            <div className="genz-dropdown-container">
                {/* Women's Western Wear Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Women's Western Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#dresses-under-499">Dresses Under ₹499</a></li>
                        <li><a href="#tops-under-399">Tops Under ₹399</a></li>
                        <li><a href="#jeans-under-599">Jeans Under ₹599</a></li>
                        <li><a href="#trousers-under-699">Trousers Under ₹699</a></li>
                        <li><a href="#tshirts-under-299">T-shirts Under ₹299</a></li>
                        <li><a href="#shirts-under-499">Shirts Under ₹499</a></li>
                        <li><a href="#skirts-under-499">Skirts Under ₹499</a></li>
                        <li><a href="#shorts-under-699">Shorts Under ₹699</a></li>
                        <li><a href="#co-ords-under-799">Co-ords Under ₹799</a></li>
                        <li><a href="#jumpsuits-under-899">Jumpsuits Under ₹899</a></li>
                        <li><a href="#track-pants-under-699">Track pants Under ₹699</a></li>
                        <li><a href="#jackets-under-899">Jackets Under ₹899</a></li>
                        <li><a href="#sweatshirts-under-699">Sweatshirts Under ₹699</a></li>
                        <li><a href="#sweaters-under-899">Sweaters Under ₹899</a></li>
                    </ul>
                </div>

                {/* Women's Ethnic Wear & Lingerie Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Women's Ethnic Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#kurtas-under-399">Kurtas Under ₹399</a></li>
                        <li><a href="#kurtis-under-499">Kurtis Under ₹499</a></li>
                        <li><a href="#kurta-sets-under-499">Kurta sets Under ₹499</a></li>
                        <li><a href="#ethnic-dresses-under-999">Ethnic Dresses Under ₹999</a></li>
                        <li><a href="#palazzos-under-799">Palazzos Under ₹799</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Lingerie & Loungewear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#bras-under-399">Bras Under ₹399</a></li>
                        <li><a href="#night-suits-under-799">Night suits Under ₹799</a></li>
                        <li><a href="#nightdresses-under-999">Nightdresses Under ₹999</a></li>
                        <li><a href="#lounge-pants-under-999">Lounge pants Under ₹999</a></li>
                        <li><a href="#briefs-under-599">Briefs Under ₹599</a></li>
                    </ul>
                </div>

                {/* Men's Casual & Occasion Wear Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Men's Casual Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#men-tshirts-under-299">T-shirts Under ₹299</a></li>
                        <li><a href="#men-shirts-under-499">Shirts Under ₹499</a></li>
                        <li><a href="#men-jeans-under-599">Jeans Under ₹599</a></li>
                        <li><a href="#men-trousers-under-699">Trousers Under ₹699</a></li>
                        <li><a href="#men-shorts-under-599">Shorts Under ₹599</a></li>
                        <li><a href="#men-track-pants-under-699">Track pants Under ₹699</a></li>
                        <li><a href="#men-jackets-under-899">Jackets Under ₹899</a></li>
                        <li><a href="#men-sweatshirts-under-699">Sweatshirts Under ₹699</a></li>
                        <li><a href="#men-sweaters-under-999">Sweaters Under ₹999</a></li>
                        <li><a href="#men-co-ords-under-999">Co-ords Under ₹999</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Men's Occassion Wear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#men-kurtas-under-799">Kurtas Under ₹799</a></li>
                        <li><a href="#men-kurta-sets-under-999">Kurta Sets Under ₹999</a></li>
                    </ul>
                </div>

                {/* Women's & Men's Footwear Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Women's Footwear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#heels-under-599">Heels Under ₹599</a></li>
                        <li><a href="#flats-under-499">Flats Under ₹499</a></li>
                        <li><a href="#casual-shoes-under-699">Casual shoes Under ₹699</a></li>
                        <li><a href="#sports-shoes-under-999">Sports shoes Under ₹999</a></li>
                        <li><a href="#flip-flops-under-799">Flip flops Under ₹799</a></li>
                        <li><a href="#boots-under-999">Boots Under ₹999</a></li>
                        <li><a href="#ballerinas-under-799">Ballerinas Under ₹799</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Men's Footwear</h3>
                    <ul className="dropdown-list">
                        <li><a href="#men-casual-shoes-under-799">Casual shoes Under ₹799</a></li>
                        <li><a href="#men-sports-shoes-under-999">Sports shoes Under ₹999</a></li>
                        <li><a href="#men-formal-shoes-under-999">Formal shoes Under ₹999</a></li>
                        <li><a href="#men-sandals-under-799">Sandals Under ₹799</a></li>
                        <li><a href="#men-flip-flops-under-499">Flip flops Under ₹499</a></li>
                        <li><a href="#men-boots-under-999">Boots Under ₹999</a></li>
                    </ul>
                </div>

                {/* Beauty & Grooming + Accessories Section */}
                <div className="dropdown-column">
                    <h3 className="column-title cyan-title">Beauty & Grooming</h3>
                    <ul className="dropdown-list">
                        <li><a href="#skincare-under-299">Skincare Under ₹299</a></li>
                        <li><a href="#haircare-under-399">Haircare Under ₹399</a></li>
                        <li><a href="#bath-body-under-399">Bath & Body Under ₹399</a></li>
                        <li><a href="#makeup-under-299">MakeUp Under ₹299</a></li>
                        <li><a href="#fragrances-under-399">Fragrances Under ₹399</a></li>
                        <li><a href="#appliances-under-999">Appliances Under ₹999</a></li>
                    </ul>
                    
                    <h3 className="column-title cyan-title">Accessories</h3>
                    <ul className="dropdown-list">
                        <li><a href="#jewellery-under-299">Jewellery Under ₹299</a></li>
                        <li><a href="#handbags-under-499">Handbags Under ₹499</a></li>
                        <li><a href="#clutches-under-999">Clutches Under ₹999</a></li>
                        <li><a href="#backpacks-under-699">Backpacks Under ₹699</a></li>
                        <li><a href="#wallets-under-499">Wallets Under ₹499</a></li>
                        <li><a href="#sunglasses-under-699">Sunglasses Under ₹699</a></li>
                        <li><a href="#belts-under-799">Belts Under ₹799</a></li>
                        <li><a href="#caps-under-899">Caps Under ₹899</a></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default GenZDropdown;
