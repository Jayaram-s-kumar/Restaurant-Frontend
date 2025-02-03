import { useState, useEffect } from 'react';
import { Alert, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { menuService } from '../../services/menuServices';
import './MenuList.scss'

const MenuList = () => {
    const [menus, setMenus] = useState([]);
    const [error, setError] = useState(null);
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [menuToDelete, setMenuToDelete] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        loadMenus();
    }, []);

    const loadMenus = async () => {
        try {
            const data = await menuService.getAllMenus();
            setMenus(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const confirmDeleteMenu = (id) => {
        setMenuToDelete(id);
        setShowDeleteModal(true);
    };

    const handleDeleteMenu = async () => {
        if (menuToDelete) {
            try {
                await menuService.deleteMenu(menuToDelete);
                loadMenus();
                setShowDeleteModal(false);
                setMenuToDelete(null);
            } catch (err) {
                setError(err.message);
                setShowDeleteModal(false);
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setMenuToDelete(null);
    };

    return (
        <div className='menu-cont'>

            {error && <Alert variant="danger">{error}</Alert>}

            <div className="menu-list">
                {menus.map((menu) => (
                    <Card key={menu.id} style={{ width: '18rem', marginBottom: '1rem' }}>
                        <Card.Body>
                            <Card.Title>{menu.name}</Card.Title>
                            <Card.Text>
                                {menu.description}
                            </Card.Text>
                            <div className="d-flex justify-content-between w-100">
                                <Link to={`/menu/items/${menu.id}`}>
                                    <Button variant="primary">
                                        {menu.items.length > 0 ? "View Items" : "Add Item"}
                                    </Button>
                                </Link>
                                <Button 
                                    variant="danger" 
                                    onClick={() => confirmDeleteMenu(menu.id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>

            <Link to="/menus/create" className="btn btn-primary mb-3 ]">Create New Menu</Link>


            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this menu? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseDeleteModal}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDeleteMenu}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default MenuList;