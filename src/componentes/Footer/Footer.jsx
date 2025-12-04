import "./Footer.css";

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© 2025 curruña. Todos los derechos reservados.</p>
        <div className="social-icons">
          <a href="#"><i className="bi bi-facebook"></i></a>
          <a href="https://www.instagram.com/la_curruna/"><i className="bi bi-instagram"></i></a>
          <a href="#"><i className="bi bi-twitter"></i></a>
        </div>
      </div>
    </footer>
  );
}