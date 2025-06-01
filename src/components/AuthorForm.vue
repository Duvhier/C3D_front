<template>
    <div class="author-form">
      <h3>Agregar nuevo autor</h3>
      <form @submit.prevent="handleSubmit">
        <input
          v-model="newAuthor"
          type="text"
          placeholder="Nombre del autor"
          required
        />
        <button type="submit">Guardar autor</button>
      </form>
      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Autor agregado correctamente ✅</p>
    </div>
  </template>
  
  <script>
  import { addAuthor } from '@/services/authorService';
  
  export default {
    name: 'AuthorForm',
    data() {
      return {
        newAuthor: '',
        error: '',
        success: false,
      };
    },
    methods: {
      async handleSubmit() {
        this.error = '';
        this.success = false;
  
        if (!this.newAuthor.trim()) {
          this.error = 'El nombre del autor no puede estar vacío';
          return;
        }
  
        try {
          await addAuthor({ name: this.newAuthor.trim() });
          this.success = true;
          this.newAuthor = '';
          this.$emit('author-added'); // Emite evento para que otros componentes actualicen la lista
        } catch (err) {
          this.error =
            err.response?.data?.message || 'Ocurrió un error al agregar el autor.';
          console.error(err);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .author-form {
    margin: 1em 0;
  }
  
  input {
    padding: 0.5em;
    margin-right: 0.5em;
  }
  
  button {
    padding: 0.5em 1em;
  }
  
  .error {
    color: red;
    margin-top: 0.5em;
  }
  
  .success {
    color: green;
    margin-top: 0.5em;
  }
  </style>
  