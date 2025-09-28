import React from 'react';
import { Container, Row, Col, Form, FormControl } from 'react-bootstrap';

// Background image URL
const HERO_IMAGE_URL = 'https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D';

const HeroSection = () => (
  // Hero Container with Background Image and required positioning
  <div 
    style={{
      backgroundImage: `url('${HERO_IMAGE_URL}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      minHeight: '100vh',
      position: 'relative', // Needed for the absolute positioning of the overlay
      display: 'flex', 
      alignItems: 'center', 
      textAlign: 'center',
      paddingTop: '60px' // Offset the fixed navbar
    }}
    className="text-white p-5"
  >
    {/* Dark Overlay (Absolute positioned div to mimic ::before) */}
    <div 
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Darkens the image for text readability
        zIndex: 0,
      }}
    ></div>
    
    {/* Content Container */}
    <Container style={{ zIndex: 1 }}>
      <p className="mb-2 fs-5">10000+ Rooms and Flatmates Available Now Across India</p>
      
      <Row className="justify-content-center mb-5 mt-3">
        <Col md={6}>
          <Form>
            <FormControl 
              type="search" 
              placeholder="Search by Locality" 
              className="py-3 px-4 rounded-pill shadow-lg border-0" 
              aria-label="Search" 
            />
          </Form>
        </Col>
      </Row>
      
      <h1 className="display-4 fw-bold mt-5">Find A Room / Roommate Now</h1>
    </Container>
  </div>
);
export default HeroSection;