import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';

const API_URL = isLocal
  ? 'http://localhost:3000' // Para desarrollo local
  : 'https://c3-d-back-nkt5.onrender.com'; // Para producción (Render)


export const getGenres = async () => {


try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching genres:', error);
    throw error;
  }
};

export const addGenre = async (genre) => {
  try {
    const response = await axios.post(API_URL, genre);
    return response.data;
  } catch (error) {
    console.error('Error adding genre:', error);
    throw error;
  }
};

export const updateGenre = async (id, genre) => {
  try {
    const response = await axios.put(`${API_URL}/api/genres/${id}`, genre);
    return response.data;
  } catch (error) {
    console.error('Error updating genre:', error);
    throw error;
  }
};

export const deleteGenre = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/genres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting genre:', error);
    throw error;
  }
};

export const getGenreById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/genres/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genre by ID:', error);
    throw error;
  }
};

export const searchGenres = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/api/genres/search?query=${query}`);
    return response.data;
  } catch (error) {
    console.error('Error searching genres:', error);
    throw error;
  }
};

export const getGenreBooks = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/api/genres/${id}/books`);
    return response.data;
  } catch (error) {
    console.error('Error fetching genre books:', error);
    throw error;
  }
};




