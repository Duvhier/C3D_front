<template>
  <div id="app">
    <Header @search="handleSearch" />
    <router-view :search-query="searchQuery"></router-view>
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';

export default {
  name: 'App',
  components: { Header, Footer },
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch(query) {
      this.searchQuery = query;
    }
  }
};
</script>

<style>
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css');
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Montserrat', sans-serif;
}

body {
  font-family: 'Montserrat', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #1a237e;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #1a237e;
  text-align: center;
  font-weight: bold;
  margin-top: 1rem;
  margin-bottom: 1rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.container {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.books-container {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
}

.loading,
.error,
.no-books {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.error {
  color: #d32f2f;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.book-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.book-cover {
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease;
}

.cover-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
}

.book-card:hover .cover-image {
  transform: scale(1.05);
}

.cover-preview {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
  padding: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.preview-image {
  width: auto;
  height: 100%;
  max-width: 100%;
  object-fit: contain;
  background-color: white;
}

.book-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1a237e;
}

.book-info p {
  margin: 0.25rem 0;
  color: #666;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.book-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.edit-button,
.delete-button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
}

.edit-button {
  background-color: #2196F3;
  color: white;
}

.delete-button {
  background-color: #f44336;
  color: white;
}

.edit-button:hover {
  background-color: #1976D2;
}

.delete-button:hover {
  background-color: #d32f2f;
}

.add-button {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease, background-color 0.2s ease;
}

.add-button:hover {
  transform: scale(1.1);
  background-color: #45a049;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
}

.modal-content h2 {
  margin: 0 0 1.5rem 0;
  color: #1a237e;
}

.modal-content h3 {
  margin-top: 0;
  color: #1a237e;
  font-weight: 600;
}

.modal-content p {
  margin-bottom: 1rem;
}

.modal-content button {
  margin-right: 1rem;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
}

.modal-close {
  position: absolute;
  top: 12px;
  right: 12px;
  background: none;
  border: none;
  font-size: 1.5rem;
  color: #888;
  cursor: pointer;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.form-actions {
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
}

.submit-button,
.cancel-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
}

.cancel-button {
  background-color: #bdc3c7;
  color: #2c3e50;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button:hover {
  background-color: #d32f2f;
}

.cover-upload {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.file-input {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
}

.cover-preview {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 4px;
  overflow: hidden;
  background-color: #f5f5f5;
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background-color: white;
}

.remove-cover {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background-color: rgba(255, 255, 255, 0.9);
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #f44336;
  transition: all 0.2s ease;
}

.remove-cover:hover {
  background-color: #f44336;
  color: white;
}

.delete-button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s;
}

.delete-button:hover {
  background-color: #c0392b;
}

.cover-wrapper {
  position: relative;
  display: inline-block;
}

.cover-image {
  object-fit: cover;
  height: 100%;
  width: 100%;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

/* Imagen ampliada flotante */
.cover-full-preview {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: auto;
  transform: translate(-50%, -50%);
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  background-color: white;
  z-index: 20;
}

.cover-wrapper:hover .cover-full-preview {
  display: block;
}

.footer {
  background-color: #1e1e2f;
  color: #fff;
  padding: 40px 20px 20px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 50px;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 30px;
}

.footer-section {
  flex: 1 1 200px;
}

.footer-section h3,
.footer-section h4 {
  margin-bottom: 10px;
  color: #f4d03f;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  color: #ddd;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section ul li a:hover {
  color: #f4d03f;
}

.footer-section p {
  margin: 5px 0;
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #444;
  font-size: 14px;
  color: #aaa;
}

.error-message {
  color: #d32f2f;
  text-align: center;
  margin-top: 1rem;
}

.fab-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  z-index: 1000;
}

.fab {
  background-color: #1a237e;
  color: white;
  border: none;
  border-radius: 50%;
  padding: 1rem;
  margin-bottom: 0.75rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  font-size: 1.2rem;
  opacity: 0;
  transform: translateY(20px) scale(0);
  pointer-events: none;
  transition: all 0.3s ease-in-out;
}

.fab-show {
  opacity: 1 !important;
  transform: translateY(0) scale(1) !important;
  pointer-events: auto !important;
}

.main-fab {
  background-color: #ff4081;
  opacity: 1;
  transform: scale(1);
  pointer-events: auto;
  z-index: 10;
}

.rotate {
  transform: rotate(45deg);
}

/* Para dar una animación escalonada (delay en aparición) */
.fab:nth-child(2).fab-show {
  transition-delay: 0.05s;
}

.fab:nth-child(3).fab-show {
  transition-delay: 0.1s;
}

.fab:nth-child(4).fab-show {
  transition-delay: 0.15s;
}

/* Colores individuales */
.fab-option:nth-child(1) {
  background-color: #3f51b5;
}

/* Libro */
.fab-option:nth-child(2) {
  background-color: #ff9800;
}

/* Género */
.fab-option:nth-child(3) {
  background-color: #4caf50;
}

/* Autor */

.rotate {
  transform: rotate(45deg);
  transition: transform 0.3s ease;
}

@media (max-width: 768px) {
  .books-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    margin: 1rem;
    padding: 1.5rem;
  }
}
</style>
