<template>
  <div class="home">
    <div class="hero-section">
      <h1>Bienvenido a tu Biblioteca Digital</h1>
      <p>Descubre nuevos libros y autores en nuestra colección</p>
    </div>

    <div class="carousel-section">
      <h2>Libros Destacados</h2>
      <div class="carousel-container">
        <button class="carousel-button prev" @click="prevSlide" :disabled="currentSlide === 0">
          <i class="fas fa-chevron-left"></i>
        </button>
        
        <div class="carousel">
          <div class="carousel-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div v-for="(book, index) in displayedBooks" :key="book._id" class="carousel-slide">
              <div class="book-card">
                <div class="book-cover" :style="{ backgroundImage: `url(${getBookCover(book)})` }">
                  <div class="book-overlay">
                    <h3>{{ book.title }}</h3>
                    <p>{{ book.author }}</p>
                    <p class="genre">{{ book.genre }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button class="carousel-button next" @click="nextSlide" :disabled="currentSlide >= maxSlides - 1">
          <i class="fas fa-chevron-right"></i>
        </button>
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
  margin-bottom: 4rem;
}

.carousel-section h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #1a237e;
}

.carousel-container {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.carousel {
  overflow: hidden;
  position: relative;
}

.carousel-track {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.carousel-slide {
  flex: 0 0 calc(100% / 3);
  padding: 0 1rem;
}

.book-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.book-card:hover {
  transform: translateY(-5px);
}

.book-cover {
  height: 300px;
  background-size: cover;
  background-position: center;
  position: relative;
}

.book-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
}

.book-overlay h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.book-overlay p {
  margin: 0.25rem 0;
  opacity: 0.9;
}

.book-overlay .genre {
  font-size: 0.9rem;
  opacity: 0.8;
}

.carousel-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.3s ease;
}

.carousel-button:hover {
  background: #1a237e;
  color: white;
}

.carousel-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.carousel-button.prev {
  left: 0;
}

.carousel-button.next {
  right: 0;
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
  .carousel-slide {
    flex: 0 0 100%;
  }

  .hero-section {
    padding: 2rem 1rem;
  }

  .hero-section h1 {
    font-size: 2rem;
  }

  .features-section {
    grid-template-columns: 1fr;
  }
}
</style> 