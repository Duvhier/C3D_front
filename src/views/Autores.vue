<template>
    <div class="autores-container">
      <h2>Autores</h2>
      <div class="autores-grid">
        <div v-for="autor in autores" :key="autor._id" class="autor-card">
          <img :src="autor.coverUrl" alt="Foto del autor" class="autor-cover" />
          <h3>{{ autor.name }}</h3>
          <p>Nacionalidad: {{ autor.nationality }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "Autores",
    data() {
      return {
        autores: [],
      };
    },
    mounted() {
      fetch("http://localhost:3000/api/authors")
        .then((res) => res.json())
        .then((data) => {
          this.autores = data;
        })
        .catch((err) => console.error("Error al cargar autores:", err));
    },
  };
  </script>
  
  <style scoped>
  .autores-container {
    max-width: 1200px;
    margin: 2rem auto;
    padding: 1rem;
    text-align: center;
  }
  
  .autores-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 1.5rem;
  }
  
  .autor-card {
    background-color: #f5f5f5;
    padding: 1rem;
    border-radius: 12px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .autor-cover {
    width: 100%;
    height: 180px;
    object-fit: cover;
    border-radius: 8px;
  }
  </style>
  