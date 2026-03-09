import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Container, Row, Col, Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { BsCheckCircle, BsShieldLock, BsPerson, BsCreditCard, BsCalendar, BsLock, BsWallet2, BsBank, BsShieldCheck, BsArrowLeft, BsClock } from "react-icons/bs";
import { useTheme } from "../context/ThemeContext";
import "./PaymentPage.css";

const PaymentPage = () => {
    const { id } = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { theme } = useTheme();
    const { bookingData, listing } = location.state || {};
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);


    const [paymentMethod, setPaymentMethod] = useState("card");

    // Form inputs state
    const [cardName, setCardName] = useState("");
    const [cardNumber, setCardNumber] = useState("");
    const [expiryDate, setExpiryDate] = useState("");
    const [cvv, setCvv] = useState("");
    const [upiId, setUpiId] = useState("");

    useEffect(() => {
        if (!bookingData || !listing) {
            navigate("/all-listings");
        }
    }, [bookingData, listing, navigate]);

    // Validation Handlers
    const handleNameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            setCardName(value);
        }
    };

    const handleCardNumberChange = (e) => {
        const value = e.target.value.replace(/\D/g, '');
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        if (value.length <= 16) {
            setCardNumber(formattedValue);
        }
    };

    const handleExpiryChange = (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 4) return;
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2);
        }
        setExpiryDate(value);
    };

    const handleCvvChange = (e) => {
        const value = e.target.value;
        if (/^[0-9]*$/.test(value) && value.length <= 4) {
            setCvv(value);
        }
    };

    const handlePayment = async () => {
        setLoading(true);
        setError(null);

        if (paymentMethod === "card") {
            if (!cardName || cardNumber.replace(/\s/g, '').length < 16 || expiryDate.length < 5 || cvv.length < 3) {
                setError("Please fill in all card details correctly.");
                setLoading(false);
                return;
            }
        } else {
            if (!upiId) {
                setError("Please enter a valid UPI ID.");
                setLoading(false);
                return;
            }
        }

        setTimeout(async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await fetch(`http://localhost:3000/api/listings/${id}/book`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        ...bookingData,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccess(true);
                    setTimeout(() => {
                        navigate("/profile");
                    }, 3000);
                } else {
                    setError(data.message || "Payment failed. Please try again.");
                }
            } catch (err) {
                setError("Failed to connect to server.");
            } finally {
                setLoading(false);
            }
        }, 2000);
    };

    if (!listing) return null;

    if (success) {
        return (
            <>
                <NavbarComponent />
                <Container className={`py-5 mt-5 ${theme === 'dark' ? 'text-light' : ''}`}>
                    <div className="payment-success-container">
                        <div className="success-icon-wrapper">
                            <BsCheckCircle size={48} className="text-success" />
                        </div>
                        <h2 className="fw-bold mb-2">Payment Successful!</h2>
                        <p className="text-muted lead mb-1">Your room has been successfully booked.</p>
                        <p className="text-muted small">Redirecting you to your profile...</p>
                        <div className="mt-3">
                            <Spinner animation="border" size="sm" variant="success" />
                        </div>
                    </div>
                </Container>
                <Footer />
            </>
        );
    }

    return (
        <>
            <NavbarComponent />
            <div className={`payment-page-container pt-5 mt-5 ${theme === 'dark' ? 'dark-mode text-light' : ''}`}>
                <Container className="py-4 py-md-5">

                    {/* Header Section */}
                    <div className="text-center mb-4">
                        <div className="payment-header-badge mb-3">
                            <BsShieldCheck size={14} /> Secure Checkout
                        </div>
                        <h2 className="fw-bold mb-1" style={{ fontSize: '1.8rem' }}>Complete Your Booking</h2>
                        <p className="text-muted mb-0 small">Your payment is encrypted and securely processed</p>
                    </div>

                    {/* Checkout Progress Steps */}
                    <div className="d-flex justify-content-center mb-5">
                        <div className="checkout-steps">
                            <div className="checkout-step completed">
                                <span className="step-dot"></span>
                                <span>Details</span>
                            </div>
                            <div className="step-connector" style={{ background: '#059669' }}></div>
                            <div className="checkout-step active">
                                <span className="step-dot"></span>
                                <span>Payment</span>
                            </div>
                            <div className="step-connector"></div>
                            <div className="checkout-step">
                                <span className="step-dot"></span>
                                <span>Confirmation</span>
                            </div>
                        </div>
                    </div>

                    <Row className="g-4 g-lg-5">
                        {/* Left Column: Payment Details */}
                        <Col lg={7}>
                            <div className="glass-card p-4 p-md-5 mb-4">
                                {/* Payment Method Selection */}
                                <div className="section-label">
                                    <BsWallet2 /> Choose Payment Method
                                </div>

                                <div className="row g-3 mb-4">
                                    <div className="col-6">
                                        <div
                                            className={`payment-method-card p-3 d-flex align-items-center ${paymentMethod === "card" ? "active" : ""}`}
                                            onClick={() => setPaymentMethod("card")}
                                        >
                                            <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{ width: 42, height: 42, background: 'linear-gradient(135deg, rgba(99,102,241,0.12), rgba(99,102,241,0.06))' }}>
                                                <BsCreditCard style={{ color: '#6366f1' }} size={18} />
                                            </div>
                                            <div>
                                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>Card</div>
                                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>Credit / Debit</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-6">
                                        <div
                                            className={`payment-method-card p-3 d-flex align-items-center ${paymentMethod === "upi" ? "active" : ""}`}
                                            onClick={() => setPaymentMethod("upi")}
                                        >
                                            <div className="d-flex align-items-center justify-content-center rounded-circle me-3"
                                                style={{ width: 42, height: 42, background: 'linear-gradient(135deg, rgba(5,150,105,0.12), rgba(5,150,105,0.06))' }}>
                                                <BsWallet2 style={{ color: '#059669' }} size={18} />
                                            </div>
                                            <div>
                                                <div className="fw-bold" style={{ fontSize: '0.9rem' }}>UPI</div>
                                                <small className="text-muted" style={{ fontSize: '0.75rem' }}>GPay, PhonePe, etc.</small>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <hr className="my-4" style={{ opacity: 0.08 }} />

                                {/* Security Info */}
                                <div className="security-banner d-flex align-items-center mb-4">
                                    <BsShieldLock className="text-success me-3 flex-shrink-0" size={20} />
                                    <div>
                                        <div className="fw-bold small">Bank-Level Security</div>
                                        <div className="text-muted" style={{ fontSize: '0.75rem' }}>256-bit SSL Encrypted • PCI DSS Compliant</div>
                                    </div>
                                </div>

                                {/* Card Form */}
                                <Form>
                                    {paymentMethod === "card" ? (
                                        <div>
                                            <div className="section-label">
                                                <BsCreditCard /> Card Details
                                            </div>

                                            <Form.Group className="mb-4" controlId="cardName">
                                                <Form.Label className="fw-semibold small text-muted">Cardholder Name</Form.Label>
                                                <div className="input-icon-wrapper">
                                                    <BsPerson className="input-icon" />
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="John Doe"
                                                        className="modern-input with-icon"
                                                        value={cardName}
                                                        onChange={handleNameChange}
                                                    />
                                                </div>
                                            </Form.Group>

                                            <Form.Group className="mb-4" controlId="cardNumber">
                                                <Form.Label className="fw-semibold small text-muted">Card Number</Form.Label>
                                                <div className="input-icon-wrapper">
                                                    <BsCreditCard className="input-icon" />
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="0000 0000 0000 0000"
                                                        className="modern-input with-icon"
                                                        value={cardNumber}
                                                        onChange={handleCardNumberChange}
                                                        maxLength="19"
                                                    />
                                                </div>
                                                <div className="accepted-cards mt-2">
                                                    <span className="card-brand">VISA</span>
                                                    <span className="card-brand">MASTERCARD</span>
                                                    <span className="card-brand">RUPAY</span>
                                                    <span className="card-brand">AMEX</span>
                                                </div>
                                            </Form.Group>

                                            <Row className="g-3">
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="expiryDate">
                                                        <Form.Label className="fw-semibold small text-muted">Expiry Date</Form.Label>
                                                        <div className="input-icon-wrapper">
                                                            <BsCalendar className="input-icon" />
                                                            <Form.Control
                                                                type="text"
                                                                placeholder="MM/YY"
                                                                className="modern-input with-icon"
                                                                value={expiryDate}
                                                                onChange={handleExpiryChange}
                                                                maxLength="5"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                                <Col md={6}>
                                                    <Form.Group className="mb-4" controlId="cvv">
                                                        <Form.Label className="fw-semibold small text-muted">CVV / CVC</Form.Label>
                                                        <div className="input-icon-wrapper">
                                                            <BsLock className="input-icon" />
                                                            <Form.Control
                                                                type="password"
                                                                placeholder="•••"
                                                                className="modern-input with-icon"
                                                                value={cvv}
                                                                onChange={handleCvvChange}
                                                                maxLength="4"
                                                            />
                                                        </div>
                                                    </Form.Group>
                                                </Col>
                                            </Row>
                                        </div>
                                    ) : (
                                        <div>
                                            <div className="section-label">
                                                <BsBank /> UPI Payment
                                            </div>

                                            <Form.Group className="mb-4" controlId="upiId">
                                                <Form.Label className="fw-semibold small text-muted">UPI ID</Form.Label>
                                                <div className="input-icon-wrapper">
                                                    <BsBank className="input-icon" />
                                                    <Form.Control
                                                        type="text"
                                                        placeholder="yourname@upi"
                                                        className="modern-input with-icon"
                                                        value={upiId}
                                                        onChange={(e) => setUpiId(e.target.value)}
                                                    />
                                                </div>
                                                <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>
                                                    Enter your UPI ID linked to Google Pay, PhonePe, Paytm, or any UPI app
                                                </Form.Text>
                                            </Form.Group>

                                            <div className="d-flex gap-2 flex-wrap">
                                                <span className="card-brand">Google Pay</span>
                                                <span className="card-brand">PhonePe</span>
                                                <span className="card-brand">Paytm</span>
                                                <span className="card-brand">BHIM</span>
                                            </div>
                                        </div>
                                    )}
                                </Form>
                            </div>
                        </Col>

                        {/* Right Column: Order Summary */}
                        <Col lg={5}>
                            <div className="glass-card p-4 sticky-order-summary">

                                <div className="section-label">
                                    📋 Order Summary
                                </div>

                                {/* Listing Preview */}
                                <div className="d-flex align-items-center mb-4 p-3 rounded-3"
                                    style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.02)' }}>
                                    <img
                                        src={listing.images[0] || "https://via.placeholder.com/150"}
                                        alt={listing.title}
                                        className="rounded-3 me-3 shadow-sm"
                                        style={{ width: "70px", height: "70px", objectFit: "cover" }}
                                    />
                                    <div>
                                        <h6 className="fw-bold mb-1" style={{ fontSize: '0.9rem' }}>{listing.title}</h6>
                                        <div className="d-flex align-items-center gap-1">
                                            <BsCheckCircle className="text-success" size={11} />
                                            <small className="text-success fw-bold" style={{ fontSize: '0.72rem' }}>Verified Listing</small>
                                        </div>
                                        <small className="text-muted d-block" style={{ fontSize: '0.75rem' }}>{listing.location}</small>
                                    </div>
                                </div>

                                {/* Booking Details */}
                                {bookingData && (
                                    <div className="mb-3 p-3 rounded-3" style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.015)' }}>
                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted">Move-in</small>
                                            <small className="fw-bold">{bookingData.moveInDate || '—'}</small>
                                        </div>
                                        <div className="d-flex justify-content-between mb-2">
                                            <small className="text-muted">Duration</small>
                                            <small className="fw-bold">{bookingData.duration} {bookingData.duration == 1 ? 'month' : 'months'}</small>
                                        </div>
                                        <div className="d-flex justify-content-between">
                                            <small className="text-muted">Guests</small>
                                            <small className="fw-bold">{bookingData.guests}</small>
                                        </div>
                                    </div>
                                )}

                                {/* Price Breakdown */}
                                <div className="summary-item d-flex justify-content-between">
                                    <span className="text-muted small">Rent per month</span>
                                    <span className="fw-bold">₹{listing.price.toLocaleString()}</span>
                                </div>
                                <div className="summary-item d-flex justify-content-between">
                                    <span className="text-muted small">Service Fee</span>
                                    <span className="fw-bold text-success">Free</span>
                                </div>
                                <div className="summary-item d-flex justify-content-between">
                                    <span className="text-muted small">Booking Fee</span>
                                    <span className="fw-bold">₹0</span>
                                </div>

                                {/* Total Amount */}
                                <div className="total-amount-box d-flex justify-content-between align-items-center mt-3 mb-4">
                                    <span className="fw-bold" style={{ color: '#6366f1' }}>Total Amount</span>
                                    <span className="fw-bold" style={{ fontSize: '1.4rem', color: '#6366f1' }}>₹{listing.price.toLocaleString()}</span>
                                </div>

                                {error && <Alert variant="danger" className="mb-3 rounded-3 border-0 shadow-sm small">{error}</Alert>}

                                {/* Pay Button */}
                                <Button
                                    className="w-100 py-3 pay-btn-gradient"
                                    size="lg"
                                    onClick={handlePayment}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Spinner animation="border" size="sm" className="me-2" />
                                            Processing Payment...
                                        </>
                                    ) : (
                                        <>
                                            <BsLock className="me-2" size={16} />
                                            Pay ₹{listing.price.toLocaleString()} Securely
                                        </>
                                    )}
                                </Button>

                                {/* Trust Badges */}
                                <div className="trust-badges mt-3">
                                    <div className="trust-badge-item">
                                        <BsLock size={12} /> Encrypted
                                    </div>
                                    <div className="trust-badge-item">
                                        <BsShieldCheck size={12} /> Verified
                                    </div>
                                    <div className="trust-badge-item">
                                        <BsClock size={12} /> Instant
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Footer />
        </>
    );
};

export default PaymentPage;
