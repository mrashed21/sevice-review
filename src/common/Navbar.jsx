// import { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "/logo.png";
// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const handleDropdown = () => {
//     setIsOpen(!isOpen);
//   };
//   return (
//     <>
//       <nav className=" bg-white shadow-lg">
//         <div className="px-4 lg:w-11/12 mx-auto flex justify-between items-center py-1">
//           {/* Navbar start */}

//           <img className="w-12" src={logo} alt="logo" />

//           {/* Navbar center */}
//           <div className="hidden lg:flex space-x-4">
//             <Link to="/" className="text-gray-900 hover:text-gray-700">
//               Home
//             </Link>
//             <Link to="/" className="text-gray-900 hover:text-gray-700">
//               Service
//             </Link>
//             <Link to="/" className="text-gray-900 hover:text-gray-700">
//               About us
//             </Link>
//           </div>

//           {/* Navbar end */}
//           <div className="flex space-x-4">
//             <Link to="/login" className="text-gray-900 hover:text-gray-700">
//               Login
//             </Link>
//             <Link to="/register" className="text-gray-900 hover:text-gray-700">
//               Register
//             </Link>
//           </div>
//           {/*Dropdown Navbar  */}
//           <div className="lg:hidden ">
//             <div className="relative">
//               <button
//                 onClick={() => {
//                   handleDropdown();
//                 }}
//                 className="text-gray-900 hover:text-gray-700"
//               >
//                 {isOpen ? <span> close</span> : <span>open</span>}
//               </button>

//               {isOpen && (
//                 <div className="absolute top-10 -right-2 w-96 h-96 bg-white shadow-md ">
//                   <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
//                     Home
//                   </Link>
//                   <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
//                     Service
//                   </Link>
//                   <Link to="/" className="block px-4 py-2 hover:bg-gray-100">
//                     About us
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

import { Avatar, Button, Switch } from "@material-tailwind/react";
import { useContext, useEffect, useState } from "react";
import { IoMdClose, IoMdMenu } from "react-icons/io";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthProvaider";
import logo from "/logo.png";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  // Handle theme toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const handleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-lg">
        <div className="px-4 lg:w-11/12 mx-auto flex justify-between items-center py-1">
          {/* Navbar start */}
          <img className="w-12" src={logo} alt="logo" />

          {/* Navbar center */}
          {user && user?.email ? (
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/services"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                Service
              </Link>
              <Link
                to="/service/add"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                Add Service
              </Link>
              <Link
                to="/service/me"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
              My Service
              </Link>
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                About us
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex space-x-4">
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                Home
              </Link>
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                Service
              </Link>
              <Link
                to="/"
                className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
              >
                About us
              </Link>
            </div>
          )}

          {/* Navbar end */}
          <div className="flex items-center space-x-4">
            {user && user?.email ? (
              // i want to show user profile and logout button.
              <>
                <Avatar
                  src={
                    user?.photoURL ||
                    "https://docs.material-tailwind.com/img/face-2.jpg"
                  }
                  alt="avatar"
                  withBorder={true}
                  className="p-0.5"
                />
                <Button
                  color="blue"
                  className="hidden lg:block"
                  onClick={() => {
                    logOut();
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <div className="flex space-x-4 items-center">
                <Link
                  to="/login"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-900 dark:text-gray-200 hover:text-gray-700"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Theme Switch */}
            <div className="hidden lg:block">
              <Switch
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                color="blue"
              />
            </div>
            {/*Dropdown Navbar  */}
            <div className="lg:hidden ">
              <div className="relative flex items-center">
                <button
                  onClick={handleDropdown}
                  className="text-gray-900 dark:text-gray-200 text-3xl hover:text-gray-700"
                >
                  {isOpen ? <IoMdClose /> : <IoMdMenu />}
                </button>

                {isOpen && (
                  <div className="absolute top-10 -right-2 w-96 h-96 bg-white dark:bg-gray-800 shadow-md ">
                    <Switch
                      checked={darkMode}
                      onChange={() => setDarkMode(!darkMode)}
                      color="blue"
                    />
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Home
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Service
                    </Link>
                    <Link
                      to="/"
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      About us
                    </Link>
                    <Button
                      color="blue"
                      onClick={() => {
                        logOut();
                      }}
                    >
                      Logout
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
