import Banner from "../components/home/Banner";
import CountUpSection from "../components/home/CountUp";
import Featured from "../components/home/Featured";
import Partners from "../components/home/Partners";

const Home = () => {
  return (
    <div>
      <Banner />
      <Featured />
      <Partners />
      <CountUpSection />
    </div>
  );
};

export default Home;
