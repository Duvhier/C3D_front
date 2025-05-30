<template>
    <div>
      <label for="author">Autor</label>
      <select v-model="selected" @change="handleChange">
        <option disabled value="">Selecciona un autor</option>
        <option v-for="a in authors" :key="a._id" :value="a.name">{{ a.name }}</option>
        <option value="nuevo">Agregar nuevo autor</option>
      </select>
  
      <div v-if="selected === 'nuevo'" class="form-group">
        <input 
          v-model="newAuthor" 
          placeholder="Nombre del nuevo autor" 
          @input="emitAuthor"
          required
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthorSelector',
    data() {
      return {
        authors: [],
        selected: '',
        newAuthor: ''
      };
    },
    emits: ['author-changed'],
    mounted() {
      this.fetchAuthors();
    },
    methods: {
      async fetchAuthors() {
        try {
          const res = await fetch('http://localhost:3000/api/authors');
          const data = await res.json();
          this.authors = data;
        } catch (err) {
          console.error('Error cargando autores:', err);
        }
      },
      handleChange() {
        if (this.selected !== 'nuevo') {
          this.$emit('author-changed', this.selected);
        } else {
          this.$emit('author-changed', this.newAuthor); // por si ya había texto antes
        }
      },
      emitAuthor() {
        if (this.selected === 'nuevo') {
          this.$emit('author-changed', this.newAuthor.trim());
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  </style>
  
