import React, { useState } from "react";

import SearchField from "components/utils/SearchField";
import AccordionWidget from "./AccordionWidget";
import MakamWidget from "./MakamWidget";
import UsulWidget from "./UsulWidget";
import GroupingWidget from "./GroupingWidget";
import FlowModifierWidget from "./FlowModifiersWidget";
import useLanguage from "../../hooks/use-language";

import "./LHSWidgets.scss";

const LHSWidgets = () => {
  const { t } = useLanguage("widget-titles");
  const [makamFilter, setMakamFilter] = useState("");
  const [usulFilter, setUsulFilter] = useState("");

  return (
    <aside className="no-print" style={{ justifySelf: "end" }}>
      <div className="left-menu-wrapper">
        <AccordionWidget initialVisibility title={t.maqam} expandHeight={262}>
          <SearchField placeholder="search_makam" setFilter={setMakamFilter} />
          <MakamWidget height={196} filterText={makamFilter} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.usul} expandHeight={269}>
          <SearchField placeholder="search_usul" setFilter={setUsulFilter} />
          <UsulWidget height={203} filterText={usulFilter} />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.grouping} expandHeight={73}>
          <GroupingWidget />
        </AccordionWidget>
        <AccordionWidget initialVisibility={false} title={t.flow} expandHeight={128}>
          <FlowModifierWidget />
        </AccordionWidget>
      </div>
    </aside>
  );
};

export default LHSWidgets;
