import axios from "axios"
const API_URL = 'http://localhost:3000/api';

export const menuService = {
  getAllMenus: async () => {
    const response = await fetch(`${API_URL}/menus`);
    if (!response.ok) throw new Error('Failed to fetch menus');
    return response.json();
  },

  getMenuById: async (id) => {
    const response = await fetch(`${API_URL}/menus/${id}`);
    if (!response.ok) throw new Error('Failed to fetch menu');
    return response.json();
  },

  createMenu: async (menuData) => {
    const response = await fetch(`${API_URL}/menus`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuData)
    });
    if (!response.ok) throw new Error('Failed to create menu');
    return response.json();
  },

  updateMenu: async (id, menuData) => {
    const response = await fetch(`${API_URL}/menus/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(menuData)
    });
    if (!response.ok) throw new Error('Failed to update menu');
    return response.json();
  },

  deleteMenu: async (id) => {
    const response = await fetch(`${API_URL}/menus/${id}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete menu');
    return response.json();
  }
};

