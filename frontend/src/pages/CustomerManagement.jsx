import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerManagement() {

  const [customers, setCustomers] =
    useState([]);

  useEffect(() => {

    axios
      .get(
        "https://prakash-laundry.onrender.com/api/customers/"
      )
      .then((res) => {

        setCustomers(res.data);

      });

  }, []);

  return (
    <div className="min-h-screen bg-blue-950 text-white p-10">

      <h1 className="text-5xl font-bold mb-10">
        Customer Management
      </h1>

      <div className="space-y-4">

        {customers.map(
          (customer, index) => (

            <div
              key={index}
              className="bg-white/10 p-5 rounded-xl"
            >
              <h2 className="text-2xl font-bold">
                {customer.name}
              </h2>

              <p>
                Phone:
                {customer.phone}
              </p>

              <p>
                Orders:
                {customer.orders}
              </p>

              <p>
                Total Spent:
                ₹{customer.total_spent}
              </p>

              {customer.repeat_customer && (
                <span className="bg-green-600 px-3 py-1 rounded">
                  Repeat Customer
                </span>
              )}

            </div>
          )
        )}

      </div>

    </div>
  );
}