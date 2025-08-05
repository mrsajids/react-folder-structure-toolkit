import React from 'react';
import { Container } from 'react-bootstrap';

const Footer = () => (
  <footer className="bg-light text-dark py-3 mt-auto">
    <Container>
      <div className="text-center">&copy; {new Date().getFullYear()} My App. All rights reserved.</div>
    </Container>
  </footer>
);

export default Footer;
