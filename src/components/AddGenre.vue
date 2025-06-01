<template>
    <div class="add-genre-container">
      <div class="add-genre-form-wrapper">
        <form @submit.prevent="submitGenre" class="add-genre-form">
          <button @click="$emit('cancel')" class="close-button" type="button">×</button>
          <h1>Agregar Género</h1>
  
          <div class="form-group">
            <input
              v-model.trim="genreName"
              type="text"
              placeholder="Ej: Ciencia Ficción"
              :class="{ 'input-error': error }"
              required
            />
            <p v-if="error" class="error-msg">{{ error }}</p>
          </div>
  
          <div class="form-actions">
            <button type="submit" class="submit-button">Guardar</button>
            <button type="button" @click="cancel" class="cancel-button">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AddGenre',
    data() {
      return {
        genreName: '',
        error: ''
      };
    },
    methods: {
      submitGenre() {
        this.error = '';
  
        if (!this.genreName.trim()) {
          this.error = 'El nombre del género no puede estar vacío.';
          return;
        }
  
        const genre = {
          name: this.genreName.trim()
        };
  
        this.$emit('add-genre', genre);
        this.genreName = '';
      },
      cancel() {
        this.genreName = '';
        this.error = '';
        this.$emit('cancel');
      }
    }
  };
  </script>
  
  <style scoped>
  .add-genre-container {
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
  
  .add-genre-form-wrapper {
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
  
  h1 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .add-genre-form {
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
    border: 1px solid #ccc;
    border-radius: 6px;
    font-size: 14px;
    outline: none;
  }
  
  .input-error {
    border-color: red;
  }
  
  .error-msg {
    color: red;
    font-size: 13px;
    margin-top: 5px;
  }
  
  .form-actions {
    display: flex;
    gap: 10px;
  }
  
  .submit-button,
  .cancel-button {
    flex: 1;
    padding: 10px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .submit-button {
    background-color: #4caf50;
    color: white;
  }
  
  .cancel-button {
    background-color: #f44336;
    color: white;
  }
  
  .submit-button:hover {
    background-color: #45a049;
  }
  
  .cancel-button:hover {
    background-color: #d32f2f;
  }
  </style>
  