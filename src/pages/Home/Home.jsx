import React from "react";
import Banner from "./Banner/Banner";
import Scholarships from "./Scholarships/Scholarships";
import Testimonials from "./Testimonials/Testimonials";
import FAQ from "./FAQ/FAQ";

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
    </div>
  );
};

export default Home;
