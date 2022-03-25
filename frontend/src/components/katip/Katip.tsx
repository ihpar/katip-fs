import "./Katip.scss";

import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
import ActionsMenu from "./ActionsMenu";
import Cirak from "./Cirak";
import LHSWidgets from "./LHSWidgets";
import NoteSheetArea from "./NoteSheetArea";

const Katip = () => {
  return (
    <div className="page-grid">
      <Navigation />
      <LHSWidgets />
      <main>
        <ActionsMenu />
        <NoteSheetArea />
      </main>
      <Cirak />
      <Footer />
    </div>
  );
};

export default Katip;
