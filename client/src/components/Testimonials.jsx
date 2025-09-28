import React from 'react';
import './Testimonials.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const testimonials = [
  {
    name: 'Manish Sharma',
    location: 'Flat And Flatmates Bangalore',
    rating: 4,
    review: 'I Was Able To Rent My Apartment In Whitefield, Bangalore With The Help Of The Platform. Good Work Folks. Keep It Going',
  },
  {
    name: 'Akash',
    location: 'Flat And Flatmates Hyderabad',
    rating: 5,
    review: 'I Was Able To Find A PG In HSR Layout With The Help Of FindMyRoom. Easy To Find PG And Coliving Spaces In Bangalore',
  },
  {
    name: 'Rohit Yadav',
    location: 'Flat And Flatmates Bangalore',
    rating: 5,
    review: 'Awesome Place To Find Short-Term And Long-Term Rentals At A Reasonable Price. No Brokage. Great Team!',
  },
  {
    name: 'Pooja Deshmukh',
    location: 'Flat And Flatmates Mumbai',
    rating: 5,
    review: 'Very Helpful Community. Easy To Find Roommates On This Platform',
  },
  {
    name: 'Rajamanickam Sekar',
    location: 'Flat And Flatmates Pune',
    rating: 5,
    review: 'Very Good Response. Easy To Find Roommates Or Tenants.',
  },
  {
    name: 'Sumeet Sahu',
    location: 'Flat And Flatmates Delhi',
    rating: 5,
    review: 'Nice Page And Easy To Find A Flatmate',
  },
  {
    name: 'Tanya Joshi',
    location: 'Flat And Flatmates Pune',
    rating: 4,
    review: 'Good Options For People Who Are Looking For Flats Or Roommates',
  },
  {
    name: 'Vishakha Singh',
    location: 'Flat And Flatmates Ahmedabad',
    rating: 4,
    review: 'Better Way To Find Flat And Flatmates',
  }
];

const Testimonials = () => {
  return (
    <div className="testimonials-section py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-2">User Testimonials</h2>
        <p className="text-center text-muted mb-4">
          Our Users Really Love Us! Please Review Us Or Provide A Feedback Here
        </p>

        <div className="infinite-scroll-wrapper mx-auto">
          <div className="scroll-track">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div className="card testimonial-card shadow-sm" key={index}>
                <div className="card-body">
                  <h6 className="card-title fw-bold">
                    {testimonial.name}{' '}
                    <span className="fw-normal">Reviewed</span>{' '}
                    <strong>{testimonial.location}</strong>
                  </h6>
                  <div className="stars mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <i
                        key={i}
                        className={`fa-star fa ${i < testimonial.rating ? 'fas text-success' : 'far text-muted'}`}
                      ></i>
                    ))}
                  </div>
                  <p className="card-text small">{testimonial.review}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
