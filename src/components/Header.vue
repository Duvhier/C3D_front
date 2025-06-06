<template>
  <header class="header">
    <div class="header-content">
      <div class="logo-section">
        <router-link to="/" class="logo-container">
          <img src="../assets/logo.png" alt="Logo C3D" class="logo" />
          <h1 class="library-name">Biblioteca Digital C3D</h1>
        </router-link>
      </div>
      
      <div class="search-section">
        <div class="search-container">
          <i class="fas fa-search search-icon"></i>
          <input 
            type="text" 
            v-model="searchQuery" 
            @input="handleSearch" 
            placeholder="Buscar libros, autores o géneros..."
            class="search-input"
          >
        </div>
      </div>

      <div class="nav-section">
        <router-link to="/" class="nav-button home-button">
          <i class="fas fa-home"></i>
          <span>Inicio</span>
        </router-link>
        <router-link to="/books" class="nav-button">
          <i class="fas fa-book"></i>
          <span>Ver Libros</span>
        </router-link>
        <router-link to="/authors" class="nav-button">
          <i class="fas fa-users"></i>
          <span>Ver Autores</span>
        </router-link>
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
    };
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.searchQuery.trim());
    }
  },
  watch: {
    searchQuery(newValue) {
      this.handleSearch();
    }
  }
};
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
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

.logo-section {
  display: flex;
  align-items: center;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
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

.search-section {
  flex: 1;
  max-width: 600px;
}

.search-container {
  position: relative;
  width: 100%;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #666;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 2.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  transition: box-shadow 0.3s ease;
}

.search-input:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.2);
}

.nav-section {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-button {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #ff4081;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.nav-button:hover {
  background-color: #f50057;
}

.nav-button i {
  font-size: 1.2rem;
}

.home-button {
  background-color: #4CAF50;
}

.home-button:hover {
  background-color: #45a049;
}

@media (max-width: 768px) {
  .header {
    padding: 1rem;
  }

  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .search-section {
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

  .nav-button span {
    display: none;
  }

  .nav-button {
    padding: 0.75rem;
  }

  .nav-section {
    width: 100%;
    justify-content: center;
  }
}
</style>