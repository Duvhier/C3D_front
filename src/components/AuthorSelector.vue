<template>
  <select v-model="selectedAuthor" @change="emitirCambio">
    <option disabled value="">Seleccione un autor</option>
    <option v-for="author in authors" :key="author.id" :value="author.name">
      {{ author.name }}
    </option>
  </select>
</template>

<script>
import axios from 'axios';

export default {
  name: 'AuthorSelector',
  data() {
    return {
      authors: [],         // Lista de autores obtenida de la API
      selectedAuthor: ''   // Nombre del autor seleccionado
    };
  },
  created() {
    // Obtener la lista de autores; la respuesta tiene forma { data: [...] }
    axios.get('https://c3-d-back-nkt5.onrender.com/api/authors')
      .then(response => {
        // Asignar el arreglo real de autores desde response.data.data
        this.authors = response.data;
      })
      .catch(error => {
        console.error('Error cargando autores:', error);
      });
  },
  methods: {
    emitirCambio() {
      // Emitir el evento personalizado con el nombre del autor seleccionado
      this.$emit('author-changed', this.selectedAuthor);
    }
  }
}
</script>
