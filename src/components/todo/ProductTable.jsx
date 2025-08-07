// src/components/ProductTable.js
import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";

export default function ProductTable({ products, onEdit, onDelete }) {
  const actionTemplate = (rowData) => (
    <>
      <Button
        icon="pi pi-pencil"
        className="p-button-rounded p-button-success me-2"
        onClick={() => onEdit(rowData)}
      />
      <Button
        icon="pi pi-trash"
        className="p-button-rounded p-button-danger"
        onClick={() => onDelete(rowData.id)}
      />
    </>
  );

  return (
    <DataTable value={products} paginator rows={5} responsiveLayout="scroll">
      <Column field="name" header="Name" sortable />
      <Column field="price" header="Price" sortable />
      <Column body={actionTemplate} header="Actions" />
    </DataTable>
  );
}
