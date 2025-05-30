<template>
  <div class="edit-book-modal">
    <div class="modal-content">
      <h2>Editar Libro</h2>
      <form @submit.prevent="update" class="edit-book-form">
        <div class="form-group">
          <label for="title">Título</label>
          <input 
            id="title"
            v-model="bookCopy.title" 
            placeholder="Título del libro" 
            required 
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <label for="author">Autor</label>
          <input 
            id="author"
            v-model="bookCopy.author" 
            placeholder="Autor del libro" 
            required 
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <label for="publishedDate">Fecha de publicación</label>
          <input 
            id="publishedDate"
            v-model="bookCopy.publishedDate" 
            type="date"
            required 
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <label for="genre">Género</label>
          <input 
            id="genre"
            v-model="bookCopy.genre" 
            placeholder="Género del libro" 
            required 
            @input="validateForm"
          />
        </div>

        <div class="form-group">
          <label for="cover">Carátula</label>
          <input 
            id="cover" 
            type="file" 
            accept="image/*"
            @change="handleCoverChange"
          />
          <div v-if="bookCopy.coverPreview" class="cover-preview">
            <img :src="bookCopy.coverPreview" alt="Vista previa de la carátula" />
          </div>
        </div>

        <div v-if="error" class="error-message">{{ error }}</div>

        <div class="button-group">
          <button 
            type="submit" 
            :disabled="!isFormValid"
            class="update-button"
          >
            Actualizar
          </button>
          <button 
            type="button" 
            @click="$emit('cancel')" 
            class="cancel-button"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditBook',
  props: {
    book: {
      type: Object,
      required: true,
      validator: (book) => {
        return book && (book._id || book.id) && book.title && book.author;
      }
    }
  },
  data() {
    return {
      bookCopy: {
        ...this.book,
        coverPreview: this.book.cover || ''
      },
      newCoverFile: null,
      error: '',
      isFormValid: true
    };
  },
  methods: {
    getBookId(book) {
      return book._id || book.id;
    },
    validateForm() {
      this.error = '';
      this.isFormValid = 
        this.bookCopy.title?.trim() !== '' && 
        this.bookCopy.author?.trim() !== '' && 
        this.bookCopy.publishedDate?.trim() !== '' && 
        this.bookCopy.genre?.trim() !== '';
    },
    handleCoverChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.newCoverFile = file;
        const reader = new FileReader();
        reader.onload = (e) => {
          this.bookCopy.coverPreview = e.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    update() {
      if (!this.isFormValid) {
        this.error = 'Por favor, complete todos los campos correctamente';
        return;
      }

      const updatedBook = {
        ...this.bookCopy,
        _id: this.getBookId(this.book),
        cover: this.bookCopy.coverPreview
      };

      this.$emit('update-book', updatedBook);
    }
  },
  watch: {
    book: {
      handler(newBook) {
        this.bookCopy = {
          ...newBook,
          coverPreview: newBook.cover || ''
        };
        this.validateForm();
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.edit-book-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  font-family: 'Montserrat', sans-serif;
}

.modal-content {
  background: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 90%;
  max-width: 500px;
  font-family: 'Montserrat', sans-serif;
}

h2 {
  margin: 0 0 20px 0;
  color: #333;
  text-align: center;
}

.edit-book-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

label {
  font-weight: 500;
  color: #555;
}

input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.cover-preview img {
  max-width: 100%;
  max-height: 150px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.update-button {
  background-color: #2196F3;
  color: white;
}

.update-button:hover:not(:disabled) {
  background-color: #1976D2;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #D32F2F;
}

.error-message {
  color: #f44336;
  text-align: center;
  margin-top: 10px;
  font-size: 0.9em;
}

</style>
