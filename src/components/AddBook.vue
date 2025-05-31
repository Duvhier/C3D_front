<template>
  <div class="add-book-container">
    <div class="add-book-form-wrapper">
      <form @submit.prevent="submitBook" class="add-book-form">
        <button @click="$emit('cancel')" class="close-button" type="button">×</button>
        <h1>Agregar Libro</h1>

        <div class="form-group">
          <input v-model="title" placeholder="Título del libro" required @input="validateForm" />
        </div>

        <div class="form-group">
          <AuthorSelector @author-changed="updateAuthor" />
        </div>

        <div class="form-group">
          <input v-model="publishedDate" type="date" required @input="validateForm" />
        </div>

        <div class="form-group">
          <GenreSelector @genre-changed="updateGenre" />
        </div>

        <div class="form-group">
          <input v-model="coverUrl" placeholder="URL de la portada (opcional)" @input="validateForm" />
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
      this.isFormValid = this.title.trim() !== '' &&
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
        const AuthorRes = await fetch(`https://c3-d-back-nkt5.onrender.com/api/authors?name=${encodeURIComponent(authorName)}`);
        const authorData = await AuthorRes.json();

        if (!authorData.found) {
          const createAuthorRes = await fetch(`https://c3-d-back-nkt5.onrender.com/api/authors`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: authorName })
          });

          if (!createAuthorRes.ok) {
            this.error = 'Error al crear el autor.';
            return;
          }
        }
      } catch (err) {
        this.error = 'Error verificando o creando autor.';
        return;
      }

      // Verificar si el género existe
      try {
        const genreRes = await fetch(`https://c3-d-back-nkt5.onrender.com/api/genres?name=${encodeURIComponent(genreName)}`);
        const genreData = await genreRes.json();

        if (!genreData.found) {
          const createGenreRes = await fetch(`https://c3-d-back-nkt5.onrender.com/api/genres`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: genreName })
          });

          if (!createGenreRes.ok) {
            this.error = 'Error al crear el género.';
            return;
          }
        }
      } catch (err) {
        this.error = 'Error verificando o creando género.';
        return;
      }

      // Enviar datos del libro
      const bookData = {
        title: this.title.trim(),
        author: authorName,
        publishedDate: this.publishedDate.trim(),
        genre: genreName,
        coverUrl: this.coverUrl.trim() || null
      };

      this.$emit('add-book', bookData);

      // Limpiar el formulario
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
  border: 1px solid #ccc;
  border-radius: 4px;
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
  background-color: #4CAF50;
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
</style>