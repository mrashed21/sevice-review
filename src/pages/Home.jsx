import { Helmet } from "react-helmet-async";
import Banner from "../components/home/Banner";
import CountUpSection from "../components/home/CountUp";
import Featured from "../components/home/Featured";
import OurMission from "../components/home/OurMission";
import Partners from "../components/home/Partners";
import WhyUS from "../components/home/WhyUS";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="dark:bg-[#1E293B]">
        <Banner />
        <Featured />
        <Partners />
        <CountUpSection />
        <OurMission />
        <WhyUS />
      </div>
    </>
  );
};

export default Home;
