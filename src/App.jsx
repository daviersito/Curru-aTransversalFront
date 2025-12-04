import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home/Home";
import { Contacto } from "./pages/Contacto/Contacto";
import { Inventario } from "./pages/Inventario/inventario";
import { CrearProducto } from "./componentes/CrearProd/CrearProducto";
import { EditarProd } from "./componentes/EditarProd/EditarProd";
import { Productos } from "./componentes/Productos/Productos";
import { UsuariosPage } from "./pages/UsuariosPage/UsuariosPage";
import { CrearUsuario } from "./componentes/CrearUsuario/CrearUsuario";
import { EditarUsuario } from "./componentes/EditarUsuario/EditarUsuario";
import { LoginPage } from "./pages/LoginPage/LoginPage";
import { RegistroPage } from "./pages/RegistroPage/RegistroPage";
import { DashboardPage } from "./pages/Dashboard/DashboardPage";
import { ClienteDashboard } from "./pages/ClienteDashboard/ClienteDashboard";
import { Carrito } from "./pages/Carrito/Carrito";
import { BoletaPage } from "./pages/BoletaPage/BoletaPage";
import { BoletasAdminPage } from "./pages/BoletasAdmin/BoletasAdminPage";
import { BoletasClientePage } from "./pages/BoletasClientePage/BoletasClientePage";

import { RutaAdmin, RutaCliente } from "./ProteccionRutas";

function App() {
  return (
    <Router>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<Home />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registro" element={<RegistroPage />} />
        <Route path="/boleta/:id" element={<BoletaPage />} />

        {/* CLIENTE */}
        <Route
  path="/mis-boletas"
  element={
    <RutaCliente>
      <BoletasClientePage />
    </RutaCliente>
  }
/>
        <Route
          path="/cliente"
          element={
            <RutaCliente>
              <ClienteDashboard />
            </RutaCliente>
          }
        />
        <Route
          path="/carrito"
          element={
            <RutaCliente>
              <Carrito />
            </RutaCliente>
          }
        />

        {/* ADMIN */}
        <Route
  path="/boletas"
  element={
    <RutaAdmin>
      <BoletasAdminPage />
    </RutaAdmin>
  }
/>
        <Route
          path="/dashboardpage"
          element={
            <RutaAdmin>
              <DashboardPage />
            </RutaAdmin>
          }
        />
        <Route
          path="/inventario"
          element={
            <RutaAdmin>
              <Inventario />
            </RutaAdmin>
          }
        />
        <Route
          path="/usuariospage"
          element={
            <RutaAdmin>
              <UsuariosPage />
            </RutaAdmin>
          }
        />
        <Route
          path="/crear-producto"
          element={
            <RutaAdmin>
              <CrearProducto />
            </RutaAdmin>
          }
        />
        <Route
          path="/editar-producto/:id"
          element={
            <RutaAdmin>
              <EditarProd />
            </RutaAdmin>
          }
        />
        <Route
          path="/crear-usuario"
          element={
            <RutaAdmin>
              <CrearUsuario />
            </RutaAdmin>
          }
        />
        <Route
          path="/editar-usuario/:id"
          element={
            <RutaAdmin>
              <EditarUsuario />
            </RutaAdmin>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;