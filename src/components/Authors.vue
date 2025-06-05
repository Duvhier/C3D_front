<template>
  <div>
    <h1>Lista de Autores</h1>
    <h2>Colección de autores disponibles</h2>
    <p style="text-align:center;">Total de autores: {{ authors ? authors.length : 0 }}</p>

    <p v-if="error" class="error-message">{{ error }}</p>

    <div v-if="loading" class="loading">
      <i class="fas fa-spinner fa-spin"></i> Cargando autores...
    </div>

    <div v-else-if="authors && authors.length > 0" class="authors-grid">
      <div v-for="author in filteredAuthors" :key="author._id" class="author-card">
        <div class="author-cover">
          <img 
            :src="author.coverUrl || getDefaultCover(author.name)" 
            :alt="author.name"
            class="author-image"
            @error="handleImageError"
          />
        </div>
        <div class="author-info">
          <h3>{{ author.name }}</h3>
          <p class="author-books">Libros: {{ author.books ? author.books.length : 0 }}</p>
          <div class="author-actions">
            <button class="edit-button" @click="editAuthor(author)" title="Editar autor">
              <i class="fas fa-edit"></i>
            </button>
            <button class="delete-button" @click="deleteAuthor(author._id)" title="Eliminar autor">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="no-authors">
      No hay autores disponibles.
    </div>

    <div v-if="showAddForm" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="showAddForm = false">&times;</button>
        <AddAuthor @add-author="handleAddAuthor" @cancel="showAddForm = false" />
      </div>
    </div>

    <div v-if="showEditForm" class="modal-overlay">
      <div class="modal-content">
        <button class="modal-close" @click="showEditForm = false">&times;</button>
        <EditAuthor :author="editingAuthor" @update-author="handleUpdateAuthor" @cancel="showEditForm = false" />
      </div>
    </div>

    <!-- Menú FAB flotante -->
    <div class="fab-container">
      <!-- Botón para agregar autor -->
      <button class="fab fab-option" :class="{ 'fab-show': fabOpen }" title="Agregar autor" @click="showAddForm = true">
        <i class="fas fa-user-plus"></i>
      </button>

      <!-- Botón principal -->
      <button class="fab main-fab" @click="toggleFab" title="Menú">
        <i class="fas fa-plus" :class="{ 'rotate': fabOpen }"></i>
      </button>
    </div>
  </div>
</template>

<script>
import { getAuthors, addAuthor, updateAuthor, deleteAuthor } from '../services/authorService';
import AddAuthor from './AddAuthor.vue';
import EditAuthor from './EditAuthor.vue';

export default {
  name: 'Authors',
  components: { AddAuthor, EditAuthor },
  data() {
    return {
      authors: [],
      loading: true,
      error: null,
      showAddForm: false,
      showEditForm: false,
      editingAuthor: null,
      searchQuery: '',
      fabOpen: false,
      coverColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71']
    };
  },
  computed: {
    filteredAuthors() {
      if (!this.searchQuery) return this.authors || [];
      const query = this.searchQuery.toLowerCase();
      return (this.authors || []).filter(author =>
        (author.name || '').toLowerCase().includes(query)
      );
    }
  },
  methods: {
    async loadAuthors() {
      try {
        this.loading = true;
        const response = await getAuthors();
        this.authors = response.data || [];
        this.error = null;
      } catch (error) {
        console.error('Error loading authors:', error);
        this.error = 'Error al cargar los autores. Por favor, intente nuevamente.';
        this.authors = [];
      } finally {
        this.loading = false;
      }
    },
    async handleAddAuthor(authorData) {
      try {
        const response = await addAuthor(authorData);
        this.authors.push(response.data);
        this.showAddForm = false;
        this.error = null;
      } catch (error) {
        this.error = 'Error al agregar el autor. Por favor, intente nuevamente.';
      }
    },
    editAuthor(author) {
      this.editingAuthor = { ...author };
      this.showEditForm = true;
    },
    async handleUpdateAuthor(updatedAuthor) {
      try {
        const response = await updateAuthor(updatedAuthor._id, updatedAuthor);
        const index = this.authors.findIndex(a => a._id === updatedAuthor._id);
        if (index !== -1) this.authors[index] = response.data;
        this.showEditForm = false;
        this.editingAuthor = null;
      } catch (error) {
        this.error = 'Error al actualizar el autor. Intente nuevamente.';
      }
    },
    async deleteAuthor(id) {
      try {
        await deleteAuthor(id);
        this.authors = this.authors.filter(author => author._id !== id);
      } catch (error) {
        this.error = 'Error al eliminar el autor. Intente nuevamente.';
      }
    },
    getAuthorColor(name) {
      const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
      const colorIndex = Math.abs(hash) % this.coverColors.length;
      return this.coverColors[colorIndex];
    },
    getInitials(name) {
      if (!name) return '?';
      const words = name.trim().split(' ');
      return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    },
    toggleFab() {
      this.fabOpen = !this.fabOpen;
    },
    getDefaultCover(name) {
      const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
      const colorIndex = Math.abs(hash) % this.coverColors.length;
      return `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'><rect width='200' height='200' fill='${this.coverColors[colorIndex]}'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='white' font-size='80' font-family='Arial'>${this.getInitials(name)}</text></svg>`;
    },
    handleImageError(event) {
      const authorName = event.target.alt;
      event.target.src = this.getDefaultCover(authorName);
    }
  },
  mounted() {
    this.loadAuthors();
  }
};
</script>

<style scoped>
.authors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.author-card {
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.author-card:hover {
  transform: translateY(-5px);
}

.author-cover {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.author-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.author-card:hover .author-image {
  transform: scale(1.1);
}

.author-info {
  flex: 1;
}

.author-info h3 {
  margin: 0 0 0.5rem 0;
  color: #1a237e;
  font-size: 1.2rem;
}

.author-books {
  color: #666;
  margin: 0.5rem 0;
}

.author-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
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

@media (max-width: 768px) {
  .authors-grid {
    grid-template-columns: 1fr;
    padding: 1rem;
  }

  .author-card {
    padding: 1rem;
  }

  .author-cover {
    width: 80px;
    height: 80px;
  }
}

.loading {
  text-align: center;
  padding: 2rem;
  color: #666;
  font-size: 1.1rem;
}

.loading i {
  margin-right: 0.5rem;
  color: #1a237e;
}
</style> 