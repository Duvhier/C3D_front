<!-- src/components/AddAuthor.vue -->
<template>
    <div class="modal">
      <div class="modal-content">
        <h3>Agregar Nuevo Autor</h3>
        <form @submit.prevent="submitAuthor">
          <input v-model="authorName" type="text" placeholder="Nombre del autor" required />
          <div class="actions">
            <button type="submit">Guardar</button>
            <button @click="$emit('cancel')">Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        authorName: ''
      };
    },
    methods: {
      submitAuthor() {
        this.$emit('add-author', { name: this.authorName });
        this.authorName = '';
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
  }
  .modal-content {
    background: white;
    padding: 2rem;
    max-width: 400px;
    margin: 10% auto;
    border-radius: 8px;
  }
  .actions {
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
  }
  </style>
  