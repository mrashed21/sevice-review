import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../components/service/ServiceCard";
import Spinner from "./Spiiner";

const Services = () => {
  const [services, setServices] = useState([]);
  const [categories] = useState([
    "Web Development",
    "Graphic Design",
    "Marketing",
    "SEO",
    "Content Writing",
    "Software Solutions",
    "Plumbing",
    "Electrical Repairs",
    "Cleaning Services",
    "Interior Design",
    "Fitness Trainers",
    "Nutritionists",
    "Psychologists",
    "Therapists",
    "Care Givers",
    "Dental Services",
    "Hair Stylists",
    "Makeup Artists",
    "Others",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch services with filtering and search from backend
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:4000/services", {
          params: { keyword, category: selectedCategory },
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [keyword, selectedCategory]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <>
      <Helmet>
        <title>Service</title>
      </Helmet>

      <div className="dark:bg-[#1E293B]">
        <div className="w-11/12 mx-auto py-10 ">
          <Typography variant="h2" className="text-center dark:text-white">
            {" "}
            Available Service{" "}
          </Typography>
          <div className="my-6 flex justify-between">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-3 border rounded-lg  dark:bg-[#293548] dark:text-white"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {/* search */}
            <input
              type="text"
              value={keyword}
              onChange={handleSearch}
              placeholder="Search services..."
              className="p-3 border rounded-lg w-1/3  dark:bg-[#293548] dark:text-white"
            />
          </div>

          {loading ? (
            <Spinner></Spinner>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
              {services.length > 0 ? (
                services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))
              ) : (
                <Typography
                  variant="h4"
                  className="text-center dark:text-white"
                >
                  No services found.
                </Typography>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
