import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import "./About.scss";

const About = () => {
  return (
    <>
      <h2 className="head-text">
        “First, solve the
        <span> problem</span>.
        <br />
        Then write the
        <span> code</span>.”{/* <br />– John Johnson */}
      </h2>
    </>
  );
};

export default About;
