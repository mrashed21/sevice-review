import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthProvaider";
import UpdateReview from "./UpdateReview";
const MyReview = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");

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
        setLoading(false);
      }
    };

    if (user.email) {
      fetchReviews();
    }
  }, [user.email]);
  // handle delete review
  const handleDelete = async (id) => {
    // try {
    //   await axios.delete(`http://localhost:4000/review/delete/${id}`);
    //   setReviews(reviews.filter((review) => review._id !== id));
    try {
      swal({
        title: "Are you sure?",
        text: "Are you want to DELETE this review!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          axios.delete(`http://localhost:4000/review/delete/${id}`);
          setReviews(reviews.filter((review) => review._id !== id));
          swal("DELETE seccessfull!", {
            icon: "success",
          });
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    } catch (error) {
      console.error("Error deleting review:", error);
    }
  };
  const handlePassId = (id) => {
    setReviewId(id);
  };
  // Toggle the modal and set the serviceId
  const handleOpen = () => {
    setOpen(!open);
  };
  // Loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  return (
    <>
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
                className="border p-4 rounded-lg shadow-md flex gap-7 justify-between items-center"
              >
                <div className="">
                  <Typography variant="lead"> Service Title</Typography>
                  <Typography variant="paragraph" className="text-center">{review.title}</Typography>
                </div>
                {/* <div className="">
                  <p className="mt-2 text-gray-700">{review.reviewText}</p>
                </div> */}
                <div className="w-3/5 mx-auto">
                  {review.reviewText.length > 100 ? (
                    <p className="mt-2 text-gray-700">
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
                        {review.showMore ? "see less" : "see more"}
                      </span>
                    </p>
                  ) : (
                    <p className="mt-2 text-gray-700">{review.reviewText}</p>
                  )}
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

                <div className="flex flex-col  gap-4">
                  <Button
                    onClick={() => {
                      handleOpen();
                      handlePassId(review._id);
                    }}
                    className="text-blue-500"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => {
                      handleDelete(review._id);
                    }}
                    className="text-red-500"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <UpdateReview open={open} reviewId={reviewId} handleOpen={handleOpen} />
    </>
  );
};

export default MyReview;
