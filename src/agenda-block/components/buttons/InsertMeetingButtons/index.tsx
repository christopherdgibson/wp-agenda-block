import type { UpdateMeetingsProps } from "@agenda-block/types";
import { insertSubMeeting } from "@agenda-block/utils/meetingUtils";

import "./styles.css";


interface InsertMeetingButtonProps extends UpdateMeetingsProps {
	subIndex?: number | null;
	after?: boolean;
}

export default function InsertMeetingButtons({meetings, updateMeetings, index, subIndex = null, after = false}: InsertMeetingButtonProps) {
	const containerClass = subIndex == null ? "add-button-container" : "add-sub-button-container";
	return (
		<div className={containerClass}>
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

function InsertMeetingButton({meetings, updateMeetings, index, subIndex, after}: InsertMeetingButtonProps) {
	
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
