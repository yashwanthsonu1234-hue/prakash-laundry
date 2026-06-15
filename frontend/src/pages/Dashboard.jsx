import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate,
  Link,} from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const [reviews, setReviews] = useState([]);

  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] =
  useState("All");

  useEffect(() => {
    const token =
      localStorage.getItem("access");

    if (!token) {
      navigate("/login", {
        replace: true,
      });
      return;
    }

    fetchOrders();
  }, [navigate]);

  const fetchOrders = () => {
    axios
  .get("http://127.0.0.1:8000/api/all-reviews/")
  .then((res) => {
    setReviews(res.data);
  });
    axios
      .get(
        "http://127.0.0.1:8000/api/orders/"
      )
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateStatus = async (
    id,
    newStatus
  ) => {
    try {
      await axios.patch(
        `http://127.0.0.1:8000/api/orders/${id}/`,
        {
          status: newStatus,
        }
      );

      setOrders((prev) =>
        prev.map((order) =>
          order.id === id
            ? {
                ...order,
                status: newStatus,
              }
            : order
        )
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to update status"
      );
    }
  };

  const deleteOrder = async (id) => {
    if (
      !window.confirm(
        "Are you sure you want to delete this order?"
      )
    ) {
      return;
    }

    try {
      await axios.delete(
        `http://127.0.0.1:8000/api/orders/${id}/`
      );

      setOrders((prev) =>
        prev.filter(
          (order) => order.id !== id
        )
      );
    } catch (error) {
      console.error(error);
      alert(
        "Failed to delete order"
      );
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/login", {
      replace: true,
    });
  };

  const totalOrders = orders.length;

  const deliveredOrders =
    orders.filter(
      (order) =>
        order.status === "Delivered"
    ).length;

  const pendingOrders =
    totalOrders - deliveredOrders;

  const revenue = orders.reduce(
    (sum, order) =>
      sum +
      Number(order.total_amount || 0),
    0
  );

 const filteredOrders =
  orders.filter((order) => {

    const matchSearch =
      order.customer_name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        );

    const matchFilter =
      filter === "All"
        ? true
        : order.status === filter;

    return (
      matchSearch &&
      matchFilter
    );
  });
  const today =
  new Date()
    .toISOString()
    .split("T")[0];

const todayOrders =
  orders.filter(
    (o) =>
      o.pickup_date === today
  ).length;

  return (
    <div className="min-h-screen bg-blue-500 text-black p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-10">
        <h1 className="text-5xl font-bold">
          Admin Dashboard
        </h1>
<div className="flex flex-wrap gap-3 justify-center">

  <Link
    to="/analytics"
    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
  >
    Analytics
  </Link>

  <Link
    to="/customers"
    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
  >
    Customers
  </Link>

  <button
    onClick={logout}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
  >
    Logout
  </button>

</div>


</div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl">
            Total Orders
          </h2>
          <p className="text-4xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl">
            Pending Orders
          </h2>
          <p className="text-4xl font-bold">
            {pendingOrders}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl">
            Delivered Orders
          </h2>
          <p className="text-4xl font-bold">
            {deliveredOrders}
          </p>
        </div>

        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl">
            Revenue
          </h2>
          <p className="text-4xl font-bold">
            ₹{revenue}
          </p>
        </div>
      </div>

      {/* Search & Filter */}
      <h2 className="text-3xl font-bold mb-5">
        Manage Orders
      </h2>

     <div className="flex flex-wrap gap-3 mb-6">
        <input
          type="text"
          placeholder="Search customer..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="w-full md:w-96 p-3 rounded text-black"
        />

        <div className="flex gap-3 mb-6 flex-wrap">

  <button
    onClick={() => setFilter("All")}
    className="bg-blue-600 px-4 py-2 rounded"
  >
    All
  </button>

  <button
    onClick={() =>
      setFilter("Pickup Scheduled")
    }
    className="bg-yellow-500 px-4 py-2 rounded"
  >
    Pending
  </button>

  <button
    onClick={() =>
      setFilter("Washing")
    }
    className="bg-blue-500 px-4 py-2 rounded"
  >
    Washing
  </button>

  <button
    onClick={() =>
      setFilter("Out For Delivery")
    }
    className="bg-purple-500 px-4 py-2 rounded"
  >
    Delivery
  </button>

  <button
    onClick={() =>
      setFilter("Delivered")
    }
    className="bg-green-600 px-4 py-2 rounded"
  >
    Delivered
  </button>

</div>
      </div>

      <div className="grid md:grid-cols-4 gap-5 mb-8">

  <div className="bg-blue-600 p-5 rounded-xl">
    <h3 className="text-xl font-bold">
      Total Orders
    </h3>
    <p className="text-3xl">
      {orders.length}
    </p>
  </div>

  <div className="bg-green-600 p-5 rounded-xl">
    <h3 className="text-xl font-bold">
      Today's Orders
    </h3>
    <p className="text-3xl">
      {todayOrders}
    </p>
  </div>

  <div className="bg-yellow-500 p-5 rounded-xl">
    <h3 className="text-xl font-bold">
      Pending
    </h3>
    <p className="text-3xl">
      {
        orders.filter(
          (o) =>
            o.status ===
            "Pickup Scheduled"
        ).length
      }
    </p>
  </div>

  <div className="bg-purple-600 p-5 rounded-xl">
    <h3 className="text-xl font-bold">
      Delivered
    </h3>
    <p className="text-3xl">
      {
        orders.filter(
          (o) =>
            o.status ===
            "Delivered"
        ).length
      }
    </p>
  </div>

</div>


<div className="flex gap-4 mb-6">

<button
onClick={() =>
window.open(
"http://127.0.0.1:8000/api/export-orders/"
)
}
className="bg-green-600 px-4 py-2 rounded"
>
Export Orders
</button>

<button
onClick={() =>
window.open(
"http://127.0.0.1:8000/api/export-customers/"
)
}
className="bg-blue-600 px-4 py-2 rounded"
>
Export Customers
</button>

<button
onClick={() =>
window.open(
"http://127.0.0.1:8000/api/export-revenue/"
)
}
className="bg-purple-600 px-4 py-2 rounded"
>
Revenue Report
</button>

</div>

      {/* Orders */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => {
          let services = [];

          try {
            services = order.services
              ? JSON.parse(
                  order.services
                )
              : [];
          } catch {
            services = [];
          }

          return (
            <div
              key={order.id}
              className="bg-white/10 p-5 rounded-xl mb-4"
            >
              <h3 className="text-2xl font-bold">
                Order #{order.id}
              </h3>

              <p>
                Customer:{" "}
                {
                  order.customer_name
                }
              </p>

              <p>
                Phone: {order.phone}
              </p>

              <p>
                Address:{" "}
                {order.address}
              </p>

              <p>
                Pickup Date:{" "}
                {
                  order.pickup_date
                }
              </p>

              <p>
                Amount: ₹
                {
                  order.total_amount
                }
              </p>

              <div className="mt-3">
                <label className="mr-2">
                  Status:
                </label>

                <select
                  value={
                    order.status
                  }
                  onChange={(e) =>
                    updateStatus(
                      order.id,
                      e.target.value
                    )
                  }
                  className="text-black p-2 rounded"
                >
                  <option value="Pickup Scheduled">
                    Pickup Scheduled
                  </option>

                  <option value="Washing">
                    Washing
                  </option>

                  <option value="Out For Delivery">
                    Out For Delivery
                  </option>

                  <option value="Delivered">
                    Delivered
                  </option>
                </select>
              </div>

{(
  order.status === "Out For Delivery" ||
  order.status === "Delivered"
) && (
  <div className="mt-3">

    <a
      href={`https://wa.me/91${order.phone}?text=${encodeURIComponent(

        order.status === "Out For Delivery"

        ? `Hello ${order.customer_name},

Your Prakash Laundry Order #${order.id}

is now OUT FOR DELIVERY 🚚

Our delivery partner will reach you shortly.

Thank you for choosing Prakash Laundry.`

        : `Hello ${order.customer_name},

Your Prakash Laundry Order #${order.id}

has been DELIVERED ✅

Thank you for choosing Prakash Laundry.

We hope to serve you again soon.`

      )}`}
      target="_blank"
      rel="noopener noreferrer"
      className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded inline-block"
    >
      Send WhatsApp Update
    </a>

  </div>
)}
            <h2 className="text-2xl font-bold mt-8 mb-4">
  Customer Reviews
</h2>

{
reviews.filter(
(review) =>
review.order === order.id
).length > 0 ? (

reviews
.filter(
(review) =>
review.order === order.id
)
.map((review) => (

<div
key={review.id}
className="bg-white/10 p-4 rounded-xl mb-3"
>

<h3 className="font-bold">
{review.customer_name}
</h3>

<p>
Rating: ⭐ {review.rating}/5
</p>

<p className="mt-2">
{review.comment}
</p>

<button
onClick={async () => {

if(
!window.confirm(
"Delete this review?"
)
){
return;
}

await axios.delete(
`http://127.0.0.1:8000/api/reviews/${review.id}/delete/`
);

setReviews(
reviews.filter(
(r)=>
r.id !== review.id
)
);

}}
className="mt-3 bg-red-600 px-3 py-1 rounded"
>
Delete Review
</button>

</div>

))

) : (

<p className="text-gray-300">
No reviews yet.
</p>

)
}

              {/* Services */}
              <div className="mt-4">
                <h4 className="font-bold mb-2">
                  Services:
                </h4>

                {services.length >
                0 ? (
                  services.map(
                    (
                      service,
                      index
                    ) => (
                      <div
                        key={
                          index
                        }
                        className="border-b border-gray-600 py-2"
                      >
                        <p>
                          {
                            service.title
                          }{" "}
                          ×{" "}
                          {
                            service.quantity
                          }
                        </p>

                        <p>
                          Amount:
                          ₹
                          {
                            service.subtotal
                          }
                        </p>
                      </div>
                    )
                  )
                ) : (
                  <p className="text-gray-300">
                    No service
                    details
                    available
                  </p>
                )}
              </div>

              <button
                onClick={() =>
                  deleteOrder(
                    order.id
                  )
                }
                className="mt-4 bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
              >
                Delete Order
              </button>
            </div>
          );
        })
      ) : (
        <p>No Orders Found</p>
      )}
    </div>
  );
}