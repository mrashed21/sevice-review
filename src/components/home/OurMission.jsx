import { Typography } from "@material-tailwind/react";

const OurMission = () => {
  return (
    <>
      <div className="relative bg-cover bg-center flex items-center dark:text-white">
        <div className="bg-gray-300 dark:bg-[#293548] p-8 w-full text-center">
          <Typography
            variant="h2"
            className="font-bold text-black dark:text-white"
          >
            Our Mission & Vision
          </Typography>
          <Typography variant="lead" className="mt-4">
            Our mission is to connect businesses and individuals with trusted
            services, making lives simpler and more productive.
          </Typography>
          <Typography variant="lead" className="mt-2">
            Our vision is to become the go-to platform for services, empowering
            growth and innovation globally.
          </Typography>
        </div>
      </div>
    </>
  );
};

export default OurMission;
