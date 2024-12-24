/* eslint-disable react/prop-types */

import { Button, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";

const Review = ({ serviceId, user, service }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [error, setError] = useState("");

  const { title, image } = service;

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/reviews/${serviceId}`
        );
        setReviews(res.data);
      } catch (error) {
        console.log("Failed to fetch reviews", error);
      }
    };
    fetchReviews();
  }, [serviceId]);

  // Handle review submission with validation
  const handleReviewSubmit = async () => {
    // Validation
    if (reviewText.length < 20) {
      setError("Review text must be at least 20 characters long.");
      return;
    }
    if (rating < 1) {
      setError("Please give at least 1 star rating.");
      return;
    }
    setError("");

    // Prepare review data
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
      // Submit review
      await axios.post("http://localhost:4000/reviews/add", newReview);
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <div className="w-11/12 mx-auto mt-8">
      <Typography variant="h5" className="mb-4">
        Reviews ({reviews.length})
      </Typography>

      {/* Display Reviews */}
      {reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        <div className="grid grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={review.userPhoto}
                  alt={review.userName}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <Typography variant="h6">{review.userName}</Typography>
                  <Typography variant="small" className="text-gray-500">
                    {format(new Date(review.date), "PPP")}
                  </Typography>
                </div>
              </div>
              <Typography className="mt-2">{review.reviewText}</Typography>
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
            </div>
          ))}
        </div>
      )}

      {/* Add New Review */}
      <div className="mt-6 p-4 border-t">
        <Typography variant="h6" className="mb-2">
          Add a Review
        </Typography>
        <Textarea
          label="Write your review"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
        <div className="mt-4">
          <Typography>Rating:</Typography>
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
    </div>
  );
};

export default Review;
