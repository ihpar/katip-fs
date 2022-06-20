import React from "react";

import AccordionWidget from "./AccordionWidget";
import MakamWidget from "./MakamWidget";
import UsulWidget from "./UsulWidget";
import GroupingWidget from "./GroupingWidget";
import FlowModifierWidget from "./FlowModifiersWidget";
import useLanguage from "../../hooks/use-language";

import "./LHSWidgets.scss";

const LHSWidgets = () => {
  const { t } = useLanguage("widget-titles");

  return (
    <aside className="no-print" style={{ justifySelf: "end" }}>
      <div className="left-menu-wrapper">
        <AccordionWidget initialVisibility title={t.maqam} contentHeight={200}>
          <MakamWidget height={200} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.usul} contentHeight={200}>
          <UsulWidget height={200} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.grouping} contentHeight={49}>
          <GroupingWidget />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.flow} contentHeight={104}>
          <FlowModifierWidget />
        </AccordionWidget>
      </div>
    </aside>
  );
};

export default LHSWidgets;
