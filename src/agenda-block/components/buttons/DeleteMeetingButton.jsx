import { Button, Modal } from "@wordpress/components";
import { deleteMeeting } from "../../assets/js/meetingUtils.js";

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

export function ShowDeleteMeetingModal({meetings, selectedMeeting, setSelectedMeeting, setIsModalOpenDelete, updateMeetings}) {
    const meetingType = selectedMeeting.subIndex ? "sub-meeting" : "meeting";
    function confirmDelete() {
        updateMeetings(deleteMeeting(meetings, selectedMeeting));
        setIsModalOpenDelete(false);
        setSelectedMeeting({ index: null, subIndex: null });
    }

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