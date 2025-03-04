import React, { useEffect, useRef } from 'react';
import 'datatables.net-bs5';
import 'datatables.net-bs5/css/dataTables.bootstrap5.min.css';
import useDatatable from './useDatatable';

const DatatableComponent = ({ id, columns, data, rowIdKey, onEdit, onDelete }) => {
  const tableRef = useRef(null);

  useDatatable(tableRef, data, columns, rowIdKey, onEdit, onDelete);
  return (
    <div className='container mt-4'>
      <table ref={tableRef} id={id} className='table display nowrap text-center' style={{ width: '100%' }}>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </div>
  )
}
export default DatatableComponent
