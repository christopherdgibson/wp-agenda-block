import type { EditProps } from "@block-root/types";
import { useState } from "@wordpress/element";

import { ButtonGroup, ColorPicker } from "@wordpress/components";

import TabButton from "@components/ui-panels/TabButton";
import GradientColorsPanel from "@components/ui-panels/GradientColorsPanel";

import "./styles.css";

export default function CustomColorsPanel({ attributes, setAttributes }: EditProps) {
  const { cardBgColor, cardFontColor } =
    attributes;
  const [activeSubTab, setActiveSubTab] = useState<string>("background");
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
            onChange={(hex: string) =>
                setAttributes({ cardBgColor: hex })
            }
            enableAlpha={false}
        />
      )}
      {activeSubTab === "text" && (
        <ColorPicker
          color={cardFontColor}
          onChange={(hex: string) =>
            setAttributes({ cardFontColor: hex })
          }
          enableAlpha={false}
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
