import { Route, Routes } from "react-router-dom";
import Sheets from "./Sheets";
import NoteSheet from "./NoteSheet";

import "./NoteSheetArea.scss";

const NoteSheetArea = () => {
  return (
    <div className="A4">
      <Routes>
        <Route path="/" element={<Sheets />} />
        <Route path="/old" element={<NoteSheet />} />
      </Routes>
    </div>
  );
};

export default NoteSheetArea;
