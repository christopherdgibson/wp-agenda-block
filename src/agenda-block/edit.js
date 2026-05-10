/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import blockMetadata from "./block.json";
import {
	Button,
	Modal
} from "@wordpress/components";
import {
	InspectorControls,
	PlainText,
	useBlockProps,
} from "@wordpress/block-editor";
import { useEffect, useRef, useState } from "@wordpress/element";

import CardColorsPanel from "@components/ui-panels/CardColorsPanel";
import ContentCard from "@components/cards/ContentCard";
import { DeleteMeetingButton, ShowDeleteMeetingModal } from "@components/buttons/DeleteMeetingButton";
import EditButtons from "@components/buttons/EditButtons";
import SplitMeetingButton from "@components/buttons/SplitMeetingButton";
import InsertMeetingButtons from "@components/buttons/InsertMeetingButton";
import { addMeeting, deleteMeeting, splitMeeting, updateField } from "./assets/js/meetingUtils.js";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */

export default function Edit({ attributes, setAttributes }) {
  const { gradientColorLeft, gradientColorRight, cardBgColor, cardFontColor } =
    attributes;
	
	const descriptionsRef = useRef();
	const meetingsRef = useRef();
	const blockProps = useBlockProps({ className: "meetings-container" });

	// Initialize state from attributes or as an empty array
	let [meetings, setMeetings] = useState(attributes.meetings || []);
	const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState({ index: null, subIndex: null });
	const [selectedCard, setSelectedCard] = useState({ index: null, subIndex: null });

	// Update block attributes whenever meetings change
	let updateMeetings = (newMeetings, callback) => {
		setMeetings(newMeetings);
		setAttributes({ meetings: newMeetings });
		if (callback) {
			callback();
		}
	};

	let updateSupField = (field, value, index) => {
		const meeting = meetings[index];
		updateMeetings(updateField(meetings, meeting, field, value, index));
	};

	let updateSubField = (meeting, field, value, index, subIndex) => {
		updateMeetings(updateField(meetings, meeting, field, value, index, subIndex));
	};

	// Add cards for display

	function meetingCard(meeting, i) {
		return (
			<>
				<button
					key={i}
					className={`card card-small${
					selectedCard.index === i && selectedCard.subIndex === 0
						? ' meeting-select'
						: ''
				}`}
					data-index={i}
					onClick={(e) => {
						if (e.target === e.currentTarget || window.innerWidth > 768) {
								setSelectedCard({ index: i, subIndex: 0 });
						}
					}}
				>
					{<InsertMeetingButtons
						meetings={meetings}
						updateMeetings={updateMeetings}
						index={i}
					/>}
					
					{<EditButtons
						/* Delete entire meeting card when subMeeting null */
						onClickDelete={() => {
							setSelectedMeeting( {index: i, subIndex: null} );
							setIsModalOpenDelete(true);
						}}
						onClickSplit ={() => {
								updateMeetings(splitMeeting(meetings, i));
						}}
						isSubMeeting={false}
					/>}
					<div class="meeting-header">
						<PlainText
							value={meeting.subMeetings[0].header}
							placeholder="Day"
							onChange={(val) =>
								updateSubField(meeting, "header", val, i, 0)
							}
						/>
					</div>
					<div class="meeting-title">
						<PlainText
							value={meeting.subMeetings[0].title}
							placeholder="Title"
							onChange={(val) => updateSubField(meeting, "title", val, i, 0)}
						/>
					</div>
				</button>
			</>
		);
	}

	function splitMeetingCard(meeting, i) {
		return (
			<button
				key={i}
				className={'card card-small'}
				data-index={i}
				onClick={(e) => {
						if (e.target === e.currentTarget || window.innerWidth > 768) {
								setSelectedCard({ index: i, subIndex: 0 });
						}
					}}
			>
				{<InsertMeetingButtons
					meetings={meetings}
					updateMeetings={updateMeetings}
					index={i}
				/>}
				{/* Delete entire meeting card when subMeeting null */}
				{<EditButtons
					onClickDelete={() => {
						setSelectedMeeting( {index: i, subIndex: null} );
						setIsModalOpenDelete(true);
					}}
					isSubMeeting={false}
				/>}
				<div class="meeting-header">
					<PlainText
						value={meeting.supHeader}
						placeholder="Day"
						onChange={(val) => updateSupField("supHeader", val, i)}
					/>
				</div>
				<div class="meeting-title subcard-container">
					{meeting.subMeetings.map((subMeeting, j) => (
						<>
							<a
								className={`card card-part${
									selectedCard.index === i && selectedCard.subIndex === j
										? ' meeting-select'	: ''
									}`}
								// href
								onClick={(e) => {
									if (e.target === e.currentTarget || window.innerWidth > 768) {
										setSelectedCard({ index: i, subIndex: j });
										e.stopPropagation();
									}
								}}
							>
								{<InsertMeetingButtons
									meetings={meetings}
									updateMeetings={updateMeetings}
									index={i} subIndex={j}
								/>}
								{<EditButtons
									onClickDelete={() => {
										setSelectedMeeting( {index: i, subIndex: j} );
										setIsModalOpenDelete(true);
									}}
									isSubMeeting={true}
								/>}
								<div class="meeting-header">
									<PlainText
										value={subMeeting.header}
										placeholder={`Subheader ${j+1}`}
										onChange={(val) =>
											updateSubField(meeting, "header", val, i, j)
										}
									/>
								</div>
								<div class="meeting-title">
									<PlainText
										value={subMeeting.title}
										placeholder={`Subtitle ${j+1}`}
										onChange={(val) =>
											updateSubField(meeting, "title", val, i, j)
										}
									/>
								</div>
							</a>
						</>
					))}
				</div>
			</button>
		);
	}

	return (
		<>
			<InspectorControls>
				{
				<CardColorsPanel
					attributes={attributes}
					setAttributes={setAttributes}
				/>
				}
			</InspectorControls>
			<div {...blockProps}>
				<div
					class="meetings"
					style={{
						"--base-bg": cardBgColor,
						"--font-selected": cardFontColor,
						"--accent-primary": gradientColorLeft,
						"--accent-secondary": gradientColorRight,
					}}
				>
					<div class="meeting-button-column" ref={meetingsRef}>
						{meetings.map((meeting, i) =>
							meeting?.subMeetings?.length > 1
								? splitMeetingCard(meeting, i)
								: meetingCard(meeting, i),
						)}
						{isModalOpenDelete && (
							<ShowDeleteMeetingModal
								meetings={meetings}
								selectedMeeting={selectedMeeting}
								onConfirm={(index, subIndex) => {
									updateMeetings(deleteMeeting(meetings, selectedMeeting));
									setIsModalOpenDelete(false);
									setSelectedMeeting({ index: null, subIndex: null });
								}}
								onCancel={() => {
									setIsModalOpenDelete(false);
									setSelectedMeeting({ index: null, subIndex: null });
								}}
							/>
						)}
						<div class="card-button">
							<Button variant="primary" onClick={() => {
								updateMeetings(addMeeting(meetings));
							}}>
								Add Meeting
							</Button>
						</div>
					</div>
					<div
						id="meeting-description-container"
						class="meeting-description-container"
						ref={descriptionsRef}
						style={{ display: selectedCard.index !== null ? 'grid' : 'none' }}
						onClick={(e) => {
							if (e.target === descriptionsRef.current)
								setSelectedCard({ index: null, subIndex: null });
							}}
					>
						{meetings.map((meeting, i) => 
							meeting.subMeetings.map((subMeeting, j) => {
								const cardHeader = meeting.supHeader
								? meeting.supHeader + (subMeeting.header ? ' - ' + subMeeting.header : '')
								: subMeeting.header;
								return (<ContentCard
									key={`${i}-${j}`}
									cardHeader={cardHeader}
									selectedCard={selectedCard}
									setSelectedCard={setSelectedCard}
									updateDescription={(val) => updateSubField(meeting, "description", val, i, j)}
									i={i} j={j}
									subMeeting={subMeeting}
								/>);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}
