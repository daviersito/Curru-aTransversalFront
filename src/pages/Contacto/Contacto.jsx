
import { Navbar } from "../../componentes/Navbar/Navbar";

import { Footer } from "../../componentes/Footer/Footer";
import "./Contacto.css";



export function Contacto() {
  return (
    <>
      <div className="container">
        <Navbar />

        {/* Sección de bienvenida */}
        <section className="contacto-bienvenida">
          <h1>¡Bienvenidos a La Curruña! 🍦</h1>
          <p>
            Nos alegra mucho tenerte por aquí .  
            Si tienes dudas, sugerencias o simplemente quieres saludarnos,
            puedes escribirnos por nuestras redes sociales o enviarnos un correo.  
            ¡Estaremos felices de atenderte!
          </p>
        </section>

        {/* Íconos de redes sociales */}
        <div className="social-icons">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-facebook"></i>
          </a>

          <a
            href="https://www.instagram.com/la_curruna/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="bi bi-instagram"></i>
          </a>

          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="bi bi-twitter"></i>
          </a>
        </div>

        {/* Correo de contacto */}
        <div className="contacto-email">
          <p>
            📧 Escríbenos a:&nbsp;
            <a href="mailto:contacto@lacurruna.cl">contacto@lacurruna.cl</a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
}