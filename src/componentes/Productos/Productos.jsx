import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Productos.css';

export function Productos() {

    const [productos, setProductos] = useState([]);
    const [filtro, setFiltro] = useState(""); // Estado para búsqueda

    const cargarProductos = async () => {
        try {
            const response = await fetch('http://localhost:8081/api/productos');
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }

            const data = await response.json();
            const productosNormalizados = data.map(p => ({
                ...p,
                activo: p.activo === true || p.activo === 'true',
            }));

            setProductos(productosNormalizados);
        } catch (error) {
            console.error('Error al obtener los productos:', error);
        }
    };

    useEffect(() => {
        cargarProductos();
    }, []);

    const handleDesactivar = (id, nombre) => {
        if (window.confirm(`¿Estás seguro de desactivar el producto "${nombre}"?`)) {
            fetch(`http://localhost:8081/api/productos/${id}/desactivar`, { method: 'PATCH' })
                .then(response => {
                    if (!response.ok) throw new Error('Error al desactivar el producto');
                    return response.json();
                })
                .then(data => {
                    alert('Producto desactivado exitosamente');
                    cargarProductos();
                })
                .catch(error => {
                    console.error('Error al desactivar:', error);
                    alert('Error al desactivar el producto');
                });
        }
    };

    // Filtrar productos por nombre o categoria
    const productosFiltrados = productos.filter(p => 
        p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        p.categoria?.nombre.toLowerCase().includes(filtro.toLowerCase())
    );

    return (
        <div className="container mi-tabla">
            <h3 style={{ marginBottom: '20px' }}>Inventario de productos</h3>

            <div className="row mb-3">
                <div className="col-md-6">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Buscar por nombre o categoría..."
                        value={filtro}
                        onChange={(e) => setFiltro(e.target.value)}
                    />
                </div>
                <div className="col-md-6 text-end">
                    <Link className="btn btn-outline-dark" style={{ fontSize: '13px' }} to="/crear-producto">
                        Crear Producto
                    </Link>
                </div>
            </div>

            <div className="row">
                <div className="col-md">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>Id Producto</th>
                                <th>Imagen</th>
                                <th>Nombre</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Catalogo</th>
                                <th>Editar Producto</th>
                                <th>Desactivar/Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {productosFiltrados.map((prod) => (
                                <tr key={prod.id} style={{ opacity: prod.estado ? 1 : 0.5, backgroundColor: prod.estado ? 'white' : '#f8f8f8' }}>
                                    <td>{prod.id}</td>
                                    <td>
                                        {prod.imagen ? (
                                            <img 
                                                src={`http://localhost:8081${prod.imagen}`} 
                                                alt={prod.nombre} 
                                                style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '5px' }}
                                            />
                                        ) : "Sin imagen"}
                                    </td>
                                    <td>{prod.nombre}</td>
                                    <td>{prod.descripcion}</td>
                                    <td>{prod.precio}</td>
                                    <td>{prod.stock}</td>
                                    <td>{prod.categoria?.nombre}</td>
                                    <td>
                                        {prod.estado ? (
                                            <Link className="btn btn-outline-primary" style={{ fontSize: '13px' }} to={`/editar-producto/${prod.id}`}>
                                                Editar Producto
                                            </Link>
                                        ) : (
                                            <button className="btn btn-outline-secondary" disabled>Editar Producto</button>
                                        )}
                                    </td>
                                    <td>
                                        {prod.estado ? (
                                            <button className="btn btn-sm btn-outline-danger" onClick={() => handleDesactivar(prod.id, prod.nombre)}>
                                                Desactivar
                                            </button>
                                        ) : (
                                            <button className="btn btn-sm btn-secondary" disabled>Desactivado</button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}