import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Testimonials from "./components/Testimonials"

// import Navbar from "./components/Navbar"
import HomePage from "./HomePage"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
