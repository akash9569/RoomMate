import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge, Spinner, Alert, Modal, Carousel, Form, Toast, ToastContainer } from "react-bootstrap";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import { BsGeoAlt, BsTelephone, BsArrowLeft, BsCheckCircle, BsTrash, BsPencil, BsHeart, BsHeartFill, BsShare } from "react-icons/bs";
import LocalityDashboard from "../components/LocalityDashboard";
import RentPredictor from "../components/RentPredictor";
import AIChatbot from "../components/AIChatbot";

const ListingDetailsPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showBookingModal, setShowBookingModal] = useState(false);
    const [bookingData, setBookingData] = useState({
        fullName: "",
        email: "",
        phone: "",
        aadharNumber: "",
        aadharPhoto: null,
        userImage: null,
        gender: "",
        dob: "",
        permanentAddress: "",
        moveInDate: "",
        duration: "",
        guests: 1,
    });
    const [showTourModal, setShowTourModal] = useState(false);
    const [tourData, setTourData] = useState({
        fullName: "",
        phone: "",
        tourDate: "",
    });
    const [validationErrors, setValidationErrors] = useState({});
    const [tourValidationErrors, setTourValidationErrors] = useState({});
    const [isFavorite, setIsFavorite] = useState(false);
    const [favLoading, setFavLoading] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState("");
    const [toastVariant, setToastVariant] = useState("success");

    const validateForm = () => {
        const errors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\d{10}$/;
        const aadharRegex = /^\d{12}$/;

        if (!emailRegex.test(bookingData.email)) {
            errors.email = "Please enter a valid email address.";
        }
        if (!phoneRegex.test(bookingData.phone)) {
            errors.phone = "Phone number must be exactly 10 digits.";
        }
        if (!aadharRegex.test(bookingData.aadharNumber)) {
            errors.aadharNumber = "Aadhar number must be exactly 12 digits.";
        }
        if (!bookingData.moveInDate) {
            errors.moveInDate = "Please select a move-in date.";
        }
        if (!bookingData.duration || bookingData.duration < 1) {
            errors.duration = "Please enter a valid duration (at least 1 month).";
        }
        if (!bookingData.guests || bookingData.guests < 1) {
            errors.guests = "Please enter at least 1 guest.";
        }

        setValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleBookingChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "aadharPhoto" || name === "userImage") {
            setBookingData({ ...bookingData, [name]: files[0] });
        } else {
            let newValue = value;
            // Restrict input length and type for phone and aadhar
            if (name === "phone") {
                newValue = value.replace(/\D/g, '').slice(0, 10);
            } else if (name === "aadharNumber") {
                newValue = value.replace(/\D/g, '').slice(0, 12);
            }

            setBookingData({ ...bookingData, [name]: newValue });

            // Clear error when user types
            if (validationErrors[name]) {
                setValidationErrors({ ...validationErrors, [name]: null });
            }
        }
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setShowBookingModal(false);
        navigate(`/payment/${id}`, { state: { bookingData, listing } });
    };
    const validateTourForm = () => {
        const errors = {};
        const phoneRegex = /^\d{10}$/;

        if (!phoneRegex.test(tourData.phone)) {
            errors.phone = "Phone number must be exactly 10 digits.";
        }
        if (!tourData.fullName.trim()) {
            errors.fullName = "Full Name is required.";
        }
        if (!tourData.tourDate) {
            errors.tourDate = "Please select a preferred tour date.";
        }

        setTourValidationErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleTourChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;

        if (name === "phone") {
            newValue = value.replace(/\D/g, '').slice(0, 10);
        }

        setTourData({ ...tourData, [name]: newValue });

        if (tourValidationErrors[name]) {
            setTourValidationErrors({ ...tourValidationErrors, [name]: null });
        }
    };

    const handleTourSubmit = async (e) => {
        e.preventDefault();
        if (!validateTourForm()) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/listings/${id}/tour`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(tourData),
            });

            const data = await response.json();

            if (response.ok) {
                setToastMessage("Tour request sent successfully!");
                setToastVariant("success");
                setShowToast(true);
                setShowTourModal(false);
                setTourData({ fullName: "", phone: "", tourDate: "" });
            } else {
                setToastMessage(data.message || "Failed to send tour request");
                setToastVariant("danger");
                setShowToast(true);
            }
        } catch (error) {
            console.error("Error scheduling tour:", error);
            setToastMessage("Failed to connect to server");
            setToastVariant("danger");
            setShowToast(true);
        }
    };

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const user = JSON.parse(userInfo);
            setCurrentUser(user);
            if (user.favorites && user.favorites.some(fav => fav && (fav._id === id || fav === id))) {
                setIsFavorite(true);
            }
        }

        const fetchListing = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/listings/${id}`);
                const data = await response.json();
                if (response.ok) {
                    setListing(data);
                } else {
                    setError(data.message || "Failed to fetch listing details");
                }
            } catch (err) {
                setError("Failed to connect to server");
            } finally {
                setLoading(false);
            }
        };

        fetchListing();
    }, [id]);

    const handleDelete = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch(`http://localhost:3000/api/listings/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                navigate("/all-listings");
            } else {
                const data = await response.json();
                alert(data.message || "Failed to delete listing");
            }
        } catch (err) {
            alert("Failed to connect to server");
        }
    };

    const handleEdit = () => {
        navigate(`/postlisting`, { state: { listing } });
    };

    const handleFavorite = async () => {
        if (!currentUser) {
            setToastMessage("Please login to add favorites");
            setToastVariant("warning");
            setShowToast(true);
            return;
        }
        setFavLoading(true);
        const token = localStorage.getItem("token");
        const method = isFavorite ? "DELETE" : "PUT";

        try {
            const response = await fetch(`http://localhost:3000/api/auth/favorites/${id}`, {
                method: method,
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.ok) {
                const updatedFavorites = await response.json();
                setIsFavorite(!isFavorite);

                // Update local storage
                const updatedUser = { ...currentUser, favorites: updatedFavorites };
                localStorage.setItem("userInfo", JSON.stringify(updatedUser));
                setCurrentUser(updatedUser);

                setToastMessage(isFavorite ? "Removed from favorites" : "Added to favorites");
                setToastVariant("success");
                setShowToast(true);
            } else {
                setToastMessage("Failed to update favorites");
                setToastVariant("danger");
                setShowToast(true);
            }
        } catch (error) {
            console.error(error);
            setToastMessage("Error updating favorites");
            setToastVariant("danger");
            setShowToast(true);
        } finally {
            setFavLoading(false);
        }
    };

    const handleShare = () => {
        navigator.clipboard.writeText(window.location.href)
            .then(() => {
                setToastMessage("Link copied to clipboard!");
                setToastVariant("success");
                setShowToast(true);
            })
            .catch(() => {
                setToastMessage("Failed to copy link");
                setToastVariant("danger");
                setShowToast(true);
            });
    };

    if (loading) {
        return (
            <>
                <NavbarComponent />
                <Container className="py-5 mt-5 text-center">
                    <Spinner animation="border" variant="primary" />
                    <p className="mt-2 text-muted">Loading details...</p>
                </Container>
                <Footer />
            </>
        );
    }

    if (error || !listing) {
        return (
            <>
                <NavbarComponent />
                <Container className="py-5 mt-5">
                    <Alert variant="danger">{error || "Listing not found"}</Alert>
                    <Button variant="outline-primary" onClick={() => navigate("/all-listings")}>
                        <BsArrowLeft className="me-2" /> Back to Listings
                    </Button>
                </Container>
                <Footer />
            </>
        );
    }

    const isOwnerOrAdmin = currentUser && (currentUser._id === listing.user?._id || currentUser.isAdmin);

    return (
        <>
            <NavbarComponent />
            <Container className="py-5 mt-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <Button variant="link" className="text-white p-0 text-decoration-none" onClick={() => navigate("/all-listings")}>
                        <BsArrowLeft className="me-2" /> Back to Listings
                    </Button>

                    {isOwnerOrAdmin && (
                        <div>
                            <Button variant="outline-primary" className="me-2" onClick={handleEdit}>
                                <BsPencil className="me-2" /> Edit
                            </Button>
                            <Button variant="outline-danger" onClick={() => setShowDeleteModal(true)}>
                                <BsTrash className="me-2" /> Delete
                            </Button>
                        </div>
                    )}
                </div>

                <Row>
                    {/* Left Column: Images and Details */}
                    <Col lg={8}>
                        {/* Main Image */}
                        <div className="mb-4 rounded-4 overflow-hidden shadow-neon" style={{ height: "450px" }}>
                            {listing.images && listing.images.length > 0 ? (
                                <Carousel>
                                    {listing.images.map((img, index) => (
                                        <Carousel.Item key={index} style={{ height: "450px" }}>
                                            <img
                                                className="d-block w-100 h-100 object-fit-cover"
                                                src={img}
                                                alt={`Slide ${index}`}
                                                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/800x400?text=No+Image"; }}
                                            />
                                        </Carousel.Item>
                                    ))}
                                </Carousel>
                            ) : (
                                <img
                                    src="https://via.placeholder.com/800x400?text=No+Image"
                                    alt={listing.title}
                                    className="w-100 h-100 object-fit-cover"
                                />
                            )}
                        </div>

                        <div className="d-flex justify-content-between align-items-start mb-3">
                            <div>
                                <h1 className="fw-bold mb-2 display-5">{listing.title}</h1>
                                <div className="d-flex align-items-center text-primary mb-4">
                                    <BsGeoAlt className="me-2" /> {listing.location}
                                </div>
                            </div>
                            <div className="badge-neon rounded-pill px-3 py-2">
                                <span className="fw-bold text-primary">92% Match</span>
                            </div>
                        </div>

                        {/* Compatibility Analysis Widget */}
                        <div className="glass-card border-0 mb-4">
                            <div className="p-4">
                                <h5 className="fw-bold mb-3"><BsCheckCircle className="me-2 text-primary" /> Compatibility Analysis</h5>
                                <Row className="g-3">
                                    <Col md={6}>
                                        <div className="p-3 rounded bg-secondary bg-opacity-10">
                                            <small className="text-muted text-uppercase fw-bold">Lifestyle Match</small>
                                            <div className="d-flex align-items-center mt-2">
                                                <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                                    <div className="progress-bar bg-success" role="progressbar" style={{ width: '90%' }}></div>
                                                </div>
                                                <span className="ms-2 text-success fw-bold">90%</span>
                                            </div>
                                            <p className="small text-muted mt-2 mb-0">Great match! You both prefer a quiet environment.</p>
                                        </div>
                                    </Col>
                                    <Col md={6}>
                                        <div className="p-3 rounded bg-secondary bg-opacity-10">
                                            <small className="text-muted text-uppercase fw-bold">Budget Fit</small>
                                            <div className="d-flex align-items-center mt-2">
                                                <div className="progress flex-grow-1" style={{ height: '6px' }}>
                                                    <div className="progress-bar bg-primary" role="progressbar" style={{ width: '85%' }}></div>
                                                </div>
                                                <span className="ms-2 text-primary fw-bold">85%</span>
                                            </div>
                                            <p className="small text-muted mt-2 mb-0">Within your preferred price range.</p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>

                        <div className="glass-card border-0 mb-4">
                            <div className="p-4">
                                <h5 className="fw-bold mb-3">Description</h5>
                                <p className="text-muted" style={{ whiteSpace: "pre-line", lineHeight: '1.8' }}>
                                    {listing.description}
                                </p>
                                {isOwnerOrAdmin && listing.aadhar && (
                                    <div className="mt-3 pt-3 border-top border-secondary border-opacity-25">
                                        <h6 className="fw-bold">Aadhar Number (Private)</h6>
                                        <p className="text-muted mb-0">{listing.aadhar}</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="glass-card border-0 mb-4">
                            <div className="p-4">
                                <h5 className="fw-bold mb-3">Amenities</h5>
                                <div className="d-flex flex-wrap gap-2">
                                    {listing.amenities.map((amenity, index) => (
                                        <Badge key={index} bg="secondary" text="light" className="p-2 border border-secondary fw-normal">
                                            <BsCheckCircle className="me-1 text-primary" /> {amenity}
                                        </Badge>
                                    ))}
                                    {listing.amenities.length === 0 && <span className="text-muted">No amenities listed</span>}
                                </div>
                            </div>
                        </div>

                        {/* Phase 2: Intelligence Dashboards */}
                        <RentPredictor currentRent={listing.price} location={listing.location} />
                        <LocalityDashboard location={listing.location} />
                    </Col>

                    {/* Right Column: Price and Contact */}
                    <Col lg={4}>
                        <div className="glass-card border-0 sticky-top" style={{ top: "100px" }}>
                            <div className="p-4">
                                <div className="mb-4">
                                    <h6 className="text-muted text-uppercase small fw-bold">Rent per month</h6>
                                    <h2 className="fw-bold display-6">₹{listing.price.toLocaleString()}</h2>
                                </div>

                                <div className="mb-4">
                                    <h6 className="text-muted text-uppercase small fw-bold">Room Type</h6>
                                    <p className="fs-5">{listing.type}</p>
                                </div>

                                {!isOwnerOrAdmin && (
                                    <div className="d-grid gap-3">
                                        <Button variant="primary" size="lg" className="fw-bold py-3" onClick={() => setShowBookingModal(true)}>
                                            Book Now
                                        </Button>
                                        <Button variant="outline-primary" size="lg" onClick={() => setShowTourModal(true)}>
                                            Schedule Tour
                                        </Button>
                                        <div className="d-flex gap-2">
                                            <Button
                                                variant={isFavorite ? "danger" : "outline-secondary"}
                                                size="lg"
                                                className="flex-grow-1 d-flex align-items-center justify-content-center"
                                                onClick={handleFavorite}
                                                disabled={favLoading}
                                            >
                                                {isFavorite ? <BsHeartFill className="me-2" /> : <BsHeart className="me-2" />}
                                                {isFavorite ? "Saved" : "Save"}
                                            </Button>
                                            <Button
                                                variant="outline-secondary"
                                                size="lg"
                                                className="flex-grow-1 d-flex align-items-center justify-content-center"
                                                onClick={handleShare}
                                            >
                                                <BsShare className="me-2" /> Share
                                            </Button>
                                        </div>
                                    </div>
                                )}
                                {isOwnerOrAdmin && (
                                    <div className="d-grid gap-3">
                                        <Button
                                            variant="outline-secondary"
                                            size="lg"
                                            className="w-100 d-flex align-items-center justify-content-center"
                                            onClick={handleShare}
                                        >
                                            <BsShare className="me-2" /> Share Listing
                                        </Button>
                                    </div>
                                )}

                                <hr className="my-4 border-white border-opacity-10" />

                                <div className="d-flex align-items-center">
                                    <div
                                        className="rounded-circle bg-gradient-primary d-flex align-items-center justify-content-center text-white fw-bold me-3 overflow-hidden shadow-sm"
                                        style={{ width: "50px", height: "50px" }}
                                    >
                                        {listing.user?.profilePicture ? (
                                            <img
                                                src={
                                                    listing.user.profilePicture.startsWith("http")
                                                        ? listing.user.profilePicture
                                                        : `http://localhost:3000${listing.user.profilePicture}`
                                                }
                                                alt={listing.user.name}
                                                className="w-100 h-100 object-fit-cover"
                                                onError={(e) => {
                                                    e.target.onerror = null;
                                                    e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(listing.user.name)}&background=random`;
                                                }}
                                            />
                                        ) : (
                                            listing.user?.name?.charAt(0) || "U"
                                        )}
                                    </div>
                                    <div>
                                        <div className="fw-bold">{listing.user?.name || "RoomMate User"}</div>
                                        <small className="text-primary">Verified Owner</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>

            {/* AI Chatbot Overlay */}
            <AIChatbot listing={listing} />

            {/* Delete Confirmation Modal */}
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this listing? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete Listing
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Booking Request Modal */}
            {/* Booking Request Modal - Premium Redesign */}
            <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered size="lg" className="booking-modal">
                <Modal.Header closeButton className="border-0 pb-0" style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)' }}>
                    <Modal.Title className="text-white fw-bold d-flex align-items-center gap-2">
                        <BsCheckCircle /> Book This Room
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-4">
                    <p className="text-muted mb-4 small">Complete the form below to submit your booking request. All fields marked are required.</p>
                    <Form onSubmit={handleBookingSubmit}>

                        {/* Section 1: Stay Details */}
                        <div className="mb-4 p-3 rounded-4" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2 text-primary" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                📅 Stay Details
                            </h6>
                            <Row className="g-3">
                                <Col md={5}>
                                    <Form.Group controlId="moveInDate">
                                        <Form.Label className="small fw-semibold text-muted">Move-in Date</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="moveInDate"
                                            value={bookingData.moveInDate}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.moveInDate}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.moveInDate}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={4}>
                                    <Form.Group controlId="duration">
                                        <Form.Label className="small fw-semibold text-muted">Duration (Months)</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            name="duration"
                                            value={bookingData.duration}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.duration}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.duration}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={3}>
                                    <Form.Group controlId="guests">
                                        <Form.Label className="small fw-semibold text-muted">Guests</Form.Label>
                                        <Form.Control
                                            type="number"
                                            min="1"
                                            name="guests"
                                            value={bookingData.guests}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.guests}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.guests}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        {/* Section 2: Personal Information */}
                        <div className="mb-4 p-3 rounded-4" style={{ background: 'rgba(6,182,212,0.06)', border: '1px solid rgba(6,182,212,0.15)' }}>
                            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#06b6d4' }}>
                                👤 Personal Information
                            </h6>
                            <Row className="g-3">
                                <Col md={6}>
                                    <Form.Group controlId="fullName">
                                        <Form.Label className="small fw-semibold text-muted">Full Name</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter your full name"
                                            name="fullName"
                                            value={bookingData.fullName}
                                            onChange={handleBookingChange}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="email">
                                        <Form.Label className="small fw-semibold text-muted">Email Address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="your.email@example.com"
                                            name="email"
                                            value={bookingData.email}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.email}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.email}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="phone">
                                        <Form.Label className="small fw-semibold text-muted">Phone Number</Form.Label>
                                        <Form.Control
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            name="phone"
                                            value={bookingData.phone}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.phone}
                                            required
                                            maxLength={10}
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.phone}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="gender">
                                        <Form.Label className="small fw-semibold text-muted">Gender</Form.Label>
                                        <Form.Select
                                            name="gender"
                                            value={bookingData.gender}
                                            onChange={handleBookingChange}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        >
                                            <option value="">Select gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </Form.Select>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="dob">
                                        <Form.Label className="small fw-semibold text-muted">Date of Birth</Form.Label>
                                        <Form.Control
                                            type="date"
                                            name="dob"
                                            value={bookingData.dob}
                                            onChange={handleBookingChange}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="permanentAddress">
                                        <Form.Label className="small fw-semibold text-muted">Permanent Address</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={1}
                                            placeholder="Enter your permanent address"
                                            name="permanentAddress"
                                            value={bookingData.permanentAddress}
                                            onChange={handleBookingChange}
                                            required
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        {/* Section 3: Verification Documents */}
                        <div className="mb-4 p-3 rounded-4" style={{ background: 'rgba(236,72,153,0.06)', border: '1px solid rgba(236,72,153,0.15)' }}>
                            <h6 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.5px', color: '#ec4899' }}>
                                🛡️ Verification Documents
                            </h6>
                            <Row className="g-3">
                                <Col md={12}>
                                    <Form.Group controlId="aadharNumber">
                                        <Form.Label className="small fw-semibold text-muted">Aadhar Number</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Enter 12-digit Aadhar number"
                                            name="aadharNumber"
                                            value={bookingData.aadharNumber}
                                            onChange={handleBookingChange}
                                            isInvalid={!!validationErrors.aadharNumber}
                                            required
                                            maxLength={12}
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Control.Feedback type="invalid">{validationErrors.aadharNumber}</Form.Control.Feedback>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="aadharPhoto">
                                        <Form.Label className="small fw-semibold text-muted">Aadhar Photo</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="aadharPhoto"
                                            onChange={handleBookingChange}
                                            accept="image/*"
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>Upload a clear photo of your Aadhar card</Form.Text>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group controlId="userImage">
                                        <Form.Label className="small fw-semibold text-muted">Your Photo</Form.Label>
                                        <Form.Control
                                            type="file"
                                            name="userImage"
                                            onChange={handleBookingChange}
                                            accept="image/*"
                                            className="rounded-3 py-2"
                                            style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                        />
                                        <Form.Text className="text-muted" style={{ fontSize: '0.75rem' }}>Upload a recent passport-size photo</Form.Text>
                                    </Form.Group>
                                </Col>
                            </Row>
                        </div>

                        <div className="d-grid mt-4">
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg"
                                className="fw-bold py-3 rounded-pill shadow"
                                style={{ background: 'linear-gradient(135deg, #6366f1 0%, #06b6d4 100%)', border: 'none', letterSpacing: '0.5px' }}
                            >
                                Proceed to Payment →
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Schedule Tour Modal - Premium Redesign */}
            <Modal show={showTourModal} onHide={() => setShowTourModal(false)} centered>
                <Modal.Header closeButton className="border-0 pb-0" style={{ background: 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)' }}>
                    <Modal.Title className="text-white fw-bold d-flex align-items-center gap-2">
                        🏠 Schedule a Tour
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body className="px-4 py-4">
                    <p className="text-muted mb-4 small">Fill in your details and we'll arrange a property visit for you.</p>
                    <Form onSubmit={handleTourSubmit}>
                        <div className="p-3 rounded-4 mb-3" style={{ background: 'rgba(5,150,105,0.06)', border: '1px solid rgba(5,150,105,0.15)' }}>
                            <Form.Group className="mb-3" controlId="tourFullName">
                                <Form.Label className="small fw-semibold text-muted">Full Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter your full name"
                                    name="fullName"
                                    value={tourData.fullName}
                                    onChange={handleTourChange}
                                    isInvalid={!!tourValidationErrors.fullName}
                                    required
                                    className="rounded-3 py-2"
                                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                />
                                <Form.Control.Feedback type="invalid">{tourValidationErrors.fullName}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="tourPhone">
                                <Form.Label className="small fw-semibold text-muted">Phone Number</Form.Label>
                                <Form.Control
                                    type="tel"
                                    placeholder="10-digit mobile number"
                                    name="phone"
                                    value={tourData.phone}
                                    onChange={handleTourChange}
                                    isInvalid={!!tourValidationErrors.phone}
                                    required
                                    maxLength={10}
                                    className="rounded-3 py-2"
                                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                />
                                <Form.Control.Feedback type="invalid">{tourValidationErrors.phone}</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group controlId="tourDate">
                                <Form.Label className="small fw-semibold text-muted">Preferred Tour Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="tourDate"
                                    value={tourData.tourDate}
                                    onChange={handleTourChange}
                                    isInvalid={!!tourValidationErrors.tourDate}
                                    required
                                    className="rounded-3 py-2"
                                    style={{ border: '1px solid rgba(255,255,255,0.2)' }}
                                />
                                <Form.Control.Feedback type="invalid">{tourValidationErrors.tourDate}</Form.Control.Feedback>
                            </Form.Group>
                        </div>

                        <div className="d-grid mt-4">
                            <Button
                                variant="primary"
                                type="submit"
                                size="lg"
                                className="fw-bold py-3 rounded-pill shadow"
                                style={{ background: 'linear-gradient(135deg, #059669 0%, #06b6d4 100%)', border: 'none', letterSpacing: '0.5px' }}
                            >
                                Schedule Tour →
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1050 }}>
                <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} autohide bg={toastVariant}>
                    <Toast.Header>
                        <strong className="me-auto">Notification</strong>
                    </Toast.Header>
                    <Toast.Body className={toastVariant === 'light' ? 'text-dark' : 'text-white'}>
                        {toastMessage}
                    </Toast.Body>
                </Toast>
            </ToastContainer>

            <Footer />
        </>
    );
};

export default ListingDetailsPage;
