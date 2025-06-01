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
          </div>
        </div>

        <div class="footer-section">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><router-link to="/">Inicio</router-link></li>
            <li><router-link to="/books">Libros</router-link></li>
            <li><router-link to="/authors">Autores</router-link></li>
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
    background-color: #1e1e2f;
    color: #fff;
    padding: 40px 20px 20px;
    font-family: 'Montserrat', sans-serif;
    margin-top: 50px;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .footer-section {
    flex: 1 1 300px;
  }
  
  .footer-section h3 {
    margin-bottom: 20px;
    color: #f4d03f;
    font-size: 1.2rem;
    font-weight: 600;
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
    padding: 10px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease, background-color 0.3s ease;
  }
  
  .tech-item:hover {
    transform: translateY(-3px);
    background: rgba(255, 255, 255, 0.15);
  }
  
  .tech-item i {
    font-size: 2rem;
    color: #f4d03f;
  }
  
  .tech-item span {
    font-size: 0.9rem;
    color: #ddd;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section ul li {
    margin-bottom: 10px;
  }
  
  .footer-section ul li a {
    color: #ddd;
    text-decoration: none;
    transition: color 0.3s;
    display: inline-block;
    padding: 5px 0;
  }
  
  .footer-section ul li a:hover {
    color: #f4d03f;
  }
  
  .footer-section p {
    color: #ddd;
    line-height: 1.6;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    margin-top: 30px;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    color: #aaa;
    font-size: 0.9rem;
  }
  
  /* Colores específicos para cada tecnología */
  .tech-item:nth-child(1) i { color: #41b883; } /* Vue.js */
  .tech-item:nth-child(2) i { color: #68a063; } /* Node.js */
  .tech-item:nth-child(3) i { color: #000000; } /* Express */
  .tech-item:nth-child(4) i { color: #f29111; } /* TypeORM */
  .tech-item:nth-child(5) i { color: #e34f26; } /* HTML5 */
  .tech-item:nth-child(6) i { color: #f7df1e; } /* JavaScript */
  .tech-item:nth-child(7) i { color: #1572b6; } /* CSS3 */
  .tech-item:nth-child(8) i { color: #333333; } /* GitHub */
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      gap: 20px;
    }
  
    .footer-section {
      flex: 1 1 100%;
    }
  
    .tech-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  </style>
  