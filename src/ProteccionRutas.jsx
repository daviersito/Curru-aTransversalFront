import { Navigate } from "react-router-dom";

export function RutaAdmin({ children }) {
  const rol = localStorage.getItem("rol");
  return rol === "admin" ? children : <Navigate to="/login" />;
}

export function RutaCliente({ children }) {
  const rol = localStorage.getItem("rol");
  return rol === "cliente" ? children : <Navigate to="/login" />;
}