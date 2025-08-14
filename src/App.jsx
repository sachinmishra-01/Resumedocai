import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import HeroSection from "./components/heroSection";
import ResumeDetails from "./components/ResumeDetails";
import Header from "./components/header";
import Footer from "./components/footer";
import ProtectedRoute from "./components/ProtectedRoute"; 
import Contact from './components/contact';
import Register from './components/Register';
import VerifyOtp from './components/VerifyOtp';
import Login from './components/Login';
import AboutUs from './components/aboutme';
import Features from './components/feature';

function MainContent() {
  const location = useLocation();

  return (
    <>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Features" element={<Features />} />
        <Route path="/Contact" element={<Contact />} />

        {/* Protected route */}
        <Route 
          path="/resume-details" 
          element={
            <ProtectedRoute>
              <ResumeDetails />
            </ProtectedRoute>
          } 
        />
      </Routes>

      {/* Conditional rendering when on /home */}
      {location.pathname === "/" && (
        <>
          <AboutUs />
          <Features />
        </>
      )}
      {location.pathname==="/about" && (
        <>
        <AboutUs/>
        </>
      )

      }
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <main>
        <MainContent />
      </main>
      <Footer />
    </Router>
  );
}

export default App;
