import { Navbar } from "../../componentes/Navbar/Navbar";
import { UsuariosTabla } from "../../componentes/Usuarios/UsuariosTabla";
import { Footer } from "../../componentes/Footer/Footer";

export function UsuariosPage() {
  return (
    
    <div className="container mt-5">
        <Navbar/>
      <UsuariosTabla />
      <Footer/>
    </div>
    
  );
}