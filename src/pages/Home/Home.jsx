import Carrousel from "../../componentes/Carrousel/Carrousel";
import { Navbar } from "../../componentes/Navbar/Navbar";
import { VerProd } from "../../componentes/VerProd/VerProd";
import { Footer } from "../../componentes/Footer/Footer";
import { useEffect } from "react";




export function Home() {
  return (
    <>
      <Navbar /> {/* Fuera del container para que ocupe toda la pantalla */}

      

        <Carrousel />

        <section className="mt-5">
          <VerProd />
        </section>

        
            <Footer/>
      
    </>
  );
}