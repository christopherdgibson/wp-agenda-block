import { Button, Modal } from "@wordpress/components";

export function DeleteMeetingButton({i, j, setIsModalOpenDelete, setSelectedMeeting}) {
    const toolTip = j === null ? "Delete meeting" : "Delete sub-meeting";
    return (
        <div class="btn-ui delete-button">
            <span className="tool-tip">{toolTip}</span>
            <button
                onClick={(e) => {
                    setSelectedMeeting( {index: i, subIndex: j} );
                    setIsModalOpenDelete(true);
                    e.stopPropagation();
                }}
            >
                &#x2716;
            </button>
        </div>
    );
}

export function ShowDeleteMeetingModal({meetings, selectedMeeting, setSelectedMeeting, setIsModalOpenDelete, updateMeetings, updateField}) {
    const meetingType = selectedMeeting.subIndex ? "sub-meeting" : "meeting";
    function confirmDelete() {
        {/* Delete entire meeting card when subMeeting null */}
        if (selectedMeeting.subIndex === null) {
            const newMeetings = meetings.filter((_, i) => i !== selectedMeeting.index);
            updateMeetings(newMeetings);
        } else {
            const meeting = meetings[selectedMeeting.index];
            if (meeting.subMeetings.length === 2) {
                collapseExistingMeeting(meeting, selectedMeeting.index);
            } else {
                const newSubMeetings = meeting.subMeetings.filter((_, j) => j !== selectedMeeting.subIndex);
                updateField(selectedMeeting.index, "subMeetings", newSubMeetings);
            }
        }
        setIsModalOpenDelete(false);
        setSelectedMeeting({ index: null, subIndex: null });
    }

    function collapseExistingMeeting(meeting, i) {
        const remainingSubMeeting = meeting.subMeetings.find((_, j) => j !== selectedMeeting.subIndex);
        const newMeeting = {
            ...meeting,
            supHeader: "",
            subMeetings: [{
                ...remainingSubMeeting,
                header: remainingSubMeeting.header || meeting.supHeader
            }]
        };
        const newMeetings = meetings.map((m, idx) =>
            idx === i ? { ...newMeeting } : m
        );
        updateMeetings(newMeetings);
    };

    return (
        <Modal
            title="Delete Meeting"
            onRequestClose={() => setIsModalOpenDelete(false)}
        >
            <p>Are you sure you want to delete this {meetingType}?</p>
            <Button
                variant="primary"
                onClick={() => {
                    confirmDelete();
                }}
            >
                Yes, delete.
            </Button>
            <Button
                variant="secondary"
                onClick={() => setIsModalOpenDelete(false)}
                style={{ marginLeft: "1em" }}
            >
                Cancel
            </Button>
        </Modal>
    );
}