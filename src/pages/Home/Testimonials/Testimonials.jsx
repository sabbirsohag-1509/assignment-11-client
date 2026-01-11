import { motion } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";

const Testimonials = () => {
  const reviews = [
    {
      id: 1,
      name: "Emily Carter",
      role: "Scholarship Winner (USA)",
      img: "https://i.ibb.co.com/tTp2bqqy/emily-Carter.avif",
      comment:
        "ScholarStream helped me discover the perfect scholarship opportunity. The platform guided me step by step, provided all the essential details about each scholarship, and made the application process extremely smooth. I could focus on preparing my documents without any stress or confusion, saving me weeks of effort!",
    },
    {
      id: 2,
      name: "Micheal Ahmed",
      role: "Student (UK)",
      img: "https://i.ibb.co.com/VYsN6qSx/Michael.avif",
      comment:
        "I was overwhelmed with so many scholarship options, but ScholarStream made it easy. The detailed listings, accurate application deadlines, and clear instructions helped me apply confidently to multiple universities. Their platform is a game-changer for international students seeking financial aid.",
    },
    {
      id: 3,
      name: "Sophia Lee",
      role: "Scholarship Holder (Canada)",
      img: "https://i.ibb.co.com/jPJGddmH/sophie-Lee.avif",
      comment:
        "Thanks to ScholarStream, I secured a fully funded scholarship to study abroad. The intuitive interface, instant notifications about new scholarships, and detailed university insights made the journey stress-free. Highly recommended for anyone serious about studying overseas.",
    },
    {
      id: 4,
      name: "Arman Hossain",
      role: "Graduate Student (Bangladesh)",
      img: "https://i.ibb.co.com/gMY6rS5C/arman.avif",
      comment:
        "ScholarStream’s search system is very detailed. I filtered scholarships by country, category, and funding type and finally found one that perfectly matched my profile. The step-by-step guidance and clear application instructions were incredibly helpful and saved me a lot of time.",
    },
    {
      id: 5,
      name: "Julia Martinez",
      role: "Research Scholar (Spain)",
      img: "https://i.ibb.co.com/xqtssKwr/Julia-Martinez.avif",
      comment:
        "I loved the transparency of ScholarStream. Each scholarship had accurate information about fees, deadlines, and coverage. The platform is trustworthy and user-friendly, allowing me to apply to multiple scholarships without any confusion. Truly a premium experience.",
    },
    {
      id: 6,
      name: "Daniel Kim",
      role: "International Student (South Korea)",
      img: "https://i.ibb.co.com/v4GcqPzH/daniel.avif",
      comment:
        "ScholarStream exceeded my expectations. The platform is fast, clean, and intuitive. From searching scholarships to understanding eligibility criteria, everything was simplified. The notifications about new opportunities ensured I never missed a chance. Highly effective!",
    },
  ];

  return (
    <section className="my-20 px-4">
      {/* title  */}
      <div className="text-center my-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 relative inline-block px-6 py-2">
          Success <span className="text-primary">Stories</span>
          {/* Outer gradient border */}
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          {/* Inner subtle border */}
          <span className="absolute inset-[4px] border-2 border-white/30 rounded-lg pointer-events-none -z-10"></span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {reviews.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: i * 0.15 }}
            viewport={{ once: false, amount: 0.2 }}
            whileHover={{ scale: 1.05, rotateX: 3, rotateY: 3 }}
            className="p-6 rounded-xl shadow-2xl border border-base-300 bg-base-100 hover:shadow-lg hover:border-primary/50 transition-all duration-300 cursor-pointer"
          >
            <FaQuoteLeft className="text-3xl text-primary mb-4" />
            <p className="card-text mb-4 text-sm md:text-base leading-relaxed">
              {r.comment}
            </p>
            <div className="flex items-center gap-4 mt-4">
              <img
                src={r.img}
                className="w-14 h-14 rounded-full object-cover border-2 border-primary/30 dark:border-primary/50 "
                alt={r.name}
              />
              <div>
                <h4 className="font-semibold card-text">{r.name}</h4>
                <p className="card-text-secondary text-sm">{r.role}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
