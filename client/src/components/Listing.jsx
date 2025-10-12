import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Footer.css";

const listings = [
  {
    title: "Roommate",
    img: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2340",
  },
  {
    title: "Coliving",
    img: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600",
  },
  {
    title: "PG",
    img: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600",
  },
  {
    title: "Flatmate",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
  },
  {
    title: "Room",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=600",
  },
  {
    title: "Entire House",
    img: "https://images.unsplash.com/photo-1505691723518-36a5ac3be353?q=80&w=600",
  },
];

const Listings = () => {
  return (
    <section className="listings-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* LEFT TEXT SECTION */}
          <div className="col-lg-4 mb-5 mb-lg-0 text-center text-lg-start">
            <h5 className="text-secondary fw-semibold mb-2">
              Explore The Latest
            </h5>
            <h2 className="fw-bold display-6 text-dark mb-3">
              Room<span className="text-primary">Mate</span> <br />
              Listings
            </h2>
            <p className="text-muted small">
              Discover verified roommates, coliving spaces, and properties
              curated just for you.
            </p>
          </div>

          {/* RIGHT GRID SECTION */}
          <div className="col-lg-8">
            <div className="row g-4">
              {listings.map((item, index) => (
                <div key={index} className="col-6 col-md-4">
                  <div className="listing-card rounded-4 overflow-hidden shadow-sm">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="img-fluid w-100 listing-img"
                    />
                    <div className="listing-overlay d-flex align-items-end">
                      <h5 className="text-white fw-semibold px-3 pb-3 mb-0">
                        {item.title}
                      </h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Listings;
