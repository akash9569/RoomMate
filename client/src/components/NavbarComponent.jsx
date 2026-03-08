import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Dropdown } from "react-bootstrap";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AuthModal from "./AuthModal";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { FiUser, FiSettings, FiPlusCircle, FiLogOut, FiChevronDown } from "react-icons/fi";
import "./NavbarComponent.css";

const NavbarComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();
  const { theme } = useTheme(); // Get current theme
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false); // Track mobile menu state

  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShowLogin = () => {
    setIsLogin(true);
    setShowAuthModal(true);
    setExpanded(false); // Close menu on action
  };

  const handleShowRegister = () => {
    setIsLogin(false);
    setShowAuthModal(true);
    setExpanded(false);
  };

  const handleCloseAuthModal = () => setShowAuthModal(false);

  const handleSwitchAuth = () => setIsLogin(!isLogin);

  const handleLogout = () => {
    logout();
    navigate("/");
    setExpanded(false);
  };

  const handleNavClick = (path) => {
    navigate(path);
    setExpanded(false); // Close menu on navigation
  };

  // Determine Navbar background and variant based on state and theme
  const getNavbarClass = () => {
    if (isHomePage && !scrolled && !expanded) {
      return "bg-transparent";
    }
    return theme === "dark" ? "bg-dark shadow-sm" : "bg-white shadow-sm";
  };

  const getNavbarVariant = () => {
    if (isHomePage && !scrolled && !expanded) {
      return "dark"; // Always dark text on transparent hero (assuming hero is dark/image)
    }
    return theme; // "dark" or "light" matches the theme
  };

  const getLinkColor = () => {
    if (isHomePage && !scrolled && !expanded) {
      return "text-white";
    }
    return theme === "dark" ? "text-white" : "text-dark";
  };


  return (
    <>
      <Navbar
        expand="lg"
        fixed="top"
        variant={getNavbarVariant()}
        expanded={expanded}
        onToggle={() => setExpanded(!expanded)}
        className={`py-3 transition-navbar ${getNavbarClass()}`}
        style={{
          transition: "background-color 0.3s ease-in-out",
          zIndex: 1030
        }}
      >
        <Container fluid className="px-4 px-md-5">
          <Navbar.Brand
            as={Link}
            to="/"
            className={`fw-bold fs-4 d-flex align-items-center ${getLinkColor()}`}
            onClick={() => setExpanded(false)}
          >
            <span className="text-primary me-1">🏠</span> RoomMate
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={() => setExpanded(expanded ? false : "expanded")} />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link onClick={() => handleNavClick("/")} className={`${getLinkColor()} me-3`}>
                Home
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/all-listings")} className={`${getLinkColor()} me-3`}>
                Find A Room
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/about")} className={`${getLinkColor()} me-3`}>
                About Us
              </Nav.Link>
              <Nav.Link onClick={() => handleNavClick("/contactus")} className={`${getLinkColor()} me-3`}>
                Contact
              </Nav.Link>

              {isAuthenticated ? (
                <Dropdown align="end" className="profile-dropdown">
                  <Dropdown.Toggle
                    variant="link"
                    id="dropdown-basic"
                    className="d-flex align-items-center text-decoration-none border-0"
                  >
                    <div
                      className="avatar-container rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold me-2 overflow-hidden"
                      style={{ width: "35px", height: "35px", fontSize: "14px" }}
                    >
                      {user?.profilePicture ? (
                        <img
                          src={
                            user.profilePicture.startsWith("http")
                              ? user.profilePicture
                              : `${import.meta.env.VITE_API_URL || "http://localhost:3000"}${user.profilePicture}`
                          }
                          alt={user.name}
                          className="w-100 h-100 object-fit-cover"
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "block";
                          }}
                        />
                      ) : (
                        user?.name?.charAt(0).toUpperCase() || "U"
                      )}
                      <span style={{ display: "none" }}>
                        {user?.name?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className={`me-2 fw-medium ${getLinkColor()}`}>
                      {user?.name?.split(' ')[0] || "User"}
                    </span>
                    <FiChevronDown className={getLinkColor()} style={{ fontSize: "0.8rem", opacity: 0.7 }} />
                  </Dropdown.Toggle>

                  <Dropdown.Menu className="profile-dropdown-menu">
                    <div className="profile-menu-header">
                      <span>Signed in as</span>
                      <h6>{user?.name || "User"}</h6>
                    </div>
                    <Dropdown.Item onClick={() => handleNavClick("/profile")}>
                      <FiUser /> Profile
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavClick("/postlisting")}>
                      <FiPlusCircle /> Post a Listing
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => handleNavClick("/settings")}>
                      <FiSettings /> Settings
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      <FiLogOut /> Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <Button variant="primary" onClick={handleShowLogin}>
                  Login / Register
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <AuthModal
        show={showAuthModal}
        handleClose={handleCloseAuthModal}
        isLogin={isLogin}
        onSwitch={handleSwitchAuth}
      />
    </>
  );
};

export default NavbarComponent;
