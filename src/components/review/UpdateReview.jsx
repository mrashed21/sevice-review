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

export default function UpdateReview({
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

  // Fetch Review Data
  useEffect(() => {
    if (reviewId) {
      const fetchReviewData = async () => {
        try {
          const response = await axios.get(
            `https://server-seven-beta-45.vercel.app/review/${reviewId}`
          );
          const review = response.data;

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
      fetchReviewData();
    }
  }, [reviewId, setValue]);

  // Handle Update Submission
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
      onUpdateSuccess(); // Call this to refresh the reviews list
    } catch (error) {
      toast.error("Failed to update review!");
      console.error("Error updating review:", error);
    }
  };

  return (
    <Dialog
      size="lg"
      open={open}
      handler={handleOpen}
      className="p-4 dark:bg-[#293548] size-11/12"
    >
      <div className="flex justify-center items-center">
        <DialogHeader className="text-center dark:text-white">
          Update Review
        </DialogHeader>
      </div>
      <DialogBody>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex items-center justify-between gap-4"
        >
          <div className="w-1/2">
            <img
              src={watch("image")}
              alt="service"
              className="w-full h-48 object-cover rounded-lg"
            />
            <div>
              <Typography
                variant="lead"
                color="black"
                className="mb-2 dark:text-white"
              >
                Service Title
              </Typography>
              <Typography
                variant="paragraph"
                color="black"
                className="mb-2 text-white"
              >
                {watch("title")}
              </Typography>
            </div>
          </div>

          <div className="w-1/2">
            <div className="">
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
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
}
