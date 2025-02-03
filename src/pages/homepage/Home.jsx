import React, { useState, useEffect } from 'react'
import { menuService } from '../../services/menuServices';
import './Home.scss'
import MenuCard from '../../componets/MenuCard/MenuCard';
import Footer from '../../componets/Footer/Footer';

const Home = () => {
    const [menus, setMenus] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMenus = async () => {
            try {
                const menuList = await menuService.getAllMenus();
                setMenus(menuList);
                
                // Set the first menu as default if available
                if (menuList.length > 0) {
                    setSelectedMenu(menuList[0]);
                }
                
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchMenus();
    }, []);

    const handleMenuSelect = (menu) => {
        setSelectedMenu(menu);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="hero-cont">
            <div className="hero-section">
                <h1>MENU</h1>
                <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to
                    place an order, use the "Order Online" button located below the menu.</p>

                <div className="menu-title">
                    {menus.map((menu) => (
                        <div 
                            key={menu.id}
                            className={`menu-item ${selectedMenu?.id === menu.id ? 'menu-item-active' : ''}`}
                            onClick={() => handleMenuSelect(menu)}
                        >
                            <p>{menu.name}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="menu-section">
                {selectedMenu && <MenuCard menu={selectedMenu} />}
            </div>
            <Footer />
        </div>
    );
}

export default Home;