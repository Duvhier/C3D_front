<template>
  <div>
    <h1>Lista de Libros</h1>
    <h2>Colección de libros disponibles</h2>
    <p style="text-align:center;">Total de libros: {{ filteredBooks.length }}</p>

    <p v-if="error" class="error-message">{{ error }}</p>

    <BookList :books="filteredBooks" :loading="loading" :error="error" @edit-book="editBook" @delete-book="deleteBook"
      :get-book-cover="getBookCover" />
    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="showAddForm = false">&times;</button>
        <AddBook @add-book="handleAddBook" @cancel="showAddForm = false" :isVisible="showAddForm" />
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="showEditForm = false">&times;</button>
        <EditBook :book="editingBook" @update-book="handleUpdateBook" @cancel="showEditForm = false" />
      </div>
    </div>

    <!-- Menú FAB flotante -->
    <div class="fab-container">
      <!-- Botón para agregar libro -->
      <button class="fab fab-option" :class="{ 'fab-show': fabOpen }" title="Agregar libro" @click="showAddForm = true">
        <i class="fas fa-book"></i>
      </button>
      <!-- Botón principal -->
      <button class="fab main-fab" @click="toggleFab" title="Menú">
        <i class="fas fa-plus" :class="{ 'rotate': fabOpen }"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { getBooks, addBook, updateBook, deleteBook } from '../services/bookService';
import AddBook from './AddBook.vue';
import EditBook from './EditBook.vue';
import BookList from './BookList.vue';

export default {
  name: 'Books',
  components: { AddBook, EditBook, BookList },
  props: {
    searchQuery: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      books: [],
      loading: true,
      error: null,
      showAddForm: false,
      showEditForm: false,
      editingBook: null,
      coverColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71'],
      fabOpen: false
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
      try {
        await deleteBook(id); 
        this.books = this.books.filter(book => book._id !== id);
      } catch (error) {
        this.error = 'Error al eliminar el libro. Intente nuevamente.';
      }
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
    toggleFab() {
      this.fabOpen = !this.fabOpen;
    }
  },
  mounted() {
    this.loadBooks();
  }
};
</script> 