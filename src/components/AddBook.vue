<template>
  <div class="add-book-container">
    <div class="add-book-form-wrapper">
      <form @submit.prevent="submitBook" class="add-book-form">
        <button @click="$emit('cancel')" class="close-button" type="button">×</button>
        <h1>Agregar Libro</h1>

        <div class="form-group">
          <input
            v-model="title"
            placeholder="Título del libro"
            required
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <AuthorSelector ref="authorSelector" @author-changed="updateAuthor" />
        </div>

        <div class="form-group">
          <input
            v-model="publishedDate"
            type="date"
            required
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <GenreSelector @genre-changed="updateGenre" />
        </div>

        <div class="form-group">
          <input
            v-model="coverUrl"
            placeholder="URL de la portada (opcional)"
            @input="validateForm"
          />
        </div>

        <div v-if="coverUrl" class="form-group preview">
          <img :src="coverUrl" alt="Previsualización de portada" />
        </div>

        <div class="form-actions">
          <button type="submit" :disabled="!isFormValid" class="submit-button">Agregar</button>
          <button type="button" @click="$emit('cancel')" class="cancel-button">Cancelar</button>
        </div>

        <p v-if="error" class="error-message">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import AuthorSelector from './AuthorSelector.vue';
import GenreSelector from './GenreSelector.vue';

export default {
  components: { AuthorSelector, GenreSelector },
  props: {
    isVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      title: '',
      author: '',
      publishedDate: '',
      genre: '',
      coverUrl: '',
      error: '',
      isFormValid: false
    };
  },
  watch: {
    isVisible(newValue) {
      if (newValue) {
        // When the modal becomes visible, refresh the author list
        this.$refs.authorSelector.refreshAuthors();
      }
    }
  },
  methods: {
    updateAuthor(authorName) {
      this.author = authorName.trim();
      this.validateForm();
    },
    updateGenre(genreName) {
      this.genre = genreName.trim();
      this.validateForm();
    },
    validateForm() {
      this.error = '';
      this.isFormValid =
        this.title.trim() !== '' &&
        this.author.trim() !== '' &&
        this.publishedDate.trim() !== '' &&
        this.genre.trim() !== '';
    },
    async submitBook() {
      if (!this.isFormValid) return;

      const authorName = this.author;
      const genreName = this.genre;

      // Verificar si el autor existe
      try {
        const res = await fetch('https://c3-d-back-nkt5.onrender.com/api/authors');
        const data = await res.json();
        const authorExists = data.some(a => a.name === authorName);

        if (!authorExists) {
          this.error = 'El autor seleccionado no es válido.';
          return;
        }
      } catch (err) {
        this.error = 'Error al verificar el autor.';
        return;
      }

      // Verificar si el género existe
      try {
        const res = await fetch('https://c3-d-back-nkt5.onrender.com/api/genres');
        const data = await res.json();
        const genreExists = data.some(g => g.name === genreName);

        if (!genreExists) {
          this.error = 'El género seleccionado no es válido.';
          return;
        }
      } catch (err) {
        this.error = 'Error al verificar el género.';
        return;
      }

      // Emitir libro válido
      const bookData = {
        title: this.title.trim(),
        author: authorName,
        publishedDate: this.publishedDate.trim(),
        genre: genreName,
        coverUrl: this.coverUrl.trim() || null
      };

      this.$emit('add-book', bookData);

      // Reset form
      this.title = '';
      this.author = '';
      this.publishedDate = '';
      this.genre = '';
      this.coverUrl = '';
      this.isFormValid = false;
    }
  }
};
</script>

<style scoped>
.add-book-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.add-book-form-wrapper {
  position: relative;
  background-color: #f5f5f5;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 24px;
  cursor: pointer;
  color: #555;
  transition: color 0.2s ease;
}

.close-button:hover {
  color: #f44336;
}

.add-book-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

.preview img {
  max-width: 100%;
  max-height: 200px;
  width: auto;
  height: auto;
  margin-top: 0.5rem;
  border-radius: 8px;
  object-fit: contain; 
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.submit-button,
.cancel-button {
  flex: 1;
  padding: 10px;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.submit-button {
  background-color: #4caf50;
  color: white;
}

.cancel-button {
  background-color: #ccc;
  color: whitesmoke;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button:hover {
  background-color: #e21515;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}

@media (max-width: 768px) {
  .add-book-container {
    padding: 10px;
  }

  .add-book-form-wrapper {
    max-width: 100%;
  }
}
</style>
