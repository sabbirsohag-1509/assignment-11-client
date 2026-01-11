import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Clock,
  Globe,
  CheckCircle2,
} from "lucide-react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const ContactUs = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      Swal.fire({
        icon: "success",
        title: "Message Sent!",
        text: "We'll get back to you soon.",
        confirmButtonColor: "#3b82f6",
        confirmButtonText: "OK",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      id: 1,
      icon: <Mail className="w-6 h-6" />,
      title: "Email Us",
      info: "support@scholarstream.com",
      subInfo: "info@scholarstream.com",
      color: "text-blue-500",
    },
    {
      id: 2,
      icon: <Phone className="w-6 h-6" />,
      title: "Call Us",
      info: "+880123473804",
      subInfo: "+880 9876-543210",
      color: "text-green-500",
    },
    {
      id: 3,
      icon: <MapPin className="w-6 h-6" />,
      title: "Visit Us",
      info: "Dhaka, Bangladesh",
      subInfo: "1205, Mirpur Road",
      color: "text-red-500",
    },
    {
      id: 4,
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      info: "Mon - Fri: 9AM - 6PM",
      subInfo: "Saturday: 10AM - 4PM",
      color: "text-purple-500",
    },
  ];

  const features = [
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      text: "24/7 Customer Support",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      text: "Quick Response Time",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      text: "Expert Guidance Available",
    },
    {
      icon: <CheckCircle2 className="w-5 h-5 text-primary" />,
      text: "Multilingual Support",
    },
  ];

  const handleFAQClick = () => {
    // Navigate to home page first
    navigate("/");
    setTimeout(() => {
      const faqSection = document.getElementById("faq");
      if (faqSection) {
        faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  };

  return (
    <section className="min-h-screen py-16 px-4 bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4 relative inline-block px-6 py-2 card-text"
          >
            Get In <span className="text-primary">Touch</span>
            <span className="absolute inset-0 rounded-lg pointer-events-none -z-10 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 opacity-30"></span>
            <span className="absolute inset-1 border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-gray-600 dark:text-gray-400 text-base md:text-lg mt-4 max-w-2xl mx-auto"
          >
            Have questions about scholarships? We're here to help you find the
            perfect opportunity. Reach out to us anytime!
          </motion.p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactInfo.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-base-200 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-base-300"
            >
              <div className={`${item.color} mb-4`}>{item.icon}</div>
              <h3 className="text-lg font-bold card-text mb-2">{item.title}</h3>
              <p className="text-sm card-text-secondary font-semibold">
                {item.info}
              </p>
              <p className="text-xs card-text-secondary mt-1">{item.subInfo}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content - Form & Info */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-base-200 rounded-2xl shadow-2xl p-8 md:p-10 border border-base-300"
          >
            <div className="flex items-center gap-3 mb-6">
              <MessageSquare className="w-8 h-8 text-primary" />
              <h3 className="text-2xl font-bold card-text">
                Send Us a Message
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold card-text mb-2">
                  Full Name <span className="text-error">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your full name"
                  className="input input-bordered w-full bg-base-100 focus:input-primary transition-all"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold card-text mb-2">
                    Email Address <span className="text-error">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@gmail.com"
                    className="input input-bordered w-full bg-base-100 focus:input-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold card-text mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+880 1723473804"
                    className="input input-bordered w-full bg-base-100 focus:input-primary transition-all"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-semibold card-text mb-2">
                  Subject <span className="text-error">*</span>
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="select select-bordered w-full bg-base-100 focus:select-primary transition-all"
                >
                  <option value="">Select a subject</option>
                  <option value="scholarship">Scholarship Inquiry</option>
                  <option value="application">Application Support</option>
                  <option value="technical">Technical Issue</option>
                  <option value="payment">Payment Question</option>
                  <option value="general">General Question</option>
                  <option value="feedback">Feedback</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold card-text mb-2">
                  Your Message <span className="text-error">*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="5"
                  placeholder="Tell us how we can help you..."
                  className="textarea textarea-bordered w-full bg-base-100 focus:textarea-primary transition-all resize-none"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary w-full text-white font-semibold text-base gap-2 hover:scale-[1.02] transition-transform"
              >
                {isSubmitting ? (
                  <>
                    <span className="loading loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Right Side Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Why Contact Us */}
            <div className="bg-white dark:bg-base-200 rounded-2xl shadow-xl p-8 border border-base-300">
              <h3 className="text-2xl font-bold card-text mb-6">
                Why Contact Us?
              </h3>
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-3"
                  >
                    {feature.icon}
                    <span className="card-text font-medium">
                      {feature.text}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-2xl shadow-xl p-8 border border-primary/20">
              <h3 className="text-2xl font-bold card-text mb-4">
                Need Quick Help?
              </h3>
              <p className="card-text-secondary mb-6 leading-relaxed">
                Before reaching out, you might find answers to common questions
                in our FAQ section or Documentation. We've compiled helpful
                resources to guide you through the scholarship application
                process.
              </p>
              <div className="space-y-3">
                <button
                  onClick={handleFAQClick}
                  className="btn btn-outline btn-primary w-full justify-start gap-2"
                >
                  <Globe className="w-5 h-5" />
                  Visit FAQ Section
                </button>
                <button className="btn btn-outline btn-secondary w-full justify-start gap-2">
                  <MessageSquare className="w-5 h-5" />
                  Live Chat Support
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-base-200 rounded-xl shadow-lg p-6 text-center border border-base-300">
                <div className="text-3xl font-bold text-primary mb-2">
                  &lt; 2hrs
                </div>
                <div className="text-sm card-text-secondary">
                  Average Response Time
                </div>
              </div>
              <div className="bg-white dark:bg-base-200 rounded-xl shadow-lg p-6 text-center border border-base-300">
                <div className="text-3xl font-bold text-primary mb-2">98%</div>
                <div className="text-sm card-text-secondary">
                  Satisfaction Rate
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Map Section (Optional) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-white dark:bg-base-200 rounded-2xl shadow-2xl overflow-hidden border border-base-300"
        >
          <div className="p-8">
            <h3 className="text-2xl font-bold card-text mb-4 flex items-center gap-3">
              <MapPin className="w-7 h-7 text-primary" />
              Our Location
            </h3>
            <p className="card-text-secondary mb-6">
              Visit our office or get in touch online. We're here to support
              your scholarship journey every step of the way.
            </p>
          </div>
          <div className="w-full h-96 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-lg font-semibold card-text">
                Map Integration Available
              </p>
              <p className="text-sm card-text-secondary mt-2">
                Dhaka, Bangladesh - 1205
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactUs;
