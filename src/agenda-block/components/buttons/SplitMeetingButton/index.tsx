import type { OnClick } from "@block-root/types";

import "./styles.css";


interface SplitMeetingButtonProps {
    onClick: OnClick;
}

export default function SplitMeetingButton({onClick}: SplitMeetingButtonProps) {
    return (
        <div className="btn-ui split-button">
            <span className="tool-tip">Split into sub-meetings</span>
            <button
                onClick={(e) => {
                    onClick();
                    e.stopPropagation();
                }}
            >
                &#9870;
            </button>
        </div>
    );
}