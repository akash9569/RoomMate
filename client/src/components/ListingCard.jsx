import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/ListingCard.css'; // We'll create this CSS next

const ListingCard = ({ listing }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    // You can navigate to a detailed listing page here
    // For now, let's just log the click or navigate to a dummy detail page
    console.log('Clicked listing:', listing.id);
    navigate(`/listing/${listing.id}`); // Example: Navigate to /listing/123
  };

  return (
    <div className="listing-card mb-4" onClick={handleCardClick}>
      {listing.isPremium && (
        <span className="premium-badge">Premium</span>
      )}
      <div className="row g-0">
        <div className="col-md-4">
          <div className="listing-img-container">
            <img src={listing.image} className="img-fluid rounded-start" alt={listing.title} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{listing.title}</h5>
            <p className="card-text listing-type">
              Type: {listing.type} | Amenities: {listing.amenities.join(', ')}
            </p>
            <p className="card-text listing-description">{listing.description}</p>
            <div className="listing-price">₹{listing.price.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;