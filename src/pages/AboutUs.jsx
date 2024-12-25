import { Card, CardBody, Typography } from "@material-tailwind/react";

const AboutUs = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 text-white flex items-center justify-center px-4 py-12">
      <Card className="max-w-4xl w-full dark:bg-gray-800 shadow-lg">
        <CardBody className="p-8">
          <Typography
            variant="h4"
            className="text-center dark:text-blue-400 font-bold mb-6"
          >
            About Us
          </Typography>

          <Typography className="text-lg dark:text-gray-300 leading-relaxed mb-6">
            Welcome to{" "}
            <span className="text-blue-400 font-semibold">
              Our Service Review Platform
            </span>
            , where we connect people with exceptional service providers. Our
            mission is to create a space where users can explore, rate, and
            review services to make informed decisions confidently.
          </Typography>

          <Typography className="text-lg dark:text-gray-300 leading-relaxed mb-6">
            We value transparency and trust. Our platform is designed to help
            businesses grow while empowering users to share honest feedback.
            Whether you are looking for a plumber, a graphic designer, or a
            fitness trainer, we've got you covered.
          </Typography>

          <Typography className="text-lg dark:text-gray-300 leading-relaxed mb-6">
            At <span className="text-blue-400 font-semibold">Our Platform</span>
            , we ensure quality and reliability by verifying reviews and
            monitoring feedback closely. Together, we aim to build a supportive
            and thriving community.
          </Typography>

          <Typography className="text-lg dark:text-gray-300 leading-relaxed mb-6">
            Thank you for trusting us to assist you in finding the best services
            available. Your satisfaction is our priority.
          </Typography>

          <Typography className="text-center text-blue-400 font-semibold text-lg">
            Join Us Today and Start Exploring!
          </Typography>
        </CardBody>
      </Card>
    </div>
  );
};

export default AboutUs;
