import React from "react";
import { BsGithub, BsLinkedin, BsFolder } from "react-icons/bs";

const SocialMedia = () => {
  return (
    <div className="app__social">
      <a
        href="https://www.linkedin.com/in/massy-haddad-developer"
        target="_blank"
      >
        <div>
          <BsLinkedin />
        </div>
      </a>

      <a href="https://github.com/Massy-Haddad" target="_blank">
        <div>
          <BsGithub />
        </div>
      </a>

      <a href="#work">
        <div>
          <BsFolder />
        </div>
      </a>
    </div>
  );
};

export default SocialMedia;
