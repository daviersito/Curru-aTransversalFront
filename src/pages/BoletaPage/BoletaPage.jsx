import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Navbar } from "../../componentes/Navbar/Navbar";

export function BoletaPage() {
  const { id } = useParams();
  const [boleta, setBoleta] = useState(null);
  const [loading, setLoading] = useState(true);

  const cargarBoleta = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/boletas/${id}`);
      if (!res.ok) throw new Error("No se pudo obtener la boleta");
      const data = await res.json();
      setBoleta(data);
    } catch (err) {
      console.error(err);
      alert("Error al cargar la boleta");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBoleta();
  }, [id]);

  const imprimirBoleta = () => {
    window.print();
  };

  if (loading)
    return (
      <>
        <Navbar />
        <p className="text-center mt-4">Cargando boleta...</p>
      </>
    );

  if (!boleta)
    return (
      <>
        <Navbar />
        <p className="text-center mt-4">No se encontró la boleta.</p>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Boleta #{boleta.id}</h2>
          <button className="btn btn-primary" onClick={imprimirBoleta}>
            Imprimir
          </button>
        </div>

        <p>
          <strong>Fecha:</strong>{" "}
          {boleta.fechaLocal
            ? boleta.fechaLocal
            : boleta.fecha
            ? new Date(boleta.fecha).toLocaleString()
            : "—"}
        </p>

        {/* ================================
            ⬇️ AQUI SE MUESTRA EL NOMBRE DEL USUARIO
        ================================= */}
        <p>
          <strong>Usuario:</strong> {boleta.nombreUsuario || "—"}
        </p>

        <div className="mb-3">
          <p>
            <strong>Total sin IVA:</strong> ${boleta.totalSinIva}
          </p>
          <p>
            <strong>IVA:</strong> ${boleta.iva}
          </p>
          <p>
            <strong>Total con IVA:</strong> ${boleta.total}
          </p>
        </div>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Subtotal</th>
            </tr>
          </thead>

          <tbody>
            {boleta.items.map((item) => (
              <tr key={item.productoId}>
                <td>{item.nombreProducto}</td>
                <td>{item.cantidad}</td>
                <td>${item.precio}</td>
                <td>${item.cantidad * item.precio}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <h4 className="text-end mt-3">
          Total: <strong>${boleta.total}</strong>
        </h4>

        <div className="mt-4">
          <Link to="/" className="btn btn-secondary">
            Volver al inicio
          </Link>
        </div>
      </div>
    </>
  );
}