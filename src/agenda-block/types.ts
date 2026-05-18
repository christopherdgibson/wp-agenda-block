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

// interface EditButtonsProps<T = void> {
//     onClickDelete: (arg?: T) => void;
//     onClickSplit: () => void;
//     isSubMeeting: boolean;
// }

export interface SelectedCard {
    index: number | null;
    subIndex: number | null;
}

export type OnClick = () => void;

export type OnChange = (value: string) => void;

export interface UpdateMeetingsProps {
    meetings: Meeting[];
    index: number;
    updateMeetings: (meetings: Meeting[], callback?: () => void) => void;
}

export interface ThemeStyles extends React.CSSProperties {
    "--base-bg"?: string;
    "--font-selected"?: string;
    "--accent-primary"?: string;
    "--accent-secondary"?: string;
}