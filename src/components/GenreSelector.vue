<template>
    <div>
      <label for="genre">Género</label>
      <select v-model="selected" @change="handleChange">
        <option disabled value="">Selecciona un género</option>
        <option v-for="g in genres" :key="g._id" :value="g.name">{{ g.name }}</option>
        <option value="nuevo">Agregar nuevo género</option>
      </select>
  
      <div v-if="selected === 'nuevo'" class="form-group">
        <input 
          v-model="newGenre" 
          placeholder="Nombre del nuevo género" 
          @input="emitGenre"
          required
        />
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'GenreSelector',
    data() {
      return {
        genres: [],
        selected: '',
        newGenre: ''
      };
    },
    emits: ['genre-changed'],
    mounted() {
      this.fetchGenres();
    },
    methods: {
      async fetchGenres() {
        try {
          const res = await fetch('https://c3-d-back.vercel.app/api/genres');
          const data = await res.json();
          this.genres = data;
        } catch (err) {
          console.error('Error cargando géneros:', err);
        }
      },
      handleChange() {
        if (this.selected !== 'nuevo') {
          this.$emit('genre-changed', this.selected);
        } else {
          this.$emit('genre-changed', this.newGenre); // por si ya hay texto
        }
      },
      emitGenre() {
        if (this.selected === 'nuevo') {
          this.$emit('genre-changed', this.newGenre.trim());
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
  
