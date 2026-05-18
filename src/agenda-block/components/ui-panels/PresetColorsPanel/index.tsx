import { useState } from "@wordpress/element";
import { ButtonGroup } from "@wordpress/components";
import type { Dispatch, SetStateAction } from "react";

import type { SetAttributesProps } from "@block-root/types";
import constants from "@block-root/constants";

import "./styles.css";

const THEME_PRESETS = constants.themePresets;

type ThemeKey = keyof typeof THEME_PRESETS;

interface ThemeButtonProps extends SetAttributesProps {
    themeName: ThemeKey;
    themeText: string;
    activeTheme: string;
    setActiveTheme: Dispatch<SetStateAction<ThemeKey>>;
}

export default function PresetColorsPanel({setAttributes} : SetAttributesProps) {
    // const [activeTheme, setActiveTheme] = useState<string>("default-colors");
    const [activeTheme, setActiveTheme] = useState<keyof typeof THEME_PRESETS>("default");

    return (
        <ButtonGroup className="btn-grid">
            <ThemeButton themeName="blue" themeText="Blue theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="forest" themeText="Forest theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="plum" themeText="Plum theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
            <ThemeButton themeName="slate" themeText="Slate theme" activeTheme={activeTheme} setActiveTheme={setActiveTheme} setAttributes={setAttributes} />
        </ButtonGroup>
    );
}

function ThemeButton({ themeName, themeText, activeTheme, setActiveTheme, setAttributes }: ThemeButtonProps) {
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
