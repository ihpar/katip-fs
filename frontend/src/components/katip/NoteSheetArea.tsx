import { Route, Routes } from "react-router-dom";
import Sheets from "./Sheets";
import NoteSheet from "./NoteSheet";

import "./NoteSheetArea.scss";

const NoteSheetArea = () => {
  return (
    <Routes>
      <Route path="/" element={<Sheets />} />
      <Route path="/old" element={<NoteSheet />} />
    </Routes>
  );
};

export default NoteSheetArea;
