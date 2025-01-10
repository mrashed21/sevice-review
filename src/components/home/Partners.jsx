import { Card, CardBody, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

const partners = [
  {
    name: "Tech Solutions Inc.",
    logo: "https://i.ibb.co.com/K9XpLY3/images.jpg",
    description: "Providing cutting-edge technology solutions for businesses.",
  },
  {
    name: "Design Studio Co.",
    logo: "https://i.ibb.co.com/vZBcpQt/Design-Studio-Co.png",
    description: "Innovative graphic design and branding solutions.",
  },
  {
    name: "MarketPro Ltd.",
    logo: "https://i.ibb.co.com/pJ3FzTH/Market-Pro-Ltd.png",
    description: "Marketing strategies that drive growth and engagement.",
  },
  {
    name: "SEO Experts",
    logo: "https://i.ibb.co.com/0YDbGmZ/SEO-Experts.jpg",
    description: "Search engine optimization services to boost visibility.",
  },
];

const MeetOurPartners = () => {
  return (
    <div className="bg-gray-200 dark:bg-gray-900">
        <div className=" w-11/12 mx-auto  text-white py-12">
      <div className="text-center mb-12">
        <Typography variant="h4" className="text-blue-400 font-bold">
          Meet Our Partners
        </Typography>
        <Typography className="text-black dark:text-gray-300 mt-2">
          Our trusted collaborators helping us deliver the best services.
        </Typography>
      </div>

      <div className="grid grid-cols-1  md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
        {partners.map((partner, index) => (
          <motion.div
            key={index}
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Card className="bg-gray-800 shadow-lg min-h-64 hover:shadow-xl">
              <CardBody className="p-6 flex flex-col items-center text-center">
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-24 h-24 rounded-full object-contain mb-4"
                />
                <Typography
                  variant="h6"
                  className="text-blue-400 font-semibold mb-2"
                >
                  {partner.name}
                </Typography>
                <Typography className="text-gray-300 text-sm">
                  {partner.description}
                </Typography>
              </CardBody>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default MeetOurPartners;
