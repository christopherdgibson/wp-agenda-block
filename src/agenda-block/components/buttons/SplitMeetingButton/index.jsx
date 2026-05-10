import "./styles.css";

export default function SplitMeetingButton({onClick}) {
    return (
        <div class="btn-ui split-button">
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