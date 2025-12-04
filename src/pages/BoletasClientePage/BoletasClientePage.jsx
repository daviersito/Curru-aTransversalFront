import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { Link } from "react-router-dom";

export function BoletasClientePage() {
  const userId = localStorage.getItem("id");
  const [boletas, setBoletas] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarBoletas = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/boletas/usuario/${userId}`);
      if (!res.ok) throw new Error("Error al cargar tus boletas");
      const data = await res.json();
      setBoletas(data);
    } catch (err) {
      console.error(err);
      alert("No se pudieron cargar tus boletas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarBoletas();
  }, []);

  if (loading) return <><Navbar /><p className="text-center mt-4">Cargando boletas...</p></>;

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2>Mis Boletas</h2>
        <ul className="list-group mt-3">
          {boletas.map(b => (
            <li key={b.id} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Boleta #{b.id} - Total: ${b.total}</span>
              <Link className="btn btn-primary btn-sm" to={`/boleta/${b.id}`}>Ver</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}