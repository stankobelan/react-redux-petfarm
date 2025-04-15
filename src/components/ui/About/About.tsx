import React from 'react';
import { Container, Card, Row, Col, ListGroup } from 'react-bootstrap';
import { environment } from '../../../config/environment';

/**
 * About page component that displays application information
 */
const About: React.FC = () => {
  return (
    <Container className="py-4">
      <h1 className="mb-4">About Pet Farm Management</h1>

      <Row className="mb-5">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title as="h2">Application Overview</Card.Title>
              <Card.Text>
                Pet Farm Management is a comprehensive application designed to help farm owners
                manage their animals efficiently. The application allows users to keep track of all
                farms, pets, feeding schedules, and important pet statistics.
              </Card.Text>
              <Card.Text>
                Version: <strong>{environment.appVersion}</strong>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card bg="light">
            <Card.Body>
              <Card.Title as="h3">Features</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>Farm Management</ListGroup.Item>
                <ListGroup.Item>Pet Tracking (Dogs & Cats)</ListGroup.Item>
                <ListGroup.Item>Pet Age Statistics</ListGroup.Item>
                <ListGroup.Item>Feeding Schedules</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h3">Technology Stack</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>React 18 with TypeScript</ListGroup.Item>
                <ListGroup.Item>Redux with Redux Toolkit</ListGroup.Item>
                <ListGroup.Item>React Router v6</ListGroup.Item>
                <ListGroup.Item>Bootstrap 5 for UI components</ListGroup.Item>
                <ListGroup.Item>Axios for API communication</ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Body>
              <Card.Title as="h3">Getting Started</Card.Title>
              <Card.Text>
                To get started with Pet Farm Management, create a new farm by clicking on the
                "Create Farm" option in the navigation menu. Once you've created a farm, you can add
                pets to it and start tracking their information.
              </Card.Text>
              <Card.Text>
                For any questions or support needs, please use the Contact page to get in touch with
                our team.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="text-center text-muted">
        <Card.Footer>
          <small>Pet Farm Management © {new Date().getFullYear()}</small>
        </Card.Footer>
      </Card>
    </Container>
  );
};

export default About;
