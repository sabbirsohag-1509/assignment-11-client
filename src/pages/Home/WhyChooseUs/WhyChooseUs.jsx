import { motion } from "framer-motion";
import {
  ShieldCheck,
  Search,
  Globe2,
  Clock,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const WhyChooseUs = () => {
  const features = [
    {
      id: 1,
      title: "Verified Scholarships Only",
      desc: "ScholarStream lists only verified and trusted scholarships from globally recognized universities and institutions. Every listing is manually reviewed to ensure authenticity, giving students full confidence in the opportunities they apply for.",
      icon: <ShieldCheck className="w-10 h-10 text-primary" />,
    },
    {
      id: 2,
      title: "Smart & Powerful Search",
      desc: "Our platform provides an advanced filtering system that helps students quickly discover the exact scholarship that matches their profile. Search by degree, country, funding type, or deadline—everything is designed for easy navigation.",
      icon: <Search className="w-10 h-10 text-primary" />,
    },
    {
      id: 3,
      title: "Global Opportunities",
      desc: "Explore fully funded scholarships from over 70+ countries worldwide. Whether it's Europe, USA, Australia, or Asia, students can find diverse opportunities suitable for their educational goals and backgrounds.",
      icon: <Globe2 className="w-10 h-10 text-primary" />,
    },
    {
      id: 4,
      title: "Fast & Secure Application",
      desc: "Applying through ScholarStream is smooth and fully secured. Our platform ensures protected checkout, encrypted payments, and reliable submission so students can apply stress-free without worrying about data safety.",
      icon: <Clock className="w-10 h-10 text-primary" />,
    },
    {
      id: 5,
      title: "Expert Guidance & Support",
      desc: "Students receive helpful tips, clear instructions, and guidance at every step of the application. Our goal is to make the scholarship journey simple, structured, and empowering for all users.",
      icon: <Sparkles className="w-10 h-10 text-primary" />,
    },
    {
      id: 6,
      title: "High Success Rate",
      desc: "Thousands of students have successfully found funded opportunities through ScholarStream. Our transparent system, verified listings, and student-friendly tools significantly increase the chances of receiving scholarships.",
      icon: <BadgeCheck className="w-10 h-10 text-primary" />,
    },
  ];

  return (
    <section className="my-20 px-4">
      {/* title  */}
      <div className="text-center my-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 relative inline-block px-6 py-2">
          Why <span className="text-primary">Choose Us?</span>
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
        <p className="card-text-secondary text-sm md:text-base mt-2">
          Discover why thousands of students trust ScholarStream for finding
          verified and fully funded scholarships worldwide.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <motion.div
            key={f.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            viewport={{ once: true }}
            className="p-8 bg-base-100 text-gray-600 card-text-secondary rounded-xl border shadow-md hover:shadow-xl 
                       transition-all duration-300 group relative overflow-hidden"
          >
            {/* Icon */}
            <div className="mb-4">{f.icon}</div>

            {/* Title */}
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition">
              {f.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 card-text-secondary leading-relaxed">{f.desc}</p>

            {/* Gradient Hover Effect */}
            <span
              className="absolute inset-0 border-2 border-transparent rounded-xl 
                         group-hover:border-primary/40 transition-all duration-300"
            ></span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
