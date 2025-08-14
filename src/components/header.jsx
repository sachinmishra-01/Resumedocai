import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from "lucide-react";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    navigate('/login');               
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const closeMobileMenu = () => setIsOpen(false);

  return (
    <header className="bg-white text-black shadow sticky top-0 z-50 font-poppins">
      <div className="mx-auto flex justify-between items-center py-4 px-8">
        {/* Logo */}
        <Link to="/" onClick={closeMobileMenu}>
          <img src="/Header.jpg" alt="Logo" className="h-9 w-auto" />
        </Link>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4 sm:space-x-6 lg:space-x-8 text-base text-blue-900">
          <Link to="/" className="hover:text-red-600 transition-colors py-1 px-2 font-semibold">Home</Link>
          <Link to="/about" className="hover:text-red-600 transition-colors py-1 px-2 font-semibold">About Us</Link>
          <Link to="/Features" className="hover:text-red-600 transition-colors py-1 px-2 font-semibold">Services</Link>
          <Link to="/Contact" className="hover:text-red-600 transition-colors py-1 px-2 font-semibold">Contact</Link>
        </nav>

        <div className="hidden md:flex items-center space-x-2">
          {token ? (
            <button onClick={handleLogout} className="text-sm rounded-full font-bold px-6 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="text-sm rounded-full font-bold px-6 py-1 border border-blue-800 text-blue-950 border-solid hover:bg-blue-950 hover:text-white transition">
                Login
              </Link>
              <Link to="/register" className="bg-tealblue rounded-full font-bold px-6 py-1 text-sm text-white hover:bg-teal-700">
                Free Account
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full right-0 w-60 bg-white shadow-md rounded-lg p-6 flex flex-col space-y-4 text-sm text-blue-900 md:hidden">
          <Link to="/" onClick={closeMobileMenu} className="hover:text-red-600 font-medium flex justify-between items-center">
            <span>Home</span> <span className="text-blue-900">{"〉"}</span>
          </Link>
          
          <Link to="/contact" onClick={closeMobileMenu} className="hover:text-red-600 font-medium flex justify-between items-center">
            <span>Contact</span> <span className="text-blue-900 ">{"〉"}</span>
          </Link>

         
          <div className="flex flex-col space-y-2 pt-2">
            {token ? (
               <button onClick={() => { handleLogout(); closeMobileMenu(); }} className="text-center text-xs rounded-full font-semibold px-4 py-1 border border-red-600 text-red-600 hover:bg-red-600 hover:text-white transition">
                 Logout
               </button>
            ) : (
              <>
                <Link to="/login" onClick={closeMobileMenu} className="text-center text-xs rounded-full font-semibold px-4 py-1 border border-blue-800 text-blue-950 hover:bg-blue-950 hover:text-white transition">
                  Login
                </Link>
                <Link to="/register" onClick={closeMobileMenu} className="text-center bg-tealblue rounded-full font-semibold px-4 py-1 text-xs text-white hover:bg-teal-700">
                  Free Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;