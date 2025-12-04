import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function CrearUsuario() {
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    contra: "",
    rol: "",
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  // Cargar roles desde el backend
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch("http://localhost:8081/api/roles");
        if (!response.ok) throw new Error("Error al cargar roles");
        const data = await response.json();
        setRoles(data);
      } catch (err) {
        console.error("❌ Error al obtener roles:", err);
        setError("No se pudieron cargar los roles");
      }
    };
    fetchRoles();
  }, []);

  // Manejo de cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.email || !usuario.contra || !usuario.rol) {
      setError("Todos los campos son obligatorios");
      return;
    }

    const nuevoUsuario = {
      nombre: usuario.nombre,
      email: usuario.email,
      contra: usuario.contra,
      estado: true,
      fecha_creacion: new Date().getFullYear(),
      rol: { id: usuario.rol },
    };

    try {
      const response = await fetch("http://localhost:8081/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      if (!response.ok) throw new Error("Error al crear usuario");

      alert("✅ Usuario creado correctamente");

      // Navegar a UsuariosPage solo después de crear
      navigate("/usuariospage");
    } catch (err) {
      console.error("❌ Error al crear usuario:", err);
      setError("No se pudo crear el usuario");
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Crear Nuevo Usuario</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              name="nombre"
              className="form-control"
              value={usuario.nombre}
              onChange={handleChange}
              placeholder="Ej: Juan Pérez"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={usuario.email}
              onChange={handleChange}
              placeholder="usuario@correo.com"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Contraseña</label>
            <input
              type="password"
              name="contra"
              className="form-control"
              value={usuario.contra}
              onChange={handleChange}
              placeholder="********"
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              name="rol"
              className="form-select"
              value={usuario.rol}
              onChange={handleChange}
            >
              <option value="">Seleccionar rol</option>
              {roles.length > 0 ? (
                roles.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))
              ) : (
                <option disabled>No hay roles disponibles</option>
              )}
            </select>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => navigate("/usuariospage")}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-dark">
              Crear Usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}