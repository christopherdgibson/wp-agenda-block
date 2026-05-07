export default function SplitMeetingButton({meetings, i, updateMeetings}) {
    const meeting = meetings[i];
    function splitExistingMeeting(meetings, i) {
        // return meetings.map...
		const newMeetings = meetings.map((m, idx) =>
			idx === i ? {
                ...meeting, 
                supHeader: meeting.subMeetings[0].header, 
                subMeetings: [...meeting.subMeetings, { header: "", title: "", description: "" }]
            } : m
		);
		updateMeetings(newMeetings);
	};

		return (
			<div class="btn-ui split-button">
				<span className="tool-tip">Split into sub-meetings</span>
				<button
					onClick={(e) => {
						splitExistingMeeting(meetings, i);
						e.stopPropagation();
					}}
				>
					&#9870;
				</button>
			</div>
		);
	}