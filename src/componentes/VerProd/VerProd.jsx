import { useEffect, useState } from "react";

export function VerProd() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId = localStorage.getItem("id"); // ID del cliente logueado

  const cargarProductos = async () => {
    try {
      const response = await fetch("http://localhost:8081/api/productos");

      if (!response.ok) {
        throw new Error(`Error del servidor: ${response.status}`);
      }

      const data = await response.json();

      const productosNormalizados = data.map((p) => ({
        ...p,
        activo: p.estado === true || p.estado === "true" || p.estado === 1,
      }));

      const activos = productosNormalizados.filter((p) => p.activo);

      setProductos(activos);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // ================================
  // Función para agregar al carrito
  // ================================
  const agregarAlCarrito = async (productId) => {
    if (!userId) {
      alert("Debes iniciar sesión para agregar al carrito");
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8081/api/cart/${userId}/add?productId=${productId}&cantidad=1`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Error al agregar al carrito");
      }

      alert("Producto agregado al carrito!");
    } catch (err) {
      console.error(err);
      alert("Ocurrió un error al agregar al carrito");
    }
  };

  // ========================
  // Renderización
  // ========================

  if (loading) return <p className="text-center mt-4">Cargando productos...</p>;
  if (error)
    return <div className="alert alert-danger text-center mt-4">Error: {error}</div>;

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Nuestros Productos</h3>

      <div className="row">
        {productos.map((prod) => (
          <div key={prod.id} className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={
                  prod.imagen
                    ? `http://localhost:8081${prod.imagen}`
                    : "https://via.placeholder.com/300x200"
                }
                className="card-img-top"
                alt={prod.nombre}
                style={{ objectFit: "cover", height: "200px" }}
              />

              <div className="card-body">
                <h5 className="card-title">{prod.nombre}</h5>
                <p className="card-text text-muted">{prod.descripcion}</p>
                <p className="card-text fw-bold">${prod.precio}</p>

                {/* BOTÓN AGREGAR AL CARRITO */}
                <button
                  className="btn btn-success w-100 mt-2"
                  onClick={() => agregarAlCarrito(prod.id)}
                >
                  Agregar al carrito 🛒
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}