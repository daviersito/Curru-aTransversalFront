import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../../componentes/Navbar/Navbar";
import './CrearProducto.css';

import axios from "axios";

 

export function CrearProducto() {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    categoria: null, // categoría seleccionada
  });
  const [file, setFile] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Cargar categorías al inicio
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/categorias");
        if (!res.ok) throw new Error("Error al obtener categorías");
        const data = await res.json();
        setCategorias(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategorias();
  }, []);

  // Manejar cambios en inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto(prev => ({ ...prev, [name]: value }));
  };

  // Manejar cambio de categoría
  const handleCategoriaChange = (e) => {
    const cat = categorias.find(c => c.id === parseInt(e.target.value)) || null;
    setProducto(prev => ({ ...prev, categoria: cat }));
  };

  // Manejar archivo de imagen
  const handleFileChange = (e) => setFile(e.target.files[0]);

  // Validación
  const validate = () => {
    const newErrors = {};
    if (!producto.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!producto.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!producto.precio || producto.precio <= 0) newErrors.precio = "Ingrese un precio válido";
    if (!producto.categoria) newErrors.categoria = "Debe seleccionar una categoría";
    if (!file) newErrors.imagen = "La imagen es obligatoria";

    setErrors(newErrors);
    setIsFormValid(Object.keys(newErrors).length === 0);
    return Object.keys(newErrors).length === 0;
  };

  // Revalidar formulario al cambiar campos
  useEffect(() => { validate(); }, [producto, file]);

  // Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let imageUrl = "";
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("http://localhost:8081/api/productos/upload", formData);
        imageUrl = res.data;
      }

      await axios.post("http://localhost:8081/api/productos", { ...producto, imagen: imageUrl });
      alert("Producto guardado con éxito ✅");
      setProducto({ nombre: "", descripcion: "", precio: "", categoria: null });
      setFile(null);
      setErrors({});
      navigate("/inventario");
    } catch (err) {
      console.error(err);
      alert("Error al guardar producto");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Agregar producto</h3>
      <form onSubmit={handleSubmit} noValidate>
        {/* Nombre */}
        <div className="mb-2">
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            value={producto.nombre}
            onChange={handleChange}
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`}
          />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        {/* Descripción */}
        <div className="mb-2">
          <input
            type="text"
            name="descripcion"
            placeholder="Descripción"
            value={producto.descripcion}
            onChange={handleChange}
            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}
          />
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
        </div>

        {/* Precio */}
        <div className="mb-2">
          <input
            type="number"
            name="precio"
            placeholder="Precio"
            value={producto.precio}
            onChange={handleChange}
            className={`form-control ${errors.precio ? "is-invalid" : ""}`}
          />
          {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
        </div>

        {/* Categoría */}
        <div className="mb-2">
          <select
            value={producto.categoria?.id || ""}
            onChange={handleCategoriaChange}
            className={`form-select ${errors.categoria ? "is-invalid" : ""}`}
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map(c => (
              <option key={c.id} value={c.id}>{c.nombre}</option>
            ))}
          </select>
          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
        </div>

        {/* Imagen */}
        <div className="mb-2">
          <input
            type="file"
            onChange={handleFileChange}
            className={`form-control ${errors.imagen ? "is-invalid" : ""}`}
          />
          {errors.imagen && <div className="invalid-feedback">{errors.imagen}</div>}
        </div>

        {/* Botón */}
        <button type="submit" className="btn btn-primary" disabled={!isFormValid}>
          Guardar producto
        </button>
      </form>
    </div>
  );
}