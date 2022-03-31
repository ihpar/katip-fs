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
      </div>
    </div>
  );
};

export default NoteSheetArea;
