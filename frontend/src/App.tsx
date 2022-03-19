import "./App.scss";

import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EditorWidget from "./components/katip/EditorWidget";
import ActionsMenu from "./components/katip/ActionsMenu";

function App() {
  return (
    <div className="page-grid">
      <Navigation />
      <div className="no-print" style={{ justifySelf: "end" }}>
        <div className="left-menu-wrapper">
          <EditorWidget />
        </div>
      </div>
      <div>
        <ActionsMenu />
        <div className="A4">
          <div className="paper-contents"></div>
        </div>
      </div>
      <div className="no-print">
        <div className="assistant accordion-wrapper">RHS</div>
      </div>
      <Footer />
    </div>
  );
}

export default App;
