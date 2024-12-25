import { Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const WhyUS = () => {
  return (
    <div className="bg-gray-100 dark:bg-[#1E293B] ">
      <div className="py-10  w-11/12 mx-auto">
        <div className="text-center my-8 ">
          <Typography variant="h2" className="font-bold dark:text-white">
            Why Choose Us?
          </Typography>
          <Typography className="text-gray-600 mt-2 dark:text-white">
            We provide the best services to meet your needs.
          </Typography>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {[
            {
              title: "Trusted Professionals",
              image: "https://i.ibb.co.com/sQ0crXw/Trusted-Professionals.jpg",
              description: "Skilled and verified experts at your service.",
            },
            {
              title: "Affordable Pricing",
              image: "https://i.ibb.co.com/NrC0Fxk/Affordable-Pricing.png",
              description: "Best value for money with top-quality work.",
            },
            {
              title: "Easy Booking",
              image: "https://i.ibb.co.com/kxWQYTF/Easy-Booking.png",
              description: "Simple and quick booking process.",
            },
            {
              title: "24/7 Support",
              image: "https://i.ibb.co.com/tQ4JG7v/Support.png",
              description: "We’re here to assist you anytime.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 rounded-full mx-auto mb-4"
              />
              <Typography
                variant="h5"
                className="font-semibold dark:text-white"
              >
                {item.title}
              </Typography>
              <Typography className="text-gray-600 dark:text-gray-100 mt-2">
                {item.description}
              </Typography>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUS;
