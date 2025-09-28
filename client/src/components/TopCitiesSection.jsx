import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TopCitiesSection = () => {
  // Dummy data for cities
  const cities = ['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Pune', 'Hyderabad', 'Kolkata', 'Ahmedabad'];

  return (
    <Container className="my-5 py-3">
      <h2 className="mb-2">Our Top Cities</h2>
      <p className="text-muted mb-5">
        Choose The City You'll Be Living In Next, Or Look For Flatmates And Rooms Near You
      </p>

      <Row className="g-4">
        {cities.map((city, index) => (
          // Renders 4 cards per row on large screens, 2 on medium, 1 on small
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="shadow-sm border-0 h-100">
              {/* Placeholder for the City Image */}
              <div 
                style={{ 
                  height: '180px', 
                  backgroundColor: '#f8f9fa', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: '#6c757d'
                }}
              >
                [Image Placeholder for {city}]
              </div>
              <Card.Body>
                <Card.Title className="text-center">{city}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
export default TopCitiesSection;