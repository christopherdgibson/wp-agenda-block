export interface SubMeeting {
    header: string;
    title: string;
    description: string;
}

export interface Meeting {
    supHeader: string;
    subMeetings: SubMeeting[];
}

export interface BlockAttributes {
    align: string;
    meetings: Meeting[];
    cardBgColor: string;
    cardFontColor: string;
    gradientColorLeft: string;
    gradientColorRight: string;
}

export interface SetAttributesProps {
    setAttributes: (attrs: Partial<BlockAttributes>) => void;
}

export interface EditProps extends SetAttributesProps {
    attributes: BlockAttributes;
}

export interface SelectedCard {
    index: number | null;
    subIndex: number | null;
}

export type OnClick = () => void;

export type OnChange = (value: string) => void;

// Reusable prop shape for anything that needs to update meetings
export interface UpdateMeetingsProps {
    meetings: Meeting[];
    index: number;
    updateMeetings: (meetings: Meeting[], callback?: () => void) => void;
}