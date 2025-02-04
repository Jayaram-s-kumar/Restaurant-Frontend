// const API_URL = 'http://localhost:3000/api';
const API_URL = 'https://restaurant-backend-0kci.onrender.com/api';

export const itemService = {
  getAllItems: async () => {
    const response = await fetch(`${API_URL}/items`);
    if (!response.ok) throw new Error('Failed to fetch items');
    return response.json();
  },

  getItemsByMenu: async (menuId) => {
    const response = await fetch(`${API_URL}/items/menu/${menuId}`);
    if (!response.ok) throw new Error('Failed to fetch menu items');
    return response.json();
  },

  createItem: async (itemData) => {
    const response = await fetch(`${API_URL}/items`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    if (!response.ok) throw new Error('Failed to create item');
    return response.json();
  },

  updateItem: async (id, itemData) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(itemData)
    });
    if (!response.ok) throw new Error('Failed to update item');
    return response.json();
  },

  deleteItem: async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete item');
    return response.json();
  },
  getItemById: async (id) => {
    const response = await fetch(`${API_URL}/items/${id}`);
    if (!response.ok) throw new Error('Failed to fetch item');
    return response.json();
  },
};