import React, { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Routes, Route, Link } from 'react-router-dom';

import ListOfFarms from '../../farms/listOfFarms';
import EditFarm from '../../farms/edit-item/edit-farm';
import CreateFarm from '../../farms/edit-item/create-farm';
import ListOfPets from '../../pets/list-of-pets';
import About from '../About/About';
import ContactFormular from '../contact/contact';

/**
 * Main navigation component with routing configuration
 * Provides navigation links and defines available routes
 */
const NavbarPage: React.FC = () => {
  const [expanded, setExpanded] = useState<boolean>(false);

  const toggleNavbar = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <Navbar bg="primary" variant="dark" expand="md" expanded={expanded}>
        <Container>
          <Navbar.Brand as={Link} to="/">
            Pet Farming App
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={toggleNavbar} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" onClick={() => setExpanded(false)}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/create-farm" onClick={() => setExpanded(false)}>
                Create Farm
              </Nav.Link>
              <Nav.Link as={Link} to="/about" onClick={() => setExpanded(false)}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact" onClick={() => setExpanded(false)}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<ListOfFarms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactFormular />} />
          <Route path="/edit-farm/:id" element={<EditFarm />} />
          <Route path="/create-farm" element={<CreateFarm />} />
          <Route path="/farm-pets/:id" element={<ListOfPets />} />
          <Route path="*" element={<h1>Page not found</h1>} />
        </Routes>
      </Container>
    </>
  );
};

export default NavbarPage;
