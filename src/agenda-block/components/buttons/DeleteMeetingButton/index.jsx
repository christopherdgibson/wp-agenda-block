import { Button, Modal } from "@wordpress/components";

import "./styles.css";

export function DeleteMeetingButton({ onClick, toolTip }) {
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

export function ShowDeleteMeetingModal({
	meetings,
	selectedMeeting,
	onConfirm,
	onCancel,
}) {
	const meetingType =
		selectedMeeting.subIndex == null ? "meeting" : "sub-meeting";
	return (
		<Modal title="Delete Meeting" onRequestClose={onCancel}>
			<p>Are you sure you want to delete this {meetingType}?</p>
            <div class="delete-confirm-buttons">
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
                    // style={{ marginLeft: "1em" }}
                >
                    Cancel
                </Button>
            </div>
		</Modal>
	);
}
