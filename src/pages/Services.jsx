import axios from "axios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ServiceCard from "../components/service/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [categories] = useState([
    "Web Development",
    "Graphic Design",
    "Marketing",
    "SEO",
    "Content Writing",
  ]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:4000/services");
        setServices(res.data);
        setAllServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  useEffect(() => {
    let filteredServices = allServices;

    if (keyword) {
      filteredServices = filteredServices.filter(
        (service) =>
          service.title.toLowerCase().includes(keyword.toLowerCase()) ||
          service.category.toLowerCase().includes(keyword.toLowerCase()) ||
          service.company.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    if (selectedCategory) {
      filteredServices = filteredServices.filter(
        (service) => service.category === selectedCategory
      );
    }

    setServices(filteredServices);
  }, [keyword, selectedCategory, allServices]);

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

      <div className="w-11/12 mx-auto py-10">
        <div className="mb-6 flex justify-between">
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="p-3 border rounded-lg"
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
            className="p-3 border rounded-lg w-1/3"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {services.length > 0 ? (
            services.map((service) => (
              <ServiceCard key={service._id} service={service} />
            ))
          ) : (
            <p>No services found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Services;
