import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookReader, FaMoneyBillWave } from "react-icons/fa";
import { Pie, PieChart, Cell, Legend, Tooltip } from "recharts";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();

  // Fetch Total Users
  const { data: users = {}, isLoading } = useQuery({
    queryKey: ["analyticsUsers"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/all-users");
      return res.data;
    },
  });

  // Fetch Total Scholarships
  const { data: scholarships = {} } = useQuery({
    queryKey: ["analyticsScholarships"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/all-scholarships");
      return res.data;
    },
  });

  // Fetch Total Fees
  const { data: fees = {} } = useQuery({
    queryKey: ["analyticsFees"],
    queryFn: async () => {
      const res = await axiosSecure.get("/analytics/total-fees");
      return res.data;
    },
  });

  // Dynamic PieChart data
  const pieData = [
    { name: "Users", value: users?.totalUsers ?? 0 },
    { name: "Scholarships", value: scholarships?.totalScholarships ?? 0 },
    { name: "Fees", value: (fees?.totalFees ?? 0)/1000 },
  ];

  // Colors for each slice
    const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];
    
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>;
    };

  return (
    <div className="p-6">
      <title> 
        Dashboard - Analytics
      </title>
      <h2 className="text-3xl font-bold mb-6">📊 Analytics Summary</h2>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* USERS */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body flex items-center gap-4">
            <FaUsers className="text-5xl text-primary" />
            <div>
              <h2 className="card-title">Total Users</h2>
              <p className="text-3xl font-bold text-center text-primary py-3">
                {users?.totalUsers ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* SCHOLARSHIPS */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body flex items-center gap-4">
            <FaBookReader className="text-5xl text-secondary" />
            <div>
              <h2 className="card-title">Total Scholarships</h2>
              <p className="text-3xl font-bold text-center text-primary py-3">
                {scholarships?.totalScholarships ?? 0}
              </p>
            </div>
          </div>
        </div>

        {/* FEES */}
        <div className="card bg-base-100 shadow-xl border border-base-300">
          <div className="card-body flex items-center gap-4">
            <FaMoneyBillWave className="text-5xl text-success" />
            <div>
              <h2 className="card-title">Total Fees Collected</h2>
              <p className="text-3xl font-bold text-center text-primary py-3">
                ${fees?.totalFees ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* PIE CHART */}
      <div className=" flex justify-center w-full h-[400px]">
        <PieChart
          style={{
            width: "100%",
            maxWidth: "500px",
            maxHeight: "80vh",
            aspectRatio: 2,
          }}
          responsive
        >
          <Pie
            dataKey="value"
            startAngle={180}
            endAngle={0}
            data={pieData}
            cx="50%"
            cy="100%"
            outerRadius="120%"
            label
            isAnimationActive={true}
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </div>
    </div>
  );
};

export default Analytics;
