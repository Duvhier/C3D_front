import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://c3-d-back-nkt5.onrender.com';

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

api.interceptors.response.use(
  response => {
    console.log('Response received:', response);
    return response;
  },
  error => {
    if (error.response) {
      const errorData = {
        status: error.response.status,
        data: error.response.data,
        message: error.response.data?.message || 'Error en el servidor',
        headers: error.response.headers,
        config: {
          url: error.config?.url,
          method: error.config?.method,
          headers: error.config?.headers
        }
      };
      console.error('Error del servidor:', errorData);
    } else if (error.request) {
      console.error('Error de conexión:', error.request);
    } else {
      console.error('Error:', error.message);
    }
    return Promise.reject(error);
  }
);

const validateId = (id) => {
  if (!id) throw new Error('ID no proporcionado');
  return id;
};

const validateBook = (book) => {
  if (!book) throw new Error('Datos del libro no proporcionados');

  const requiredFields = ['title', 'author', 'genre', 'publishedDate'];
  const missingFields = requiredFields.filter(field => !book[field] || book[field].trim() === '');

  if (missingFields.length > 0) {
    throw new Error(`Los siguientes campos son requeridos: ${missingFields.join(', ')}`);
  }

  return {
    title: book.title.trim(),
    author: book.author.trim(),
    genre: book.genre.trim(),
    publishedDate: book.publishedDate || new Date().toISOString().split('T')[0],
    coverUrl: book.coverUrl || '',
    description: book.description || ''
  };
};

const normalizeResponse = (response) => {
  if (Array.isArray(response.data)) {
    response.data = response.data.map(book => ({
      ...book,
      _id: book._id || book.id
    }));
  } else if (response.data) {
    response.data = {
      ...response.data,
      _id: response.data._id || response.data.id
    };
  }
  return response;
};

// 👇 FUNCIONES EXPORTADAS
export const getBooks = () => api.get('/api/books').then(normalizeResponse);

export const addBook = async (book) => {
  const validated = validateBook(book);
  const response = await api.post('/api/books', validated);
  return normalizeResponse(response);
};

export const updateBook = async (id, book) => {
  validateId(id);
  const validated = validateBook(book);
  const response = await api.put(`/api/books/${id}`, validated);
  return normalizeResponse(response);
};

export const deleteBook = async (id) => {
  validateId(id);
  const response = await api.delete(`/api/books/${id}`);
  return normalizeResponse(response);
};
