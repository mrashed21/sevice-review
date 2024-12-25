
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import CountUp from "react-countup";

const CountUpSection = () => {
  const [review, setReview] = useState([]);
  const [services, setServices] = useState([]);
  const [users, setUsers] = useState([]);

  // Fetch reviews
  useEffect(() => {
    axios
      .get("http://localhost:4000/reviews/all")
      .then((res) => setReview(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch services
  useEffect(() => {
    axios
      .get("http://localhost:4000/services")
      .then((res) => setServices(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Fetch users
  useEffect(() => {
    axios
      .get("http://localhost:4000/users") 
      .then((res) => setUsers(res.data))
      .catch((err) => console.error(err));
  }, []);

  const stats = [
    { id: 1, label: "Users", count: users.length },
    { id: 2, label: "Reviews", count: review.length },
    { id: 3, label: "Services", count: services.length },
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
    <section className="py-10 bg-white">
      <motion.div
        className="container mx-auto px-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-semibold text-center mb-8">
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
            >
              <h3 className="text-4xl font-bold text-blue-500">
                <CountUp
                  start={0}
                  end={stat.count}
                  duration={2.5}
                  delay={3}
                  useEasing={true}
                  onEnd={() => {
                    setInterval(() => {
                      stat.count += 1;
                    }, 1000);
                  }}
                />
              </h3>
              <p className="text-lg font-medium text-gray-600 mt-2">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CountUpSection;
