import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../service/ServiceCard";

const Featured = () => {
  const [services, setServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "https://server-seven-beta-45.vercel.app/services/featured",
          {
            withCredentials: true,
          }
        );
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch featured services", error);
      }
    };
    fetchServices();
  }, []);

  return (
    <div className="w-11/12 mx-auto py-7">
      <Typography variant="h2" className="mb-6 text-center dark:text-white">
        Featured Services
      </Typography>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {services.map((service) => (
          <ServiceCard key={service._id} service={service} />
        ))}
      </div>
    </div>
  );
};

export default Featured;
