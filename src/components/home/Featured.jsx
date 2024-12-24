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
          "http://localhost:4000/services/featured"
        );
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch featured services", error);
      }
    };
    fetchServices();
  }, []);
  console.log(services);

  return (
    <div className="w-11/12 mx-auto py-7">
      <Typography variant="h2" className="mb-6 text-center">
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
