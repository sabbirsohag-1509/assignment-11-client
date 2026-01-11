import React from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactWithUs = () => {
  return (
    <section className="py-20 px-4 md:px-8 bg-base-100">
      <div className="max-w-7xl mx-auto">
        {/* title  */}
        <div className="text-center my-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2 relative inline-block px-6 py-2">
            Contact <span className="text-primary">With Us!</span>
            {/* Outer gradient border */}
            <span
              className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
            ></span>
            {/* Inner subtle border */}
            <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
          </h2>

          {/* Optional: small subtitle */}
          <p className="text-gray-400 text-sm md:text-base mt-1">
            We’d love to hear from you. Reach out anytime!
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Get in Touch
            </h3>

            <div className="flex items-start gap-4">
              <Mail className="text-primary w-7 h-7" />
              <div>
                <h4 className="font-semibold">Email</h4>
                <p className="card-text-primary">support@scholarstream.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Phone className="text-primary w-7 h-7" />
              <div>
                <h4 className="font-semibold">Phone</h4>
                <p className="card-text-primary">+880 1723473804</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <MapPin className="text-primary w-7 h-7" />
              <div>
                <h4 className="font-semibold">Address</h4>
                <p className="card-text-primary">
                  Dhanmondi, Dhaka - 1205, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-base-100 rounded-2xl shadow-lg p-8 space-y-6">
            <h3 className="text-2xl font-semibold card-text-primary">
              Send Us a Message
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="input input-bordered w-full"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="input input-bordered w-full"
              />
            </div>

            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full"
            />

            <textarea
              placeholder="Your Message"
              className="textarea textarea-bordered w-full h-32"
            ></textarea>

            <button className="btn btn-primary w-full text-white text-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactWithUs;
