import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Registro() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState({ nombre: "", email: "", contra: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.email || !usuario.contra) {
      setError("Todos los campos son obligatorios");
      return;
    }

    try {
      const nuevoUsuario = {
        ...usuario,
        estado: true,
        fecha_creacion: new Date().getFullYear(),
        rol: { id: 2 }, // rol USER por defecto
      };

      const response = await fetch("http://localhost:8081/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
        credentials: "include", // para recibir cookies si backend crea sesión
      });

      if (!response.ok) throw new Error("Error al registrarse");

      alert("✅ Registro exitoso");
      navigate("/login");
    } catch (err) {
      console.error("❌ Error al registrarse:", err);
      setError("No se pudo registrar el usuario");
    }
  };

  return (
    <div className="container mt-5 col-md-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Registro de Usuario</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={usuario.nombre}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={usuario.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="contra"
              className="form-control"
              value={usuario.contra}
              onChange={handleChange}
            />
          </div>
          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/login")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-dark">Registrarse</button>
          </div>
        </form>
      </div>
    </div>
  );
}