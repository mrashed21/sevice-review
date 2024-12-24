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

export default function ReviewUpdate({ open, reviewId, handleOpen }) {
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

          // Set form values

          setValue("reviewText", review.reviewText);

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
    <Dialog size="md" open={open} handler={handleOpen} className="p-4">
      <div className="">
        <DialogHeader className="text-center">Update Review</DialogHeader>
      </div>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
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
        </form>
      </DialogBody>
    </Dialog>
  );
}
