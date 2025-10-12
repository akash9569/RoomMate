import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Dropdown } from "react-bootstrap";
import { BsPersonCircle } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import AuthModal from "./AuthModal";

const NavbarComponent = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const [scrolled, setScrolled] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

  // ✅ Scroll effect only for homepage
  useEffect(() => {
    if (!isHomePage) return;
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // ✅ Handle successful login
  const handleLoginSuccess = (redirectToPost = false) => {
    setIsAuthenticated(true);
    setShowAuthModal(false);

    if (redirectToPost) {
      navigate("/postlisting");
    }
  };

  // ✅ Logout function
  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userEmail");
    setIsAuthenticated(false);
    navigate("/");
  };

  // ✅ Handle Post Listing button click
  const handlePostListing = () => {
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    if (!isLoggedIn) {
      setIsLoginMode(true);
      setShowAuthModal(true);
      localStorage.setItem("redirectAfterLogin", "postlisting");
      return;
    }
    navigate("/postlisting");
  };

  // ✅ After login, redirect automatically if login was triggered from Post Listing
  useEffect(() => {
    const redirect = localStorage.getItem("redirectAfterLogin");
    if (isAuthenticated && redirect === "postlisting") {
      localStorage.removeItem("redirectAfterLogin");
      navigate("/postlisting");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        variant="dark"
        className={`p-3 w-100 transition-navbar ${
          isHomePage
            ? scrolled
              ? "bg-dark shadow-sm"
              : "bg-transparent"
            : "bg-dark shadow-sm"
        }`}
        style={{ zIndex: 10 }}
      >
        <Container>
          <Navbar.Brand
            onClick={() => navigate("/")}
            className="fw-bold text-white"
            style={{ cursor: "pointer" }}
          >
            RoomMate
          </Navbar.Brand>

          <Nav className="ms-auto d-flex align-items-center">
            <Button
              variant="outline-light"
              className="me-3"
              onClick={handlePostListing}
            >
              Post Listing
            </Button>

            <Nav.Link href="#" className="text-white me-3">
              Find A Room
            </Nav.Link>

            <Dropdown align="end">
              <Dropdown.Toggle
                variant="link"
                id="profile-dropdown"
                className="text-white p-0"
              >
                <BsPersonCircle size={24} />
              </Dropdown.Toggle>

              <Dropdown.Menu data-bs-theme="dark">
                {!isAuthenticated ? (
                  <>
                    <Dropdown.Header>My Account</Dropdown.Header>
                    <Dropdown.Item
                      onClick={() => {
                        setIsLoginMode(true);
                        setShowAuthModal(true);
                      }}
                    >
                      Login
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        setIsLoginMode(false);
                        setShowAuthModal(true);
                      }}
                    >
                      Register
                    </Dropdown.Item>
                  </>
                ) : (
                  <>
                    <Dropdown.Item onClick={handleLogout}>
                      Logout
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href="#">My Listings</Dropdown.Item>
                  </>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Container>
      </Navbar>

      {/* 🔐 Auth Modal */}
      <AuthModal
        show={showAuthModal}
        handleClose={() => setShowAuthModal(false)}
        isLogin={isLoginMode}
        onSwitch={() => setIsLoginMode(!isLoginMode)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
};

export default NavbarComponent;
