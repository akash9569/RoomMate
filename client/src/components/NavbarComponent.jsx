import React, { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container, Dropdown } from 'react-bootstrap';
import { BsPersonCircle } from 'react-icons/bs';
import { useLocation } from 'react-router-dom'; // 👈 for route detection
import AuthModal from './AuthModal';

const NavbarComponent = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation(); // 👈 current route
  const isHomePage = location.pathname === '/'; // 👈 check if on home page

  // Scroll effect only for home page
  useEffect(() => {
    if (!isHomePage) return; // 👈 no scroll effect for other pages

    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

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
      <Navbar
        expand="lg"
        fixed="top"
        variant="dark"
        className={`p-3 w-100 transition-navbar ${
          isHomePage
            ? scrolled
              ? 'bg-dark shadow-sm'
              : 'bg-transparent'
            : 'bg-dark shadow-sm'
        }`}
        style={{ zIndex: 10 }}
      >
        <Container>
          <Navbar.Brand href="/" className="fw-bold">
            RoomMate
          </Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center">
            <Button variant="outline-light" className="me-3">
              Post Listing
            </Button>

            <Nav.Link href="#" className="text-white me-3">
              Find A Room
            </Nav.Link>

            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                id="profile-dropdown"
                className="text-white p-0"
              >
                <BsPersonCircle size={24} style={{ marginBottom: '2px' }} />
              </Dropdown.Toggle>

              <Dropdown.Menu data-bs-theme="dark" align="end">
                <Dropdown.Header>My Account</Dropdown.Header>
                <Dropdown.Item onClick={() => setShowLogin(true)}>
                  Login
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setShowRegister(true)}>
                  Register
                </Dropdown.Item>
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
