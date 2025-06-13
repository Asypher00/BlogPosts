import { API_BASE_URL } from "./config" ;

export const api = {
  // Auth endpoints
  register: async (userData) => {
    const response = await fetch(`${API_BASE_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });
    return response.json();
  },

  getProfile: async (token) => {
    const response = await fetch(`${API_BASE_URL}/auth/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      }
    });
    return response.json();
  },

  // Blog Endpoints
  getAllPosts: async () => {
    const response = await fetch(`${API_BASE_URL}/blogs`);
    return response.json();
  },

  createPost: async (postData, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  updatePost: async (postData, token, id) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(postData),
    });
    return response.json();
  },

  deletePost: async (id, token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.json();
  },

  getPostById: async (id, token = null) => {
    const headers = {
      "Content-Type": "application/json",
    };
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    
    const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
      method: "GET",
      headers,
    });
    return response.json();
  },

  getMyPosts: async (token) => {
    const response = await fetch(`${API_BASE_URL}/blogs/user/my-posts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });
    return response.json();
  }
};