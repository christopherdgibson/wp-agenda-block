import { Button, ButtonGroup, PanelBody } from "@wordpress/components";
import { useState } from "@wordpress/element";

import TabButton from "./TabButton";
import PresetColorsPanel from "./PresetColorsPanel";
import CustomColorsPanel from "./CustomColorsPanel";
import RestoreToDefaults from "./RestoreToDefaults";

export default function CardColorsPanel({attributes, setAttributes}) {
    
const [activeTab, setActiveTab] = useState("presets");
  return (
    <PanelBody title="Card Design">
      <ButtonGroup>
        <TabButton
          tabName="presets"
          tabText="Presets"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          tabName="custom"
          tabText="Custom"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        <TabButton
          tabName="defaults"
          tabText="Defaults"
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </ButtonGroup>
      {activeTab === "presets" && (
        <PresetColorsPanel setAttributes={setAttributes} />
      )}
      {activeTab === "custom" && (
        <CustomColorsPanel
            attributes={attributes}
            setAttributes={setAttributes}
        />
      )}
      {activeTab === "defaults" && (
        <RestoreToDefaults setAttributes={setAttributes} />
      )}
    </PanelBody>
  );
}
