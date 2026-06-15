import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);

  const loadReviews = () => {
    axios
      .get("http://127.0.0.1:8000/api/reviews/")
      .then((res) => {
        setReviews(res.data);
      });
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const deleteReview = async (id) => {
    if (!window.confirm("Delete this review?")) {
      return;
    }

    await axios.delete(
      `http://127.0.0.1:8000/api/reviews/${id}/`
    );

    loadReviews();
  };

  return (
    <div className="min-h-screen bg-blue-300 text-black p-10">
      <h1 className="text-5xl font-bold mb-10">
        Customer Reviews
      </h1>

      {reviews.map((review) => (
        <div
          key={review.id}
          className="bg-white/10 p-5 rounded-xl mb-5"
        >
          <h2 className="text-2xl font-bold">
            {review.customer_name}
          </h2>

          <p className="text-yellow-400 text-xl">
            {"⭐".repeat(review.rating)}
          </p>

          <p className="mt-3">
            {review.comment}
          </p>

          <button
            onClick={() =>
              deleteReview(review.id)
            }
            className="mt-4 bg-red-600 px-4 py-2 rounded"
          >
            Delete Review
          </button>
        </div>
      ))}
    </div>
  );
}