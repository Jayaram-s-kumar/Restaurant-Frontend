import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { menuService } from '../../services/menuServices';
import './CreateMenu.scss'


const CreateMenu = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await menuService.createMenu(formData);
      navigate('/admin'); // Redirect to menus list after successful creation
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h2 className="text-center mb-4">Create New Menu</h2>
          
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Menu Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter menu name"
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
                placeholder="Enter menu description"
                rows={3}
                required
              />
            </Form.Group>

            <div className="d-grid gap-2">
              <Button 
                variant="primary" 
                type="submit" 
                disabled={loading}
                className="me-2"
              >
                {loading ? 'Creating...' : 'Create Menu'}
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => navigate('/admin')}
                disabled={loading}
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

export default CreateMenu;