import { Button, Modal } from "@wordpress/components";

import type { OnClick, SelectedCard } from "@block-root/types";

import "./styles.css";

interface DeleteMeetingButtonProps {
    onClick: OnClick;
    toolTip: string;
}

interface ShowDeleteMeetingModalProps {
	selectedMeeting: SelectedCard;
	onConfirm: OnClick
	onCancel: OnClick;
}

export function DeleteMeetingButton({ onClick, toolTip }: DeleteMeetingButtonProps) {
	return (
		<div className="btn-ui delete-button">
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
	selectedMeeting,
	onConfirm,
	onCancel,
}: ShowDeleteMeetingModalProps) {
	const meetingType =
		selectedMeeting.subIndex == null ? "meeting" : "sub-meeting";
	return (
		<Modal title="Delete Meeting" onRequestClose={onCancel}>
			<p>Are you sure you want to delete this {meetingType}?</p>
            <div className="delete-confirm-buttons">
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
