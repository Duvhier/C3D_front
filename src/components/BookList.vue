<template>
  <div class="book-list">
    <div v-if="loading" class="loading">
      Cargando libros...
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="books.length" class="books-grid">
      <div v-for="book in books" :key="book.id" class="book-card">
        <div v-if="book.coverUrl" class="book-cover">
          <img :src="book.coverUrl" :alt="book.title" class="cover-image" />
        </div>
        <div class="book-info">
          <h3 class="book-title">{{ book.title }}</h3>
          <p class="book-author">{{ book.author }}</p>
          <p v-if="book.genre" class="book-genre">{{ book.genre }}</p>
          <p v-if="book.publishedDate" class="book-date">
            Publicado: {{ formatDate(book.publishedDate) }}
          </p>
        </div>
        <div class="book-actions">
          <button @click="$emit('edit-book', book)" class="edit-button" title="Editar libro">
            Editar
          </button>
          <button @click="confirmDelete(book)" class="delete-button" title="Eliminar libro">
            Eliminar
          </button>

        </div>
      </div>
    </div>
    <div v-else class="no-books">
      No hay libros para mostrar.
    </div>

    <!-- Modal de Confirmación -->
    <div v-if="showModal" class="modal-overlay" @click.self="cancelDelete">
      <div class="modal">
        <button class="modal-close" @click="cancelDelete" aria-label="Cerrar modal">×</button>
        <p>¿Estás seguro de que deseas eliminar <strong>"{{ bookToDelete?.title }}"</strong>?</p>
        <div class="modal-buttons">
          <button @click="deleteBook" class="confirm-button">Sí, eliminar</button>
          <button @click="cancelDelete" class="cancel-button">Cancelar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  props: {
    books: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showModal: false,
      bookToDelete: null
    };
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    },
    confirmDelete(book) {
      this.bookToDelete = book;
      this.showModal = true;
    },
    cancelDelete() {
      this.bookToDelete = null;
      this.showModal = false;
    },
    deleteBook() {
      const bookId = this.bookToDelete._id;
      if (bookId) {
        this.$emit('delete-book', bookId);
      }
      this.cancelDelete();
    }
  }
}
</script>

<style scoped>
.book-list {
  padding: 20px;
}

.loading,
.error,
.no-books {
  text-align: center;
  padding: 20px;
  color: #666;
}

.error {
  color: #f44336;
}

.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.book-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.book-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.book-info {
  margin-bottom: 15px;
}

.book-title {
  margin: 0 0 10px 0;
  color: #333;
  font-size: 1.2em;
}

.book-author {
  color: #666;
  margin: 5px 0;
}

.book-genre {
  color: #888;
  font-size: 0.9em;
  margin: 5px 0;
}

.book-date {
  color: #888;
  font-size: 0.8em;
  margin: 5px 0;
}

.book-actions {
  display: flex;
  gap: 10px;
}

.edit-button,
.delete-button {
  flex: 1;
  padding: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
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
  background-color: #D32F2F;
}

/* Modal personalizado */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: relative;
  background-color: white;
  padding: 25px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  animation: fadeIn 0.3s ease;
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: #333;
  font-size: 1.2em;
}

.modal-buttons {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.modal-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
}

.modal-close:hover {
  color: #f44336;
}


.confirm-button {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  background-color: #9e9e9e;
  color: white;
  border: none;
  padding: 10px;
  flex: 1;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-button:hover {
  background-color: #d32f2f;
}

.cancel-button:hover {
  background-color: #757575;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.95);
  }

  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
