import {splitMeeting} from "../../assets/js/meetingUtils.js";

export default function SplitMeetingButton({meetings, index, updateMeetings}) {
    return (
        <div class="btn-ui split-button">
            <span className="tool-tip">Split into sub-meetings</span>
            <button
                onClick={(e) => {
                    updateMeetings(splitMeeting(meetings, index))
                    e.stopPropagation();
                }}
            >
                &#9870;
            </button>
        </div>
    );
}