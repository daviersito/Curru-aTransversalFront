import { useEffect, useState } from "react";

export function ClienteDashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("usuario");
    if (data) setUser(JSON.parse(data));
  }, []);

  if (!user) return <h2>No hay usuario logueado</h2>;

  return (
    <div className="container mt-5">
      <h1>Bienvenido {user.nombre}</h1>
      <p>Correo: {user.email}</p>
      <p>Rol: {user.rol.nombre}</p>

      <hr />

      <h3>Opciones del Cliente</h3>
      <ul>
        <li>Ver mis compras</li>
        <li>Editar perfil</li>
        <li>Salir</li>
      </ul>
    </div>
  );
}