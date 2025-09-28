import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const NavbarComponent = () => (
  // Use 'fixed-top' to keep it at the top, and 'p-3' for padding
  <Navbar bg="transparent" variant="dark" expand="lg" className="position-absolute w-100 p-3" style={{ zIndex: 10 }}>
    <Container>
      <Navbar.Brand href="#" className="fw-bold">RoomMate</Navbar.Brand>
      <Nav className="ms-auto">
        <Button variant="outline-light" className="me-3">Post Listing</Button>
        <Nav.Link href="#" className="text-white">Find A Room</Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);
export default NavbarComponent;