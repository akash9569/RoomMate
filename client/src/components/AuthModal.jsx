import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const AuthModal = ({ show, handleClose, isLogin, onSwitch }) => {
  const title = isLogin ? "Log In" : "Register";
  const switchText = isLogin 
    ? "Don't have an account? Register" 
    : "Already have an account? Log In";

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title} to FindMyRoom</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Email Field */}
          <Form.Group className="mb-3" controlId={`${isLogin ? 'login' : 'register'}Email`}>
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
          </Form.Group>

          {/* Password Field */}
          <Form.Group className="mb-3" controlId={`${isLogin ? 'login' : 'register'}Password`}>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          {/* Registration specific field */}
          {!isLogin && (
            <Form.Group className="mb-3" controlId="registerName">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" required />
            </Form.Group>
          )}

          {/* Submit Button */}
          <div className="d-grid gap-2">
            <Button variant="primary" type="submit" className="mt-3">
              {title}
            </Button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        {/* Switch Link */}
        <Button variant="link" onClick={onSwitch}>
          {switchText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AuthModal;