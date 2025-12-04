import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Boleta() {
  const { id } = useParams(); // ruta /boleta/:id
  const [boleta, setBoleta] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoleta = async () => {
      try {
        const res = await axios.get(`http://localhost:8081/api/boletas/${id}`);
        setBoleta(res.data);
        
        // Cargar los datos del usuario si existe usuarioId
        if (res.data.usuarioId) {
          try {
            const userRes = await axios.get(`http://localhost:8081/api/usuarios/${res.data.usuarioId}`);
            setUsuario(userRes.data);
          } catch (userErr) {
            console.error("Error al cargar usuario:", userErr);
          }
        }
      } catch (err) {
        setError("Error al cargar la boleta");
      } finally {
        setLoading(false);
      }
    };
    fetchBoleta();
  }, [id]);

  if (loading) return <p>Cargando boleta...</p>;
  if (error) return <p>{error}</p>;
  if (!boleta) return <p>No existe la boleta.</p>;

  return (
    <div className="p-4 max-w-xl mx-auto bg-white shadow rounded">
      <h2 className="text-2xl fw-bold mb-4">Boleta #{boleta.id}</h2>

      <p><strong>Usuario:</strong> {boleta.nombreUsuario || boleta.usuarioId || "—"}</p>
      {boleta.totalSinIva != null || boleta.iva != null ? (
        <>
          <p><strong>Total sin IVA:</strong> ${boleta.totalSinIva?.toFixed ? boleta.totalSinIva.toFixed(2) : boleta.totalSinIva}</p>
          <p><strong>IVA:</strong> ${boleta.iva?.toFixed ? boleta.iva.toFixed(2) : boleta.iva}</p>
          <p><strong>Total con IVA:</strong> ${boleta.total?.toFixed ? boleta.total.toFixed(2) : boleta.total}</p>
        </>
      ) : (
        <p><strong>Total:</strong> ${boleta.total}</p>
      )}
      <p>
        <strong>Fecha:</strong>{' '}
        {boleta.fechaLocal
          ? boleta.fechaLocal
          : boleta.fecha
          ? new Date(boleta.fecha).toLocaleString()
          : '—'}
      </p>
    </div>
  );
}