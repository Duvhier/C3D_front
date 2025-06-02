<template>
  <div>
    <h2>Agregar Nuevo Autor</h2>
    <form @submit.prevent="handleSubmit" class="author-form">
      <div class="form-group">
        <label for="name">Nombre del Autor</label>
        <input 
          type="text" 
          id="name" 
          v-model="author.name" 
          required 
          placeholder="Ingrese el nombre del autor"
        >
      </div>

      <div class="form-group">
        <label for="coverUrl">URL de la Imagen</label>
        <input 
          type="url" 
          id="coverUrl" 
          v-model="author.coverUrl" 
          placeholder="Ingrese la URL de la imagen del autor"
        >
        <div v-if="author.coverUrl" class="cover-preview">
          <img :src="author.coverUrl" alt="Vista previa" class="preview-image">
        </div>
      </div>

      <div class="form-actions">
        <button type="submit" class="submit-button">
          <i class="fas fa-save"></i> Guardar
        </button>
        <button type="button" class="cancel-button" @click="$emit('cancel')">
          <i class="fas fa-times"></i> Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'AddAuthor',
  data() {
    return {
      author: {
        name: '',
        coverUrl: ''
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$emit('add-author', { ...this.author });
      this.author = {
        name: '',
        nationality: '',
        coverUrl: ''
      };
    }
  }
};
</script>

<style scoped>
.author-form {
  max-width: 500px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #666;
  font-weight: 600;
}

.form-group input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.cover-preview {
  margin-top: 1rem;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.preview-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
}

.submit-button,
.cancel-button {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.submit-button {
  background-color: #4CAF50;
  color: white;
}

.submit-button:hover {
  background-color: #45a049;
}

.cancel-button {
  background-color: #f44336;
  color: white;
}

.cancel-button:hover {
  background-color: #d32f2f;
}
</style>
