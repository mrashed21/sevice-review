import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Card, Spinner, Typography } from "@material-tailwind/react";
import { format } from "date-fns";

const ServiceDetails = () => {
  const { id } = useParams(); 
  const [service, setService] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/service/${id}`);
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
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="p-6 shadow-lg w-full md:w-1/2">
        <img
          src={service.image}
          alt={service.title}
          className="h-60 w-full object-cover rounded-md"
        />
        <Typography variant="h4" className="mt-4">
          {service.title}
        </Typography>
        <Typography variant="small" className="text-gray-500 mt-2">
          {format(new Date(service.date), "PPP")}
        </Typography>
        <Typography className="mt-4">{service.description}</Typography>
        <Typography variant="h6" className="mt-2 text-blue-500">
          ${service.price}
        </Typography>
        <Typography variant="small" className="mt-4 text-gray-500">
          Category: {service.category}
        </Typography>
      </Card>
    </div>
  );
};

export default ServiceDetails;