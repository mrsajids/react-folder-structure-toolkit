import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./TableDataPage.css";

const TableDataPage = () => {
  const [first, setFirst] = useState(0);
  const [rows, setRows] = useState(5);

  // Sample data matching the image
  const tableData = [
    {
      id: 1,
      name: "Michael Holz",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jun 15,2020",
      status: "Completed",
    },
    {
      id: 2,
      name: "Paula Wilson",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jun 21,2020",
      status: "Cancelled",
    },
    {
      id: 3,
      name: "Antonio Moreno",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jun 4,2020",
      status: "Pending",
    },
    {
      id: 4,
      name: "Mary Saveley",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jun 16,2020",
      status: "Completed",
    },
    {
      id: 5,
      name: "Martin Sommer",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Aug 4,2020",
      status: "Completed",
    },
    // Adding more data to demonstrate pagination
    {
      id: 6,
      name: "John Smith",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jul 10,2020",
      status: "Pending",
    },
    {
      id: 7,
      name: "Sarah Johnson",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jul 15,2020",
      status: "Completed",
    },
    {
      id: 8,
      name: "Mike Davis",
      avatar:
        "https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg",
      date: "Jul 20,2020",
      status: "Cancelled",
    },
  ];

  // Template functions for DataTable columns
  const userBodyTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <img
          src={rowData.avatar}
          alt={rowData.name}
          style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid #e9ecef'
          }}
        />
        <span style={{ fontWeight: '500', color: '#212529' }}>{rowData.name}</span>
      </div>
    );
  };

  const statusBodyTemplate = (rowData) => {
    const getStatusStyle = (status) => {
      switch (status) {
        case "Completed":
          return {
            backgroundColor: '#28a745',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          };
        case "Cancelled":
          return {
            backgroundColor: '#dc3545',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          };
        case "Pending":
          return {
            backgroundColor: '#ffc107',
            color: '#212529',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          };
        default:
          return {
            backgroundColor: '#6c757d',
            color: 'white',
            padding: '4px 12px',
            borderRadius: '4px',
            fontSize: '12px',
            fontWeight: '500'
          };
      }
    };

    return (
      <span style={getStatusStyle(rowData.status)}>
        {rowData.status}
      </span>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <div style={{ display: 'flex', gap: '8px' }}>
        <Button
          icon="pi pi-trash"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: '1px solid #dc3545',
            color: '#dc3545'
          }}
          onClick={() => console.log("Delete", rowData.id)}
        />
        <Button
          icon="pi pi-pencil"
          style={{
            width: '32px',
            height: '32px',
            backgroundColor: 'transparent',
            border: '1px solid #007bff',
            color: '#007bff'
          }}
          onClick={() => console.log("Edit", rowData.id)}
        />
      </div>
    );
  };

  const onPageChange = (event) => {
    setFirst(event.first);
    setRows(event.rows);
  };

  const header = (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '20px 24px',
      borderBottom: '1px solid #e9ecef',
      backgroundColor: 'white'
    }}>
      <h5 style={{
        margin: 0,
        color: '#6c757d',
        fontSize: '18px',
        fontWeight: '600'
      }}>
        Table Data
      </h5>
      <Button
        label="View All Data"
        icon="pi pi-eye"
        style={{
          backgroundColor: '#007bff',
          border: '1px solid #007bff',
          color: 'white',
          fontSize: '14px',
          padding: '6px 12px',
          borderRadius: '4px'
        }}
      />
    </div>
  );

  return (
    <div style={{
      padding: '20px',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        overflow: 'hidden'
      }}>
        {header}
        <DataTable
          value={tableData}
          paginator
          rows={rows}
          first={first}
          onPage={onPageChange}
          totalRecords={tableData.length}
          rowsPerPageOptions={[5, 10, 25]}
          scrollable
          style={{ border: 'none' }}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport"
          currentPageReportTemplate="Showing {first} to {last} of {totalRecords} entries"
          paginatorClassName="custom-paginator"
        >
          <Column
            field="id"
            header="ID"
            style={{
              width: '80px',
              color: '#6c757d',
              fontSize: '14px',
              padding: '16px 24px'
            }}
            headerStyle={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              fontWeight: '500',
              fontSize: '14px',
              padding: '16px 24px',
              border: 'none'
            }}
          />
          <Column
            field="name"
            header="Users"
            body={userBodyTemplate}
            style={{ padding: '16px 24px' }}
            headerStyle={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              fontWeight: '500',
              fontSize: '14px',
              padding: '16px 24px',
              border: 'none'
            }}
          />
          <Column
            field="date"
            header="Date"
            style={{
              color: '#6c757d',
              fontSize: '14px',
              padding: '16px 24px'
            }}
            headerStyle={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              fontWeight: '500',
              fontSize: '14px',
              padding: '16px 24px',
              border: 'none'
            }}
          />
          <Column
            field="status"
            header="Status"
            body={statusBodyTemplate}
            style={{ padding: '16px 24px' }}
            headerStyle={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              fontWeight: '500',
              fontSize: '14px',
              padding: '16px 24px',
              border: 'none'
            }}
          />
          <Column
            header="Action"
            body={actionBodyTemplate}
            style={{
              textAlign: 'center',
              padding: '16px 24px'
            }}
            headerStyle={{
              backgroundColor: '#f8f9fa',
              color: '#6c757d',
              fontWeight: '500',
              fontSize: '14px',
              padding: '16px 24px',
              border: 'none',
              textAlign: 'center'
            }}
          />
        </DataTable>
      </div>
    </div>
  );
};

export default TableDataPage;
