import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/NavbarComponent";
import Footer from "../components/Footer";
import ListingCard from "../components/ListingCard";
import "../components/ListingCard.css"; // We'll create this CSS next

// Dummy data for listings (replace with actual API fetch later)
const dummyListings = [
  {
    id: '1',
    title: '2BHK Apartment For Rent in HSR-Layout',
    type: 'Furnished',
    amenities: ['Fan', 'WashingMachine', 'Sofa', 'Refrigerator', 'Tv'],
    description: 'Full-House | 2BHK | Apartment',
    price: 48000,
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    isPremium: true,
  },
  {
    id: '2',
    title: 'Male Flatmate Required In 3BHK Apartment In Marathahalli',
    type: 'Furnished',
    amenities: ['Fan', 'Ac', 'Refrigerator', 'Tv', 'WashingMachine', 'Sofa'],
    description: 'Flatmate | 3BHK | Apartment',
    price: 18000,
    image: 'https://plus.unsplash.com/premium_photo-1661883907147-ee8141203b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    isPremium: true,
  },
  {
    id: '3',
    title: '1BHK Independent House For Rent In Phase-II Electronic-City',
    type: 'Unfurnished',
    amenities: ['Fan', 'Geycer', 'Lights', 'Tv Unit', 'Wardrobe'],
    description: 'Full-House | 1BHK | Independent House',
    price: 12000,
    image: 'https://images.unsplash.com/photo-1593696140826-c58b0218b725?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    isPremium: true,
  },
  {
    id: '4',
    title: '3BHK Flat For Rent In Koramangala',
    type: 'Semi-Furnished',
    amenities: ['AC', 'Geyser', 'Wardrobe', 'Modular Kitchen'],
    description: 'Full-House | 3BHK | Apartment',
    price: 65000,
    image: 'https://images.unsplash.com/photo-1560518883-ff5141944265?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    isPremium: false,
  },
  {
    id: '5',
    title: 'Female Flatmate Required in 2BHK near Manyata Tech Park',
    type: 'Furnished',
    amenities: ['Bed', 'Wardrobe', 'AC', 'WashingMachine'],
    description: 'Flatmate | 2BHK | Apartment',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1522703831776-3532f185a97d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800&q=80',
    isPremium: false,
  },
];


const AllListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  // In a real app, you might have state for pagination, filters, etc.

  useEffect(() => {
    // In a real application, you would fetch data here from an API
    // For now, we use dummy data
    setListings(dummyListings);
  }, []);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // In a real app, this would trigger a search/filter operation
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement actual search logic here (e.g., call an API)
  };

  return (
    <>
      <NavbarComponent /> {/* Your existing Navbar */}

      <div className="container-fluid listing-page-container">
        <div className="row">
          {/* Left Column: Listings and Search */}
          <div className="col-lg-7 col-md-12 listing-cards-column">
            {/* Search Bar */}
            <div className="search-bar-section mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="results-count">{listings.length} Results</h4>
                {/* Additional filters/sort could go here */}
              </div>
              <form onSubmit={handleSearchSubmit} className="d-flex">
                <input
                  type="text"
                  className="form-control me-2 search-input"
                  placeholder="Search by Locality"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <button type="submit" className="btn btn-primary search-button">
                  Search
                </button>
              </form>
            </div>

            {/* Listings Header */}
            <div className="listings-header mb-4">
              <h2 className="fw-bold">Find Roommates/Flatmates Or Rent Rooms, Apartments, PG, Houses In Bangalore</h2>
            </div>

            {/* Listing Cards */}
            <div className="listing-cards-list">
              {listings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>

            {/* Example Pagination/Load More (Placeholder) */}
            <div className="text-center mt-5 mb-5">
              <button className="btn btn-outline-primary btn-lg">Load More Listings</button>
            </div>
          </div>

          {/* Right Column: Map */}
          <div className="col-lg-5 col-md-12 map-column">
            <div className="map-placeholder">
              {/* This is where your map integration would go */}
              <h3>Interactive Map (Placeholder)</h3>
              <p>Map showing listing locations will appear here.</p>
              <p>For now, imagine pins like these:</p>
              
            </div>
          </div>
        </div>
      </div>

      <Footer /> {/* Your existing Footer */}
    </>
  );
};

export default AllListingsPage;