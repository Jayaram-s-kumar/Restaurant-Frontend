import React from 'react'
import './MenuCard.scss'

const MenuCard = ({ menu }) => {
    // If no menu or no items, show a message
    if (!menu || !menu.items || menu.items.length === 0) {
        return (
            <div className="brunch-menu">
                <div className="menu-container">
                    <h1 className="menu-title">
                        <span className="line-left"></span>
                        {menu ? menu.name : 'Menu'} 
                        <span className="line-right"></span>
                    </h1>
                    <p className="text-center">No items available in this menu.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="brunch-menu">
            <div className="menu-container">
                <div className="decorative-image-top">
                    <img src="/images/juice.png" alt="Decorative cocktail" />
                </div>

                <h1 className="menu-title">
                    <span className="line-left"></span>
                    {menu.description}
                    <span className="line-right"></span>
                </h1>

                <div className="menu-items">
                    {menu.items.map((item) => (
                        <div key={item.id} className="menu-item">
                            <div className="item-header">
                                <h2>{item.name}</h2>
                                <div className="dots"></div>
                                <span className="price">${item.price.toFixed(2)}</span>
                            </div>
                            <p className="description">
                                {item.description}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="decorative-image-bottom">
                    <img src="/images/cocktail.png" alt="Decorative cocktail" />
                </div>
            </div>
        </div>
    );
}

export default MenuCard;