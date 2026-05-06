import { Button, Modal } from "@wordpress/components";
import constants from "../constants.json";
import { useRef, useEffect, useState } from "@wordpress/element";

const DEFAULT_GRADIENT_LEFT = constants.themePresets.default.gradientColorLeft;
const DEFAULT_GRADIENT_RIGHT = constants.themePresets.default.gradientColorRight;
const DEFAULT_BG_COLOR = constants.themePresets.default.cardBgColor;
const DEFAULT_FONT_COLOR = constants.themePresets.default.cardFontColor;

export default function RestoreToDefaults({setAttributes}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
      <div style={{ marginTop: "1em", textAlign: "center" }}>
        <Button
          variant="primary"
          onClickCapture={() => setIsModalOpen(true)}
        >
          Restore to defaults
        </Button>
        {isModalOpen && (
          <Modal
            title="Restore Defaults"
            onRequestClose={() => setIsModalOpen(false)}
          >
            <p>Are you sure you want to restore the default colors?</p>
            <Button
              variant="primary"
              onClick={() => {
                setAttributes({
                  gradientColorLeft: DEFAULT_GRADIENT_LEFT,
                  gradientColorRight: DEFAULT_GRADIENT_RIGHT,
                  cardBgColor: DEFAULT_BG_COLOR,
                  cardFontColor: DEFAULT_FONT_COLOR,
                });
                setIsModalOpen(false);
              }}
            >
              Yes, restore.
            </Button>
            <Button
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              style={{ marginLeft: "1em" }}
            >
              Cancel
            </Button>
          </Modal>
        )}
      </div>
    );
}
