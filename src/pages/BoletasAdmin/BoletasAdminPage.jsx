import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";

export function BoletasAdminPage() {
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarBoletas = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/boletas");
      if (!res.ok) throw new Error("Error al cargar las boletas");
      const data = await res.json();
      setBoletas(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar las boletas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBoletas();
  }, []);

  if (loading) return (
    <>
      <Navbar />
      <p className="text-center mt-4">Cargando boletas...</p>
    </>
  );

  if (!boletas.length) return (
    <>
      <Navbar />
      <p className="text-center mt-4">No hay boletas registradas.</p>
    </>
  );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Todas las Boletas</h2>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario ID</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Ver detalles</th>
            </tr>
          </thead>
          <tbody>
            {boletas.map((boleta) => (
              <tr key={boleta.id}>
                <td>{boleta.id}</td>
                <td>{boleta.usuarioId}</td>
                <td>{new Date(boleta.fecha).toLocaleString()}</td>
                <td>${boleta.total}</td>
                <td>
                  <a href={`/boleta/${boleta.id}`} className="btn btn-sm btn-primary">
                    Ver
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}