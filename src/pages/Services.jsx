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

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [itemsPerPage] = useState(8);

  // Fetch services with filtering, search and pagination from backend
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://server-seven-beta-45.vercel.app/services",
          {
            params: {
              keyword,
              category: selectedCategory,
              page: currentPage,
              limit: itemsPerPage,
            },
          }
        );
        setServices(res.data.services);
        setTotalPages(Math.ceil(res.data.total / itemsPerPage));
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, [keyword, selectedCategory, currentPage, itemsPerPage]);

  const handleSearch = (e) => {
    setKeyword(e.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="dark:bg-[#1E293B] ">
      <Helmet>
        <title>Services </title>
      </Helmet>
      <div className="w-11/12 mx-auto  ">
        <div className="py-8 ">
          <Typography variant="h2" className="text-center dark:text-white">
            {" "}
            Available Service{" "}
          </Typography>

          <div className="my-6 flex  justify-between ">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-3 border rounded-lg  dark:bg-[#293548] dark:text-white "
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
        </div>

        {loading ? (
          <Spinner />
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 py-8 dark:text-white">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Previous
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    className={`px-4 py-2 border rounded ${
                      currentPage === index + 1
                        ? "bg-blue-500 dark:bg-white dark:text-blue-500"
                        : ""
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Services;
