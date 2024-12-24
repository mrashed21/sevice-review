// import axios from "axios";
// import { useEffect, useState } from "react";
// import ServiceCard from "../components/service/ServiceCard";
// import { Spinner } from "@material-tailwind/react";

// const Services = () => {
//   const [services, setServices] = useState([]);
//   const [loading, setLoading] = useState(true);
//   useEffect(() => {
//     axios
//       .get("http://localhost:4000/services")
//       .then((res) => {
//         setServices(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching services:", err);
//         setLoading(false);
//       });
//   }, []);
//   if (loading) {

//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <Spinner className="h-12 w-12 text-blue-500" />
//       </div>
//     );
//   }
//   return (
//     <div className="w-11/12 mx-auto py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//       {services.map((service) => (
//         <ServiceCard key={service._id} service={service} />
//       ))}
//     </div>
//   );
// };

// export default Services;
import axios from "axios";
import { useEffect, useState } from "react";
import ServiceCard from "../components/service/ServiceCard";

const Services = () => {
  const [services, setServices] = useState([]);
  const [allServices, setAllServices] = useState([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get("http://localhost:4000/services");
        setServices(res.data);
        setAllServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      }
    };

    fetchServices();
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setKeyword(value);

    if (value === "") {
      setServices(allServices);
    } else {
      const filtered = allServices.filter(
        (service) =>
          service.title.toLowerCase().includes(value) ||
          service.category.toLowerCase().includes(value)
      );
      setServices(filtered);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-10">
      <div className="mb-6 flex justify-end">
        <input
          type="text"
          value={keyword}
          onChange={handleSearch}
          placeholder="Search services..."
          className=" p-3 border rounded-lg w-1/3"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {services.length > 0 ? (
          services.map((service) => (
            <ServiceCard key={service._id} service={service} />
          ))
        ) : (
          <p>No services found.</p>
        )}
      </div>
    </div>
  );
};

export default Services;
