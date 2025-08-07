// src/components/ProductDialog.js
import React from "react";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import ProductForm from "./ProductForm";

export default function ProductDialog({
  visible,
  setVisible,
  product,
  setProduct,
  onSave,
}) {
  const footer = (
    <>
      <Button
        label="Cancel"
        icon="pi pi-times"
        className="p-button-text"
        onClick={() => setVisible(false)}
      />
      <Button
        label="Save"
        icon="pi pi-check"
        onClick={onSave}
      />
    </>
  );

  return (
    <Dialog
      header="Product Details"
      visible={visible}
      style={{ width: "30vw" }}
      footer={footer}
      modal
      onHide={() => setVisible(false)}
    >
      <ProductForm product={product} setProduct={setProduct} />
    </Dialog>
  );
}
