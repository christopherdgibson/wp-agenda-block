import type { OnClick } from "@block-root/types";
interface EditButtonsProps {
    onClickDelete: OnClick;
    onClickSplit?: OnClick;
    isSubMeeting?: boolean;
}

import { DeleteMeetingButton } from "@components/buttons/DeleteMeetingButton";
import SplitMeetingButton from "@components/buttons/SplitMeetingButton";

import "./styles.css";

export default function EditButtons({onClickDelete, onClickSplit, isSubMeeting = false}: EditButtonsProps) {
    const containerClass = isSubMeeting ? "edit-sub-button-container" : "edit-button-container";
    const toolTip = isSubMeeting ? "Delete sub-meeting" : "Delete meeting";

    return (
        <div className={containerClass}>
            <DeleteMeetingButton
                onClick={onClickDelete}
                toolTip={toolTip}
            />
            {onClickSplit && <SplitMeetingButton onClick={onClickSplit} />}
        </div>
    );
}