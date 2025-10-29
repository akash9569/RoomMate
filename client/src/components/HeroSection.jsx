import React, { useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import axios from "axios";

const HERO_IMAGE_URL =
  "https://plus.unsplash.com/premium_photo-1676823547752-1d24e8597047?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGl2aW5nJTIwcm9vbXxlbnwwfHwwfHx8MA%3D%3D";

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Fetch suggestions from OpenStreetMap
  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length < 3) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&q=${value}&addressdetails=1&limit=5`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.error("Error fetching locations:", err);
    }
  };

  // Handle selecting a location
  const handleSelect = (place) => {
    setQuery(place.display_name);
    setSuggestions([]);
    console.log("📍 Selected:", place.display_name);
    console.log("🧭 Coordinates:", place.lat, place.lon);
  };

  return (
    <div
      style={{
        backgroundImage: `url('${HERO_IMAGE_URL}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        position: "relative",
        display: "flex",
        alignItems: "center",
        textAlign: "center",
        paddingTop: "60px",
      }}
      className="text-white p-5"
    >
      {/* Overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: 0,
        }}
      ></div>

      <Container style={{ zIndex: 1 }}>
        <p className="mb-2 fs-5">
          10000+ Rooms and Flatmates Available Now Across India
        </p>

        <Row className="justify-content-center mb-5 mt-3">
          <Col md={6}>
            <Form className="position-relative">
              <input
                type="text"
                placeholder="Search by Locality"
                value={query}
                onChange={handleSearch}
                className="form-control py-3 px-4 rounded-pill shadow-lg border-0 text-center"
                style={{ fontSize: "18px" }}
              />

              {/* Dropdown suggestions */}
              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100 mt-2"
                  style={{
                    maxHeight: "200px",
                    overflowY: "auto",
                    borderRadius: "15px",
                    zIndex: 1000,
                  }}
                >
                  {suggestions.map((place) => (
                    <li
                      key={place.place_id}
                      className="list-group-item list-group-item-action"
                      onClick={() => handleSelect(place)}
                      style={{ cursor: "pointer" }}
                    >
                      {place.display_name}
                    </li>
                  ))}
                </ul>
              )}
            </Form>
          </Col>
        </Row>

        <h1 className="display-4 fw-bold mt-5">
          Find A Room / Roommate Now
        </h1>
      </Container>
    </div>
  );
};

export default HeroSection;
