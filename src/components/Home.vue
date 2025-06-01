<template>
  <div class="home">
    <div class="hero-section">
      <h1>Bienvenido a tu Biblioteca Digital</h1>
      <p>Descubre nuevos libros y autores en nuestra colección</p>
    </div>

    <div class="carousel-section">
      <h2>Libros Destacados</h2>
      <div class="carousel-container">
        <button 
          class="carousel-control prev" 
          @click="prevSlide" 
          :disabled="currentSlide === 0"
          :class="{ 'disabled': currentSlide === 0 }"
        >
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="carousel-wrapper">
          <div 
            class="carousel-track" 
            :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
          >
            <div 
              v-for="(book, index) in displayedBooks" 
              :key="book._id" 
              class="carousel-item"
              :class="{ 'active': index === currentSlide }"
            >
              <div class="book-card">
                <div class="book-cover">
                  <img 
                    :src="book.coverUrl || getDefaultCover(book.title)" 
                    :alt="book.title"
                    @error="handleImageError"
                  />
                  <div class="book-overlay">
                    <h3>{{ book.title }}</h3>
                    <p class="author">{{ book.author }}</p>
                    <p class="genre">{{ book.genre }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button 
          class="carousel-control next" 
          @click="nextSlide" 
          :disabled="currentSlide >= maxSlides - 1"
          :class="{ 'disabled': currentSlide >= maxSlides - 1 }"
        >
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>

      <div class="carousel-indicators">
        <button 
          v-for="(_, index) in displayedBooks" 
          :key="index"
          class="indicator"
          :class="{ 'active': index === currentSlide }"
          @click="currentSlide = index"
        ></button>
      </div>
    </div>

    <div class="features-section">
      <div class="feature">
        <i class="fas fa-book"></i>
        <h3>Amplia Colección</h3>
        <p>Explora nuestra extensa biblioteca de libros</p>
      </div>
      <div class="feature">
        <i class="fas fa-search"></i>
        <h3>Búsqueda Fácil</h3>
        <p>Encuentra rápidamente lo que estás buscando</p>
      </div>
      <div class="feature">
        <i class="fas fa-user-plus"></i>
        <h3>Autores Destacados</h3>
        <p>Descubre nuevos autores y sus obras</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getBooks } from '../services/bookService';

export default {
  name: 'Home',
  data() {
    return {
      books: [],
      currentSlide: 0,
      booksPerSlide: 3,
      coverColors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEEAD', '#D4A5A5', '#9B59B6', '#3498DB', '#E67E22', '#2ECC71']
    };
  },
  computed: {
    displayedBooks() {
      // Mezclar los libros aleatoriamente
      const shuffled = [...this.books].sort(() => 0.5 - Math.random());
      // Tomar solo los primeros 9 libros para el carrusel
      return shuffled.slice(0, 9);
    },
    maxSlides() {
      return Math.ceil(this.displayedBooks.length / this.booksPerSlide);
    }
  },
  methods: {
    async loadBooks() {
      try {
        const response = await getBooks();
        this.books = response.data;
      } catch (error) {
        console.error('Error al cargar los libros:', error);
      }
    },
    nextSlide() {
      if (this.currentSlide < this.maxSlides - 1) {
        this.currentSlide++;
      }
    },
    prevSlide() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
    getBookCover(book) {
      if (book.coverUrl) return book.coverUrl;
      const title = book.title || '';
      const hash = title.split('').reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
      const colorIndex = Math.abs(hash) % this.coverColors.length;
      const backgroundColor = this.coverColors[colorIndex];
      const initials = this.getInitials(title);
      const svg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${backgroundColor}"/>
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="white" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${initials}</text>
        </svg>
      `;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
    getInitials(title) {
      if (!title) return '?';
      const words = title.trim().split(' ');
      return words.slice(0, 2).map(word => word[0]).join('').toUpperCase();
    },
    getDefaultCover(title) {
      const initials = this.getInitials(title);
      const svg = `
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f5f5f5"/>
          <text x="50%" y="50%" font-family="Arial" font-size="24" fill="#666" text-anchor="middle" dominant-baseline="middle" font-weight="bold">${initials}</text>
        </svg>
      `;
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
    },
    handleImageError() {
      // Handle image loading error
    }
  },
  mounted() {
    this.loadBooks();
  }
};
</script>

<style scoped>
.home {
  padding: 2rem;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  background: linear-gradient(135deg, #1a237e 0%, #0d47a1 100%);
  color: white;
  border-radius: 16px;
  margin-bottom: 3rem;
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.hero-section p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.carousel-section {
  padding: 2rem 0;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  margin: 2rem 0;
}

.carousel-container {
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  object-fit: contain;
}

.carousel-wrapper {
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 1rem 0;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  gap: 2rem;
}

.carousel-item {
  flex: 0 0 100%;
  opacity: 0.5;
  transform: scale(0.9);
  transition: all 0.5s ease;
}

.carousel-item.active {
  opacity: 1;
  transform: scale(1);
}

.book-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.book-card:hover {
  transform: translateY(-10px);
}

.book-cover {
  position: relative;
  width: 100%;
  aspect-ratio: 3/4;
  overflow: hidden;
}

.book-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.book-card:hover .book-cover img {
  transform: scale(1.1);
}

.book-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent);
  padding: 2rem 1.5rem 1.5rem;
  color: white;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.book-card:hover .book-overlay {
  transform: translateY(0);
}

.book-overlay h3 {
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
  font-weight: 600;
}

.book-overlay .author {
  font-size: 1.1rem;
  opacity: 0.9;
  margin-bottom: 0.25rem;
}

.book-overlay .genre {
  font-size: 0.9rem;
  opacity: 0.8;
  font-style: italic;
}

.carousel-control {
  background: white;
  border: none;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  z-index: 2;
}

.carousel-control:hover:not(.disabled) {
  background: #1a237e;
  color: white;
  transform: scale(1.1);
}

.carousel-control.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-indicators {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1.5rem;
}

.indicator {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #ddd;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background: #1a237e;
  transform: scale(1.2);
}

.features-section {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  padding: 2rem;
  background: #f5f5f5;
  border-radius: 16px;
}

.feature {
  text-align: center;
  padding: 2rem;
}

.feature i {
  font-size: 2.5rem;
  color: #1a237e;
  margin-bottom: 1rem;
}

.feature h3 {
  color: #1a237e;
  margin-bottom: 0.5rem;
}

.feature p {
  color: #666;
}

@media (max-width: 768px) {
  .carousel-container {
    padding: 0 1rem;
  }

  .carousel-control {
    width: 40px;
    height: 40px;
  }

  .book-overlay {
    transform: translateY(0);
    background: linear-gradient(to top, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.5));
    padding: 1rem;
  }

  .book-overlay h3 {
    font-size: 1.2rem;
  }

  .book-overlay .author {
    font-size: 1rem;
  }

  .book-overlay .genre {
    font-size: 0.8rem;
  }

  .features-section {
    grid-template-columns: 1fr;
  }
}
</style> 