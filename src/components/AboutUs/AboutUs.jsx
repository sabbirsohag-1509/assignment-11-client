import React from "react";
import { FaLightbulb, FaHandsHelping, FaGraduationCap } from "react-icons/fa";
import { MdAnalytics } from "react-icons/md";
import { GiOpenBook } from "react-icons/gi";

const AboutUs = () => {
  return (
    <div className="p-4 md:p-10 space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold card-text-primary">
          About <span className="text-primary">ScholarStream</span>
        </h1>
        <p className="card-text-secondary text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          ScholarStream is a modern scholarship management platform designed to empower students, moderators, and admins. We aim to simplify the application, review, and management process for scholarships globally. Our platform provides detailed insights, analytics, and real-time updates for every user type.
        </p>
      </div>

      {/* Core Values / Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <FaLightbulb className="text-5xl text-yellow-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Innovative Solutions</h3>
          <p className="card-text-primary text-sm sm:text-base">
            We provide smart, innovative solutions for students to easily discover and apply for scholarships, making the process effortless and effective.
          </p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <FaHandsHelping className="text-5xl text-green-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Global Support</h3>
          <p className="card-text-primary text-sm sm:text-base">
            Our platform connects students with moderators and admins worldwide, ensuring every scholarship opportunity is accessible, transparent, and trustworthy.
          </p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <FaGraduationCap className="text-5xl text-blue-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
          <p className="card-text-primary text-sm sm:text-base">
            We promote academic growth by showcasing scholarships that reward talent, dedication, and outstanding achievements across multiple disciplines.
          </p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <MdAnalytics className="text-5xl text-purple-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Real-Time Analytics</h3>
          <p className="card-text-primary text-sm sm:text-base">
            Keep track of applications, feedback, and reviews with our powerful analytics dashboard, designed to enhance decision-making for both students and admins.
          </p>
        </div>
        <div className="bg-base-100 p-6 rounded-xl shadow-lg flex flex-col items-center text-center hover:scale-105 transition-transform duration-300">
          <GiOpenBook className="text-5xl text-pink-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
          <p className="card-text-primary text-sm sm:text-base">
            Beyond scholarships, we offer educational resources, guides, and tips to help students make informed decisions and prepare successful applications.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="bg-base-100 p-6 md:p-10 rounded-xl shadow-lg space-y-4">
        <h2 className="text-2xl md:text-3xl font-bold card-text-primary text-center">
          Our Mission
        </h2>
        <p className="card-text-primary text-sm sm:text-base md:text-lg text-center">
          At ScholarStream, our mission is to bridge the gap between talent and opportunity. We believe every student deserves access to scholarships that recognize their potential and effort. By offering a seamless, user-friendly platform, we help students apply efficiently, moderators manage effectively, and admins oversee operations effortlessly.
        </p>
        <p className="card-text-primary text-sm sm:text-base md:text-lg text-center">
          We aim to foster academic excellence, global collaboration, and innovation, empowering students to achieve their dreams and advance their careers. ScholarStream is not just a platform; it is a community dedicated to educational success worldwide.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
