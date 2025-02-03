import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { itemService } from '../../services/itemServices';
import { menuService } from '../../services/menuServices';

const UpdateItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    menuId: ''
  });
  
  const [menus, setMenus] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch menus and current item details
    const fetchData = async () => {
      try {
        // Fetch all menus for dropdown
        const menuList = await menuService.getAllMenus();
        setMenus(menuList);

        // Fetch current item details
        const itemDetails = await itemService.getItemById(id);
        setFormData({
          name: itemDetails.name,
          description: itemDetails.description,
          price: itemDetails.price.toString(),
          menuId: itemDetails.menuId
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Convert price to float
      const itemData = {
        ...formData,
        price: parseFloat(formData.price)
      };

      // Update item
      await itemService.updateItem(id, itemData);
      
      // Navigate back to items list or menu items
      navigate(`/menus/items/${formData.menuId}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <Container className="text-center mt-4">Loading...</Container>;
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={8}>
          <h2 className="text-center mb-4">Update Menu Item</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Item Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter item name"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter item description"
                rows={3}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                step="0.01"
                min="0"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Select Menu</Form.Label>
              <Form.Control
                as="select"
                name="menuId"
                value={formData.menuId}
                onChange={handleChange}
                required
              >
                <option value="">Select a Menu</option>
                {menus.map((menu) => (
                  <option key={menu.id} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">
                Update Item
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate(`/menu/items/${formData.menuId}`)}
              >
                Cancel
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default UpdateItem;