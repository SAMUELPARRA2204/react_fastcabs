import React, { useEffect, useRef } from 'react'
import $ from 'jquery';

const useDatatable = ( tableRef, data, columns, rowIdKey, onEdit, onDelete ) => {
    const dataTablesInstance = useRef(null);

    useEffect(() => {
        if (!tableRef.current || !Array.isArray(data) || data.length === 0) return;

        const tableElement = $(tableRef.current);

        if($.fn.DataTable.isDataTable(tableRef.current)){
            console.warn("DataTable ya esta iicializado en", tableRef.current);
            dataTablesInstance.current.destroy();
            dataTablesInstance.current = null
            tableElement.empty();
            return;
        }

        dataTablesInstance.current = tableElement.DataTable({
            data,
            columns: columns.map((col) => ({
                title: col.header,
                data: col.key !== "acciones" ? col.key : null,
                defaultContent: col.key === "acciones" ? "" : undefined,
                createdCell: (td, cellData, rowData) => {
                    if (col.key === "acciones") {
                        $(td).html(`
                    <button class="btn btn-warning btn-editar" data-id="${rowData[rowIdKey]}">Editar</button>
                    <button class="btn btn-danger btn-eliminar ms-2" data-id="${rowData[rowIdKey]}">Eliminar</button>
                  `);
                    } else if (col.key === "rol") {
                        $(td).text(rowData.rol?.descripcion || "N/A");
                    } else if (col.key === "fotoUrl") {
                        const altText = rowData.descripcion || "Imagen";
                        $(td).html(`<img src="${cellData}" alt="${altText}" style="width: 50px; height: 50px;  border-radius: 5px;" />`);
                    } else {
                        $(td).text(cellData);
                    }
                }
            })),
            language: {
                url: "https://cdn.datatables.net/plug-ins/1.13.4/i18n/es-ES.json"
            },
            destroy: true,
        });

        tableElement.off("click", ".btn-editar").on("click", ".btn-editar", function () {
            const id = $(this).data("id");
            if (onEdit) onEdit(id);
        });

        tableElement.off("click",".btn-eliminar").on("click", ".btn-eliminar", function () {
            const id = $(this).data("id");
            if (onDelete) onDelete(id);
        });

        return () => {
            if (dataTablesInstance.current) {
                if($.fn.DataTable.isDataTable(tableRef.current)){
                    dataTablesInstance.current.destroy();
                }
                dataTablesInstance.current = null;
            }
        };
    }, [data, columns, rowIdKey, onEdit, onDelete]);

    return dataTablesInstance;
};
export default useDatatable
