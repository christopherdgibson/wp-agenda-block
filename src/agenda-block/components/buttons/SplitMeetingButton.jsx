import {splitExistingMeeting} from "../../assets/js/meetingUtils.js";

export default function SplitMeetingButton({meetings, i, updateMeetings}) {
    return (
        <div class="btn-ui split-button">
            <span className="tool-tip">Split into sub-meetings</span>
            <button
                onClick={(e) => {
                    updateMeetings(splitExistingMeeting(meetings, i))
                    e.stopPropagation();
                }}
            >
                &#9870;
            </button>
        </div>
    );
}