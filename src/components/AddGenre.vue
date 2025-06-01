<template>
    <div class="form-container">
      <h3>Agregar Nuevo Género</h3>
      <form @submit.prevent="submitGenre">
        <div class="form-group">
          <label for="genreName">Nombre del género</label>
          <input
            id="genreName"
            v-model.trim="genreName"
            type="text"
            placeholder="Ej: Ciencia Ficción"
            :class="{ 'input-error': error }"
            required
          />
          <p v-if="error" class="error-msg">{{ error }}</p>
        </div>
  
        <div class="form-actions">
          <button type="submit">Guardar</button>
          <button type="button" @click="cancel">Cancelar</button>
        </div>
      </form>
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
  .form-container {
    max-width: 400px;
    margin: 0 auto;
    background: #fafafa;
    padding: 20px;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  }
  
  h3 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 15px;
    display: flex;
    flex-direction: column;
  }
  
  label {
    font-weight: bold;
    margin-bottom: 5px;
    color: #444;
  }
  
  input {
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
    justify-content: space-between;
    gap: 10px;
  }
  
  button {
    flex: 1;
    padding: 10px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-weight: bold;
  }
  
  button[type="submit"] {
    background-color: #4caf50;
    color: white;
  }
  
  button[type="button"] {
    background-color: #f44336;
    color: white;
  }
  </style>
  