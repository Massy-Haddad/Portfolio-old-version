import React from "react";
import "./App.scss";

import { Header, Footer, About, Skills, Testimonial, Work } from "./container";
import { Navbar } from "./components";

const app = () => {
  return (
    <div className="app">
      <Navbar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
};

export default app;
