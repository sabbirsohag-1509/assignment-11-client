import React from "react";
import { FaUserCog, FaLock, FaBell, FaEnvelope } from "react-icons/fa";
import { MdSecurity, MdNotificationsActive } from "react-icons/md";
import { motion } from "framer-motion";

const Settings = () => {
  const settingsSections = [
    {
      title: "Profile Settings",
      icon: <FaUserCog className="text-4xl text-blue-500" />,
      description:
        "Update your personal information, profile picture, and contact details to keep your account current.",
    },
    {
      title: "Account Security",
      icon: <FaLock className="text-4xl text-red-500" />,
      description:
        "Manage your password, two-factor authentication, and security questions to keep your account safe.",
    },
    {
      title: "Notifications",
      icon: <MdNotificationsActive className="text-4xl text-yellow-500" />,
      description:
        "Customize your notification preferences for emails, messages, and application updates.",
    },
    {
      title: "Privacy & Email",
      icon: <FaEnvelope className="text-4xl text-green-500" />,
      description:
        "Control who sees your profile and how your information is shared. Update your email preferences.",
    },
  ];

  return (
    <div className="p-4 md:p-10 space-y-10">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
          Account <span className="text-primary">Settings</span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base mt-2">
          Customize your profile, security, notifications, and privacy settings for a better experience.
        </p>
      </div>

      {/* Settings Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {settingsSections.map((section, idx) => (
          <motion.div
            key={idx}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: idx * 0.15 }}
          >
            <div className="mb-4">{section.icon}</div>
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">{section.title}</h2>
            <p className="text-gray-600 text-sm md:text-base">{section.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 md:p-10 rounded-xl shadow-lg text-center space-y-3">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Tips for a Secure Account</h2>
        <p className="text-gray-600 text-sm md:text-base">
          Always use a strong, unique password and enable two-factor authentication. Regularly review your account settings
          to ensure your information is up to date.
        </p>
      </div>
    </div>
  );
};

export default Settings;
