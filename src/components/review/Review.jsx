/* eslint-disable react/prop-types */
import { Button, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import ReviewUpdate from "./ReviewUpdate";

const Review = ({ serviceId, user, service }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");
  const { title, image } = service;

  const navigate = useNavigate();

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://server-seven-beta-45.vercel.app/reviews/${serviceId}`
      );
      setReviews(res.data);
    } catch (error) {
      console.error("Failed to fetch reviews", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [serviceId]);

  const handleReviewSubmit = async () => {
    if (reviewText.length < 20) {
      setError("Review text must be at least 20 characters long.");
      return;
    }
    if (rating < 1) {
      setError("Please give at least 1 star rating.");
      return;
    }
    setError("");

    const newReview = {
      serviceId,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      reviewText,
      rating,
      date: new Date(),
      title,
      image,
    };

    try {
      await axios.post(
        "https://server-seven-beta-45.vercel.app/reviews/add",
        newReview
      );
      await fetchReviews();
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      swal({
        title: "Are you sure?",
        text: "Are you want to DELETE this review!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then(async (willDelete) => {
        if (willDelete) {
          await axios.delete(
            `https://server-seven-beta-45.vercel.app/review/delete/${id}`
          );
          await fetchReviews();
          swal("DELETE successful!", {
            icon: "success",
          });
        } else {
          swal("Your review is safe!");
        }
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };

  const handlePassId = (id) => {
    setReviewId(id);
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleUpdateSuccess = () => {
    fetchReviews();
  };

  const handleAddReview = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="dark:bg-[#1E293B]">
        <div className="w-11/12 mx-auto py-8">
          <Typography variant="h3" className="mb-4 dark:text-white">
            Reviews ({reviews.length})
          </Typography>

          {/* Display Reviews */}
          {loading ? (
            <Typography>Loading reviews...</Typography>
          ) : reviews.length === 0 ? (
            <Typography variant="h3" className="text-center dark:text-white">
              No reviews yet.
            </Typography>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {reviews.map((review) => (
                <div key={review._id} className="border p-4 rounded-lg gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={review.userPhoto}
                      alt={review.userName}
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <Typography variant="h6" className="dark:text-white">
                        {review.userName}
                      </Typography>
                      <Typography
                        variant="small"
                        className="text-gray-500 dark:text-gray-100"
                      >
                        {format(new Date(review.date), "PPP")}
                      </Typography>
                    </div>
                  </div>
                  {review.reviewText.length > 100 ? (
                    <p className="mt-2 text-gray-700 dark:text-white">
                      {review.showMore
                        ? review.reviewText
                        : `${review.reviewText.substring(0, 100)}... `}
                      <span
                        className="text-blue-500 cursor-pointer"
                        onClick={() => {
                          const updatedReviews = reviews.map((r) =>
                            r._id === review._id
                              ? { ...r, showMore: !r.showMore }
                              : r
                          );
                          setReviews(updatedReviews);
                        }}
                      >
                        {review.showMore ? " see less" : "see more"}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-2 text-gray-700 dark:text-white">
                      {review.reviewText}
                    </p>
                  )}
                  <div>
                    <ReactStars
                      count={5}
                      value={
                        review?.rating?.$numberInt
                          ? parseInt(review.rating.$numberInt)
                          : review.rating
                      }
                      size={24}
                      edit={false}
                    />
                  </div>
                  {user?.email === review.userEmail && (
                    <div className="flex justify-between mt-4">
                      <Button
                        size="sm"
                        color="blue"
                        onClick={() => {
                          handlePassId(review._id);
                          handleOpen();
                        }}
                      >
                        Update
                      </Button>
                      <Button
                        size="sm"
                        color="red"
                        onClick={() => handleDelete(review._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Add New Review */}
          {user && user?.email ? (
            <div className="mt-6 p-4 border-t">
              <Typography variant="h5" className="mb-2 dark:text-white">
                Add a Review
              </Typography>
              <Textarea
                className="dark:text-white"
                label={
                  <span className="dark:text-white">Write your review</span>
                }
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              <div className="mt-4">
                <Typography className="dark:text-white">Rating:</Typography>
                <ReactStars
                  count={5}
                  size={24}
                  value={rating}
                  onChange={(value) => setRating(value)}
                />
              </div>
              {error && (
                <Typography color="red" className="mt-2">
                  {error}
                </Typography>
              )}
              <Button className="mt-4" onClick={handleReviewSubmit}>
                Submit Review
              </Button>
            </div>
          ) : (
            <div className="flex items-center justify-center mt-5 border-t">
              <Button onClick={handleAddReview} className="mt-5">
                Add a review
              </Button>
            </div>
          )}
        </div>
        <ReviewUpdate
          open={open}
          reviewId={reviewId}
          handleOpen={handleOpen}
          onUpdateSuccess={handleUpdateSuccess}
        />
      </div>
    </>
  );
};

export default Review;
