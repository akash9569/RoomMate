import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Testimonials from "./components/Testimonials"
import HomePage from "./HomePage"
import NavbarComponent from "./components/NavbarComponent"
import ContactUs from "./pages/ContactUs"
import TermsOfuse from "./pages/TermsOfuse"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Refund from "./pages/Refund"


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
      </Routes>
    </Router>
  )
}

export default App
