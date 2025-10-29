import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';

const TopCitiesSection = () => {
  const cities = [
    { name: 'Mumbai', image: 'https://www.mistay.in/travel-blog/content/images/2021/07/Roam-around-the-top-7-historical-monuments-of-Mumbai--Taj-Mahal-Palace-I-MiStay.jpeg' },
    { name: 'Delhi', image: 'https://tse3.mm.bing.net/th/id/OIP.nolG_jwRXPmDOY5FxtYKqgHaE8?pid=Api&P=0&h=180' },
    { name: 'Bangalore', image: 'https://tse1.mm.bing.net/th/id/OIP.igtL4RXKYWSs3je_CIsG3AHaEP?pid=Api&P=0&h=180' },
    { name: 'Chennai', image: 'https://tse4.mm.bing.net/th/id/OIP.YtQ7U6OlbjPOWCIa3Qw86QHaEK?pid=Api&P=0&h=180' },
    { name: 'Pune', image: 'https://leavenlicense.com/assets/uploads/media-uploader/pune-city-31628703864.jpg' },
    { name: 'Hyderabad', image: 'https://tse4.mm.bing.net/th/id/OIP._wcJ9CMsQsofd7ZCa2lZAwHaE0?pid=Api&P=0&h=180' },
    { name: 'Kolkata', image: 'https://im.whatshot.in/img/2019/Dec/howrah-bridge-1576819565.jpg' },
    { name: 'Ahmedabad', image: 'https://tse4.mm.bing.net/th/id/OIP.wltMT3_t34d6lUfvWnv3swHaDj?pid=Api&P=0&h=180' },
  ];

  return (
    <Container className="my-5 py-3">
      <h2 className="mb-2">Our Top Cities</h2>
      <p className="text-muted mb-5">
        Choose The City You'll Be Living In Next, Or Look For Flatmates And Rooms Near You
      </p>

      <Row className="g-4">
        {cities.map((city, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="shadow-sm border-0 h-100">
              {/* City Image */}
              <Card.Img
                variant="top"
                src={city.image}
                alt={city.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <Card.Body>
                <Card.Title className="text-center">{city.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default TopCitiesSection;
