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
	useBlockProps,
} from "@wordpress/block-editor";
import { useRef, useState } from "@wordpress/element";

import CardColorsPanel from "@components/ui-panels/CardColorsPanel";
import ContentCard from "@components/cards/ContentCard";
import MeetingCard from "@components/cards/MeetingCard";
import { DeleteMeetingButton, ShowDeleteMeetingModal } from "@components/buttons/DeleteMeetingButton";
import EditButtons from "@components/buttons/EditButtons";
import SplitMeetingButton from "@components/buttons/SplitMeetingButton";
import InsertMeetingButtons from "@components/buttons/InsertMeetingButton";
import { addMeeting, deleteMeeting, updateField } from "@agenda-block/assets/js/meetingUtils.js";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
// import "./editor.scss";
// import '@components/cards/ContentCard/styles.css';
// import '@components/cards/MeetingCard/styles.css';

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
					className="meetings"
					style={{
						"--base-bg": cardBgColor,
						"--font-selected": cardFontColor,
						"--accent-primary": gradientColorLeft,
						"--accent-secondary": gradientColorRight,
					}}
				>
					<div className="meeting-button-column" ref={meetingsRef}>
						{meetings.map((meeting, i) =>
						<MeetingCard
							key={i}
							meetings={meetings}
							meeting={meeting}
							i={i}
							updateMeetings={updateMeetings}
							selectedCard={selectedCard}
							setSelectedCard={setSelectedCard}
							setSelectedMeeting={setSelectedMeeting}
							setIsModalOpenDelete={setIsModalOpenDelete}
						/>
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
						<div className="card-button">
							<Button variant="primary" onClick={() => {
								updateMeetings(addMeeting(meetings));
							}}>
								Add Meeting
							</Button>
						</div>
					</div>
					<div
						id="meeting-description-container"
						className="meeting-description-container"
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
									i={i} j={j}
									subMeeting={subMeeting}
									cardHeader={cardHeader}
									selectedCard={selectedCard}
									setSelectedCard={setSelectedCard}
									updateDescription={(val) =>
										updateMeetings(updateField(meetings, meeting, "description", val, i, j))
									}
								/>);
							})
						)}
					</div>
				</div>
			</div>
		</>
	);
}
