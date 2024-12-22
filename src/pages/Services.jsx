import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../components/auth/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/services"); // Replace with your API endpoint
        setServices(response.data);
      } catch (error) {
        console.error("Failed to fetch services:", error);
      }
    };
    console.log(services);
    fetchServices();
  }, []);

  return (
    <div className="w-11/12 mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {services.map((service) => (
        <ServiceCard key={service._id} service={service} />
      ))}
    </div>
  );
};

export default Services;
