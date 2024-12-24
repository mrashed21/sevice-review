/* eslint-disable react/prop-types */
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UpdateReview({ open, reviewId, handleOpen }) {
  console.log("Review ID:", reviewId);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  // Fetch Review Data
  useEffect(() => {
    if (reviewId) {
      const fetchServiceData = async () => {
        try {
          const response = await axios.get(
            `http://localhost:4000/review/${reviewId}`
          );

          const review = response.data;
          console.log("Fetched Review:", review);

          // Set form values
          setValue("title", review.title);
          setValue("image", review.image);
          setValue("company", review.company);
          setValue("website", review.website);
          setValue("reviewText", review.reviewText);
          setValue("minPrice", review.minPrice);
          setValue("maxPrice", review.maxPrice);
          setValue("category", review.category);
          const rating = review.rating?.$numberInt
            ? parseInt(review.rating.$numberInt)
            : review.rating || 0;
          setValue("rating", rating);
        } catch (error) {
          console.error("Error fetching review:", error);
        }
      };
      fetchServiceData();
    }
  }, [reviewId, setValue]);

  // Handle Update Submission
  const onSubmit = async (data) => {
    // Validation
    if (data.reviewText.length < 20) {
      setError("Review text must be at least 20 characters long.");
      return;
    }
    if (data.rating < 1) {
      setError("Please give at least 1 star rating.");
      return;
    }
    setError("");

    try {
      console.log("Submitted Data:", data);

      const updatedData = {
        ...data,
        rating: { $numberInt: data.rating.toString() },
      };

      await axios.put(
        `http://localhost:4000/review/update/${reviewId}`,
        updatedData
      );

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
      <div className="flex justify-center items-center">
        <DialogHeader className="text-center">Update Review</DialogHeader>
      </div>
      <DialogBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-4"
        >
          <div className="mt-4 w-1/2">
            <img
              src={watch("image")}
              alt="service"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div>
              <Typography variant="lead" color="black" className="mb-2">
                Service Title
              </Typography>
              <Typography variant="paragraph" color="black" className="mb-2">
                {watch("title")}
              </Typography>
            </div>
          </div>

          <div className="w-1/2">
            <div className="mt-4">
              <Typography variant="lead" className="mb-2">
                Service Company
              </Typography>
              <Typography variant="paragraph" className="mb-2">
                {watch("company")}
              </Typography>
            </div>

            <div className="mt-4">
              <Typography variant="lead" className="mb-2">
                Category
              </Typography>
              <Typography variant="paragraph" className="mb-2">
                {watch("category")}
              </Typography>
            </div>

            <div className="mt-4">
              <Typography variant="lead" className="mb-2">
                Review Text
              </Typography>
              <Textarea
                {...register("reviewText")}
                placeholder="Enter review text"
              />
            </div>

            <div className="mt-4">
              <Typography variant="lead" className="mb-2">
                Rating
              </Typography>
              <ReactStars
                count={5}
                size={30}
                value={watch("rating") || 0}
                onChange={(value) => setValue("rating", value)}
                color={"#e4e5e9"}
                activeColor={"#f59e0b"}
                edit={true}
              />
            </div>

            {error && (
              <Typography color="red" className="mt-2">
                {error}
              </Typography>
            )}

            <DialogFooter>
              <Button onClick={handleOpen} color="red" variant="outlined">
                Cancel
              </Button>
              <Button type="submit" color="blue" className="ml-2">
                Update
              </Button>
            </DialogFooter>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
