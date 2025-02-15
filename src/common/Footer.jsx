import { Typography } from "@material-tailwind/react";
import { FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="bg-black xt-white py-10">
      <div className="w-11/12 mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col text-white items-center md:items-start">
            <span className="text-9xl text-center text-white">
              <FaUsers />
            </span>
            <Typography variant="h6" className="mb-2">
              Service Provaider
            </Typography>
            <Typography variant="paragraph" className="text-white text-sm">
              Your one-stop solution for all your service needs.
            </Typography>
          </div>

          {/* Useful Links */}
          <div className="flex flex-col text-white items-center md:items-start">
            <Typography variant="h6" className="mb-3">
              Useful Links
            </Typography>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-gray-400">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-gray-400">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-400">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="flex flex-col text-white items-center md:items-start">
            <Typography variant="h6" className="mb-3">
              Contact Us
            </Typography>
            <Typography variant="paragraph" className=" text-sm">
              Email: service@review.com
            </Typography>
            <Typography variant="paragraph" className=" text-sm">
              Phone: +8801781131905
            </Typography>
            <Typography variant="paragraph" className=" text-sm">
              Address: Uttara, Dhaka, Bangladesh
            </Typography>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <Typography variant="small" className="text-white">
            © {new Date().getFullYear()} Service Provaider. All rights reserved.
          </Typography>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
