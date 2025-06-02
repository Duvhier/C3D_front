<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-section">
        <h3>Biblioteca Digital C3D</h3>
        <p>Tu biblioteca digital de confianza</p>
      </div>

      <div class="footer-section">
        <h3>Tecnologías Utilizadas</h3>
        <div class="tech-grid">
          <div class="tech-item">
            <i class="fa-brands fa-vuejs" style="color: #41b883;"></i>
            <span>Vue.js</span>
          </div>
          <div class="tech-item">
            <i class="fa-brands fa-node-js" style="color: #68a063;"></i>
            <span>Node.js</span>
          </div>
          <div class="tech-item">
            <i class="fa-brands fa-js" style="color: #f29111;"></i>
            <span>Express</span>
          </div>
          <div class="tech-item">
            <i class="fa-solid fa-database" style="color: #f29111;"></i>
            <span>TypeORM</span>
          </div>
          <div class="tech-item">
            <i class="fa-brands fa-github" style="color: #333333;"></i>
            <span>GitHub</span>
          </div>
          <div class="tech-item">
            <i class="fa-brands fa-youtube" style="color: #ff0000;"></i>
            <span>YouTube</span>
          </div>
        </div>
      </div>

      <div class="footer-section">
        <h3>Enlaces Rápidos</h3>
        <ul>
          <li><i class="fa-solid fa-house"></i><router-link to="/">Inicio</router-link></li>
          <li><i class="fa-solid fa-book"></i><router-link to="/books">Libros</router-link></li>
          <li><i class="fa-solid fa-user"></i><router-link to="/authors">Autores</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 Biblioteca Digital C3D. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer",
  data() {
    return {
      email: "",
      mensaje: ""
    };
  },
  methods: {
    enviarMensaje() {
      // Aquí puedes enviar los datos a un backend o simplemente hacer algo local
      console.log("Correo:", this.email);
      console.log("Mensaje:", this.mensaje);
      alert("¡Mensaje enviado! Gracias por contactarnos.");
      this.email = "";
      this.mensaje = "";
    }
  }
};
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #1e1e2f, #2c2c4a);
  color: #fff;
  padding: 50px 20px 30px;
  font-family: 'Montserrat', sans-serif;
  margin-top: 50px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 30px;
}

.footer-section {
  flex: 1 1 300px;
}

.footer-section h3 {
  margin-bottom: 20px;
  color: #f4d03f;
  font-size: 1.3rem;
  font-weight: 700;
  border-left: 4px solid #f4d03f;
  padding-left: 10px;
}

.footer-section p {
  color: #ccc;
  line-height: 1.6;
  font-size: 0.95rem;
}

.tech-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 15px;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
}

.tech-item:hover {
  transform: scale(1.05);
  background: rgba(255, 255, 255, 0.15);
}

.tech-item i {
  font-size: 2rem;
}

.tech-item span {
  font-size: 0.85rem;
  color: #eee;
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.footer-section ul li a {
  color: #ddd;
  text-decoration: none;
  transition: all 0.3s;
  font-size: 0.95rem;
}

.footer-section ul li i {
  font-size: 1.2rem;
  color: #f4d03f;
  min-width: 20px;
}

.footer-section ul li a:hover {
  color: #f4d03f;
  transform: translateX(5px);
}

.footer-bottom {
  text-align: center;
  padding-top: 20px;
  margin-top: 30px;
  color: #bbb;
  font-size: 0.9rem;
}

/* Íconos individuales (ajustados a tu orden real) */
.tech-item:nth-child(1) i {
  color: #41b883;
}

.tech-item:nth-child(2) i {
  color: #68a063;
}

.tech-item:nth-child(3) i {
  color: #f29111;
}

.tech-item:nth-child(4) i {
  color: #f29111;
}

.tech-item:nth-child(5) i {
  color: #333333;
}

.tech-item:nth-child(6) i {
  color: #ff0000;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 25px;
    text-align: center;
  }

  .tech-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-section h3 {
    text-align: center;
    padding-left: 0;
    border-left: none;
  }
}
</style>
