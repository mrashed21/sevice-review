import { Typography } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthProvaider";
import UpdateService from "./UpdateService";

const MyServices = () => {
  const { user } = useContext(AuthContext);
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
          `http://localhost:4000/service/me/${user.email}`
        );
        setServices(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
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
          axios.delete(`http://localhost:4000/service/delete/${id}`);
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

  // spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
      <div className="py-10 w-11/12 mx-auto">
        <Typography variant="h2" className="text-center">
          My Posted Services
        </Typography>
        <div className="flex items-end justify-end w-full">
          <input
            type="text"
            placeholder="Search services..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex justify-end w-1/3 p-2 mb-4 border rounded-md"
          />
        </div>
        {filteredServices.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <Typography variant="h3" className="text-center">
              No services found
            </Typography>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-2">No</th>
                  <th className="border border-gray-300 px-4 py-2">Title</th>
                  <th className="border border-gray-300 px-4 py-2">Category</th>
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
                      {service.category}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      ${service.price}
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
