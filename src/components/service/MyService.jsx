import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthProvaider";
import Spinner from "../../pages/Spiiner";
import UpdateService from "./UpdateService";

const MyServices = () => {
  const { user, logOut } = useContext(AuthContext);
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [serviceId, setServiceId] = useState("");
  // handle pass id
  const handlePassId = (id) => {
    setServiceId(id);
  };
  // Toggle the modal
  const handleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get(
          `https://server-seven-beta-45.vercel.app/service/me/${user.email}`,
          {
            withCredentials: true,
          }
        );
        setServices(res.data);
        setLoading(false);
      } catch (error) {
        if (error.response?.status === 401) {
          // logOut();
        } else {
          console.error("Error fetching services:", error.message);
        }
      } finally {
        setLoading(false);
      }
    };

    if (user.email) {
      fetchServices();
    }
  }, [user.email]);

  // handle delete
  const handleDelete = async (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Are you want to DELETE this service!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(
            `https://server-seven-beta-45.vercel.app/service/delete/${id}`
          );
          const newServices = services.filter((service) => service._id !== id);
          setServices(newServices);
          swal("DELETE seccessfull!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  const filteredServices = services?.filter((service) =>
    service.title.toLowerCase().includes(search?.toLowerCase())
  );

  const categoryColors = {
    "Web Development": "bg-blue-500 text-white",
    "Graphic Design": "bg-green-500 text-white",
    Marketing: "bg-purple-500 text-white",
    SEO: "bg-yellow-500 text-black",
    "Content Writing": "bg-orange-500 text-white",
    "Software Solutions": "bg-teal-500 text-white",
    Plumbing: "bg-cyan-500 text-black",
    "Electrical Repairs": "bg-indigo-500 text-white",
    "Cleaning Services": "bg-pink-500 text-white",
    "Interior Design": "bg-lime-500 text-black",
    "Fitness Trainers": "bg-red-500 text-white",
    Nutritionists: "bg-amber-600 text-white",
    Psychologists: "bg-indigo-800 text-white",
    Therapists: "bg-lime-500 text-white",
    "Care Givers": "bg-purple-900 text-white",
    "Dental Services": "bg-amber-500 text-black",
    "Hair Stylists": "bg-red-500 text-white",
    "Makeup Artists": "bg-pink-400 text-white",
    Others: "bg-cyan-700 text-white",
  };

  // spinner
  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>My Service</title>
      </Helmet>
      <div className="bg-gray-50 dark:bg-[#1E293B]">
        <div className="py-10 w-11/12 mx-auto">
          <Typography variant="h2" className="text-center dark:text-white">
            My Posted Services
          </Typography>
          <div className="flex items-end justify-end w-full mt-5">
            <input
              type="text"
              placeholder="Search services..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex justify-end w-full lg:w-1/3 p-2 mb-4 border rounded-md dark:bg-[#21252ea7] dark:text-white"
            />
          </div>
          {filteredServices.length === 0 ? (
            <div className="min-h-screen flex items-center justify-center">
              <Typography variant="h4" className="text-center dark:text-white">
                No services found
              </Typography>
            </div>
          ) : (
            <div className="overflow-x-auto dark:bg-[#151c26]">
              <table className="table-auto w-full border-collapse border border-gray-200 dark:bg-[#293548] dark:text-white">
                <thead>
                  <tr className="bg-gray-100 dark:bg-[#212936]">
                    <th className="border border-gray-300 px-4 py-2">No</th>
                    <th className="border border-gray-300 px-4 py-2">Title</th>
                    <th className="border border-gray-300 px-4 py-2">
                      Category
                    </th>
                    <th className="border border-gray-300 px-4 py-2">Price</th>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Update</th>
                    <th className="border border-gray-300 px-4 py-2">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredServices.map((service, index) => (
                    <tr key={service._id} className="text-center">
                      <td className="border border-gray-300 px-4 py-2">
                        {index + 1}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {service.title}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <span
                          className={`px-2 py-1 rounded-md ${
                            categoryColors[service.category] ||
                            categoryColors["Others"]
                          }`}
                        >
                          {service.category}
                        </span>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        ${service.minPrice} - ${service.maxPrice}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {new Date(service.date).toLocaleDateString()}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => {
                            handleOpen(service._id);
                            handlePassId(service._id);
                          }}
                          className="text-blue-500 mr-2"
                        >
                          Update
                        </button>
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        <button
                          onClick={() => handleDelete(service._id)}
                          className="text-red-500"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {/* modal components */}
      <UpdateService
        open={open}
        handleOpen={handleOpen}
        selectedId={serviceId}
      />
    </>
  );
};

export default MyServices;
