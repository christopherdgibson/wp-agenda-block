import constants from "../constants.json";
import { useState } from "@wordpress/element";
import { ButtonGroup } from "@wordpress/components";

const THEME_PRESETS = constants.themePresets;

export default function PresetColorsPanel({setAttributes}) {
    const [activeTheme, setActiveTheme] = useState("default-colors");

    function addActiveTheme(themeName, themeText) {
        return (
            <button
            className={`btn-theme-color btn-${themeName}${
                activeTheme === themeName ? " selected" : ""
            }`}
            onClick={() => {
                setActiveTheme(themeName);
                setAttributes({ ...THEME_PRESETS[themeName] });
            }}
            >
            {themeText}
            </button>
        );
    };

    return (
        <ButtonGroup className="btn-grid">
            {addActiveTheme("blue", "Blue theme")}
            {addActiveTheme("forest", "Forest theme")}
            {addActiveTheme("plum", "Plum theme")}
            {addActiveTheme("slate", "Slate theme")}
        </ButtonGroup>
    );
}

