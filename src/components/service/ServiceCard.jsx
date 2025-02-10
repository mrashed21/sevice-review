/* eslint-disable react/prop-types */
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  const categoryColors = {
    "Web Development": "bg-blue-500 text-white",
    "Graphic Design": "bg-green-500 text-white",
    Marketing: "bg-purple-500 text-white",
    SEO: "bg-yellow-500 text-black",
    "Content Writing": "bg-orange-500 text-white",
    "Software Solutions": "bg-teal-500 text-white",
    Plumbing: "bg-cyan-500 text-black",
    "Electrical Repairs": "bg-indigo-500 text-white",
    "Cleaning Services": "bg-pink-500 text-white",
    "Interior Design": "bg-lime-500 text-black",
    "Fitness Trainers": "bg-red-500 text-white",
    Nutritionists: "bg-amber-600 text-white",
    Psychologists: "bg-indigo-800 text-white",
    Therapists: "bg-lime-500 text-white",
    "Care Givers": "bg-purple-900 text-white",
    "Dental Services": "bg-amber-500 text-black",
    "Hair Stylists": "bg-red-500 text-white",
    "Makeup Artists": "bg-pink-400 text-white",
    Others: "bg-cyan-700 text-white",
  };

  const categoryClass =
    categoryColors[service.category] || "bg-gray-500 text-white";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="shadow-lg hover:shadow-xl transition duration-300 dark:bg-[#21252ea7] dark:text-white min-h-[480px]">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-40 object-cover rounded-t-lg"
        />
        <CardBody className="-mt-3 ">
          <Typography variant="h5" className="font-bold">
            {service.title}
          </Typography>
          <Typography className="mt-2">
            <span className={`py-1 px-3 w-fit rounded-full ${categoryClass}`}>
              {service.category}
            </span>
          </Typography>
          <div className="mt-2">
            <Typography className="font-medium">Description </Typography>
            <Typography className="text-sm text-gray-700 dark:text-gray-50 mb-4">
              {service.description.length > 80
                ? `${service.description.substring(0, 80)} ...`
                : service.description}
            </Typography>
          </div>
          <div className="flex justify-between items-center">
            <Typography variant="h5" className="font-semibold ">
              ${service.minPrice} - ${service.maxPrice}
            </Typography>
          </div>
        </CardBody>

        <CardFooter className="flex justify-between items-center mt-auto">
          <Link to={`/service/details/${service._id}`}>
            <Button color="blue">See Details</Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default ServiceCard;
