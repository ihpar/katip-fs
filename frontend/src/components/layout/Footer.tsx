import { Fragment } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

import "./Footer.scss";

import githubImg from "../../images/social/github.svg";
import githubImgDark from "../../images/social/github_dark.svg";
import instagramImg from "../../images/social/instagram.svg";
import instagramImgDark from "../../images/social/instagram_dark.svg";
import twitterImg from "../../images/social/twitter.svg";
import twitterImgDark from "../../images/social/twitter_dark.svg";

const Footer = () => {

  const theme = useSelector<RootState, string>(state => state.theme.theme);
  const isDark = theme === "dark";

  return (
    <Fragment>
      <div></div>
      <div>
        <footer className="footer no-print">
          <div>
            <ul>
              <li>
                <a href="https://github.com/ihpar/katip">
                  <img alt="Github" src={isDark ? githubImgDark : githubImg} />
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com">
                  <img alt="Instagram" src={isDark ? instagramImgDark : instagramImg} />
                </a>
              </li>
              <li>
                <a href="https://twitter.com">
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
      <div></div>
    </Fragment>
  );
};

export default Footer;
