import EditorWidget from "./components/katip/EditorWidget";
import "./App.scss";

import githubImg from "./images/social/github.svg";
import instagramImg from "./images/social/instagram.svg";
import twitterImg from "./images/social/twitter.svg";

function App() {
  return (
    <div className="page-grid">
      {/* Header section */}
      <div className="no-print"></div>
      <div>Nav</div>
      <div className="no-print"></div>
      {/* Eof header section */}
      {/* Main section */}
      {/* LHS */}
      <div className="no-print" style={{ justifySelf: "end" }}>
        <div className="left-menu-wrapper">
          <EditorWidget />
        </div>
      </div>
      {/* Eof LHS */}
      {/* Center section */}
      <div>
        <div className="top-menu no-print">Menu</div>

        <div className="A4">
          <div className="paper-contents"></div>
        </div>
      </div>
      {/* Eof Center section */}
      {/* RHS */}
      <div className="no-print">
        <div className="assistant accordion-wrapper">RHS</div>
      </div>
      {/* Eof RHS */}
      {/* Eof main section */}
      {/* Footer section */}
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
      {/* Eof footer section */}
    </div>
  );
}

export default App;
