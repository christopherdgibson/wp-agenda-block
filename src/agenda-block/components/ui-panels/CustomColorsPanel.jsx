import { useState } from "@wordpress/element";

import { ButtonGroup, ColorPicker } from "@wordpress/components";

import TabButton from "./TabButton";
import GradientColorsPanel from "./GradientColorsPanel";

export default function CustomColorsPanel({ attributes, setAttributes }) {
  const { cardBgColor, cardFontColor } =
    attributes;
  const [activeSubTab, setActiveSubTab] = useState("background");
  return (
    <>
      <ButtonGroup>
        <TabButton
          tabName="background"
          tabText="Background"
          activeTab={activeSubTab}
          setActiveTab={setActiveSubTab}
        />
        <TabButton
          tabName="text"
          tabText="Text"
          activeTab={activeSubTab}
          setActiveTab={setActiveSubTab}
        />
        <TabButton
          tabName="gradient"
          tabText="Gradient"
          activeTab={activeSubTab}
          setActiveTab={setActiveSubTab}
        />
      </ButtonGroup>
      {activeSubTab === "background" && (
        <ColorPicker
          color={cardBgColor}
          onChangeComplete={(value) =>
            setAttributes({ cardBgColor: value.hex })
          }
          disableAlpha
        />
      )}
      {activeSubTab === "text" && (
        <ColorPicker
          color={cardFontColor}
          onChangeComplete={(value) =>
            setAttributes({ cardFontColor: value.hex })
          }
          disableAlpha
        />
      )}
      {activeSubTab === "gradient" && (
        <GradientColorsPanel
          attributes={attributes}
          setAttributes={setAttributes}
        />
      )}
    </>
  );
}

// function customColorsPanel() {
//   return (
//     <>
//       <ButtonGroup>
//         {addActiveSubTab("background", "Background")}
//         {addActiveSubTab("text", "Text")}
//         {addActiveSubTab("gradient", "Gradient")}
//       </ButtonGroup>
//       {subTabContent[activeSubTab]}
//     </>
//   );
// }

// const subTabContent = {
//   background: (
//     <ColorPicker
//       color={cardBgColor}
//       onChangeComplete={(value) => setAttributes({ cardBgColor: value.hex })}
//       disableAlpha
//     />
//   ),
//   text: (
//     <ColorPicker
//       color={cardFontColor}
//       onChangeComplete={(value) =>
//         setAttributes({ cardFontColor: value.hex })
//       }
//       disableAlpha
//     />
//   ),
//   gradient: (
//     <GradientColorsPanel
//       gradientColorLeft={gradientColorLeft}
//       gradientColorRight={gradientColorRight}
//       setAttributes={setAttributes}
//     />
//   ),
// };
