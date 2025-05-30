<template>
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-section about">
          <h3>📚 Biblioteca Digital C3D</h3>
          <p>Accede a miles de libros desde cualquier lugar. Una experiencia educativa para todos.</p>
        </div>
    
        <div class="footer-section contact">
          <h4>Contáctanos</h4>
          <form @submit.prevent="enviarMensaje">
            <input type="email" v-model="email" placeholder="Tu correo" required />
            <textarea v-model="mensaje" placeholder="Tu mensaje" required></textarea>
            <button type="submit">Enviar</button>
          </form>
          <div class="socials">
            <a href="#"><i class="fab fa-facebook-f"></i></a>
            <a href="#"><i class="fab fa-twitter"></i></a>
            <a href="#"><i class="fab fa-instagram"></i></a>
            <a href="#"><i class="fab fa-youtube"></i></a>
          </div>
        </div>
      </div>
  
      <div class="footer-bottom">
        &copy; 2025 Biblioteca C3D | Todos los derechos reservados
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
    background-color: #212529;
    color: #fff;
    padding: 40px 20px;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .footer-content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 30px;
  }
  
  .footer-section {
    flex: 1 1 300px;
    margin-bottom: 20px;
  }
  
  .footer-section h3,
  .footer-section h4 {
    color: #f8d24e;
    margin-bottom: 10px;
  }
  
  .footer-section p,
  .footer-section li,
  .footer-section a {
    font-size: 14px;
    color: #ddd;
  }
  
  .footer-section a {
    text-decoration: none;
    transition: color 0.3s;
  }
  
  .footer-section a:hover {
    color: #f8d24e;
  }
  
  .footer-section ul {
    list-style: none;
    padding: 0;
  }
  
  .footer-section form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .footer-section input,
  .footer-section textarea {
    padding: 8px;
    border: none;
    border-radius: 5px;
    resize: none;
  }
  
  .footer-section button {
    padding: 8px;
    background-color: #f8d24e;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .footer-section button:hover {
    background-color: #e5be32;
  }
  
  .socials {
    margin-top: 10px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .socials a {
    margin-right: 10px;
    font-size: 18px;
    color: #fff;
    transition: color 0.3s;
    text-decoration: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;    
  }
  
  .socials a:hover {
    color: #f8d24e;
  }
  
  .footer-bottom {
    text-align: center;
    padding-top: 20px;
    border-top: 1px solid #444;
    color: #bbb;
    font-size: 13px;
  }
  
  @media (max-width: 768px) {
    .footer-content {
      flex-direction: column;
      text-align: center;
    }
  
    .socials {
      justify-content: center;
    }
  }
  </style>
  