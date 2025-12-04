import { useEffect, useState } from "react";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { useNavigate } from "react-router-dom";

export function Carrito() {
  const userId = localStorage.getItem("id");
  const [carrito, setCarrito] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pagando, setPagando] = useState(false);
  const navigate = useNavigate();

  // Cargar carrito desde backend
  const cargarCarrito = async () => {
    try {
      const res = await fetch(`http://localhost:8081/api/cart/${userId}`);
      if (!res.ok) throw new Error("Error al obtener el carrito");
      const data = await res.json();
      setCarrito(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) cargarCarrito();
  }, []);

  // Cambiar cantidad de un producto
  const cambiarCantidad = async (productId, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;
    try {
      const res = await fetch(
        `http://localhost:8081/api/cart/${userId}/update?productId=${productId}&cantidad=${nuevaCantidad}`,
        { method: "PUT" }
      );
      if (!res.ok) throw new Error("Error al actualizar");
      cargarCarrito();
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar item del carrito
  const eliminarItem = async (productId) => {
    try {
      const res = await fetch(
        `http://localhost:8081/api/cart/${userId}/remove?productId=${productId}`,
        { method: "DELETE" }
      );
      if (!res.ok) throw new Error("No se pudo eliminar");
      cargarCarrito();
    } catch (err) {
      console.error(err);
    }
  };

  // ============================================================
  // 🟢 FUNCIÓN PAGAR — CREAR BOLETA + VACIAR CARRITO + REDIRIGIR
  // ============================================================
  const pagar = async () => {
    if (!carrito || carrito.items.length === 0) {
      alert("No hay productos en el carrito");
      return;
    }

    setPagando(true);

    try {
      // Usar endpoint de checkout que calcula totales y guarda nombre del usuario
      const resBoleta = await fetch(`http://localhost:8081/api/cart/${userId}/checkout`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      if (!resBoleta.ok) throw new Error("Error al crear la boleta");

      const boleta = await resBoleta.json();

      // Redirigir a página de boleta
      navigate(`/boleta/${boleta.id}`);
    } catch (err) {
      console.error(err);
      alert("Hubo un error al procesar el pago");
    } finally {
      setPagando(false);
    }
  };

  if (loading)
    return (
      <>
        <Navbar />
        <p className="text-center mt-4">Cargando carrito...</p>
      </>
    );

  if (!carrito || carrito.items.length === 0)
    return (
      <>
        <Navbar />
        <div className="container mt-4 text-center">
          <h2>Mi Carrito</h2>
          <p>No tienes productos en el carrito.</p>
        </div>
      </>
    );

  return (
    <>
      <Navbar />
      <div className="container mt-4">
        <h2 className="mb-4">Mi Carrito</h2>

        {carrito.items.map((item) => (
          <div key={item.id} className="card mb-3 p-3 shadow-sm">
            <div className="d-flex align-items-center">
              <img
                src={
                  item.producto.imagen
                    ? `http://localhost:8081${item.producto.imagen}`
                    : "https://via.placeholder.com/120"
                }
                alt={item.producto.nombre}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginRight: "15px",
                }}
              />

              <div className="flex-grow-1">
                <h5 className="mb-1">{item.producto.nombre}</h5>
                <p className="text-muted mb-1">${item.producto.precio}</p>
                <p className="mb-1">
                  Cantidad: <strong>{item.cantidad}</strong>
                </p>

                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() =>
                    cambiarCantidad(item.producto.id, item.cantidad + 1)
                  }
                >
                  +
                </button>

                <button
                  className="btn btn-secondary btn-sm me-2"
                  onClick={() =>
                    cambiarCantidad(item.producto.id, item.cantidad - 1)
                  }
                  disabled={item.cantidad <= 1}
                >
                  -
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => eliminarItem(item.producto.id)}
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}

        <div className="text-end mt-4">
    <h5>Subtotal (sin IVA): <strong>${carrito.total}</strong></h5>
    <h5>IVA (19%): <strong>${carrito.iva}</strong></h5>
    <h3 className="mt-2">
    Total a pagar: <strong>${carrito.totalConIva}</strong>
    </h3>
  </div>

        <div className="text-end mt-3">
          <button
            className="btn btn-success btn-lg"
            onClick={pagar}
            disabled={pagando}
          >
            {pagando ? "Procesando..." : "PAGAR"}
          </button>
        </div>
      </div>
    </>
  );
}