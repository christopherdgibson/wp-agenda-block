import {insertMeeting, insertSubMeeting, updateField} from "../../../assets/js/meetingUtils.js";

export function InsertMeetingButton({meetings, index, updateMeetings}) {
	return (
		<div class="add-button-container">
			<div class="btn-ui add-button-right">
				<span className="tool-tip">Insert meeting before</span>
				<button
					onClick={(e) => {
						updateMeetings(insertMeeting(meetings, index));
						e.stopPropagation();
					}}
				>
					&#9626;
				</button>
			</div>
		</div>
	);
}

export function InsertSubMeetingButton({meetings, index, subIndex, updateMeetings, position}) {

	const btnClass = ["btn-ui", position === "after" ? "add-button-right" : "add-button-left"].join(" ");
	return (
		<div className={btnClass}>
			<span className="tool-tip">Insert sub-meeting {position === "after" ? "after" : "before"}</span>
			<button
				onClick={(e) => {
					updateMeetings(insertSubMeeting(meetings, index, subIndex));
					e.stopPropagation();
				}}
			>
				{position === "after" ? <>&#9626;</> : <>&#9630;</>}
			</button>
		</div>
	);
}
