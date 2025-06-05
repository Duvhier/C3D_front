import axios from 'axios';

const API_URL = 'https://c3-d-back-nkt5.onrender.com/api';

export const getAuthors = async () => {
  try {
    const response = await axios.get(`${API_URL}/authors`);
    return response;
  } catch (error) {
    console.error('Error fetching authors:', error);
    throw error;
  }
};

export const getAuthor = (id) => {
  return axios.get(`${API_URL}/authors/${id}`);
};

export const addAuthor = (author) => {
  return axios.post(`${API_URL}/authors`, author);
};

export const updateAuthor = (id, author) => {
  return axios.put(`${API_URL}/authors/${id}`, author);
};

export const deleteAuthor = (id) => {
  return axios.delete(`${API_URL}/authors/${id}`);
};

export const searchAuthors = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/authors/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching authors:', error);
    throw error;
  }
};

export const getAuthorBooks = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/authors/${id}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching author books:', error);
    throw error;
  }
};
