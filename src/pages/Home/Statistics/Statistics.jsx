import React from "react";
import {
  FaGraduationCap,
  FaUsers,
  FaUniversity,
  FaDollarSign,
} from "react-icons/fa";
import { MdVerified } from "react-icons/md";
import { HiAcademicCap } from "react-icons/hi";
import CountUp from "react-countup";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router";

const Statistics = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  const stats = [
    {
      icon: <FaGraduationCap className="text-4xl sm:text-5xl" />,
      count: 5000,
      suffix: "+",
      label: "Scholarships Available",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <FaUsers className="text-4xl sm:text-5xl" />,
      count: 10000,
      suffix: "+",
      label: "Students Helped",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: <FaUniversity className="text-4xl sm:text-5xl" />,
      count: 500,
      suffix: "+",
      label: "Partner Universities",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: <FaDollarSign className="text-4xl sm:text-5xl" />,
      count: 50,
      suffix: "M+",
      label: "Funds Distributed",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
    {
      icon: <MdVerified className="text-4xl sm:text-5xl" />,
      count: 98,
      suffix: "%",
      label: "Success Rate",
      color: "text-teal-600",
      bgColor: "bg-teal-100",
    },
    {
      icon: <HiAcademicCap className="text-4xl sm:text-5xl" />,
      count: 150,
      suffix: "+",
      label: "Countries Covered",
      color: "text-pink-600",
      bgColor: "bg-pink-100",
    },
  ];

  return (
    <div className="py-10 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-3xl font-bold mb-4 card-text-primary">
            Our Impact in{" "}
            <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Numbers
            </span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 rounded-full"></div>
          <p className="card-text-secondary text-base sm:text-lg md:text-xl max-w-3xl mx-auto">
            Making education accessible for thousands of students worldwide
            through verified scholarship opportunities
          </p>
        </div>
        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-2xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-base-300"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Icon */}
                <div
                  className={`${stat.bgColor} ${stat.color} p-4 sm:p-5 rounded-full`}
                >
                  {stat.icon}
                </div>

                {/* Count */}
                <div className="text-4xl sm:text-5xl md:text-6xl font-bold card-text-primary">
                  {inView ? (
                    <>
                      <CountUp
                        start={0}
                        end={stat.count}
                        duration={2.5}
                        separator=","
                      />
                      <span>{stat.suffix}</span>
                    </>
                  ) : (
                    <span>0{stat.suffix}</span>
                  )}
                </div>

                {/* Label */}
                <p className="card-text-secondary text-sm sm:text-base md:text-lg font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16">
          <p className="card-text-secondary text-base sm:text-lg mb-6">
            Join thousands of successful students who found their dream
            scholarship
          </p>
          <Link
            to="/all-scholarships"
            className="btn btn-primary btn-lg shadow-lg hover:shadow-xl transition-all"
          >
            Explore Scholarships
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
