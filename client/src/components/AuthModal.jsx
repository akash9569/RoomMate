import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const AuthModal = ({ show, handleClose, isLogin, onSwitch, onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Allowed users
  const allowedUsers = [
    { email: "akash@gmail.com", password: "123456" },
    { email: "admin@gmail.com", password: "admin123" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isLogin) {
      const user = allowedUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (user) {
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("userEmail", email);
        alert("✅ Login Successful!");
        onLoginSuccess(true);
        handleClose();
      } else {
        alert("❌ Invalid credentials. Use authorized accounts only.");
      }
    } else {
      alert("📝 Registration disabled. Only admins can login.");
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {isLogin ? "Login to RoomMate" : "Register (Admins Only)"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button type="submit" className="w-100 mt-2" variant="primary">
            {isLogin ? "Login" : "Register"}
          </Button>

          <div className="text-center mt-3">
            <small>
              {isLogin ? (
                <>
                  Don't have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={onSwitch}
                  >
                    Register
                  </span>
                </>
              ) : (
                <>
                  Already have an account?{" "}
                  <span
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={onSwitch}
                  >
                    Login
                  </span>
                </>
              )}
            </small>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AuthModal;
