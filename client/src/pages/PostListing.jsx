import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import "../components/Footer.css"; // We'll add custom CSS here

const PostListing = () => {
  const navigate = useNavigate();

  // 1. Authentication Check (Kept as is - good practice!)
  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      alert("Please login first!");
      navigate("/");
    }
  }, [navigate]);

  // Data for the room type cards
  const cards = [
    {
      id: 1,
      title: "1 BHK",
      description: "Cozy single room for one person with Furnished and SemiFurnished.",
      img: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340",
    },
    {
      id: 2,
      title: "2 BHK",
      description: "Spacious room for two people or more with Furnished and SemiFurnished.",
      img: "https://plus.unsplash.com/premium_photo-1661962340349-6ea59fff7e7b?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1974",
    },
    {
      id: 3,
      title: "Flat",
      description: "Flat for families or groups with multiple rooms and amenities.",
      img: "https://images.unsplash.com/photo-1702014862053-946a122b920d?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340",
    },
    {
      id: 4,
      title: "Shared Room",
      description: "Share accommodation with roommates.",
      img: "https://images.unsplash.com/photo-1758524942559-a74c7a64b6b1?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2832",
    },
    {
      id: 5,
      title: "Luxury House",
      description: "High-end amenities and premium finish, Perfect for those seeking comfort.",
      img: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    },
    {
      id: 6,
      title: "PG Accommodation",
      description: "A paying guest option with shared facilities.",
      img: "https://images.unsplash.com/photo-1598928506312-6e025fe1c0a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80",
    },
  ];

  // 2. Updated Navigation Handler
  // This function navigates to the listing details page, passing the ID
  // in the URL path and the 'title' in the route state for easy access.
  const handleCardClick = (id, title) => {
    // Navigate to the specific listing route.
    // The second argument, an object, is the 'state' which is available
    // on the destination component via the 'useLocation' hook.
    navigate(`/listing-details/${id}`, { state: { roomTypeTitle: title } });
  };

  return (
    <>
      <NavbarComponent />

      <div className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="fw-bold">🏠 Choose Your Room Type</h2>
          <p className="text-muted">Select a room type to post your listing.</p>
        </div>

        <div className="row g-4">
          {cards.map((card) => (
            <div className="col-lg-4 col-md-6" key={card.id}>
              {/* 3. Event Listener Update */}
              <div
                className="card h-100 shadow-sm card-hover"
                // Pass both ID and TITLE to the handler
                onClick={() => handleCardClick(card.id, card.title)}
                // Use a standard pointer cursor to show it's clickable
                style={{ cursor: "pointer" }} 
              >
                <div className="card-img-wrapper">
                  <img
                    src={card.img}
                    className="card-img-top"
                    alt={card.title}
                  />
                </div>
                <div className="card-body">
                  <h5 className="card-title">{card.title}</h5>
                  <p className="card-text text-muted">{card.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PostListing;