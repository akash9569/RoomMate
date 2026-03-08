import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer className={`custom-footer pt-5 pb-3 ${theme === 'dark' ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="row text-start">
          {/* Top Cities */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Top Cities</h6>
            <ul className="list-unstyled">
              <li><Link to="/all-listings?location=Lucknow" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Lucknow</Link></li>
              <li><Link to="/all-listings?location=Bangalore" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Bangalore</Link></li>
              <li><Link to="/all-listings?location=Pune" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Pune</Link></li>
              <li><Link to="/all-listings?location=Mumbai" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Mumbai</Link></li>
              <li><Link to="/all-listings?location=Hyderabad" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Hyderabad</Link></li>
              <li><Link to="/all-listings?location=Ahmedabad" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Ahmedabad</Link></li>
              <li><Link to="/all-listings?location=Delhi" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Delhi</Link></li>
              <li><Link to="/all-listings?location=Noida" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Noida</Link></li>
            </ul>
          </div>

          {/* Communities */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Communities</h6>
            <ul className="list-unstyled">
              <li><Link to="/all-listings?location=Bangalore" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Bangalore</Link></li>
              <li><Link to="/all-listings?location=Pune" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Pune</Link></li>
              <li><Link to="/all-listings?location=Mumbai" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Mumbai</Link></li>
              <li><Link to="/all-listings?location=Hyderabad" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Hyderabad</Link></li>
              <li><Link to="/all-listings?location=Ahmedabad" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Ahmedabad</Link></li>
              <li><Link to="/all-listings?location=Delhi" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Delhi</Link></li>
              <li><Link to="/all-listings?location=Noida" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Noida</Link></li>
              <li><Link to="/all-listings?location=Gurgaon" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Gurgaon</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><Link to="/all-listings?type=Room" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Find A Roommate</Link></li>
              <li><Link to="/postlisting" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Advertise A Room</Link></li>
              <li><Link to="/postlisting" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Post A Room Wanted Ad</Link></li>
              <li><Link to="/postlisting" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Advertise A Full Apartment</Link></li>
              <li><Link to="/all-listings" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Flat And Flatmates Communities</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><Link to="/contactus" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Contact Us</Link></li>
              <li><Link to="/termsofuse" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Terms Of Use</Link></li>
              <li><Link to="/privacy&policy" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Privacy Policy</Link></li>
              <li><Link to="/refund" className={theme === 'dark' ? 'text-light' : 'text-dark'}>Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center my-4">
          <h6 className="text-uppercase mb-3">Follow Us On</h6>
          <a href="https://www.facebook.com/profile.php?id=100052449636158" className={`mx-2 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
            <i className="fab fa-facebook fa-lg" target="_blank"></i>
          </a>
          <a href="https://www.instagram.com/iamakashsingh9" className={`mx-2 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
            <i className="fab fa-instagram fa-lg" target="_blank"></i>
          </a>
          <a href="https://x.com/AkashSingh57860" className={`mx-2 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
            <i className="fab fa-twitter fa-lg" target="_blank"></i>
          </a>
          <a href="https://www.linkedin.com/in/iamakashsingh9/" className={`mx-2 ${theme === 'dark' ? 'text-light' : 'text-dark'}`}>
            <i className="fab fa-linkedin fa-lg" target="_blank"></i>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center small">
          RoomMate © 2026. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
