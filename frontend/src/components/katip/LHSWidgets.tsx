import "./LHSWidgets.scss";

import AccordionWidget from "./AccordionWidget";
import MakamWidget from "./MakamWidget";
import UsulWidget from "./UsulWidget";
import GroupingWidget from "./GroupingWidget";
import FlowModifierWidget from "./FlowModifiersWidget";

const LHSWidgets = () => {
  return (
    <div className="no-print" style={{ justifySelf: "end" }}>
      <div className="left-menu-wrapper">
        <AccordionWidget initialVisibility={true} title={"Makam"} contentHeight={200}>
          <MakamWidget height={200} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={"Usûl"} contentHeight={200}>
          <UsulWidget height={200} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={"Nota Gruplama"} contentHeight={49}>
          <GroupingWidget />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={"Akış İşaretleri"} contentHeight={104}>
          <FlowModifierWidget />
        </AccordionWidget>
      </div>
    </div>
  );
};

export default LHSWidgets;
