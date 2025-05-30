<template>
  <div class="genre-list">
    <h2>Lista de Gêneros</h2>
    <ul>
      <li v-for="genre in genres" :key="genre.id">
        {{ genre.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getGenres } from '../services/genreService.js';

export default {
  data() {
    return {
      genres: []
    };
  },
  mounted() {
    this.fetchGenres();
  },
  methods: {
    async fetchGenres() {
      try {
        const response = await getGenres();
        this.genres = response.data;
      } catch (error) {
        console.error('Error fetching genres:', error);
      }
    }
  }
};
</script>

<style>
.genre-list {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.genre-list h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.genre-list ul {
  list-style-type: none;
  padding: 0;
}

.genre-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.genre-list li:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>

