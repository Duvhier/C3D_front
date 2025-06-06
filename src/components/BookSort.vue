<template>
  <div class="book-sort">
    <div class="sort-container">
      <label for="sort-select">Ordenar por:</label>
      <select 
        id="sort-select" 
        v-model="selectedSort" 
        @change="handleSortChange"
        class="sort-select"
      >
        <option value="title">Título</option>
        <option value="author">Autor</option>
        <option value="publishedDate">Año de publicación</option>
        <option value="genre">Género</option>
      </select>
      <button 
        @click="toggleOrder" 
        class="order-button"
        :title="isAscending ? 'Orden ascendente' : 'Orden descendente'"
      >
        <i class="fas" :class="isAscending ? 'fa-sort-up' : 'fa-sort-down'"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookSort',
  data() {
    return {
      selectedSort: 'title',
      isAscending: true
    };
  },
  methods: {
    handleSortChange() {
      this.$emit('sort', {
        field: this.selectedSort,
        ascending: this.isAscending
      });
    },
    toggleOrder() {
      this.isAscending = !this.isAscending;
      this.handleSortChange();
    }
  }
};
</script>

<style scoped>
.book-sort {
  margin: 1rem 0;
  padding: 0 1rem;
}

.sort-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  background: white;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

label {
  font-weight: 600;
  color: #1a237e;
}

.sort-select {
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-width: 150px;
  background-color: white;
  cursor: pointer;
}

.sort-select:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 2px rgba(33, 150, 243, 0.1);
}

.order-button {
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #1a237e;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.order-button:hover {
  background-color: rgba(26, 35, 126, 0.1);
}

@media (max-width: 768px) {
  .sort-container {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-select {
    width: 100%;
  }
}
</style> 