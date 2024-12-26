import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const StatsSection = () => {
  const [userCount, setUserCount] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        // Fetch Users Count
        const userResponse = await fetch(
          "https://server-seven-beta-45.vercel.app/users"
        );
        const users = await userResponse.json();
        setUserCount(users.length);

        // Fetch Reviews Count
        const reviewResponse = await fetch(
          "https://server-seven-beta-45.vercel.app/reviews/all"
        );
        const reviews = await reviewResponse.json();
        setReviewCount(reviews.length);

        // Fetch Services Count with Pagination
        let totalServices = 0;
        let page = 1;
        let totalPages = 1;

        do {
          const serviceResponse = await fetch(
            `https://server-seven-beta-45.vercel.app/services?page=${page}&limit=8`
          );
          const serviceData = await serviceResponse.json();
          totalServices += serviceData.services.length;
          totalPages = serviceData.totalPages;
          page++;
        } while (page <= totalPages);

        setServiceCount(totalServices);
      } catch (error) {
        // console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-bold mb-6">
        Platform Statistics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Users Count */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          <CountUp
            end={userCount}
            duration={2}
            className="text-4xl font-bold text-blue-500"
          />
        </motion.div>

        {/* Reviews Count */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold mb-2">Reviews</h3>
          <CountUp
            end={reviewCount}
            duration={2}
            className="text-4xl font-bold text-green-500"
          />
        </motion.div>

        {/* Services Count */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          className="p-4 bg-white rounded-lg shadow-md flex flex-col items-center"
        >
          <h3 className="text-lg font-semibold mb-2">Services</h3>
          <CountUp
            end={serviceCount}
            duration={2}
            className="text-4xl font-bold text-purple-500"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default StatsSection;
