import { useState } from "@wordpress/element";
import { ButtonGroup } from "@wordpress/components";

import constants from "@agenda-block/constants.json";
import "./styles.css";

const THEME_PRESETS = constants.themePresets;

export default function PresetColorsPanel({setAttributes}) {
    const [activeTheme, setActiveTheme] = useState("default-colors");

    return (
        <ButtonGroup className="btn-grid">
            <ThemeButton themeName="blue" themeText="Blue theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="forest" themeText="Forest theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="plum" themeText="Plum theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="slate" themeText="Slate theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
        </ButtonGroup>
    );
}

function ThemeButton({ themeName, themeText, activeTheme, setActiveTheme, setAttributes }) {
    return (
        <button
            className={`btn-theme-color btn-${themeName}${activeTheme === themeName ? " selected" : ""}`}
            onClick={() => {
                setActiveTheme(themeName);
                setAttributes({ ...THEME_PRESETS[themeName] });
            }}
        >
            {themeText}
        </button>
    );
}
