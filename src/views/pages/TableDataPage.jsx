import React, { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Avatar } from 'primereact/avatar';
import { Card } from 'primereact/card';
import "primereact/resources/themes/bootstrap4-light-purple/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

const TableDataPage = () => {
  const [currentPage, setCurrentPage] = useState(3);
  const totalPages = 5;
  const entriesPerPage = 5;
  const totalEntries = 25;

  // Sample data matching the image
  const tableData = [
    {
      id: 1,
      user: {
        name: 'Michael Holz',
        avatar: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg'
      },
      date: 'Jun 15,2020',
      status: 'Completed',
      statusVariant: 'success'
    },
    {
      id: 2,
      user: {
        name: 'Paula Wilson',
        avatar: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg'
      },
      date: 'Jun 21,2020',
      status: 'Cancelled',
      statusVariant: 'danger'
    },
    {
      id: 3,
      user: {
        name: 'Antonio Moreno',
        avatar: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg'
      },
      date: 'Jun 4,2020',
      status: 'Pending',
      statusVariant: 'warning'
    },
    {
      id: 4,
      user: {
        name: 'Mary Saveley',
        avatar: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg'
      },
      date: 'Jun 16,2020',
      status: 'Completed',
      statusVariant: 'success'
    },
    {
      id: 5,
      user: {
        name: 'Martin Sommer',
        avatar: 'https://www.shutterstock.com/image-vector/abstract-boy-avtar-character-fiction-260nw-2168819879.jpg'
      },
      date: 'Aug 4,2020',
      status: 'Completed',
      statusVariant: 'success'
    }
  ];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const renderPaginationItems = () => {
    const items = [];
    
    // Previous button
    items.push(
      <Pagination.Prev 
        key="prev" 
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
      />
    );

    // Page numbers
    for (let number = 1; number <= totalPages; number++) {
      items.push(
        <Pagination.Item
          key={number}
          active={number === currentPage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    // Next button
    items.push(
      <Pagination.Next 
        key="next" 
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
      />
    );

    return items;
  };

  return (
    <Container fluid className="table-data-page">
      <Card className="shadow-sm">
        <Card.Header className="bg-white border-bottom-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-0 text-muted">Table Data</h5>
            <Button variant="primary" size="sm" className="view-all-btn">
              <i className="fas fa-eye me-1"></i>
              View All Data
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          <Table responsive className="mb-0 table-data-table">
            <thead className="table-light">
              <tr>
                <th className="border-0 text-muted fw-normal">ID</th>
                <th className="border-0 text-muted fw-normal">Users</th>
                <th className="border-0 text-muted fw-normal">Date</th>
                <th className="border-0 text-muted fw-normal">Status</th>
                <th className="border-0 text-muted fw-normal">Action</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="table-row">
                  <td className="align-middle text-muted">{row.id}</td>
                  <td className="align-middle">
                    <div className="d-flex align-items-center">
                      <img
                        src={row.user.avatar}
                        alt={row.user.name}
                        className="user-avatar me-3"
                        width="40"
                        height="40"
                      />
                      <span className="text-dark fw-medium">{row.user.name}</span>
                    </div>
                  </td>
                  <td className="align-middle text-muted">{row.date}</td>
                  <td className="align-middle">
                    <Badge 
                      bg={row.statusVariant} 
                      className="status-badge"
                    >
                      {row.status}
                    </Badge>
                  </td>
                  <td className="align-middle">
                    <div className="action-buttons">
                      <Button 
                        variant="outline-danger" 
                        size="sm" 
                        className="me-2 action-btn delete-btn"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                      <Button 
                        variant="outline-primary" 
                        size="sm" 
                        className="action-btn edit-btn"
                      >
                        <i className="fas fa-edit"></i>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Card.Body>
        
        <Card.Footer className="bg-white border-top-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Showing {entriesPerPage} out of {totalEntries} entries
            </small>
            <Pagination className="mb-0 custom-pagination">
              {renderPaginationItems()}
            </Pagination>
          </div>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default TableDataPage;
