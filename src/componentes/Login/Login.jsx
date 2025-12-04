import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", contra: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setLoginData({ ...loginData, [e.target.name]: e.target.value });

  const validate = () => {
    if (!loginData.email.trim()) return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email))
      return "Ingrese un email válido";
    if (!loginData.contra) return "La contraseña es obligatoria";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const res = await fetch("http://localhost:8081/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Credenciales incorrectas");

      const data = await res.json();
      console.log("DATA RECIBIDA DEL BACKEND:", data);
      // Ejemplo recibido:
      // {id: 9, nombre: "Administrador", email: "admin@gmail.com", rol: "admin"}

      // ================================
      //     NORMALIZAR ROL REAL
      // ================================
      const rolNormalizado = data.rol?.toLowerCase(); // <-- corregido

      // Guardar en localStorage
      localStorage.setItem("usuario", JSON.stringify(data));
      localStorage.setItem("rol", rolNormalizado);
      localStorage.setItem("id", data.id);  // <-- AGREGA ESTO

      // ================================
      //     REDIRECCIONAR SEGÚN ROL
      // ================================
      if (rolNormalizado === "admin") {
        navigate("/dashboardpage");
      } else if (rolNormalizado === "cliente") {
        navigate("/");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Email o contraseña incorrectos");
      console.error(err);
    }
  };

  return (
    <div className="main-content">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Iniciar Sesión</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={loginData.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Contraseña</label>
            <input
              type="password"
              name="contra"
              className={`form-control ${error ? "is-invalid" : ""}`}
              value={loginData.contra}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-dark w-100">
            Ingresar
          </button>
          <div className="text-center mt-3">
            <button
              type="button"
              className="btn btn-link"
              onClick={() => navigate('/registro')}
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}