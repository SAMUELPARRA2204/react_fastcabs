import React, { useEffect, useState } from 'react'
import api from '../../../../Utils/axiosConfig';
import ProductoCard from './ProductoCard';
const ProductList = ({ category }) => {
    const [productos, setProductos] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const productsPerPage = 20;

    useEffect(() => {
        const fetchProductos = async () => {
            try {
                const response = await api.get(`/productos/${category}`);
                setProductos(response.data || []);
            } catch (error) {
                console.error("Error al obtener los productos:", error);
            } finally {

            }
        };
        fetchProductos();
    }, [category]
    );

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = productos.slice(indexOfFirstProduct, indexOfLastProduct);

    const nextPage = () => {
        if (currentPage < Math.ceil(productos.length / productsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const prevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="container-products">
            {currentProducts.length > 0 ? (
                <>
                    <div className="products-grid">
                        {currentProducts.map((producto) => (
                            <ProductoCard key={producto.id} product={producto} />
                        ))}
                    </div>
                    {productos.length > productsPerPage && (
                        <div className="pagination">
                            <button onClick={prevPage} disabled={currentPage === 1}>
                                Anterior
                            </button>
                            <span>Página {currentPage} de {Math.ceil(productos.length / productsPerPage)}</span>
                            <button onClick={nextPage} disabled={currentPage === Math.ceil(productos.length / productsPerPage)}>
                                Siguiente
                            </button>
                        </div>
                    )}
                </>
            ) : (
                <p>No hay productos en esta categoría</p>
            )}
        </div>
    )
}

export default ProductList
