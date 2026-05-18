import { PlainText } from "@wordpress/block-editor";

import type { Dispatch, SetStateAction } from "react";
import type { OnChange, SelectedCard, SubMeeting } from "@block-root/types";

import "./styles.css";

interface ContentCardProps {
    cardHeader: string;
    selectedCard: SelectedCard;
    setSelectedCard: Dispatch<SetStateAction<SelectedCard>>;
    updateDescription: OnChange;
    i: number;
    j: number;
    subMeeting: SubMeeting;
}

export default function ContentCard({ cardHeader, selectedCard, setSelectedCard, updateDescription, i, j, subMeeting }: ContentCardProps) {
    return (
        <>
        <svg width="0" height="0" style={{ position: "absolute" }}>
            <defs>
                <linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--accent-primary)" />
                    <stop offset="100%" stopColor="var(--accent-secondary)" />
                </linearGradient>
            </defs>
        </svg>
        <div
            className={`card card-large card-description${
                selectedCard.index === i && selectedCard.subIndex === j
                    ? ' card-description-select'
                    : ''
            }`}
            data-index={i}
            data-subindex={j}
        >
            <button className="close-popup" onClick={() => setSelectedCard({ index: null, subIndex: null })}>
                X
            </button>
            <div className="meeting-header">
                {cardHeader}
            </div>
            <div className="meeting-icon">
                <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <g fill="url(#iconGrad)">
                        <path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
                        <path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
                        <path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
                        <path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
                        <path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
                    </g>
                </svg>
            </div>
            <div className="meeting-description">
                <p>
                    <PlainText
                        value={subMeeting.description}
                        placeholder="Description"
                        onChange={updateDescription}
                    />
                </p>
            </div>
        </div>
        </>
    );
}