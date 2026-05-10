import {insertSubMeeting, updateField} from "@agenda-block/assets/js/meetingUtils.js";

import "./styles.css";

export default function InsertMeetingButtons({meetings, updateMeetings, index, subIndex, after}) {
	const containerClass = subIndex == null ? "add-button-container" : "add-sub-button-container";
	return (
		<div class={containerClass}>
			<InsertMeetingButton 
				meetings={meetings}
				updateMeetings={updateMeetings}
				index={index}
				subIndex={subIndex}
				after={after ?? false}
			/>
			{subIndex != null && subIndex === meetings[index]?.subMeetings.length - 1 && (
				<InsertMeetingButton 
					meetings={meetings}
					updateMeetings={updateMeetings}
					index={index}
					subIndex={subIndex + 1}
					after={true}
				/>)
			}
		</div>
	);
}

function InsertMeetingButton({meetings, updateMeetings, index, subIndex, after}) {
	
	// Align right for last sub-meeting or for sup-meeting card
	const btnClass = ["btn-ui", after || subIndex == null ? "add-button-right" : "add-button-left"].join(" ");
	return (
		<div className={btnClass}>
			<span className="tool-tip">Insert {subIndex == null ? "meeting" : "sub-meeting"} {after ? "after" : "before"}</span>
			<button
				onClick={(e) => {
					updateMeetings(insertSubMeeting(meetings, index, subIndex));
					e.stopPropagation();
				}}
			>
				{after ? <>&#9626;</> : <>&#9630;</>}
			</button>
		</div>
	);
}
