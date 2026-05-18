import { PanelBody, DuotonePicker } from "@wordpress/components";
import { useEffect, useRef } from "@wordpress/element";

import type { EditProps } from "@block-root/types";

import constants from "@block-root/constants";

const DEFAULT_GRADIENT_LEFT = constants.themePresets.default.gradientColorLeft;
const DEFAULT_GRADIENT_RIGHT =
  constants.themePresets.default.gradientColorRight;
const DUOTONE_PALETTE = constants.duotonePalette;

export default function GradientColorsPanel({ attributes, setAttributes }: EditProps) {
  const duotoneRef = useRef<HTMLDivElement>(null);

  // Remove unused Duotone elements
  useEffect(() => {
    if (!duotoneRef.current) return;
    duotoneRef.current
      .querySelectorAll(".components-color-list-picker__swatch-button")
      .forEach((btn) => btn.remove());
    duotoneRef.current
      .querySelector("button.components-circular-option-picker__clear")
      ?.remove();
  }, []);

  const { gradientColorLeft, gradientColorRight } = attributes;
  const emptyColorArray = [] as { color: string; name: string; slug: string }[];
  return (
    <PanelBody title="Gradient Colors">
      <div ref={duotoneRef}>
        <DuotonePicker
          duotonePalette={DUOTONE_PALETTE}
          colorPalette={emptyColorArray}
          value={
            gradientColorLeft && gradientColorRight
              ? [gradientColorLeft, gradientColorRight]
              : [DEFAULT_GRADIENT_LEFT, DEFAULT_GRADIENT_LEFT]
          }
          onChange={(newValue) => {
            if (newValue === undefined || newValue === "unset") {
              setAttributes({
                gradientColorLeft: "transparent",
                gradientColorRight: "transparent",
              });
            } else if (!Array.isArray(newValue) || newValue.length !== 2) {
              setAttributes({
                gradientColorLeft: DEFAULT_GRADIENT_LEFT,
                gradientColorRight: DEFAULT_GRADIENT_RIGHT,
              });
            } else {
              setAttributes({
                gradientColorLeft: newValue[0],
                gradientColorRight: newValue[1],
              });
            }
          }}
        />
      </div>
    </PanelBody>
  );
}
