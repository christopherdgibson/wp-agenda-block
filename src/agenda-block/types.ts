// src/types.ts

export interface SubMeeting {
    header: string;
    title: string;
    description: string;
}

export interface Meeting {
    supHeader: string;
    subMeetings: SubMeeting[];
}


export interface ColorValue {
    hex: string;
    rgb: { r: number; g: number; b: number; a: number };
    hsl: { h: number; s: number; l: number; a: number };
}

export interface PanelAttributes {
    [key: string]: unknown;
    cardBgColor: string;
    cardFontColor: string;
    gradientColorLeft: string;
    gradientColorRight: string;

}

export interface BlockAttributes {
    [key: string]: unknown;
    align: string;
    meetings: Meeting[];
    cardBgColor: string;
    cardFontColor: string;
    gradientColorLeft: string;
    gradientColorRight: string;
}

export interface EditProps {
    attributes: BlockAttributes;
    setAttributes: (attrs: Partial<BlockAttributes>) => void;
}

export interface SelectedCard {
    index: number | null;
    subIndex: number | null;
}

export type OnClick = () => void;

export type OnChange = (value: string) => void;


// Reusable prop shape for anything that needs to update meetings
export interface WithMeetings {
    meetings: Meeting[];
    updateMeetings: (meetings: Meeting[], callback?: () => void) => void;
}