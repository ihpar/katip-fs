import "./App.scss";

import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import MakamWidget from "./components/katip/MakamWidget";
import ActionsMenu from "./components/katip/ActionsMenu";
import AccordionWidget from "./components/katip/AccordionWidget";
import Cirak from "./components/katip/Cirak";
import UsulWidget from "./components/katip/UsulWidget";

function App() {
  return (
    <div className="page-grid">
      <Navigation />
      <div className="no-print" style={{ justifySelf: "end" }}>
        <div className="left-menu-wrapper">
          <AccordionWidget initialVisibility={true} title={"Makam"} contentHeight={200}>
            <MakamWidget />
          </AccordionWidget>
          <AccordionWidget initialVisibility={false} title={"Usûl"} contentHeight={200}>
            <UsulWidget />
          </AccordionWidget>
        </div>
      </div>
      <div>
        <ActionsMenu />
        <div className="A4">
          <div className="paper-contents"></div>
        </div>
      </div>
      <Cirak />
      <Footer />
    </div>
  );
}

export default App;
