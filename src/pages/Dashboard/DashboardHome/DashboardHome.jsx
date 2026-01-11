import React from "react";
import { FaUsers, FaGraduationCap, FaFileAlt } from "react-icons/fa";
import { motion } from "framer-motion";
import dashboardImage from "../../../assets/dass.jpg";


const DashboardHome = () => {
  const stats = [
    {
      title: "Total Users",
      icon: <FaUsers className="text-4xl text-white" />,
      value: 1250,
      color: "bg-gradient-to-r from-purple-500 to-indigo-500",
    },
    {
      title: "Total Scholarships",
      icon: <FaGraduationCap className="text-4xl text-white" />,
      value: 320,
      color: "bg-gradient-to-r from-green-400 to-teal-500",
    },
    {
      title: "Total Applications",
      icon: <FaFileAlt className="text-4xl text-white" />,
      value: 870,
      color: "bg-gradient-to-r from-pink-400 via-red-400 to-yellow-400",
    },
  ];

  return (
    <div className="p-4 sm:p-6 md:p-10 space-y-8">
      <title> 
        Dashboard Home | ScholarStream
      </title>
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold card-text-primary">
            Welcome to <span className="text-primary">Dashboard</span>
          </h1>
          <p className="card-text-primary mt-2 text-sm sm:text-base md:text-sm">
            ScholarStream empowers Students, Moderators, and Admins with seamless scholarship management, real-time analytics, and smooth application workflows for academic success.
          </p>
        </div>
        <div className="w-full md:w-60 h-60">
          <img
            src={dashboardImage}
            alt="Dashboard Illustration"
            className="w-full h-full object-contain mx-auto md:mx-0"
          />
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <motion.div
            key={idx}
            className={`rounded-xl shadow-lg p-6 flex items-center gap-4 ${stat.color}`}
            whileHover={{ scale: 1.05 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.2 }}
          >
            <div className="p-4 bg-white/20 rounded-full">{stat.icon}</div>
            <div>
              <p className="card-text-primary font-medium text-sm sm:text-base">{stat.title}</p>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold card-text-primary">{stat.value}</h2>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Section */}
      <div className="bg-base-100 rounded-xl shadow-lg p-6 md:p-10 flex flex-col md:flex-row items-center gap-6">
        <div className="md:w-2/3 space-y-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold card-text-primary">
            Quick Overview
          </h2>
          <p className="card-text-primary text-sm sm:text-base md:text-base">
            This dashboard provides a bird's-eye view of all key statistics, including total users, scholarships, and applications. Use the sidebar to navigate to specific sections for managing content or reviewing applications efficiently.
          </p>
        </div>
        <div className="md:w-1/3 w-full">
          <img
            src={dashboardImage}
            alt="Overview Illustration"
            className="rounded-xl shadow-md w-full object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
