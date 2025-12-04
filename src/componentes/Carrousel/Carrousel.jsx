import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const Carrousel = () => {
  return (
    <div
      id="demo"
      className="carousel slide"
      data-bs-ride="carousel"
      style={{ marginTop: "25px" }}
    >
      {/* Indicadores */}
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="0"
          className="active"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="1"
        ></button>
        <button
          type="button"
          data-bs-target="#demo"
          data-bs-slide-to="2"
        ></button>
      </div>

      {/* Contenido */}
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="img/cucuruchos-1024x682.webp"
            alt="Helados"
            className="d-block w-100"
          />
        </div>
        <div className="carousel-item">
          <img
            src="img/helados-en-republica-dominicana.jpg"
            alt="Helados RD"
            className="d-block w-100"
          />
        </div>
        <div className="carousel-item">
          <img
            src="img/ice-cream-6248119_1280_1280x.webp"
            alt="New York"
            className="d-block w-100"
          />
        </div>
      </div>

      {/* Controles */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#demo"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  );
};

export default Carrousel;