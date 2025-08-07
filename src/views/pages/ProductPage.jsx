// src/App.js
import React, { useState, useRef } from "react";
import ProductTable from "../../components/todo/ProductTable";
import ProductDialog from "../../components/todo/ProductDialog";
import { Toast } from "primereact/toast";
import { Button } from "primereact/button";

function ProductPage() {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [dialogVisible, setDialogVisible] = useState(false);
  const toast = useRef(null);

  const openNew = () => {
    setProduct({});
    setDialogVisible(true);
  };

  const saveProduct = () => {
    if (product.name && product.price) {
      if (product.id) {
        // Update
        setProducts(products.map((p) => (p.id === product.id ? product : p)));
        toast.current.show({
          severity: "success",
          summary: "Updated",
          detail: "Product updated",
        });
      } else {
        // Create
        product.id = Math.random().toString(36).substr(2, 9);
        setProducts([...products, product]);
        toast.current.show({
          severity: "success",
          summary: "Created",
          detail: "Product created",
        });
      }
      setDialogVisible(false);
    } else {
      toast.current.show({
        severity: "warn",
        summary: "Validation",
        detail: "Name and Price are required",
      });
    }
  };

  const editProduct = (prod) => {
    setProduct({ ...prod });
    setDialogVisible(true);
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    toast.current.show({
      severity: "error",
      summary: "Deleted",
      detail: "Product deleted",
    });
  };

  return (
    <div className="p-m-4">
      <Toast ref={toast} />
      <div className="p-d-flex p-ai-center p-jc-between mb-3">
        <h2>Product CRUD</h2>
        <div className="w-100 d-flex justify-content-end">
          <Button
            label="New"
            icon="pi pi-plus"
            onClick={openNew}
          />
        </div>
      </div>

      <ProductTable
        products={products}
        onEdit={editProduct}
        onDelete={deleteProduct}
      />

      <ProductDialog
        visible={dialogVisible}
        setVisible={setDialogVisible}
        product={product}
        setProduct={setProduct}
        onSave={saveProduct}
      />
    </div>
  );
}

export default ProductPage;
