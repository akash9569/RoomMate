import React, { useState } from 'react';
import Navbar from '../components/NavbarComponent';
import Footer from '../components/Footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    phone: false,
    message: false
  });

  const isFormValid =
    formData.name.trim() &&
    /^\S+@\S+\.\S+$/.test(formData.email) &&
    /^\d{10}$/.test(formData.phone) &&
    formData.message.trim();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      console.log('Form submitted:', formData);
      alert("Message sent!");
      setFormData({ name: '', email: '', phone: '', message: '' });
      setTouched({ name: false, email: false, phone: false, message: false });
    }
  };

  const inputStyle = (fieldName, isValid) => ({
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: touched[fieldName]
      ? isValid
        ? '1.5px solid #4CAF50' // Green border if valid
        : '1.5px solid #FF4D4F' // Red border if invalid
      : '1px solid #ccc',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box'
  });

  const hintTextStyle = {
    fontSize: '12px',
    marginTop: '5px',
    color: '#FF4D4F'
  };

  return (
    <>
      <Navbar />
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '150px' }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          backgroundColor: '#fff',
          padding: '30px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Contact Us</h2>
          <form onSubmit={handleSubmit} noValidate>
            {/* Name Field */}
            <div style={{ marginBottom: '20px' }}>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle("name", formData.name.trim())}
              />
              {touched.name && !formData.name.trim() && (
                <div style={hintTextStyle}>Please enter your name.</div>
              )}
            </div>

            {/* Email Field */}
            <div style={{ marginBottom: '20px' }}>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onBlur={handleBlur}
                style={inputStyle("email", /^\S+@\S+\.\S+$/.test(formData.email))}
              />
              {touched.email && !/^\S+@\S+\.\S+$/.test(formData.email) && (
                <div style={hintTextStyle}>Enter a valid email address.</div>
              )}
            </div>

            {/* Phone Field */}
            <div style={{ marginBottom: '20px' }}>
              <label>Phone Number:</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="10-digit number"
                style={inputStyle("phone", /^\d{10}$/.test(formData.phone))}
              />
              {touched.phone && !/^\d{10}$/.test(formData.phone) && (
                <div style={hintTextStyle}>Phone must be 10 digits.</div>
              )}
            </div>

            {/* Message Field */}
            <div style={{ marginBottom: '20px' }}>
              <label>Message:</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                onBlur={handleBlur}
                rows="5"
                style={inputStyle("message", formData.message.trim())}
              />
              {touched.message && !formData.message.trim() && (
                <div style={hintTextStyle}>Please write your message.</div>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid}
              style={{
                backgroundColor: isFormValid ? '#007bff' : '#e0e0e0',
                color: isFormValid ? 'white' : '#999',
                padding: '12px 20px',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                cursor: isFormValid ? 'pointer' : 'not-allowed',
                width: '100%',
                transition: 'background-color 0.3s ease'
              }}
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
