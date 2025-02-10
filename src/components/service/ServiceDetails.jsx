import { Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvaider";
import Review from "../review/Review";

const ServiceDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

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
  // Get the category color dynamically from the categoryColors object
  const categoryClass =
    categoryColors[service?.category] || "bg-gray-500 text-white";
  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(
          `https://server-seven-beta-45.vercel.app/service/${id}`
        );
        setService(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch service details", error);
        setLoading(false);
      }
    };
    fetchService();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spinner className="h-16 w-16 text-blue-500" />
      </div>
    );
  }

  if (!service) {
    return <Typography className="text-center">Service not found</Typography>;
  }

  return (
    <>
      <Helmet>
        <title>Details</title>
      </Helmet>
      <div className="flex flex-col items-center justify-center min-h-screen p-6 dark:bg-[#1E293B]">
        <Card className="p-6 flex lg:flex-row items-center shadow-lg w-11/12 lg:w-4/5 dark:bg-[#293548] dark:text-white">
          <img
            src={service.image}
            alt={service.title}
            className="h-60 w-full lg:w-1/2 object-cover rounded-md"
          />
          <CardBody>
            <Typography variant="h4" className="mt-4 ">
              {service.title}
            </Typography>
            <div className="flex gap-5 items-center">
            <Typography
              variant="small"
              className="text-gray-500 dark:text-gray-50 mt-2"
            >
              {format(new Date(service.date), "PPP")}
            </Typography>
            <Typography className="mt-3">
              <span className="text-base font-medium"> </span>{" "}
              <span className={`py-1 px-3 w-fit rounded-full ${categoryClass}`}>
                {service.category}
              </span>
            </Typography>
            </div>
            <Typography variant="h6" className="mt-2 dark:text-white">
              Company : {service.company}
            </Typography>
            <Typography variant="h6" className="mt-2 text-blue-500">
              <Link to={service.website} target="_blank">
                {" "}
                Visit Website
              </Link>
            </Typography>
            <Typography className="mt-4">{service.description}</Typography>

            <Typography variant="h6" className="mt-2 text-blue-500">
              ${service.minPrice} - ${service.maxPrice}
            </Typography>
           
          </CardBody>
        </Card>
      </div>
      {/* Review section */}
      <div className="w-full ">
        <Review serviceId={id} service={service} user={user} />
      </div>
    </>
  );
};

export default ServiceDetails;
