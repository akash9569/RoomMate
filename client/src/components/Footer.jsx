import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="custom-footer text-light pt-5 pb-3">
      <div className="container">
        <div className="row text-start">
          {/* Top Cities */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Top Cities</h6>
            <ul className="list-unstyled">
                <li><a href="#">Lucknow</a></li>
                <li><a href="#">Bangalore</a></li>
                <li><a href="#">Pune</a></li>
                <li><a href="#">Mumbai</a></li>
                <li><a href="#">Hyderabad</a></li>
                <li><a href="#">Ahmedabad</a></li>
                <li><a href="#">Delhi</a></li>
                <li><a href="#">Noida</a></li>
            </ul>
          </div>

          {/* Communities */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Communities</h6>
            <ul className="list-unstyled">
              <li><a href="#">Flat And Flatmates Bangalore</a></li>
              <li><a href="#">Flat And Flatmates Pune</a></li>
              <li><a href="#">Flat And Flatmates Mumbai</a></li>
              <li><a href="#">Flat And Flatmates Hyderabad</a></li>
              <li><a href="#">Flat And Flatmates Ahmedabad</a></li>
              <li><a href="#">Flat And Flatmates Delhi</a></li>
              <li><a href="#">Flat And Flatmates Noida</a></li>
              <li><a href="#">Flat And Flatmates Gurgaon</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Services</h6>
            <ul className="list-unstyled">
              <li><a href="#">Find A Roommate</a></li>
              <li><a href="#">Advertise A Room</a></li>
              <li><a href="#">Post A Room Wanted Ad</a></li>
              <li><a href="#">Advertise A Full Apartment</a></li>
              <li><a href="#">Flat And Flatmates Communities</a></li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-md-3 mb-4">
            <h6 className="text-uppercase mb-3">Company</h6>
            <ul className="list-unstyled">
              <li><a href="/contactus">Contact Us</a></li>
              <li><a href="/termsofuse">Terms Of Use</a></li>
              <li><a href="/privacy&policy">Privacy Policy</a></li>
              <li><a href="/refund">Refund Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media */}
        <div className="text-center my-4">
          <h6 className="text-uppercase mb-3">Follow Us On</h6>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-facebook fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-instagram fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-twitter fa-lg"></i>
          </a>
          <a href="#" className="text-light mx-2">
            <i className="fab fa-linkedin fa-lg"></i>
          </a>
        </div>

        {/* Footer Bottom */}
        <div className="text-center small">
          RoomMate © 2025. All Rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
