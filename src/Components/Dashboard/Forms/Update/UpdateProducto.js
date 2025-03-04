import React, { useEffect, useState } from 'react'
import api from '../../../../Utils/axiosConfig';
import style from '../../../../assets/style/Dashboard.module.css';
import Swal from 'sweetalert2';
import { Modal } from 'bootstrap';

const UpdateProducto = ({ setFormData, formData, setProductos }) => {
    //ESTADOS DATOS SELECT
    const [provedores, setProveedor] = useState([]);
    const [categorias, SetCategoria] = useState([]);
    const today = new Date().toISOString().split('T')[0]; //ESTADO FECHA ACTUAL
    const [loading, setLoading] = useState(false); //ESTADO DE CARGA
    const [previewImage, setpreviewImage] = useState(null); //ESTADO IMAGEN

    //OBTENER INFORMACION PARA LOS SELECT
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [proveedoresResponse, categoriasResponse] = await Promise.all([
                    api.get("/proveedores"),
                    api.get("/categorias"),
                ]);
                setProveedor(proveedoresResponse.data);
                SetCategoria(categoriasResponse.data);
            } catch (error) {
                console.error("Error al cargar los datos: ", error);
            }
        };
        fetchData();
    }, []);

    //CAMBIO DE DATOS EN EL FOMULARIO
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                name === "proveedor"
                    ? provedores.find((prov) => prov.nit === value) || {}
                    : name === "categoria"
                        ? categorias.find((cat) => cat.id === Number(value)) || {}
                        : value
        }));
    };

    const handleFileChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            foto: e.target.files[0],
        }));
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const updateFormData = new FormData();
            updateFormData.append("id", formData.id);
            updateFormData.append("nombre", formData.nombre);
            updateFormData.append("descripcion", formData.descripcion);
            updateFormData.append("fechaVencimiento", formData.fechaVencimiento);
            updateFormData.append("proveedor", formData.proveedor.nit);
            updateFormData.append("valorCompra", formData.valorCompra);
            updateFormData.append("descuento", formData.descuento);
            updateFormData.append("stockActual", formData.stockActual);
            if (formData.stockAgregar) {
                updateFormData.append("stockAgregar", formData.stockAgregar);
            }
            updateFormData.append("categoria", formData.categoria.id);
            if (formData.foto instanceof File) {
                updateFormData.append("foto", formData.foto);
            }

            const response = await api.put(`/productos/update/${formData.id}`, updateFormData, {
                headers: { "Content-type": "multipart/form-data" }
            });
            const data = response;
            if (data.status === 200) {
                document.activeElement.blur();
                Swal.fire({
                    title: '¡Actualización exitosa!',
                    text: 'El producto se ha actualizado con éxito',
                    icon: 'success',
                    timer: 1000,
                    timerProgressBar: true
                });

                setProductos((prevProductos) =>
                    prevProductos.map((producto) =>
                        producto.id === formData.id
                            ? { ...producto, ...formData }
                            : producto
                    )
                );

                const modalElement = document.getElementById("UpdateProductoModal");
                if (modalElement) {
                    const modal = Modal.getInstance(modalElement);
                    modal.hide();
                };
                /* PRUEBA*/
                // 🔽 Elimina el backdrop de Bootstrap manualmente
                const modalBackdrops = document.getElementsByClassName("modal-backdrop");
                while (modalBackdrops.length > 0) {
                    modalBackdrops[0].parentNode.removeChild(modalBackdrops[0]);
                }
                document.body.classList.remove("modal-open"); // Asegura que el body no tenga la clase que lo bloquea
                document.body.style.overflow = "auto"; // Restaura el scroll si se bloqueó

            }
        } catch (error) {
            console.error("Error en la solictud de actualización: ", error);
            Swal.fire({
                title: 'Error',
                text: 'No fue posible actualizar el producto, comuniquese con el administrador',
                icon: 'error'
            });
        } finally {
            setFormData({
                id: "",
                nombre: "",
                descripcion: "",
                fechaVencimiento: "",
                proveedor: {},
                valorCompra: "",
                descuento: "",
                stockActual: "",
                stockAgregar: "",
                categoria: {},
                foto: null
            });
            setLoading(false)
        }
    };

    return (
        <form className={style.formulario} onSubmit={handleUpdate}>
            <div className={style.formGroup}>
                <label htmlFor="id" className="form-label">Codigo</label>
                <input
                    type="number"
                    className="form-control"
                    id="id"
                    name="id"
                    value={formData.id}
                    onChange={handleInputChange}
                    max="9999999999"
                    placeholder='Codigo'
                    required
                    disabled
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder='Nombre'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <input
                    type="text"
                    className="form-control"
                    id="descripcion"
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleInputChange}
                    placeholder='Descripcion'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="fechaVencimiento" className="form-label">Fecha Vencimiento</label>
                <input
                    type="date"
                    className="form-control"
                    id="fechaVencimiento"
                    name="fechaVencimiento"
                    value={formData.fechaVencimiento}
                    onChange={handleInputChange}
                    placeholder='Fecha de Vencimiento'
                    min={today}
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="proveedor" className="form-label">Proveedor</label>
                <select
                    className="form-select"
                    id="proveedor"
                    name="proveedor"
                    value={formData.proveedor?.nit || ""}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>Seleccione un proveedor </option>
                    {provedores.map((prov) => (
                        <option key={prov.nit} value={prov.nit}>
                            {prov.nombre}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="valorCompra" className="form-label">Valor de compra</label>
                <input
                    type="number"
                    className="form-control"
                    id="valorCompra"
                    name="valorCompra"
                    value={formData.valorCompra}
                    onChange={handleInputChange}
                    maxLength="13"
                    placeholder='Valor de Compra'
                    required
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="Descuento" className="form-label">Descuento</label>
                <input
                    type="number"
                    className="form-control"
                    id="descuento"
                    name="descuento"
                    value={formData.descuento}
                    onChange={handleInputChange}
                    max="9999999999"
                    placeholder='Descuento'
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="stockActual" className="form-label">Stock Actual</label>
                <input
                    type="number"
                    className="form-control"
                    id="stockActual"
                    name="stockActual"
                    value={formData.stockActual}
                    onChange={handleInputChange}
                    max="9999999999"
                    placeholder='Stock Actual'
                    required
                    disabled
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="stockAgregar" className="form-label">Agregar Stock</label>
                <input
                    type="number"
                    className="form-control"
                    id="stockAgregar"
                    name="stockAgregar"
                    onChange={handleInputChange}
                    max={formData.stockMax}
                    placeholder='Cantidad'
                />
            </div>
            <div className={style.formGroup}>
                <label htmlFor="categoria" className="form-label">Categoría</label>
                <select
                    className="form-select"
                    id="categoria"
                    name="categoria"
                    value={formData.categoria?.id || ""}
                    onChange={handleInputChange}
                    required
                >
                    <option value="" disabled>Seleccione una categoria</option>
                    {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.descripcion}
                        </option>
                    ))}
                </select>
            </div>
            <div className={style.formGroup}>
                <label htmlFor="foto" className="form-label">Foto</label>
                <input
                    type="file"
                    className="form-control"
                    id="foto"
                    name="foto"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <div className="col-12">
                <button className="btn btn-success" type="submit" disabled={loading}>
                    {loading ? "Actualizar..." : "Editar"}
                </button>
            </div>
        </form>
    )
}

export default UpdateProducto
