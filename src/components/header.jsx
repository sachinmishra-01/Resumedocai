import React, { useState, useEffect} from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
  const handleResize = () => {
    if (window.innerWidth >= 768) {
      setIsOpen(false);
    }
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  return (
    <header className="bg-white text-black shadow sticky top-0 z-50 font-poppins">
      <div className="mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <a href="#home">
          <img src="./Header.jpg" alt="Logo" className="h-9 w-auto" />
        </a>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-8 text-base text-blue-900">
          <a
            href="#home"
            className="hover:text-red-600 transition-colors py-1 px-2 font-semibold"
          >
            Home
          </a>
          <a
            href="#about"
            className="hover:text-red-600 transition-colors py-1 px-2 font-semibold"
          >
            About Us
          </a>
          <a
            href="#services"
            className="hover:text-red-600 transition-colors py-1 px-2 font-semibold"
          >
            Services
          </a>
          <a
            href="#contact"
            className="hover:text-red-600 transition-colors py-1 px-2 font-semibold"
          >
            Contact
          </a>
        </nav>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center space-x-2">
          <button className="text-sm rounded-full font-bold px-6 py-1 border border-blue-800 text-blue-950 border-solid hover:bg-blue-950 hover:text-white transition">
            Login
          </button>
          <button className="bg-tealblue rounded-full font-bold px-6 py-1 text-sm text-white hover:bg-teal-700">
            Free Account
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-17 right-0 w-60 bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 text-sm text-blue-900 z-50">
          <a
            href="#home"
            className="hover:text-red-600 font-medium flex justify-between items-center"
          >
            <span>Home</span> <span className="text-blue-900">{"〉"}</span>
          </a>
          <a
            href="#about"
            className="hover:text-red-600 font-medium flex justify-between items-center"
          >
            <span>About Us</span> <span className="text-blue-900">{"〉"}</span>
          </a>
          <a
            href="#services"
            className="hover:text-red-600 font-medium flex justify-between items-center"
          >
            <span>Services</span> <span className="text-blue-900">{"〉"}</span>
          </a>
          <a
            href="#contact"
            className="hover:text-red-600 font-medium flex justify-between items-center"
          >
            <span>Contact</span> <span className="text-blue-900 ">{"〉"}</span>
          </a>

          {/* Buttons below */}
          <div className="flex flex-col space-y-2 pt-2">
            <button className="text-xs rounded-full font-semibold px-4 py-1 border border-blue-800 text-blue-950 hover:bg-blue-950 hover:text-white transition">
              Login
            </button>
            <button className="bg-tealblue rounded-full font-semibold px-4 py-1 text-xs text-white hover:bg-teal-700">
              Free Account
            </button>
          </div>
        </div>
      )}
      
    </header>
  );
};

export default Header;
