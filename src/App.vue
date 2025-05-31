<template>
  <div id="app">
    <Header @search="handleSearch" />

    <h1>Lista de Libros</h1>
    <h2>Colección de libros disponibles</h2>

    <p v-if="error" class="error-message">{{ error }}</p>

    <BookList :books="filteredBooks" :loading="loading" :error="error" @edit-book="editBook" @delete-book="deleteBook"
      :get-book-cover="getBookCover" />

    <AddBook v-if="showAddForm" @add-book="handleAddBook" @cancel="showAddForm = false" />

    <AuthorSelector v-if="showAuthorSelector" @author-changed="handleAuthorChanged"
      @cancel="showAuthorSelector = false" />

    <GenreSelector v-if="showGenreSelector" @genre-changed="handleGenreChanged" @cancel="showGenreSelector = false" />

    <AuthorList v-if="showAuthorListView" />

    <GenreList v-if="showGenreListView" />

    <EditBook v-if="showEditForm" :book="editingBook" @update-book="handleUpdateBook" @cancel="showEditForm = false" />

    <!-- Menú FAB flotante -->
    <div class="fab-container">
      <!-- Botón para agregar libro -->
      <button class="fab fab-option" :class="{ 'fab-show': fabOpen }" title="Agregar libro" @click="showAddForm = true">
        <i class="fas fa-book-medical"></i>
      </button>

      <!-- Botón para agregar género -->
      <button class="fab fab-option" :class="{ 'fab-show': fabOpen }" title="Agregar género"
        @click="showGenreSelector = true">
        <i class="fas fa-tag"></i>
      </button>

      <!-- Botón para agregar autor -->
      <button class="fab fab-option" :class="{ 'fab-show': fabOpen }" title="Agregar autor"
        @click="showAddAuthorForm = true">
        <i class="fas fa-user-plus"></i>
      </button>

      <!-- Botón principal -->
      <button class="fab main-fab" @click="toggleFab" title="Menú">
        <i class="fas fa-plus" :class="{ 'rotate': fabOpen }"></i>
      </button>
    </div>

    <Footer />
  </div>
</template>

<script>
import { getBooks, addBook, updateBook, deleteBook } from './services/bookService';
import Header from './components/Header.vue';
import AddBook from './components/AddBook.vue';
import EditBook from './components/EditBook.vue';
import BookList from './components/BookList.vue';
import Footer from './components/Footer.vue';
import AuthorSelector from './components/AuthorSelector.vue';
import GenreSelector from './components/GenreSelector.vue';
import AuthorList from './components/AuthorList.vue';
import GenreList from './components/GenreList.vue';
import AddAuthor from './components/AddAuthor.vue';
import { addAuthor } from './services/authorService';
import AddGenre from './components/AddGenre.vue';
import { addGenre } from './services/genreService';


export default {
  name: 'App',
  components: { Header, AddBook, EditBook, BookList, Footer, AuthorSelector, GenreSelector, AuthorList, GenreList, AddAuthor, AddGenre },
  data() {
    return {
      books: [],
      loading: true,
      error: null,
      showAddForm: false,
      showEditForm: false,
      editingBook: null,
      searchQuery: '',
      coverColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'],
      showAuthorSelector: false,
      showGenreSelector: false,
      fabOpen: false,
      selectedAuthor: null,
      selectedGenre: null,
      showAuthorListView: false,
      showGenreListView: false,
      showAddAuthorForm: false,
      showAddGenreForm: false
    };
  },
  computed: {
    filteredBooks() {
      if (!this.searchQuery) return this.books;
      const query = this.searchQuery.toLowerCase();
      return this.books.filter(book =>
        (book.title || '').toLowerCase().includes(query) ||
        (book.author || '').toLowerCase().includes(query) ||
        (book.genre || '').toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async loadBooks() {
      try {
        this.loading = true;
        const response = await getBooks();
        this.books = response.data;
      } catch (error) {
        this.error = 'Error al cargar los libros. Por favor, intente nuevamente.';
      } finally {
        this.loading = false;
      }
    },
    async handleAddBook(bookData) {
      try {
        const response = await addBook(bookData);
        this.books.push(response.data);
        this.showAddForm = false;
        this.error = null;
      } catch (error) {
        this.error = 'Error al agregar el libro. Por favor, intente nuevamente.';
      }
    },
    editBook(book) {
      this.editingBook = { ...book };
      this.showEditForm = true;
    },
    async handleUpdateBook(updatedBook) {
      try {
        const response = await updateBook(updatedBook._id, updatedBook);
        const index = this.books.findIndex(b => b._id === updatedBook._id);
        if (index !== -1) this.books[index] = response.data;
        this.showEditForm = false;
        this.editingBook = null;
      } catch (error) {
        this.error = 'Error al actualizar el libro. Intente nuevamente.';
      }
    },
    async deleteBook(id) {
      if (!confirm('¿Desea eliminar este libro?')) return;
      try {
        await deleteBook(id);
        this.books = this.books.filter(book => book._id !== id);
      } catch (error) {
        this.error = 'Error al eliminar el libro. Intente nuevamente.';
      }
    },
    handleSearch(query) {
      this.searchQuery = query;
    },
    getBookCover(book) {
      if (book.coverUrl) return book.coverUrl;
      const title = book.title || '';
      const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
      const colorIndex = Math.abs(hash) % this.coverColors.length;
      const backgroundColor = this.coverColors[colorIndex];
      const initials = this.getInitials(title);
      const svg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${backgroundColor}"/>
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${initials}</text>
        </svg>
      `;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
    getInitials(title) {
      if (!title) return '?';
      const words = title.trim().split(' ');
      return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    },
    handleAuthorChanged(author) {
      this.selectedAuthor = author;
      this.showAuthorSelector = false;
    },
    async handleAuthorAdded(author) {
      const response = await addAuthor(author);
      this.authors.push(response.data);
      this.showAddAuthorForm = false;
    },

    async handleGenreAdded(genre) {
      const response = await addGenre(genre);
      this.genres.push(response.data);
      this.showAddGenreForm = false;
    },
    async handleAddAuthor(authorData) {
      try {
        const response = await addAuthor(authorData);
        // Opcional: actualizar lista de autores si la usas globalmente
        this.showAddAuthorForm = false;
        this.error = null;
      } catch (error) {
        this.error = 'Error al agregar el autor. Intente nuevamente.';
      }
    },

    handleGenreChanged(genre) {
      this.selectedGenre = genre;
      this.showGenreSelector = false;
    },
    toggleAuthorListView() {
      this.showAuthorListView = true;
      this.showGenreListView = false;
    },
    toggleGenreListView() {
      this.showAuthorListView = false;
      this.showGenreListView = true;
    },
    toggleFab() {
      this.fabOpen = !this.fabOpen;
    },
    showAddBookModal() {
      this.showAddForm = true;
    },
    toggleAddAuthorForm() {
      this.showAddAuthorForm = true;
    },
    toggleAddGenreForm() {
      this.showAddGenreForm = true;
    }
  },
  mounted() {
    this.loadBooks();
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 100%;
  max-width: 500px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Montserrat', sans-serif;
}

.modal-content h2 {
  margin: 0 0 1.5rem 0;
  color: #1a237e;
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
