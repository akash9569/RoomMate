import React, { useState } from 'react';
import { Navbar, Nav, Button, Container, Dropdown, Modal, Form } from 'react-bootstrap';
// Import a Bootstrap Icon for the profile image
import { BsPersonCircle } from 'react-icons/bs'; 

import AuthModal from './AuthModal'; 

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const handleSwitchToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };

  const handleSwitchToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };

  return (
    <>
      <Navbar bg="transparent" variant="dark" expand="lg" className="position-absolute w-100 p-3" style={{ zIndex: 10 }}>
        <Container>
          <Navbar.Brand href="#" className="fw-bold">FindMyRoom</Navbar.Brand>
          <Nav className="ms-auto d-flex align-items-center">
            
            {/* Post Listing Button (White outline on dark background) */}
            <Button variant="outline-light" className="me-3">Post Listing</Button>
            
            {/* Find A Room Link */}
            <Nav.Link href="#" className="text-white me-3">Find A Room</Nav.Link>

            {/* Profile Dropdown with Icon */}
            <Dropdown>
              <Dropdown.Toggle 
                variant="link" 
                id="profile-dropdown" 
                className="text-white p-0"
                // The actual icon replaces the text label
              >
                {/* Profile Icon with a size and margin for better look */}
                <BsPersonCircle size={24} style={{ marginBottom: '2px' }} /> 
              </Dropdown.Toggle>

              {/* Added 'data-bs-theme="dark"' for dark dropdown menu styling */}
              <Dropdown.Menu data-bs-theme="dark" align="end"> 
                <Dropdown.Header>My Account</Dropdown.Header>
                <Dropdown.Item onClick={() => setShowLogin(true)}>Login</Dropdown.Item>
                <Dropdown.Item onClick={() => setShowRegister(true)}>Register</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">My Listings</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

          </Nav>
        </Container>
      </Navbar>

      {/* Login and Registration Modals */}
      <AuthModal 
        show={showLogin} 
        handleClose={() => setShowLogin(false)} 
        isLogin={true}
        onSwitch={handleSwitchToRegister}
      />
      <AuthModal 
        show={showRegister} 
        handleClose={() => setShowRegister(false)} 
        isLogin={false}
        onSwitch={handleSwitchToLogin}
      />
    </>
  );
};

export default NavbarComponent;