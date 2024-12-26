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
import { toast } from "react-toastify";

export default function ReviewUpdate({
  open,
  reviewId,
  handleOpen,
  onUpdateSuccess,
}) {
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (reviewId) {
      const fetchReviewData = async () => {
        try {
          const response = await axios.get(
            `https://server-seven-beta-45.vercel.app/review/${reviewId}`
          );
          const review = response.data;
          setValue("reviewText", review.reviewText);
          const rating = review.rating?.$numberInt
            ? parseInt(review.rating.$numberInt)
            : review.rating || 0;
          setValue("rating", rating);
        } catch (error) {
          console.error("Error fetching review:", error);
        }
      };
      fetchReviewData();
    }
  }, [reviewId, setValue]);

  const onSubmit = async (data) => {
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
        `https://server-seven-beta-45.vercel.app/review/update/${reviewId}`,
        updatedData
      );

      toast.success("Review updated successfully!");
      reset();
      handleOpen();
      onUpdateSuccess();
    } catch (error) {
      toast.error("Failed to update Review!");
      console.error("Error updating service:", error);
    }
  };

  return (
    <Dialog
      size="md"
      open={open}
      handler={handleOpen}
      className="p-4 dark:bg-[#21252ea7]"
    >
      <div>
        <DialogHeader className="text-center text-white">
          Update Review
        </DialogHeader>
      </div>
      <DialogBody>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <Typography variant="lead" className="mb-2 dark:text-white">
              Review Text
            </Typography>
            <Textarea
              className="dark:text-white"
              {...register("reviewText")}
              placeholder="Enter review text"
            />
          </div>

          <div className="mt-4">
            <Typography variant="lead" className="mb-2 dark:text-white">
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
