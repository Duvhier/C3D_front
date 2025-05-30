<template>
  <div class="search-container">
    <div class="search-box">
      <input 
        type="text" 
        v-model="query" 
        @input="search" 
        placeholder="Buscar libro..." 
        class="search-input"
      />
      <button 
        @click="clearSearch" 
        class="clear-button"
        title="Limpiar búsqueda"
      >
        ×
      </button>
    </div>
    <div class="button-container">
      <button 
        @click="showAll" 
        class="show-all-button"
        :class="{ active: !query }"
      >
        Mostrar Todos
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookSearch',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.query);
    },
    clearSearch() {
      this.query = '';
      this.search();
    },
    showAll() {
      this.query = '';
      this.search();
    }
  }
}
</script>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 20px;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 20px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-input {
  width: 100%;
  padding: 10px 35px 10px 15px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 0.95em;
  transition: all 0.3s ease;
  background-color: white;
}

.search-input:focus {
  outline: none;
  border-color: #2196F3;
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
}

.clear-button {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 1.3em;
  color: #666;
  cursor: pointer;
  padding: 0 5px;
  line-height: 1;
  transition: color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.clear-button:hover {
  color: #f44336;
  background-color: rgba(244, 67, 54, 0.1);
}

.button-container {
  display: flex;
  justify-content: center;
  margin-top: 5px;
}

.show-all-button {
  padding: 10px 15px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
  font-size: 0.95em;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}

.show-all-button:hover {
  background-color: #45a049;
  transform: translateY(-1px);
}

.show-all-button.active {
  background-color: #2196F3;
}

.show-all-button.active:hover {
  background-color: #1976D2;
}

@media (max-width: 600px) {
  .search-container {
    width: 100%;
    padding: 0 10px;
  }
}
</style>
