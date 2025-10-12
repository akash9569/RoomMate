import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Testimonials from "./components/Testimonials";
import HomePage from "./HomePage";
import NavbarComponent from "./components/NavbarComponent";
import ContactUs from "./pages/ContactUs";
import TermsOfuse from "./pages/TermsOfuse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Refund from "./pages/Refund";
import PostListing from "./pages/PostListing";
import ProtectedRoute from "./components/ProtectedRoute";
// 👇 NEW IMPORT (Required for the all-cards page)
import AllListingPage from "./pages/AllListingPage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/navbar" element={<NavbarComponent />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/termsofuse" element={<TermsOfuse />} />
        <Route path="/privacy&policy" element={<PrivacyPolicy />} />
        <Route path="/refund" element={<Refund />} />
        
        {/* 👇 NEW ROUTE: Displays the list of all property cards/listings */}
        <Route path="/all-listings" element={<AllListingPage />} /> 

        {/* 👇 NEW ROUTE: Placeholder for individual listing details (used when clicking a card) */}
        <Route 
          path="/listing/:id" 
          element={
            <div>
              <NavbarComponent />
              <div className="container py-5">
                <h1 className="text-center">Listing Details Page</h1>
                <p className="text-center">Ready to build the detail view for Listing ID: {":id"}</p>
              </div>
              <Footer />
            </div>
          } 
        />

        {/* Protected Page: Starting point for creating a new listing (room type selection) */}
        <Route
          path="/postlisting"
          element={
            <ProtectedRoute>
              <PostListing />
            </ProtectedRoute>
          }
        />

        {/* Protected Page: Route used after selecting a room type (from our very first conversation) */}
        <Route
          path="/listing-details/:id"
          element={
            <ProtectedRoute>
              {/* This page should contain the final listing creation form */}
              <PostListing /> 
            </ProtectedRoute>
          }
        />
        
      </Routes>
    </Router>
  );
}

export default App;