import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../Navbar/Navbar';

export function EditarProd() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [producto, setProducto] = useState({ nombre: "", descripcion: "", precio: "", stock: "", categoria: null });
  const [categorias, setCategorias] = useState([]);
  const [preview, setPreview] = useState(null);
  const [nuevaImagen, setNuevaImagen] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchProducto = async () => {
      const res = await fetch(`http://localhost:8081/api/productos/${id}`);
      const data = await res.json();
      setProducto(data);
      setPreview(`http://localhost:8081${data.imagen}`);
    };
    fetchProducto();
  }, [id]);

  useEffect(() => {
    const fetchCategorias = async () => {
      const res = await fetch("http://localhost:8081/api/categorias");
      const data = await res.json();
      setCategorias(data);
    };
    fetchCategorias();
  }, []);

  const handleChange = (e) => setProducto({ ...producto, [e.target.name]: e.target.value });
  const handleCategoriaChange = (e) => {
    const cat = categorias.find(c => c.id === parseInt(e.target.value)) || null;
    setProducto({ ...producto, categoria: cat });
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNuevaImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!producto.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!producto.descripcion.trim()) newErrors.descripcion = "La descripción es obligatoria";
    if (!producto.precio || producto.precio <= 0) newErrors.precio = "Ingrese un precio válido";
    if (!producto.stock || producto.stock < 0) newErrors.stock = "Ingrese un stock válido";
    if (!producto.categoria) newErrors.categoria = "Debe seleccionar una categoría";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let imageUrl = producto.imagen;
      if (nuevaImagen) {
        const formData = new FormData();
        formData.append("file", nuevaImagen);
        const res = await fetch("http://localhost:8081/api/productos/upload", { method: "POST", body: formData });
        imageUrl = await res.text();
      }

      await fetch(`http://localhost:8081/api/productos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...producto, imagen: imageUrl, categoria: producto.categoria })
      });

      alert("Producto actualizado correctamente ✅");
      navigate("/inventario");
    } catch (err) {
      console.error(err);
      alert("Error al actualizar producto");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Editar Producto</h3>
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <input type="text" name="nombre" value={producto.nombre} onChange={handleChange} placeholder="Nombre"
            className={`form-control ${errors.nombre ? "is-invalid" : ""}`} />
          {errors.nombre && <div className="invalid-feedback">{errors.nombre}</div>}
        </div>

        <div className="mb-3">
          <input type="number" name="precio" value={producto.precio} onChange={handleChange} placeholder="Precio"
            className={`form-control ${errors.precio ? "is-invalid" : ""}`} />
          {errors.precio && <div className="invalid-feedback">{errors.precio}</div>}
        </div>

        <div className="mb-3">
          <input type="number" name="stock" value={producto.stock} onChange={handleChange} placeholder="Stock"
            className={`form-control ${errors.stock ? "is-invalid" : ""}`} />
          {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
        </div>

        <div className="mb-3">
          <textarea name="descripcion" value={producto.descripcion} onChange={handleChange} placeholder="Descripción"
            className={`form-control ${errors.descripcion ? "is-invalid" : ""}`}></textarea>
          {errors.descripcion && <div className="invalid-feedback">{errors.descripcion}</div>}
        </div>

        <div className="mb-3">
          <select value={producto.categoria?.id || ""} onChange={handleCategoriaChange}
            className={`form-select ${errors.categoria ? "is-invalid" : ""}`}>
            <option value="">Selecciona una categoría</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>
          {errors.categoria && <div className="invalid-feedback">{errors.categoria}</div>}
        </div>

        <div className="mb-3">
          <input type="file" accept="image/*" onChange={handleFileChange} className="form-control" />
          {preview && <img src={preview} alt="Vista previa" style={{ width: "150px", marginTop: "10px" }} />}
        </div>

        <button type="submit" className="btn btn-dark">Guardar Cambios</button>
      </form>
    </div>
  );
}