import { Provider } from "react-redux";
import store from "store/index";

import "./Katip.scss";

import Navigation from "../layout/Navigation";
import Footer from "../layout/Footer";
import ActionsMenu from "./actions-menu/ActionsMenu";
import Cirak from "./Cirak";
import LHSWidgets from "./LHSWidgets";
import NoteSheetArea from "./NoteSheetArea";

const Katip = () => {
  return (
    <Provider store={store}>
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
    </Provider>
  );
};

export default Katip;
