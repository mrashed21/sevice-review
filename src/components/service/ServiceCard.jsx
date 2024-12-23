/* eslint-disable react/prop-types */

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { format } from "date-fns";

import { Link } from "react-router-dom";

const ServiceCard = ({ service }) => {
  return (
    <>
      <Card className="shadow-lg hover:shadow-xl transition duration-300">
        <img
          src={service.image}
          alt={service.title}
          className=" w-full object-cover rounded-t-lg"
        />
        <CardBody>
          <Typography variant="h5" className="mb-2 font-bold">
            {service.title}
          </Typography>
          <Typography variant="small" className="text-gray-600 mb-2">
            {service.category}
          </Typography>
          <Typography className="text-sm text-gray-700 mb-4">
            {service.description.length > 80
              ? `${service.description.substring(0, 80)}...`
              : service.description}
          </Typography>
          <div className="flex justify-between items-center">
            <Typography variant="h6" className="font-bold text-blue-500">
              Price: ${service.minPrice} - ${service.maxPrice}
            </Typography>
          </div>
          <Typography variant="small" className="text-gray-500">
            Added : {format(new Date(service.date), "MMMM dd, yyyy")}
          </Typography>
        </CardBody>

        <CardFooter className="flex justify-between items-center">
          <Link to={`/service/details/${service._id}`}>
            {" "}
            <Button
              color="blue"
              // size="regular"
            >
              See Details{" "}
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </>
  );
};

export default ServiceCard;
