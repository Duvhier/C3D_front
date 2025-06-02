<template>
    <div>
      <label for="author">Autor</label>
      <select v-model="selected" @change="handleChange">
        <option disabled value="">Selecciona un autor</option>
        <option v-for="a in authors" :key="a._id" :value="a.name">{{ a.name }}</option>
      </select>  
    </div>
  </template>
  
  <script>
  export default {
    name: 'AuthorSelector',
    data() {
      return {
        authors: [],
        selected: '',
      };
    },
    emits: ['author-changed'],
    mounted() {
      this.fetchAuthors();
    },
    methods: {
      async fetchAuthors() {
        try {
          const res = await fetch('https://c3-d-back-nkt5.onrender.com/api/authors'); 
          const data = await res.json();
          this.authors = data;
        } catch (err) {
          console.error('Error cargando autores:', err);
        }
      },
      handleChange() {
        this.$emit('author-changed', this.selected);
      },
      async refreshAuthors() {
        await this.fetchAuthors();
        this.selected = ''; // Reset selected author when refreshing
      }
    }
  };
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 10px;
  }
  </style>
  
