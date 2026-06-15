import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Review() {

  const { orderId } = useParams();

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

const submitReview = async () => {
  try {
    await axios.post(
      "http://127.0.0.1:8000/api/reviews/",
      {
        order: orderId,
        rating,
        comment,
        customer_name:
          localStorage.getItem("customer_name"),
      }
    );

    alert("Review Submitted Successfully");
  } catch (error) {
    console.log(error.response?.data);

    if (
      error.response?.data?.order?.[0]?.includes(
        "already exists"
      )
    ) {
      alert(
        "You have already reviewed this order."
      );
    } else {
      alert("Failed to submit review.");
    }
  }
}; 

  return (
    <div className="p-10">

      <h1 className="text-3xl font-bold mb-5">
        Leave Review
      </h1>

      <select
        onChange={(e) =>
          setRating(e.target.value)
        }
        className="border p-2"
      >
        <option value="5">
          ⭐⭐⭐⭐⭐
        </option>

        <option value="4">
          ⭐⭐⭐⭐
        </option>

        <option value="3">
          ⭐⭐⭐
        </option>

        <option value="2">
          ⭐⭐
        </option>

        <option value="1">
          ⭐
        </option>
      </select>

      <textarea
        className="border w-full mt-4 p-3"
        placeholder="Write your review..."
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <button
        onClick={submitReview}
        className="bg-blue-600 text-white px-6 py-3 mt-4 rounded"
      >
        Submit Review
      </button>

    </div>
  );
}