import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  const rol = localStorage.getItem("rol"); // "admin" | "cliente" | null

  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="d-flex align-items-center justify-content-between px-4 w-100">
        
        {/* Logo + texto */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src="/img/logo.png"
            alt="La Curruña"
            width="40"
            height="40"
            className="me-2"
          />
          <span>
            La <span className="brand-highlight">Curruña</span>
          </span>
        </Link>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#menuNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Menú */}
        <div className="collapse navbar-collapse" id="menuNav">
          <ul className="navbar-nav ms-auto">

            {/* Siempre visibles */}
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/contacto">Contacto</Link>
            </li>

            {/* =====================================
                OPCIONES SOLO ADMIN
            ====================================== */}
            {rol === "admin" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/inventario">Inventario</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/usuariospage">Usuarios</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link" to="/dashboardpage">Dashboard</Link>
                </li>

                {/* 🔹 Admin → ver TODAS las boletas */}
                <li className="nav-item">
                  <Link className="nav-link" to="/boletas">Boletas</Link>
                </li>
              </>
            )}

            {/* =====================================
                OPCIONES SOLO CLIENTE
            ====================================== */}
            {rol === "cliente" && (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/carrito">Carrito</Link>
                </li>

                {/* 🔹 Cliente → ver SUS boletas */}
                <li className="nav-item">
                  <Link className="nav-link" to="/mis-boletas">Mis Boletas</Link>
                </li>
              </>
            )}

            {/* =====================================
                LOGIN / LOGOUT
            ====================================== */}
            {!rol ? (
              <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
              </li>
            ) : (
              <li className="nav-item">
                <button
                  className="nav-link btn btn-link text-danger"
                  onClick={() => {
                    localStorage.clear();
                    window.location.href = "/";
                  }}
                >
                  Cerrar sesión
                </button>
              </li>
            )}

          </ul>
        </div>
      </div>
    </nav>
  );
}