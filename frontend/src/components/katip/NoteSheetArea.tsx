import "./NoteSheetArea.scss";

import NoteSheet from "./NoteSheet";

const NoteSheetArea = () => {
  return (
    <div className="A4">
      <div className="paper-contents">
        <h1 className="song-title">Eserin Başlığı</h1>
        <h2 className="composer">Besteci Ad Soyad</h2>
        <h3 className="bpm-section">
          <span className="duration dur-8"></span>
          <span className="normal-text">=</span>
          <span>150</span>
        </h3>
        <NoteSheet />
        {/* 
        <div>
          <div className="music-line incomplete">
            <div className="measure">
              <div className="staff-lines">
                <div className="staff-space"></div>
                <div className="staff-top"></div>
                <div className="staff-space"></div>
                <div className="staff-top"></div>
                <div className="staff-space"></div>
                <div className="staff-top"></div>
                <div className="staff-space"></div>
                <div className="staff-top"></div>
                <div className="staff-space"></div>
                <div className="staff-top"></div>
                <div className="staff-space"></div>
                <div className="staff-middle"></div>
                <div className="staff-space"></div>
                <div className="staff-middle"></div>
                <div className="staff-space"></div>
                <div className="staff-middle"></div>
                <div className="staff-space"></div>
                <div className="staff-middle"></div>
                <div className="staff-space"></div>
                <div className="staff-middle"></div>
                <div className="staff-space"></div>
                <div className="staff-bottom"></div>
                <div className="staff-space"></div>
                <div className="staff-bottom"></div>
                <div className="staff-space"></div>
                <div className="staff-bottom"></div>
                <div className="staff-space"></div>
                <div className="staff-bottom"></div>
                <div className="staff-space"></div>
                <div className="staff-bottom"></div>
                <div className="staff-space"></div>
              </div>
              <div className="music-symbols">
                <span className="clef">&#xE050;</span>
                <div className="key-signature">
                  <span className="g4">&#xE440;</span>
                  <span className="c5">&#xE284;</span>
                  <span className="f5">&#xE447;</span>
                </div>
                <div className="time-signature">
                  <div className="numerator">
                    <span className="num-9"></span>
                  </div>
                  <div className="denominator">
                    <span className="num-8"></span>
                  </div>
                </div>
                <div className="notes-wrapper">
                  <svg className="measure-svg">
                    <text fontSize="46" fontFamily="BravuraText" fill="#222222">
                      <tspan x="0" y="83">
                        &#xE1D6;
                      </tspan>
                      <tspan x="25" y="93">
                        &#xE1D6;
                      </tspan>
                      <tspan x="50" y="88">
                        &#xE1D6;
                      </tspan>
                      <tspan x="75" y="98">
                        &#xE1DA;
                      </tspan>
                      <tspan x="100" y="103">
                        &#xE1DB;
                      </tspan>
                    </text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
        */}
      </div>
    </div>
  );
};

export default NoteSheetArea;
