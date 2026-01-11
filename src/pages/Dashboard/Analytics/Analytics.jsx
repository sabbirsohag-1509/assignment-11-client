import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers, FaBookReader, FaMoneyBillWave } from "react-icons/fa";
import {
  Pie,
  PieChart,
  Cell,
  Legend,
  Tooltip,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
} from "recharts";
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

  // Fetch Detailed Users Data
  const { data: usersData = [] } = useQuery({
    queryKey: ["usersData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  // Fetch Detailed Scholarships Data
  const { data: scholarshipsData = [] } = useQuery({
    queryKey: ["scholarshipsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-scholarships");
      return res.data;
    },
  });

  // Fetch Detailed Applications/Fees Data
  const { data: applicationsData = [] } = useQuery({
    queryKey: ["applicationsData"],
    queryFn: async () => {
      const res = await axiosSecure.get("/all-applications");
      return res.data;
    },
  });

  // Bar Chart Data - Users by Role
  const usersBarData = usersData.reduce((acc, user) => {
    const role = user.role || "Unknown";
    const existing = acc.find((item) => item.name === role);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ name: role, count: 1 });
    }
    return acc;
  }, []);

  // Line Chart Data - Scholarships by Category
  const scholarshipsLineData = scholarshipsData.reduce((acc, sch) => {
    const category = sch.scholarshipCategory || "Unknown";
    const existing = acc.find((item) => item.name === category);
    if (existing) {
      existing.count++;
    } else {
      acc.push({ name: category, count: 1 });
    }
    return acc;
  }, []);

  // Pie Chart Data - Fees by Status
  const feesPieData = applicationsData.reduce((acc, app) => {
    const status = app.status || "Unknown";
    const existing = acc.find((item) => item.name === status);
    if (existing) {
      existing.value++;
    } else {
      acc.push({ name: status, value: 1 });
    }
    return acc;
  }, []);

  // Colors for charts
  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#8884D8",
    "#82CA9D",
  ];

  if (isLoading) {
    return <LoadingSpinner></LoadingSpinner>;
  }

  return (
    <div className="p-4 sm:p-6">
      <title>Dashboard - Analytics</title>

      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold card-text-primary mb-2">
          📊 Analytics Dashboard
        </h2>
        <p className="card-text-secondary text-sm sm:text-base">
          Real-time statistics and dynamic data visualization
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
        {/* USERS */}
        <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <FaUsers className="text-4xl sm:text-5xl text-primary" />
              <div>
                <h2 className="text-sm sm:text-base card-text-secondary font-medium">
                  Total Users
                </h2>
                <p className="text-2xl sm:text-3xl font-bold card-text-primary">
                  {users?.totalUsers ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* SCHOLARSHIPS */}
        <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <FaBookReader className="text-4xl sm:text-5xl text-secondary" />
              <div>
                <h2 className="text-sm sm:text-base card-text-secondary font-medium">
                  Total Scholarships
                </h2>
                <p className="text-2xl sm:text-3xl font-bold card-text-primary">
                  {scholarships?.totalScholarships ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FEES */}
        <div className="card bg-base-100 shadow-lg border border-base-300 hover:shadow-xl transition-shadow">
          <div className="card-body p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <FaMoneyBillWave className="text-4xl sm:text-5xl text-success" />
              <div>
                <h2 className="text-sm sm:text-base card-text-secondary font-medium">
                  Total Fees Collected
                </h2>
                <p className="text-2xl sm:text-3xl font-bold card-text-primary">
                  ${fees?.totalFees ?? 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CHARTS SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* BAR CHART - Users by Role */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Users by Role
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={usersBarData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#0088FE" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* LINE CHART - Scholarships by Category */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Scholarships by Category
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={scholarshipsLineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#00C49F"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* PIE CHART - Applications by Status */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Applications by Status
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={feesPieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label
                  isAnimationActive={true}
                >
                  {feesPieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* DATA TABLES SECTION */}
      <div className="space-y-6">
        {/* Users Data Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Users Data Table
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
                  <tr>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      #
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Name
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Email
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {usersData.slice(0, 5).map((user, index) => (
                    <tr
                      key={user._id}
                      className="border-b border-base-300 hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-3 px-4 card-text-secondary">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 card-text-primary font-medium">
                        {user.displayName}
                      </td>
                      <td className="py-3 px-4 card-text-secondary text-sm">
                        {user.email}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`badge badge-sm ${
                            user.role === "Admin"
                              ? "badge-error"
                              : user.role === "Moderator"
                              ? "badge-warning"
                              : "badge-info"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Scholarships Data Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Scholarships Data Table
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
                  <tr>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      #
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Scholarship Name
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      University
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Category
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Degree
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scholarshipsData.slice(0, 5).map((sch, index) => (
                    <tr
                      key={sch._id}
                      className="border-b border-base-300 hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-3 px-4 card-text-secondary">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 card-text-primary font-medium">
                        {sch.scholarshipName}
                      </td>
                      <td className="py-3 px-4 card-text-secondary">
                        {sch.universityName}
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge badge-primary badge-sm">
                          {sch.scholarshipCategory}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="badge badge-outline badge-sm">
                          {sch.degree}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Applications/Fees Data Table */}
        <div className="card bg-base-100 shadow-lg border border-base-300">
          <div className="card-body p-4 sm:p-6">
            <h3 className="text-lg sm:text-xl font-bold card-text-primary mb-4">
              Applications/Fees Data Table
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gradient-to-r from-primary/10 to-primary/5 border-b-2 border-primary/20">
                  <tr>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      #
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      University
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Scholarship
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Applicant
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Fee
                    </th>
                    <th className="py-3 px-4 text-left card-text-primary font-bold text-sm">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applicationsData.slice(0, 5).map((app, index) => (
                    <tr
                      key={app._id}
                      className="border-b border-base-300 hover:bg-primary/5 transition-colors"
                    >
                      <td className="py-3 px-4 card-text-secondary">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4 card-text-primary font-medium">
                        {app.universityName}
                      </td>
                      <td className="py-3 px-4 card-text-secondary">
                        {app.scholarshipName}
                      </td>
                      <td className="py-3 px-4 card-text-secondary text-sm">
                        {app.applicantEmail}
                      </td>
                      <td className="py-3 px-4 card-text-primary font-semibold">
                        ${app.applicationFees || 0}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`badge badge-sm ${
                            app.status === "Completed"
                              ? "badge-success"
                              : app.status === "Pending"
                              ? "badge-warning"
                              : "badge-info"
                          }`}
                        >
                          {app.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
