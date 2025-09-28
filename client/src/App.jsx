import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Footer from "./components/Footer"
import Testimonials from "./components/Testimonials"
import HomePage from "./HomePage"
import NavbarComponent from "./components/NavbarComponent"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/navbar" element={<NavbarComponent />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/testimonial" element={<Testimonials />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
