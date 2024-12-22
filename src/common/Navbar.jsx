import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "/logo.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <nav className=" bg-white shadow-lg">
        <div className="px-4 lg:w-11/12 mx-auto flex justify-between items-center py-1">
          {/* Navbar start */}

          <img className="w-12" src={logo} alt="logo" />

          {/* Navbar center */}
          <div className="hidden lg:flex space-x-4">
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              Home
            </Link>
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              Service
            </Link>
            <Link to="/" className="text-gray-900 hover:text-gray-700">
              About us
            </Link>
          </div>

          {/* Navbar end */}
          <div className="flex space-x-4">
            <Link to="/login" className="text-gray-900 hover:text-gray-700">
              Login
            </Link>
            <Link to="/register" className="text-gray-900 hover:text-gray-700">
              Register
            </Link>
          </div>
          {/*Dropdown Navbar  */}
          <div className="lg:hidden ">
            <div className="relative">
              <button
                onClick={() => {
                  handleDropdown();
                }}
                className="text-gray-900 hover:text-gray-700"
              >
                {isOpen ? <span> close</span> : <span>open</span>}
              </button>

              {isOpen && (
                <div className="absolute top-10 -right-2 w-96 h-96 bg-white shadow-md ">
                  <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                    Home
                  </Link>
                  <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                    Service
                  </Link>
                  <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
                    About us
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
