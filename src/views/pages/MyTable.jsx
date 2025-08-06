import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

export default function MyTable() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // ProductService.getProductsMini().then(data => setProducts(data));

    setProducts(
      Array(20).fill({
        id: 1+Math.floor(Math.random()),
        code:Math.random()*100,
        name: "Bamboo Watch",
        description: "Product Description",
        image: "bamboo-watch.jpg",
        price: 65,
        category: "Accessories",
        quantity: 24,
        inventoryStatus: "INSTOCK",
        rating: 5,
      })
    );
  }, []);

  const getQuantityTemplate = (second) => {
    return (
      <div>
        <img
          src="https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg"
          alt=""
          height={50}
        />
      </div>
    );
  };

  return (
    <div className="card">
      <DataTable
        size="small"
        value={products}
        tableStyle={{ minWidth: "50rem" }}
        paginator
        rows={5} 
        rowsPerPageOptions={[5, 10, 25]}
      >
        <Column field="code" header="Code"></Column>
        <Column field="name" header="Name"></Column>
        <Column field="category" header="Category"></Column>
        <Column field="quantity" body={getQuantityTemplate}></Column>
      </DataTable>
    </div>
  );
}
