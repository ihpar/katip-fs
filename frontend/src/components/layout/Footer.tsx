import React from "react";

import "./Footer.scss";

import githubImg from "../../images/social/github.svg";
import instagramImg from "../../images/social/instagram.svg";
import twitterImg from "../../images/social/twitter.svg";

const Footer = () => {
  return (
    <React.Fragment>
      <div></div>
      <div>
        <footer className="footer no-print">
          <div>
            <ul>
              <li>
                <a href="https://github.com/ihpar/katip">
                  <img alt="Github" src={githubImg} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <img alt="Instagram" src={instagramImg} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com">
                  <img alt="Twitter" src={twitterImg} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="small-text"> &#169; 2021 Dokuz Eylül Üniversitesi </span>
          </div>
        </footer>
      </div>
      <div></div>
    </React.Fragment>
  );
};

export default Footer;
