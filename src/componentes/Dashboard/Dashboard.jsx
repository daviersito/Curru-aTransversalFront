import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export function Dashboard() {
  const [productos, setProductos] = useState([]);
  const [usuarios, setUsuarios] = useState([]);

  const cargarDatos = async () => {
    try {
      const resProductos = await fetch("http://localhost:8081/api/productos");
      const dataProductos = await resProductos.json();
      setProductos(dataProductos);

      const resUsuarios = await fetch("http://localhost:8081/api/usuarios");
      const dataUsuarios = await resUsuarios.json();
      setUsuarios(dataUsuarios);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  const totalProductos = productos.length;
  const totalUsuarios = usuarios.length;
  const productosBajoStock = productos.filter(p => p.stock < 5);

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Dashboard Administrativo</h2>

      {/* Estadísticas principales */}
      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Productos</h5>
            <h2>{totalProductos}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Total Usuarios</h5>
            <h2>{totalUsuarios}</h2>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card text-center p-3 shadow-sm">
            <h5>Productos Bajo Stock</h5>
            <h2>{productosBajoStock.length}</h2>
          </div>
        </div>
      </div>

      {/* Accesos rápidos */}
      <div className="row mb-4">
        <div className="col-md-6 mb-2">
          <Link to="/inventario" className="btn btn-outline-primary w-100">
            Gestión de Productos
          </Link>
        </div>
        <div className="col-md-6 mb-2">
          <Link to="/usuariospage" className="btn btn-outline-success w-100">
            Gestión de Usuarios
          </Link>
        </div>
      </div>

      {/* Alertas de stock crítico */}
      {productosBajoStock.length > 0 && (
        <div className="alert alert-danger">
          ⚠️ Productos con stock crítico:{" "}
          {productosBajoStock.map(p => (
            <span key={p.id} className="badge bg-danger me-2">
              {p.nombre} ({p.stock})
            </span>
          ))}
        </div>
      )}

      {/* Tabla con todos los productos */}
      <div className="row">
        <div className="col-md-12">
          <h5>Todos los productos</h5>
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Stock</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id} className={p.stock < 5 ? "table-warning" : ""}>
                  <td>{p.nombre}</td>
                  <td>{p.categoria?.nombre || "Sin categoría"}</td>
                  <td>
                    {p.stock}
                    {p.stock < 5 && (
                      <span className="badge bg-danger ms-2">Bajo</span>
                    )}
                  </td>
                  <td>{p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}