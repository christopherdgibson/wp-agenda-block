import { Button, Modal } from "@wordpress/components";

export function DeleteMeetingButton({onClick, isSubMeeting}) {
    const toolTip = isSubMeeting ? "Delete sub-meeting" : "Delete meeting";
    return (
        <div class="btn-ui delete-button">
            <span className="tool-tip">{toolTip}</span>
            <button
                onClick={(e) => {
                    onClick();
                    e.stopPropagation();
                }}
            >
                &#x2716;
            </button>
        </div>
    );
}

export function ShowDeleteMeetingModal({meetings, selectedMeeting, onConfirm, onCancel}) {
    const meetingType = selectedMeeting.subIndex ? "sub-meeting" : "meeting";
    return (
        <Modal
            title="Delete Meeting"
            onRequestClose={onCancel}
        >
            <p>Are you sure you want to delete this {meetingType}?</p>
            <Button
                variant="primary"
                onClick={() => {
                    onConfirm();
                }}
            >
                Yes, delete.
            </Button>
            <Button
                variant="secondary"
                onClick={onCancel}
                style={{ marginLeft: "1em" }}
            >
                Cancel
            </Button>
        </Modal>
    );
}