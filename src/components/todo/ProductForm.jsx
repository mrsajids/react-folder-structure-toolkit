// src/components/ProductForm.js
import React from "react";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

export default function ProductForm({ product, setProduct }) {
  return (
    <div className="p-fluid">
      <div className="field">
        <label htmlFor="name">Name</label>
        <InputText
          id="name"
          value={product.name || ""}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="price">Price</label>
        <InputNumber
          id="price"
          value={product.price || 0}
          onValueChange={(e) =>
            setProduct({ ...product, price: e.value || 0 })
          }
          mode="currency"
          currency="USD"
          locale="en-US"
        />
      </div>
    </div>
  );
}
