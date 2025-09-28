import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
// import Navbar from "./components/Navbar"
import HomePage from "./HomePage"


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  )
}

export default App
