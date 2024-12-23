/* eslint-disable react/prop-types */

import { Button, Textarea, Typography } from "@material-tailwind/react";
import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import Rating from "react-rating-stars-component";

const Review = ({ serviceId, user }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/reviews/${serviceId}`
        );
        setReviews(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [serviceId]);

  const handleReviewSubmit = async () => {
    const newReview = {
      serviceId,
      userEmail: user.email,
      userName: user.displayName,
      userPhoto: user.photoURL,
      reviewText,
      rating,
      date: new Date(),
    };

    try {
      await axios.post("http://localhost:4000/reviews/add", newReview);
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

  return (
    <div className=" w-11/12 mx-auto mt-8">
      <Typography variant="h5" className="mb-4">
        Reviews ({reviews.length})
      </Typography>

      {loading ? (
        <Typography>Loading reviews...</Typography>
      ) : reviews.length === 0 ? (
        <Typography>No reviews yet.</Typography>
      ) : (
        <div className=" grid grid-cols-4 gap-4">
          {reviews.map((review) => (
            <div key={review._id} className="border p-4 rounded-lg  gap-4">
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
              <Typography variant="small" className="mt-1">
                Rating: {review.rating} / 5
              </Typography>
            </div>
          ))}
        </div>
      )}

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
          <Rating
            count={5}
            size={24}
            value={rating}
            onChange={(value) => setRating(value)}
          />
        </div>
        <Button className="mt-4" onClick={handleReviewSubmit}>
          Submit Review
        </Button>
      </div>
    </div>
  );
};

export default Review;
