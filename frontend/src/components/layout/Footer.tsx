import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "store/index";
import { Theme } from "store/slices/theme";

import "./Footer.scss";

import githubImg from "static/images/social/github.svg";
import githubImgDark from "static/images/social/github_dark.svg";
import instagramImg from "static/images/social/instagram.svg";
import instagramImgDark from "static/images/social/instagram_dark.svg";
import twitterImg from "static/images/social/twitter.svg";
import twitterImgDark from "static/images/social/twitter_dark.svg";

const Footer = () => {
  const theme = useSelector<RootState, string>((state) => state.theme.theme);
  const isDark = theme === Theme.Dark;

  return (
    <>
      <div />
      <div>
        <footer className="footer no-print">
          <div>
            <ul>
              <li>
                <a href="https://github.com/ihpar/katip-fs" target="_blank" rel="noreferrer">
                  <img alt="Github" src={isDark ? githubImgDark : githubImg} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com" target="_blank" rel="noreferrer">
                  <img alt="Instagram" src={isDark ? instagramImgDark : instagramImg} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com" target="_blank" rel="noreferrer">
                  <img alt="Twitter" src={isDark ? twitterImgDark : twitterImg} />
                </a>
              </li>
            </ul>
          </div>
          <div>
            <span className="small-text"> &#169; 2022 | Parlak </span>
          </div>
        </footer>
      </div>
      <div />
    </>
  );
};

export default Footer;
