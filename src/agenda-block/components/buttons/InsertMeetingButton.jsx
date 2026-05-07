export function InsertMeetingButton({meetings, i, updateMeetings}) {
	let insertMeeting = (i) => {
		const newMeetings = [
			...meetings.slice(0, i),
			{
				supHeader: "",
				subMeetings: [{ header: "", title: "", description: "" }],
			},
			...meetings.slice(i),
		];
		updateMeetings(newMeetings);
	};

	return (
		<div class="add-button-container">
			<div class="btn-ui add-button-right">
				<span className="tool-tip">Insert meeting before</span>
				<button
					onClick={(e) => {
						insertMeeting(i);
						e.stopPropagation();
					}}
				>
					&#9626;
				</button>
			</div>
		</div>
	);
}

export function InsertSubMeetingButton({meetings, i, j, updateField, position}) {

	let insertSubMeeting = (meetings, i, j) => {
        const meeting = meetings[i];
		const newSubMeetings = [
			...meeting.subMeetings.slice(0, j),
			{ header: "", title: "", description: "" },
			...meeting.subMeetings.slice(j),
		];
		updateField(i, "subMeetings", newSubMeetings);
	};

	const btnClass = ["btn-ui", position === "after" ? "add-button-right" : "add-button-left"].join(" ");
	return (
		<div className={btnClass}>
			<span className="tool-tip">Insert sub-meeting {position === "after" ? "after" : "before"}</span>
			<button
				onClick={(e) => {
					insertSubMeeting(meetings, i, j);
					e.stopPropagation();
				}}
			>
				{position === "after" ? <>&#9626;</> : <>&#9630;</>}
			</button>
		</div>
	);
}
