import React, { useState, useEffect } from "react";
import { Container, Card, ListGroup, Button, Form, Modal, Alert } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { BsShieldLock, BsBell, BsTrash, BsArrowLeft, BsMoon, BsSun, BsSearch, BsWallet2, BsCalendarCheck } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
    const navigate = useNavigate();
    const { theme, toggleTheme } = useTheme();
    const { user, token, updateUser, logout } = useAuth();

    // Notification states
    const [pushNotifs, setPushNotifs] = useState(user?.pushNotifications ?? true);
    const [emailNotifs, setEmailNotifs] = useState(user?.emailNotifications ?? true);

    // Advanced Roommate states
    const [lookingForRoommate, setLookingForRoommate] = useState(user?.lookingForRoommate ?? true);

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
            <Container className="py-5 mt-5" style={{ maxWidth: "850px" }}>
                <div className="d-flex align-items-center justify-content-between mb-5">
                    <h2 className="mb-0 fw-bold" style={{ letterSpacing: "-0.5px" }}>Settings</h2>
                </div>

                <Card className={`shadow-sm border-0 mb-5 rounded-4 overflow-hidden ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <Card.Header className={`fw-bold py-3 px-4 border-bottom-0 fs-5 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}`}>
                        Appearance
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(13, 110, 253, 0.2)' : 'rgba(13, 110, 253, 0.1)' }}>
                                    {theme === "dark" ? <BsMoon className="text-primary" size={22} /> : <BsSun className="text-warning" size={22} />}
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Dark Mode</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Switch between light and dark themes.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="theme-switch"
                                checked={theme === "dark"}
                                onChange={toggleTheme}
                                className="fs-5"
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className={`shadow-sm border-0 mb-5 rounded-4 overflow-hidden ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <Card.Header className={`fw-bold py-3 px-4 border-bottom-0 fs-5 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}`}>
                        Roommate Preferences
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(13, 202, 240, 0.2)' : 'rgba(13, 202, 240, 0.1)' }}>
                                    <BsSearch className="text-info" size={22} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Looking for Roommates</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Make your profile visible to others searching for roommates.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="looking-for-roommates"
                                checked={lookingForRoommate}
                                onChange={(e) => setLookingForRoommate(e.target.checked)}
                                className="fs-5"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(111, 66, 193, 0.2)' : 'rgba(111, 66, 193, 0.1)' }}>
                                    <BsWallet2 size={22} style={{ color: '#6f42c1' }} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Budget Range</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Update your monthly budget range to get better matches.</small>
                                </div>
                            </div>
                            <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} className="rounded-pill px-4" size="sm">
                                Configure
                            </Button>
                        </ListGroup.Item>
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(214, 51, 132, 0.2)' : 'rgba(214, 51, 132, 0.1)' }}>
                                    <BsCalendarCheck size={22} style={{ color: '#d63384' }} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Move-in Date</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Set your preferred move-in timeline.</small>
                                </div>
                            </div>
                            <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} className="rounded-pill px-4" size="sm">
                                Configure
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className={`shadow-sm border-0 mb-5 rounded-4 overflow-hidden ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <Card.Header className={`fw-bold py-3 px-4 border-bottom-0 fs-5 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}`}>
                        Account Security
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(25, 135, 84, 0.2)' : 'rgba(25, 135, 84, 0.1)' }}>
                                    <BsShieldLock className="text-success" size={22} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Change Password</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Update your password regularly to keep your account secure.</small>
                                </div>
                            </div>
                            <Button variant={theme === 'dark' ? 'outline-light' : 'outline-dark'} className="rounded-pill px-4" size="sm" onClick={() => setShowPasswordModal(true)}>
                                Update
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className={`shadow-sm border-0 mb-5 rounded-4 overflow-hidden ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <Card.Header className={`fw-bold py-3 px-4 border-bottom-0 fs-5 ${theme === 'dark' ? 'bg-dark text-light border-secondary' : 'bg-light text-dark'}`}>
                        Notifications
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(255, 193, 7, 0.2)' : 'rgba(255, 193, 7, 0.1)' }}>
                                    <BsBell className="text-warning" size={22} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Push Notifications</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Receive updates about new listings and messages.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="push-notifications"
                                checked={pushNotifs}
                                onChange={(e) => handleToggleNotification('push', e.target.checked)}
                                className="fs-5"
                            />
                        </ListGroup.Item>
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 ${theme === 'dark' ? 'bg-dark text-light border-top border-secondary' : 'bg-white border-top'}`}>
                            <div className="d-flex align-items-center">
                                <div className="p-2 rounded-circle bg-opacity-10 me-3" style={{ backgroundColor: theme === 'dark' ? 'rgba(108, 117, 125, 0.2)' : 'rgba(108, 117, 125, 0.1)' }}>
                                    <BsBell className="text-secondary" size={22} />
                                </div>
                                <div>
                                    <div className="fw-semibold mb-1 fs-6">Email Notifications</div>
                                    <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Receive weekly newsletters and account alerts.</small>
                                </div>
                            </div>
                            <Form.Check
                                type="switch"
                                id="email-notifications"
                                checked={emailNotifs}
                                onChange={(e) => handleToggleNotification('email', e.target.checked)}
                                className="fs-5"
                            />
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

                <Card className={`shadow-sm border-1 border-danger mb-5 rounded-4 overflow-hidden ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                    <Card.Header className="bg-danger bg-opacity-10 text-danger fw-bold py-3 px-4 border-bottom-0 fs-5">
                        Danger Zone
                    </Card.Header>
                    <ListGroup variant="flush">
                        <ListGroup.Item className={`d-flex justify-content-between align-items-center py-4 px-4 border-0 border-top border-danger border-opacity-25 ${theme === 'dark' ? 'bg-dark' : 'bg-white'}`}>
                            <div>
                                <div className="fw-bold text-danger mb-1 fs-6">Delete Account</div>
                                <small className={`${theme === 'dark' ? 'text-secondary' : 'text-muted'}`}>Permanently remove your account and all data.</small>
                            </div>
                            <Button variant="danger" className="rounded-pill px-4 py-2 fw-semibold" onClick={() => setShowDeleteModal(true)}>
                                <BsTrash className="me-2" /> Delete Account
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
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
