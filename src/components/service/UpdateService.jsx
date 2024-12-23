/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateService({ open, handleOpen, selectedId }) {
  console.log(selectedId);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    if (selectedId) {
      const fetchServiceData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/service/${selectedId}`
          );
          const service = response.data;

          setValue("title", service.title);
          setValue("image", service.image);
          setValue("company", service.company);
          setValue("website", service.website);
          setValue("description", service.description);
          setValue("minPrice", service.minPrice);
          setValue("maxPrice", service.maxPrice);
          setValue("category", service.category);
        } catch (error) {
          console.error("Error fetching service:", error);
        }
      };
      fetchServiceData();
    }
  }, [selectedId, setValue]);

  const onSubmit = async (data) => {
    try {
      await axios.put(`http://localhost:4000/service/${selectedId}`, data);
      toast.success("Service updated successfully!");
      handleOpen();
      navigate("/services");
    } catch (error) {
      toast.error("Failed to update service!");
      console.error("Error updating service:", error);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="p-4 overflow-y-scroll size-11/12"
    >
      <DialogHeader>Update Service</DialogHeader>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Typography variant="small" className="mb-2">
              Title
            </Typography>
            <Input
              type="text"
              {...register("title", { required: "Title is required" })}
              placeholder="Enter title"
            />
            {errors.title && (
              <p className="text-red-500 text-xs mt-1">
                {errors.title.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Company
            </Typography>
            <Input
              type="text"
              {...register("company", { required: "Company is required" })}
              placeholder="Enter company name"
            />
            {errors.company && (
              <p className="text-red-500 text-xs mt-1">
                {errors.company.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Website
            </Typography>
            <Input
              type="url"
              {...register("website", {
                required: "Website is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w.-]*)*\/?$/,
                  message: "Enter a valid URL",
                },
              })}
              placeholder="Enter website URL"
            />
            {errors.website && (
              <p className="text-red-500 text-xs mt-1">
                {errors.website.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Image URL
            </Typography>
            <Input
              type="url"
              {...register("image", {
                required: "Image URL is required",
                pattern: {
                  value: /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w.-]*)*\/?$/,
                  message: "Enter a valid image URL",
                },
              })}
              placeholder="Enter image URL"
            />
            {errors.image && (
              <p className="text-red-500 text-xs mt-1">
                {errors.image.message}
              </p>
            )}
          </div>

          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Category
            </Typography>
            <Select
              {...register("category", { required: "Category is required" })}
              defaultValue="Marketing"
            >
              <Option value="Marketing">Marketing</Option>
              <Option value="Content Writing">Content Writing</Option>
              <Option value="Design">Design</Option>
            </Select>
            {errors.category && (
              <p className="text-red-500 text-xs mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div className="mt-4 flex gap-4">
            <div className="w-1/2">
              <Typography variant="small" className="mb-2">
                Min Price
              </Typography>
              <Input
                type="text"
                {...register("minPrice", {
                  required: "Min Price is required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Enter a valid number",
                  },
                })}
                placeholder="Enter min price"
              />
              {errors.minPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.minPrice.message}
                </p>
              )}
            </div>
            <div className="w-1/2">
              <Typography variant="small" className="mb-2">
                Max Price
              </Typography>
              <Input
                type="text"
                {...register("maxPrice", {
                  required: "Max Price is required",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Enter a valid number",
                  },
                })}
                placeholder="Enter max price"
              />
              {errors.maxPrice && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.maxPrice.message}
                </p>
              )}
            </div>
          </div>

          <div className="mt-4">
            <Typography variant="small" className="mb-2">
              Description
            </Typography>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Enter description"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">
                {errors.description.message}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button onClick={handleOpen} color="red" variant="outlined">
              Cancel
            </Button>
            <Button type="submit" color="blue" className="ml-2">
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogBody>
    </Dialog>
  );
}