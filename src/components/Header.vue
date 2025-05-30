<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-container">
        <img src="../assets/logo.png" alt="Logo C3D" class="logo" />
        <h1 class="library-name">Biblioteca Digital C3D</h1>
      </div>
      <div class="search-container">
        <div class="search-box">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="handleSearch" 
            placeholder="Buscar libros..." 
            class="search-input"
          />
          <button 
            v-if="searchQuery" 
            @click="clearSearch" 
            class="clear-button"
            title="Limpiar búsqueda"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery);
    },
    clearSearch() {
      this.searchQuery = '';
      this.handleSearch();
    }
  }
}
</script>

<style scoped>
.header {
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.logo {
  width: 50px;
  height: 50px;
  object-fit: contain;
}

.library-name {
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
  margin: 0;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
}

.search-container {
  flex: 1;
  max-width: 500px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
  font-size: 1.1rem;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 40px;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
}

.clear-button {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.2s ease;
}

.clear-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
  color: #333;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .search-container {
    width: 100%;
    max-width: none;
  }

  .library-name {
    font-size: 1.2rem;
  }

  .logo {
    width: 40px;
    height: 40px;
  }
}
</style> 