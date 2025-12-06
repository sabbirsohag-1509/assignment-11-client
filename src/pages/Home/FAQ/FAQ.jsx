import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I apply for a scholarship?",
      a: "To apply for a scholarship, you simply browse through the available scholarships on our platform, open the scholarship details page, and review all requirements. If the scholarship is suitable for you, proceed by clicking the apply button. You will be redirected to the checkout process, where you can complete the necessary steps. Our platform ensures the process is smooth, easy to navigate, and safe for all users."
    },
    {
      q: "Do all scholarships require application fees?",
      a: "Not all scholarships require fees. Many international universities offer fully free application opportunities where students only need to submit their academic documents. However, some institutions charge a small application fee to cover verification or administrative processes. Our platform clearly displays which scholarships require fees and which are completely free, helping students make informed decisions before submitting any application."
    },
    {
      q: "Is ScholarStream safe for payments?",
      a: "Yes, ScholarStream is fully secure. All payments made through our platform are processed using encrypted checkout technology that protects user information. We follow industry-standard security protocols, ensuring that your card details and personal data remain confidential. Additionally, every scholarship listed on our platform is verified, so applicants can trust that their payments and applications are handled safely and professionally."
    },
    {
      q: "Can I apply for multiple scholarships at the same time?",
      a: "Absolutely. Students are encouraged to apply for multiple scholarships as long as they meet the requirements. Applying for several opportunities increases your chances of receiving financial support. Our platform allows you to track your applied scholarships, manage deadlines, and view the status of each application. This makes the entire scholarship process organized, efficient, and stress-free."
    },
    {
      q: "How do I know if I am eligible for a scholarship?",
      a: "Every scholarship listed on ScholarStream comes with a detailed eligibility section that explains requirements such as academic background, degree level, subject area, and financial criteria. Before applying, students should carefully read the eligibility details to ensure they match the scholarship expectations. If you meet the criteria, you can confidently apply. Our goal is to help students find scholarships that truly suit their qualifications."
    },
    {
      q: "Are the scholarships on ScholarStream verified and genuine?",
      a: "Yes. All scholarships listed on our platform are thoroughly reviewed and verified before being published. We collaborate with trusted institutions, universities, and official scholarship providers to ensure authenticity. Our team cross-checks information to protect students from misinformation or scams. You can rely on ScholarStream to provide accurate, updated, and genuine scholarship opportunities worldwide."
    }
  ];

  return (
    <section className="my-20 px-4">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Frequently <span className="text-primary">Asked Questions</span>
      </h2>

      {/* GRID layout added here */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {faqs.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="collapse bg-base-100 rounded-lg border shadow"
          >
            <input type="checkbox" />
            <div className="collapse-title text-lg font-medium">{item.q}</div>
            <div className="collapse-content text-gray-600">
              <p>{item.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
