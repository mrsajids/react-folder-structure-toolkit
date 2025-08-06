import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';

const Layout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-fill container">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
