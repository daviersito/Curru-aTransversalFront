import { Navbar } from "../../componentes/Navbar/Navbar";
import { Dashboard } from "../../componentes/Dashboard/Dashboard";
import { Footer } from "../../componentes/Footer/Footer";

export function DashboardPage() {
  return (
    <div className="container">
            <Navbar />
            <Dashboard />
            <Footer/>
    </div>
  );
}