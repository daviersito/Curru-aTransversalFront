import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./UsuariosTabla.css";


export function UsuariosTabla() {
  const [usuarios, setUsuarios] = useState([]);
  const [filtro, setFiltro] = useState(""); // Nuevo estado para búsqueda

  const cargarUsuarios = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/usuarios");
      if (!response.ok) throw new Error("Error al obtener usuarios");

      const data = await response.json();
      const normalizados = data.map((u) => ({
        ...u,
        estado: u.estado === true || u.estado === "true",
      }));

      setUsuarios(normalizados);
    } catch (error) {
      console.error("❌ Error al cargar usuarios:", error);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const handleDesactivar = async (id, nombre) => {
    if (!window.confirm(`¿Deseas desactivar al usuario "${nombre}"?`)) return;

    try {
      const response = await fetch(
        `http://localhost:8081/api/usuarios/${id}/desactivar`,
        { method: "PATCH" }
      );

      if (!response.ok) throw new Error("Error al desactivar usuario");

      alert("✅ Usuario desactivado correctamente");
      cargarUsuarios();
    } catch (error) {
      console.error("❌ Error al desactivar:", error);
      alert("No se pudo desactivar el usuario");
    }
  };

  // Filtrar usuarios por nombre
  const usuariosFiltrados = usuarios.filter((u) => {
    if (!filtro || !filtro.trim()) return true; // sin filtro, mostrar todos
    const nombre = (u.nombre ?? "").toString().toLowerCase();
    return nombre.includes(filtro.toLowerCase());
  });

  return (
    <div className="usuarios-tabla-container mt-4">
      <h3 className="mb-4 text-center">Gestión de Usuarios</h3>

      <div className="row mb-3">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
          />
        </div>
        <div className="col-md-6 text-end">
          <Link className="btn btn-outline-dark btn-sm" to="/crear-usuario">
            Crear Usuario
          </Link>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-hover text-center align-middle">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Editar</th>
              <th>Desactivar</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-muted">
                  No hay usuarios registrados
                </td>
              </tr>
            ) : (
              usuariosFiltrados.map((u) => (
                <tr
                  key={u.id}
                  className={u.estado ? "usuario-activo" : "usuario-inactivo"}
                >
                  <td>{u.id}</td>
                  <td>{u.nombre}</td>
                  <td>{u.email}</td>
                  <td>{u.rol ? u.rol.nombre : "Sin rol"}</td>
                  <td>
                    <span
                      className={`badge ${
                        u.estado ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {u.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td>
                    {u.estado ? (
                      <Link
                        className="btn btn-outline-primary btn-sm"
                        to={`/editar-usuario/${u.id}`}
                      >
                        Editar
                      </Link>
                    ) : (
                      <button
                        className="btn btn-outline-secondary btn-sm"
                        disabled
                      >
                        Editar
                      </button>
                    )}
                  </td>
                  <td>
                    {u.estado ? (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDesactivar(u.id, u.nombre)}
                      >
                        Desactivar
                      </button>
                    ) : (
                      <button className="btn btn-secondary btn-sm" disabled>
                        Desactivado
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}