<template>
  <div class="author-list">
    <h2>Lista de Autores</h2>
    <ul>
      <li v-for="author in authors" :key="author.id">
        {{ author.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { getAuthors } from '../services/authorService.js';

export default {
  data() {
    return {
      authors: []
    };
  },
  mounted() {
    this.fetchAuthors();
  },
  methods: {
    async fetchAuthors() {
      try {
        const response = await getAuthors();
        this.authors = response.data;
      } catch (error) {
        console.error('Error fetching authors:', error);
      }
    }
  }
};
</script>

<style>
.author-list {
  margin-top: 20px;
  padding: 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.author-list h2 {
  font-size: 24px;
  margin-bottom: 15px;
  color: #333;
}

.author-list ul {
  list-style-type: none;
  padding: 0;
}

.author-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.author-list li:hover {
  background-color: #f0f0f0;
  cursor: pointer;
}
</style>

