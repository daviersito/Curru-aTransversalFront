import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export function EditarUsuario() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState({
    nombre: "",
    email: "",
    contra: "",
    rol: "",
  });

  const [roles, setRoles] = useState([]);
  const [error, setError] = useState("");

  // Cargar roles
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

  // Cargar datos del usuario a editar
  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await fetch(`http://localhost:8081/api/usuarios/${id}`);
        if (!response.ok) throw new Error("Error al cargar usuario");
        const data = await response.json();
        setUsuario({
          nombre: data.nombre || "",
          email: data.email || "",
          contra: "", // no mostrar la contraseña actual por seguridad
          rol: data.rol?.id || "",
        });
      } catch (err) {
        console.error("❌ Error al cargar usuario:", err);
        setError("No se pudo cargar el usuario");
      }
    };
    fetchUsuario();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuario((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!usuario.nombre || !usuario.email || !usuario.rol) {
      setError("Nombre, email y rol son obligatorios");
      return;
    }

    const usuarioActualizado = {
      nombre: usuario.nombre,
      email: usuario.email,
      estado: true,
      rol: { id: usuario.rol },
    };

    // Si se ingresó nueva contraseña, la agregamos
    if (usuario.contra) {
      usuarioActualizado.contra = usuario.contra;
    }

    try {
      const response = await fetch(`http://localhost:8081/api/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuarioActualizado),
      });

      if (!response.ok) throw new Error("Error al actualizar usuario");

      alert("✅ Usuario actualizado correctamente");
      navigate("/usuariospage");
    } catch (err) {
      console.error("❌ Error al actualizar usuario:", err);
      setError("No se pudo actualizar el usuario");
    }
  };

  return (
    <div className="container mt-5 col-md-6">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Editar Usuario</h3>

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
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Nueva Contraseña (opcional)</label>
            <input
              type="password"
              name="contra"
              className="form-control"
              value={usuario.contra}
              onChange={handleChange}
              placeholder="Dejar vacío para no cambiar"
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
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.nombre}
                </option>
              ))}
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
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}