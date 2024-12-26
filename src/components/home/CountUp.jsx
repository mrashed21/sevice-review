

import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountUpSection = () => {
  const [review, setReview] = useState([]);
  const [services, setServices] = useState(0);  
  const [users, setUsers] = useState([]);

  // Visibility states for triggering counts
  const [usersInView, setUsersInView] = useState(false);
  const [reviewsInView, setReviewsInView] = useState(false);
  const [servicesInView, setServicesInView] = useState(false);

  // Fetch reviews
  useEffect(() => {
    axios
      .get("https://server-seven-beta-45.vercel.app/reviews/all")
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch services
  useEffect(() => {
    axios
      .get("https://server-seven-beta-45.vercel.app/services") 
      .then((res) => setServices(res.data.total))
      .catch((err) => console.error(err));
  }, []);

  // Fetch users
  useEffect(() => {
    axios
      .get("https://server-seven-beta-45.vercel.app/users")
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    {
      id: 1,
      label: "Users",
      count: users.length,
      inView: usersInView,
      setInView: setUsersInView,
    },
    {
      id: 2,
      label: "Reviews",
      count: review.length,
      inView: reviewsInView,
      setInView: setReviewsInView,
    },
    {
      id: 3,
      label: "Services",
      count: services, 
      inView: servicesInView,
      setInView: setServicesInView,
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { staggerChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="">
      <div className="py-10  w-11/12 mx-auto">
        <motion.div
          className="container mx-auto px-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">
            Platform Stats
          </h2>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
            variants={containerVariants}
          >
            {stats.map((stat) => (
              <motion.div
                key={stat.id}
                className="p-6 bg-gray-100 rounded-lg shadow-lg"
                variants={itemVariants}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onViewportEnter={() => stat.setInView(true)}
                viewport={{ once: true }}
              >
                <h3 className="text-4xl font-bold text-blue-500">
                  <CountUp
                    start={stat.inView ? 0 : null}
                    end={stat.count}
                    duration={2.5}
                    useEasing={true}
                  />
                </h3>
                <p className="text-lg font-medium text-gray-600 mt-2">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CountUpSection;
