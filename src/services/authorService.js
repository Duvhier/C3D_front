import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';

const API_URL = isLocal
  ? 'http://localhost:3000' // Para desarrollo local
  : 'https://c3-d-back-nkt5.onrender.com'; // Para producción (Render)


export const getAuthors = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const addAuthor = async (author) => {
  try {
    const response = await axios.post(API_URL, author);
    return response.data;
  } catch (error) {
    console.error('Error adding author:', error);
    throw error;
  }
};

export const updateAuthor = async (id, author) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, author);
    return response.data;
  } catch (error) {
    console.error('Error updating author:', error);
    throw error;
  }
};

export const deleteAuthor = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting author:', error);
    throw error;
  }
};

export const getAuthorById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author by ID:', error);
    throw error;
  }
};

export const searchAuthors = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching authors:', error);
    throw error;
  }
};

export const getAuthorBooks = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author books:', error);
    throw error;
  }
};
