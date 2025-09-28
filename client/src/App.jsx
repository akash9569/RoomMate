import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Testimonials from "./components/Testimonials"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navbar />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/testimonial" element={<Testimonials />} />
      </Routes>
    </Router>
  )
}

export default App
