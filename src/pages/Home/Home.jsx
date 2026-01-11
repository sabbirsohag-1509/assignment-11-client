import React from "react";
import Banner from "./Banner/Banner";
import Scholarships from "./Scholarships/Scholarships";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./FAQ/FAQ";
import WhyChooseUs from "./WhyChooseUs/WhyChooseUs";
import UniversitySlider from "./UniversitySlider/UniversitySlider";
import { Contact } from "lucide-react";
import ContactWithUs from "./ContactWithUs/ContactWithUs";
import ReviewSlider from "./ReviewSlider/ReviewSlider";
import Statistics from "./Statistics/Statistics";

const Home = () => {
  return (
    <div>
      <section>
        <Banner></Banner>
      </section>
      <section>
        <Scholarships></Scholarships>
      </section>
      <section>
        <Testimonials></Testimonials>
      </section>
      <section>
        <FAQ></FAQ>
      </section>
      <section>
        <WhyChooseUs></WhyChooseUs>
      </section>
      <section> 
        <Statistics></Statistics>
      </section>
      <section>
        <UniversitySlider></UniversitySlider>
      </section>
      <section> 
        <ReviewSlider></ReviewSlider>
      </section>
      <section>
        <ContactWithUs></ContactWithUs>
      </section>
    </div>
  );
};

export default Home;
