import { PlainText } from "@wordpress/block-editor";
import { Fragment } from "react";

import type { Dispatch, SetStateAction } from "react";
import type { Meeting, SelectedCard, UpdateMeetingsProps } from "@block-root/types";

interface MeetingCardProps extends UpdateMeetingsProps {
    meeting: Meeting;
    selectedCard: SelectedCard;
    setSelectedCard: Dispatch<SetStateAction<SelectedCard>>;
    setSelectedMeeting: Dispatch<SetStateAction<SelectedCard>>;
    setIsModalOpenDelete: Dispatch<SetStateAction<boolean>>;
}


import "./styles.css";

import EditButtons from "@components/buttons/EditButtons";
import InsertMeetingButtons from "@components/buttons/InsertMeetingButtons";

import { splitMeeting, updateField } from "@agenda-block/utils/meetingUtils";

export default function MeetingCard({
	meetings,
	meeting,
	index,
	updateMeetings,
	selectedCard,
	setSelectedCard,
	setSelectedMeeting,
	setIsModalOpenDelete}: MeetingCardProps) {

	function singleMeetingCard(meeting : Meeting, i : number) {
		return (
			<>
				<button
					className={`card card-small${
						selectedCard.index === i && selectedCard.subIndex === 0
							? " meeting-select"
							: ""
					}`}
					data-index={i}
					onClick={(e) => {
						if (e.target === e.currentTarget || window.innerWidth > 768) {
							setSelectedCard({ index: i, subIndex: 0 });
						}
					}}
				>
					{
						<InsertMeetingButtons
							meetings={meetings}
							updateMeetings={updateMeetings}
							index={i}
						/>
					}

					{
						<EditButtons
							/* Delete entire meeting card when subMeeting null */
							onClickDelete={() => {
								setSelectedMeeting({ index: i, subIndex: null });
								setIsModalOpenDelete(true);
							}}
							onClickSplit={() => {
								updateMeetings(splitMeeting(meetings, i));
							}}
							isSubMeeting={false}
						/>
					}
					<div className="meeting-header">
						<PlainText
							value={meeting.subMeetings[0].header}
							placeholder="Day"
                            onChange={(val) =>
                                updateMeetings(
                                    updateField(meetings, meeting, "header", val, i, 0))
                            }
						/>
					</div>
					<div className="meeting-title">
						<PlainText
							value={meeting.subMeetings[0].title}
							placeholder="Title"
                            onChange={(val) =>
                                updateMeetings(
                                    updateField(meetings, meeting, "title", val, i, 0))
                            }
						/>
					</div>
				</button>
			</>
		);
	}

	function splitMeetingCard(meeting: Meeting, i: number) {
		return (
			<button
				className={"card card-small"}
				data-index={i}
				onClick={(e) => {
					if (e.target === e.currentTarget || window.innerWidth > 768) {
						setSelectedCard({ index: i, subIndex: 0 });
					}
				}}
			>
				{
					<InsertMeetingButtons
						meetings={meetings}
						updateMeetings={updateMeetings}
						index={i}
					/>
				}
				{/* Delete entire meeting card when subMeeting null */}
				{
					<EditButtons
						onClickDelete={() => {
							setSelectedMeeting({ index: i, subIndex: null });
							setIsModalOpenDelete(true);
						}}
						isSubMeeting={false}
					/>
				}
				<div className="meeting-header">
					<PlainText
						value={meeting.supHeader}
						placeholder="Day"
						onChange={(val) =>
                            updateMeetings(
                                updateField(meetings, meeting, "supHeader", val, i))
                        }
					/>
				</div>
				<div className="meeting-title subcard-container">
					{meeting.subMeetings.map((subMeeting, j) => (
						<Fragment key={`${i}-${j}`}>
							<a
								className={`card card-part${
									selectedCard.index === i && selectedCard.subIndex === j
										? " meeting-select"
										: ""
								}`}
								// href
								onClick={(e) => {
									if (e.target === e.currentTarget || window.innerWidth > 768) {
										setSelectedCard({ index: i, subIndex: j });
										e.stopPropagation();
									}
								}}
							>
								{
									<InsertMeetingButtons
										meetings={meetings}
										updateMeetings={updateMeetings}
										index={i}
										subIndex={j}
									/>
								}
								{
									<EditButtons
										onClickDelete={() => {
											setSelectedMeeting({ index: i, subIndex: j });
											setIsModalOpenDelete(true);
										}}
										isSubMeeting={true}
									/>
								}
								<div className="meeting-header">
									<PlainText
										value={subMeeting.header}
										placeholder={`Subheader ${j + 1}`}
                                        onChange={(val) =>
                                            updateMeetings(updateField(meetings, meeting, "header", val, i, j))
                                        }
									/>
								</div>
								<div className="meeting-title">
									<PlainText
										value={subMeeting.title}
										placeholder={`Subtitle ${j + 1}`}
                                        onChange={(val) =>
                                            updateMeetings(updateField(meetings, meeting, "title", val, i, j))
                                        }
									/>
								</div>
							</a>
						</Fragment>
					))}
				</div>
			</button>
		);
	}
	return meeting?.subMeetings?.length > 1
		? splitMeetingCard(meeting, index)
		: singleMeetingCard(meeting, index);
}
