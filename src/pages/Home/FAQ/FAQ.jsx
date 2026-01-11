import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      q: "How do I apply for a scholarship?",
      a: "To apply for a scholarship, you simply browse through the available scholarships on our platform, open the scholarship details page, and review all requirements. If the scholarship is suitable for you, proceed by clicking the apply button. You will be redirected to the checkout process, where you can complete the necessary steps. Our platform ensures the process is smooth, easy to navigate, and safe for all users. You can later track all your applications through your dashboard.",
    },
    {
      q: "Do all scholarships require application fees?",
      a: "Not all scholarships require fees. Many international universities offer completely free application opportunities where students only need to submit academic documents. However, some institutions may charge a small fee to cover administrative or verification costs. To make your decision easier, our platform clearly highlights scholarships that are free and those that require fees. This transparency helps students confidently choose the best opportunities based on their budget and academic goals.",
    },
    {
      q: "Is ScholarStream safe for payments?",
      a: "Yes, ScholarStream is fully secure for online payments. We use encrypted checkout technology to ensure that your personal and financial information stays protected. All payments are processed through trusted providers that follow global industry standards. We do not store sensitive card details, and every transaction is fully secure. Our system undergoes regular security checks, ensuring students can safely apply to scholarships without worrying about data breaches or unauthorized access.",
    },
    {
      q: "Can I apply for multiple scholarships at the same time?",
      a: "Absolutely. Students are encouraged to apply for multiple scholarships as long as they meet the eligibility criteria. Applying for several opportunities increases your chances of being selected for financial assistance. ScholarStream makes this process simple by allowing you to track your applications, monitor deadlines, and view status updates in one place. This organized workflow helps students save time and reduces the stress that comes with managing many scholarship submissions.",
    },
    {
      q: "How do I know if I am eligible for a scholarship?",
      a: "Every scholarship listed on ScholarStream includes a detailed eligibility section that outlines requirements such as academic background, degree level, age limits, language proficiency, and financial qualifications. Before applying, carefully review these details to determine whether you match the criteria. This prevents unnecessary rejections and increases your chances of success. Our goal is to help students easily identify scholarships that truly align with their academic strengths and personal circumstances.",
    },
    {
      q: "Are the scholarships on ScholarStream verified and genuine?",
      a: "Yes. All scholarships on our platform are thoroughly reviewed and verified before being published. We partner with trusted institutions, universities, and scholarship providers to confirm authenticity. Our verification process ensures that students only access genuine opportunities and are protected from misinformation or fraudulent posts. This commitment to accuracy allows students to explore and apply for scholarships confidently, knowing that each listing represents a legitimate academic opportunity.",
    },
    {
      q: "Can I track the progress of my scholarship applications?",
      a: "Yes, every student can track the full progress of their applications through their personal dashboard. You will be able to see whether your submission is pending, approved, or rejected. The dashboard updates automatically as moderators review your documents. This feature ensures you always stay informed and do not miss important updates. It also eliminates the need to check multiple websites or contact institutions individually, making the process more efficient.",
    },
    {
      q: "What should I do if my payment fails while applying?",
      a: "If your payment fails, don’t panic. No application is submitted unless the payment is successfully completed. You can retry the checkout process at any time. Payment failures usually occur due to card issues, connection problems, or temporary bank restrictions. Trying a different card or payment method often solves the issue. If problems continue, our support team is available to guide you through the process and ensure your application is successfully submitted.",
    },
    {
      q: "Can I update my information after submitting a scholarship application?",
      a: "Yes, in many cases you can update certain parts of your profile, such as contact details or personal information, even after submitting an application. However, changes to submitted documents are not always allowed because scholarships often require original files for verification. We recommend reviewing your information carefully before completing the application. If major updates are needed, you can contact support, and our team will assist you based on the scholarship provider’s rules.",
    },
  ];

  return (
    <section id="faq" className="my-20 px-4">
      {/* title  */}
      <div className="text-center my-8">
        <h2 className="text-xl md:text-2xl font-bold mb-2 relative inline-block px-6 py-2">
          Frequently <span className="text-primary">Asked Questions</span>
          <span
            className="absolute inset-0 rounded-lg pointer-events-none -z-10 
                     bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-600 
                     opacity-30"
          ></span>
          <span className="absolute inset-[4px] border-2 border-white/30 dark:border-gray-300 rounded-lg pointer-events-none -z-10"></span>
        </h2>
      </div>

      {/* GRID layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
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
            <div className="collapse-content card-text-secondary">
              <p>{item.a}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
