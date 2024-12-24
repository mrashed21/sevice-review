// /* eslint-disable react/prop-types */

// import { Button, Textarea, Typography } from "@material-tailwind/react";
// import axios from "axios";
// import { format } from "date-fns";
// import { useEffect, useState } from "react";
// import ReactStars from "react-rating-stars-component";
// import { useNavigate } from "react-router-dom";
// const Review = ({ serviceId, user, service }) => {
//   const [reviews, setReviews] = useState([]);
//   const [reviewText, setReviewText] = useState("");
//   const [rating, setRating] = useState(0);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(true);

//   const { title, image } = service;

//   // Fetch reviews
//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await axios.get(
//           `http://localhost:4000/reviews/${serviceId}`
//         );
//         setReviews(res.data);
//       } catch (error) {
//         console.error("Failed to fetch reviews", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchReviews();
//   }, [serviceId]);

//   const handleReviewSubmit = async () => {
//     if (reviewText.length < 20) {
//       setError("Review text must be at least 20 characters long.");
//       return;
//     }
//     if (rating < 1) {
//       setError("Please give at least 1 star rating.");
//       return;
//     }
//     setError("");

//     const newReview = {
//       serviceId,
//       userEmail: user.email,
//       userName: user.displayName,
//       userPhoto: user.photoURL,
//       reviewText,
//       rating,
//       date: new Date(),
//       title,
//       image,
//     };

//     try {
//       // Submit review
//       await axios.post("http://localhost:4000/reviews/add", newReview);
//       setReviews([...reviews, newReview]);
//       setReviewText("");
//       setRating(0);
//     } catch (error) {
//       console.error("Failed to submit review", error);
//     }
//   };

//   // add a review
//   const navigate = useNavigate();
//   const handleAddReview = () => {
//     navigate("/login");
//   };
//   return (
//     <div className="w-11/12 mx-auto py-8">
//       <Typography variant="h5" className="mb-4">
//         Reviews ({reviews.length})
//       </Typography>

//       {/* Display Reviews */}
//       {loading ? (
//         <Typography>Loading reviews...</Typography>
//       ) : reviews.length === 0 ? (
//         <Typography>No reviews yet.</Typography>
//       ) : (
//         <div className="grid grid-cols-4 gap-4">
//           {reviews.map((review) => (
//             <div key={review._id} className="border p-4 rounded-lg gap-4">
//               <div className="flex items-center gap-4">
//                 <img
//                   src={review.userPhoto}
//                   alt={review.userName}
//                   className="w-10 h-10 rounded-full"
//                 />
//                 <div>
//                   <Typography variant="h6">{review.userName}</Typography>
//                   <Typography variant="small" className="text-gray-500">
//                     {format(new Date(review.date), "PPP")}
//                   </Typography>
//                 </div>
//               </div>
//               <Typography className="mt-2">{review.reviewText}</Typography>
//               <div>
//                 <ReactStars
//                   count={5}
//                   value={
//                     review?.rating?.$numberInt
//                       ? parseInt(review.rating.$numberInt)
//                       : review.rating
//                   }
//                   size={24}
//                   edit={false}
//                 />
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Add New Review */}
//       {user && user?.email ? (
//         <div className="mt-6 p-4 border-t">
//           <Typography variant="h6" className="mb-2">
//             Add a Review
//           </Typography>
//           <Textarea
//             label="Write your review"
//             value={reviewText}
//             onChange={(e) => setReviewText(e.target.value)}
//             required
//           />
//           <div className="mt-4">
//             <Typography>Rating:</Typography>
//             <ReactStars
//               count={5}
//               size={24}
//               value={rating}
//               onChange={(value) => setRating(value)}
//             />
//           </div>
//           {error && (
//             <Typography color="red" className="mt-2">
//               {error}
//             </Typography>
//           )}
//           <Button className="mt-4" onClick={handleReviewSubmit}>
//             Submit Review
//           </Button>
//         </div>
//       ) : (
//         <div className="flex items-center justify-center mt-5 border-t">
//           <Button onClick={handleAddReview} className=" mt-5">
//             {" "}
//             add a review
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Review;

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

  // Fetch reviews
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/reviews/${serviceId}`
        );
        setReviews(res.data);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setLoading(false);
      }
    };
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
      await axios.post("http://localhost:4000/reviews/add", newReview);
      setReviews([...reviews, newReview]);
      setReviewText("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit review", error);
    }
  };

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

  // const handleUpdate = async (id) => {
  //   const updatedText = prompt("Update your review:");
  //   if (!updatedText || updatedText.length < 20) {
  //     alert("Review text must be at least 20 characters long.");
  //     return;
  //   }

  //   try {
  //     await axios.put(`http://localhost:4000/reviews/update/${id}`, {
  //       reviewText: updatedText,
  //     });
  //     setReviews(
  //       reviews.map((review) =>
  //         review._id === id ? { ...review, reviewText: updatedText } : review
  //       )
  //     );
  //   } catch (error) {
  //     console.error("Failed to update review", error);
  //   }
  // };

  const navigate = useNavigate();
  const handleAddReview = () => {
    navigate("/login");
  };

  return (
    <>
      <div className="w-11/12 mx-auto py-8">
        <Typography variant="h5" className="mb-4">
          Reviews ({reviews.length})
        </Typography>

        {/* Display Reviews */}
        {loading ? (
          <Typography>Loading reviews...</Typography>
        ) : reviews.length === 0 ? (
          <Typography>No reviews yet.</Typography>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {reviews.map((review) => (
              <div key={review._id} className="border  p-4 rounded-lg gap-4">
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
        ) : (
          <div className="flex items-center justify-center mt-5 border-t">
            <Button onClick={handleAddReview} className=" mt-5">
              add a review
            </Button>
          </div>
        )}
      </div>
      <ReviewUpdate
        open={open}
        reviewId={reviewId}
        handleOpen={handleOpen}
      ></ReviewUpdate>
    </>
  );
};

export default Review;
