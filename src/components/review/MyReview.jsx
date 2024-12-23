import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../context/AuthProvaider";

const MyReview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/reviews/me/${user.email}`
        );
        setReviews(res.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reviews:", error);
        setLoading(false);
      }
      console.log("my reviews", reviews);
    };

    if (user.email) {
      fetchReviews();
    }
  }, [user.email]);

  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="w-11/12 mx-auto py-10 ">
      <h2 className="text-2xl font-bold text-center mb-6">My Reviews</h2>

      <div className="space-y-5">
        {reviews.length === 0 ? (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-center col-span-full">No reviews found.</p>
          </div>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              className="border p-4 rounded-lg shadow-md flex justify-between items-center"
            >
              <div className="">
                <h3 className="text-lg font-semibold">{review.title}</h3>
                <ReactStars
                  count={5}
                  value={review?.rating}
                  size={24}
                  edit={false}
                />
              </div>
              <div className="">
                <p className="mt-2 text-gray-700">{review.reviewText}</p>
                <span className="text-gray-500 text-sm">
                  {new Date(review.date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex gap-4">
                <Button className="text-blue-500">Update</Button>
                <Button className="text-red-500">Delete</Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MyReview;
