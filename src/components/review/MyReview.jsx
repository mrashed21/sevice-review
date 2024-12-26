import { Button, Typography } from "@material-tailwind/react";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactStars from "react-rating-stars-component";
import swal from "sweetalert";
import { AuthContext } from "../../context/AuthProvaider";
import Spinner from "../../pages/Spiiner";
import UpdateReview from "./UpdateReview";

const MyReview = () => {
  const { user, logOut } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");

  // Fetch reviews
  const fetchReviews = async () => {
    try {
      const res = await axios.get(
        `https://server-seven-beta-45.vercel.app/reviews/me/${user.email}`,
        {
          withCredentials: true,
        }
      );
      setReviews(res.data);
      setLoading(false);
    } catch (error) {
      if (error.response?.status === 401) {
        // logOut();
      } else {
        console.error("Error fetching services:", error.message);
      }
    }
  };

  useEffect(() => {
    if (user.email) {
      fetchReviews();
    }
  }, [user.email]);

  // handle delete review
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
          await fetchReviews(); // Refresh reviews after deletion
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

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>My Reviews</title>
      </Helmet>
      <div className="dark:bg-[#293548]">
        <div className="w-11/12 mx-auto py-10">
          <h2 className="text-2xl font-bold text-center mb-6 dark:text-white">
            My Reviews
          </h2>

          <div className="space-y-5">
            {reviews.length === 0 ? (
              <div className="min-h-screen flex items-center justify-center">
                <Typography
                  variant="h4"
                  className="text-center col-span-full dark:text-white"
                >
                  No reviews found.
                </Typography>
              </div>
            ) : (
              reviews.map((review) => (
                <div
                  key={review._id}
                  className="border p-4 rounded-lg shadow-md flex flex-col lg:flex-row gap-7 justify-between items-center dark:bg-[#1E293B]"
                >
                  <div className="">
                    <Typography variant="lead" className="dark:text-white">
                      Service Title
                    </Typography>
                    <Typography
                      variant="paragraph"
                      className="text-center dark:text-white"
                    >
                      {review.title}
                    </Typography>
                  </div>
                  <div className="w-full lg:w-3/5 mx-auto">
                    {review.reviewText.length > 100 ? (
                      <p className="mt-2 text-gray-700 dark:text-gray-100">
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
                      <p className="mt-2 text-gray-700 dark:text-white">
                        {review.reviewText}
                      </p>
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

                  <div className="flex w-full lg:w-fit lg:flex-col justify-between lg:gap-4">
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
                      onClick={() => handleDelete(review._id)}
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
      </div>

      <UpdateReview
        open={open}
        reviewId={reviewId}
        handleOpen={handleOpen}
        onUpdateSuccess={handleUpdateSuccess}
      />
    </>
  );
};

export default MyReview;
