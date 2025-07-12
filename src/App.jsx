import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HeroSection from "./components/heroSection";
import AboutMe from "./components/aboutme";
import ResumeDetails from "./components/ResumeDetails";
import Header from "./components/header";
import Footer from "./components/footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/resume-details" element={<ResumeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
