import {
  Button,
  Card,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthProvaider";

const AddService = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const addedDate = new Date();
  const categories = [
    "Web Development",
    "Graphic Design",
    "Marketing",
    "SEO",
    "Content Writing",
  ];

  const onSubmit = async (data) => {
    const serviceData = {
      ...data,
      date: addedDate,
      userEmail: user.email,
    };

    try {
      console.log(serviceData);
      await axios.post("http://localhost:4000/service/add", serviceData);
      toast.success("Service added successfully!");
      reset();
    } catch (error) {
      toast.error("Failed to add service. Please try again.");
    }
  };

  const validateUrl = (value) => {
    const urlPattern =
      /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlPattern.test(value) || "Enter a valid URL";
  };

  const minPrice = watch("minPrice");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10">
      <Card className="p-6 md:w-1/2 w-full shadow-lg">
        <Typography variant="h4" className="mb-6 text-center">
          Add Service
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input
              label="Service Image URL"
              {...register("image", {
                required: "Image URL is required",
                validate: validateUrl,
              })}
              error={!!errors.image}
            />
            {errors.image && (
              <Typography color="red">{errors.image.message}</Typography>
            )}
          </div>

          <div>
            <Input
              label="Service Title"
              {...register("title", { required: "Service title is required" })}
              error={!!errors.title}
            />
            {errors.title && (
              <Typography color="red">{errors.title.message}</Typography>
            )}
          </div>

          <div>
            <Input
              label="Company Name"
              {...register("company", { required: "Company name is required" })}
              error={!!errors.company}
            />
            {errors.company && (
              <Typography color="red">{errors.company.message}</Typography>
            )}
          </div>

          <div>
            <Input
              label="Website URL"
              {...register("website", {
                required: "Website URL is required",
                validate: validateUrl,
              })}
              error={!!errors.website}
            />
            {errors.website && (
              <Typography color="red">{errors.website.message}</Typography>
            )}
          </div>

          <div>
            <Textarea
              label="Description"
              {...register("description", {
                required: "Description is required",
              })}
              error={!!errors.description}
            />
            {errors.description && (
              <Typography color="red">{errors.description.message}</Typography>
            )}
          </div>

          <div>
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select label="Select Category" {...field}>
                  {categories.map((category) => (
                    <Option key={category} value={category}>
                      {category}
                    </Option>
                  ))}
                </Select>
              )}
            />
            {errors.category && (
              <Typography color="red">{errors.category.message}</Typography>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Input
                label="Minimum Price"
                type="text"
                {...register("minPrice", {
                  required: "Minimum price is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid positive number",
                  },
                })}
                error={!!errors.minPrice}
              />
              {errors.minPrice && (
                <Typography color="red">{errors.minPrice.message}</Typography>
              )}
            </div>

            <div>
              <Input
                label="Maximum Price"
                type="text"
                {...register("maxPrice", {
                  required: "Maximum price is required",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Please enter a valid positive number",
                  },
                  validate: (value) =>
                    parseInt(value) >= parseInt(minPrice) ||
                    "Maximum price must be greater than minimum price",
                })}
                error={!!errors.maxPrice}
              />
              {errors.maxPrice && (
                <Typography color="red">{errors.maxPrice.message}</Typography>
              )}
            </div>
          </div>

          <div>
            <Input label="User Email" defaultValue={user.email} readOnly />
          </div>

          <Button type="submit" color="blue" className="w-full">
            Add Service
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddService;
