import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Analytics() {
  const [revenueData, setRevenueData] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/api/analytics/")
      .then((res) => {
        setRevenueData(
          res.data.revenue_per_month || []
        );

        setServiceData(
          res.data.top_services || []
        );

        setLoading(false);
      })
      .catch((err) => {
        console.error(
          "Analytics Error:",
          err
        );
        setLoading(false);
      });
  }, []);

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-blue-950 text-white flex items-center justify-center">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-blue-950 text-white p-10">
      <h1 className="text-5xl font-bold mb-10">
        Analytics Dashboard
      </h1>

      {/* Revenue Chart */}
      <div className="bg-white p-5 rounded-xl mb-10">
        <h2 className="text-black text-2xl font-bold mb-5">
          Revenue Per Month
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="revenue"
              fill="#2563eb"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Services Chart */}
      <div className="bg-white p-5 rounded-xl">
        <h2 className="text-black text-2xl font-bold mb-5">
          Top Services
        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >
          <PieChart>
            <Pie
              data={serviceData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {serviceData.map(
                (entry, index) => (
                  <Cell
                    key={index}
                    fill={
                      COLORS[
                        index %
                          COLORS.length
                      ]
                    }
                  />
                )
              )}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}