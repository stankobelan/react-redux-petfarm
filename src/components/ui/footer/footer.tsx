import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { environment } from '../../../config/environment';

/**
 * Footer component for consistent application layout
 * Provides links to important pages and displays copyright information
 */
const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="mb-4">
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Pet Farm Management</h5>
            <p className="text-muted small">
              A comprehensive solution for managing farms and their pets efficiently. Keep track of
              all your animals with ease.
            </p>
          </Col>

          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <Link to="/" className="text-light text-decoration-none">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/create-farm" className="text-light text-decoration-none">
                  Create Farm
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-light text-decoration-none">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-light text-decoration-none">
                  Contact Us
                </Link>
              </li>
            </ul>
          </Col>

          <Col md={4}>
            <h5>Connect With Us</h5>
            <div className="d-flex">
              <a href="#" className="text-light me-3">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="text-light me-3">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="text-light">
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </Col>
        </Row>

        <hr className="bg-secondary" />

        <Row>
          <Col className="text-center">
            <p className="mb-0 small text-muted">
              &copy; {currentYear} Pet Farm Management. All rights reserved.
              <span className="ms-2">v{environment.appVersion}</span>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
