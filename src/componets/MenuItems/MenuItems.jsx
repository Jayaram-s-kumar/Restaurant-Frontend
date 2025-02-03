import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Modal } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { itemService } from '../../services/itemServices';
import { menuService } from '../../services/menuServices'; // Import menu service

const MenuItems = () => {
    const { menuId } = useParams();
    const navigate = useNavigate();
    const [items, setItems] = useState([]);
    const [currentMenu, setCurrentMenu] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);

    useEffect(() => {
        loadMenuAndItems();
    }, [menuId]);

    const loadMenuAndItems = async () => {
        try {
            setLoading(true);
            // Fetch menu details
            const menuResponse = await menuService.getMenuById(menuId);
            setCurrentMenu(menuResponse);

            // Fetch items for this menu
            const itemsResponse = await itemService.getItemsByMenu(menuId);
            setItems(itemsResponse);
        } catch (err) {
            setError(err.response?.data?.error || 'Failed to load menu and items');
        } finally {
            setLoading(false);
        }
    };

    const confirmDeleteItem = (itemId) => {
        setItemToDelete(itemId);
        setShowDeleteModal(true);
    };

    const handleDeleteItem = async () => {
        if (itemToDelete) {
            try {
                await itemService.deleteItem(itemToDelete);
                loadMenuAndItems();
                setShowDeleteModal(false);
                setItemToDelete(null);
            } catch (err) {
                setError(err.response?.data?.error || 'Failed to delete item');
            }
        }
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
        setItemToDelete(null);
    };

    if (loading) {
        return (
            <Container className="mt-4">
                <div className="text-center" style={{color:'white'}}>Loading...</div>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <>
                {/* Display current menu name */}
                {currentMenu && (
                    <h1 className="text-center mb-4">{currentMenu.name}</h1>
                )}

                {/* Optional: Display menu description */}
                {currentMenu && currentMenu.description && (
                    <h4 className='text-center' style={{color:'white'}}>{currentMenu.description}</h4>
                )}
                <br />

                {items.length > 0 ? (
                    <Row xs={1} md={2} lg={3} className="g-4">
                        {items.map((item) => (
                            <Col key={item.id}>
                                <Card className="h-100 shadow-sm">
                                    <Card.Body>
                                        <Card.Title className="d-flex justify-content-between align-items-start">
                                            <span>{item.name}</span>
                                            <span className="text-primary fw-bold">${item.price.toFixed(2)}</span>
                                        </Card.Title>
                                        <Card.Text className="text-muted mb-4">
                                            {item.description}
                                        </Card.Text>
                                        <div className="d-flex justify-content-end mt-auto" style={{columnGap:'80px'}}>
                                            <Button
                                                variant="outline-warning"
                                                size="sm"
                                                className="me-2"
                                                onClick={() => navigate(`/items/edit/${item.id}`)}
                                            >
                                                Edit
                                            </Button>
                                            <Button
                                                variant="outline-danger"
                                                size="sm"
                                                onClick={() => confirmDeleteItem(item.id)}
                                            >
                                                Delete
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Alert variant="info">No items found in this menu</Alert>
                )}

                <div className="mt-4 mb-4">
                    <Button
                        variant="secondary"
                        onClick={() => navigate(`/items/create/${menuId}`)}
                    >
                        Add New Item
                    </Button>
                </div>

                <div className="mt-4 mb-4">
                    <Button
                        variant="secondary"
                        onClick={() => navigate('/admin')}
                    >
                        Back to Menus
                    </Button>
                </div>

                {/* Delete Confirmation Modal */}
                <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Are you sure you want to delete this item? This action cannot be undone.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDeleteModal}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleDeleteItem}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        </Container>
    );
};

export default MenuItems;