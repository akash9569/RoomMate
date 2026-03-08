import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Form, Modal, Alert } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { BsShieldLock, BsBell, BsTrash, BsArrowLeft, BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, token, updateUser, logout } = useAuth();

    // Notification states
    const [pushNotifs, setPushNotifs] = useState(user?.pushNotifications ?? true);
    const [emailNotifs, setEmailNotifs] = useState(user?.emailNotifications ?? true);

    // Password change states
    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });
    const [pwdMsg, setPwdMsg] = useState({ type: "", text: "" });

    // Delete account states
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    useEffect(() => {
        if (user) {
            setPushNotifs(user.pushNotifications !== undefined ? user.pushNotifications : true);
            setEmailNotifs(user.emailNotifications !== undefined ? user.emailNotifications : true);
        }
    }, [user]);

    const handleToggleNotification = async (type, newValue) => {
        if (type === 'push') setPushNotifs(newValue);
        if (type === 'email') setEmailNotifs(newValue);

        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    [type === 'push' ? 'pushNotifications' : 'emailNotifications']: newValue
                })
            });
            const data = await res.json();
            if (res.ok) {
                updateUser(data);
            }
        } catch (error) {
            console.error("Failed to update notification settings", error);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        setPwdMsg({ type: "", text: "" });

        if (passwords.new !== passwords.confirm) {
            setPwdMsg({ type: "danger", text: "New passwords do not match." });
            return;
        }

        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ password: passwords.new }) // Note: Real apps should verify current password here
            });

            if (res.ok) {
                setPwdMsg({ type: "success", text: "Password updated successfully!" });
                setTimeout(() => {
                    setShowPasswordModal(false);
                    setPasswords({ current: "", new: "", confirm: "" });
                    setPwdMsg({ type: "", text: "" });
                }, 1500);
            } else {
                setPwdMsg({ type: "danger", text: "Failed to update password." });
            }
        } catch (err) {
            setPwdMsg({ type: "danger", text: "Network error occurred." });
        }
    };

    const confirmDeleteAccount = async () => {
        try {
            const res = await fetch("http://localhost:3000/api/auth/profile", {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            if (res.ok) {
                setShowDeleteModal(false);
                logout();
                navigate("/");
            } else {
                alert("Failed to delete account. Please try again.");
                setShowDeleteModal(false);
            }
        } catch (err) {
            alert("Network error. Could not delete account.");
            setShowDeleteModal(false);
        }
    };

    return (
        <>
            <NavbarComponent />
            <Container className="py-5 mt-5" style={{ maxWidth: "800px" }}>
                <div className="d-flex align-items-center mb-4">
                    <Button variant="link" className="text-dark p-0 me-3" onClick={() => navigate("/profile")}>
                        <BsArrowLeft size={24} />
                    </Button>
                    <h2 className="mb-0">Settings</h2>
                </div>

                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-body-tertiary fw-bold py-3">Appearance</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                {theme === "dark" ? <BsMoon className="me-3 text-primary" size={20} /> : <BsSun className="me-3 text-warning" size={20} />}
                                <div>
                                    <div className="fw-medium">Dark Mode</div>
                                    <small className="text-muted">Switch between light and dark themes.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="theme-switch"
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-body-tertiary fw-bold py-3">Account Security</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <BsShieldLock className="me-3 text-primary" size={20} />
                                <div>
                                    <div className="fw-medium">Change Password</div>
                                    <small className="text-muted">Update your password regularly to keep your account secure.</small>
                                </div>
                            </div>
                            <Button variant="outline-primary" size="sm" onClick={() => setShowPasswordModal(true)}>
                                Update
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className="shadow-sm border-0 mb-4">
                    <Card.Header className="bg-body-tertiary fw-bold py-3">Notifications</Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <BsBell className="me-3 text-warning" size={20} />
                                <div>
                                    <div className="fw-medium">Push Notifications</div>
                                    <small className="text-muted">Receive updates about new listings and messages.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="push-notifications"
                                checked={pushNotifs}
                                onChange={(e) => handleToggleNotification('push', e.target.checked)} />
                        </ListGroup.Item>
                        <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                            <div className="d-flex align-items-center">
                                <BsBell className="me-3 text-secondary" size={20} />
                                <div>
                                    <div className="fw-medium">Email Notifications</div>
                                    <small className="text-muted">Receive weekly newsletters and account alerts.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="email-notifications"
                                checked={emailNotifs}
                                onChange={(e) => handleToggleNotification('email', e.target.checked)} />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className="shadow-sm border-0 border-danger">
                    <Card.Header className="bg-danger text-white fw-bold py-3">Danger Zone</Card.Header>
                    <Card.Body>
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <div className="fw-medium text-danger">Delete Account</div>
                                <small className="text-muted">Permanently remove your account and all data.</small>
                            </div>
                            <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
                                <BsTrash className="me-2" /> Delete Account
                            </Button>
                        </div>
                    </Card.Body>
                </Card>
            </Container>

            {/* Change Password Modal */}
            <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered
                contentClassName={theme === 'dark' ? 'bg-dark text-white' : ''}>
                <Modal.Header closeButton closeVariant={theme === 'dark' ? 'white' : undefined}>
                    <Modal.Title>Change Password</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {pwdMsg.text && <Alert variant={pwdMsg.type}>{pwdMsg.text}</Alert>}
                    <Form onSubmit={handlePasswordChange}>
                        <Form.Group className="mb-3">
                            <Form.Label>Current Password</Form.Label>
                            <Form.Control type="password" required
                                value={passwords.current}
                                onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                                className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>New Password</Form.Label>
                            <Form.Control type="password" required
                                value={passwords.new}
                                onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                                className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''} />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control type="password" required
                                value={passwords.confirm}
                                onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                                className={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''} />
                        </Form.Group>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="outline-secondary" onClick={() => setShowPasswordModal(false)}>Cancel</Button>
                            <Button variant="primary" type="submit">Save Changes</Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Delete Account Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered contentClassName={theme === 'dark' ? 'bg-dark text-white border-secondary' : ''}>
                <Modal.Header closeButton closeVariant={theme === 'dark' ? 'white' : undefined} className="border-bottom-0 pb-0">
                    <Modal.Title className="text-danger fw-bold">Delete Account</Modal.Title>
                </Modal.Header>
                <Modal.Body className="py-4">
                    <p className="mb-0 fs-5">Are you sure you want to <span className="fw-bold text-danger">permanently delete</span> your account?</p>
                    <p className="text-muted mt-2 small">This action cannot be undone. All your data, saved listings, and preferences will be lost forever.</p>
                </Modal.Body>
                <Modal.Footer className="border-top-0 pt-0">
                    <Button variant="outline-secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteAccount}>
                        <BsTrash className="me-2" /> Yes, Delete My Account
                    </Button>
                </Modal.Footer>
            </Modal>

            <Footer />
        </>
    );
};

export default SettingsPage;
