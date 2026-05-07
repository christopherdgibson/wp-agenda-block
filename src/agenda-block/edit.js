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

import CardColorsPanel from "./components/CardColorsPanel";

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
	const [isModalOpenDefault, setIsModalOpenDefault] = useState(false);
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

	let updateField = (index, field, value) => {
		const newMeetings = meetings.map((meeting, i) =>
			i === index ? { ...meeting, [field]: value } : meeting,
		);
		updateMeetings(newMeetings);
	};

	let updateSubField = (meeting, index, subIndex, field, value) => {
		console.log("meeting:", meeting);
		let subMeetingsNew;
		if (subIndex === null) {
			const subMeeting = meeting.subMeetings[0];
			subMeetingsNew = [{ ...subMeeting, [field]: value }];
		} else {
			subMeetingsNew = meeting.subMeetings.map((subMeeting, j) =>
				j === subIndex ? { ...subMeeting, [field]: value } : subMeeting,
			);
		}
		console.log("submeetings map update meetings;", meetings);
		updateField(index, "subMeetings", subMeetingsNew);
	};

	// Add cards for display

	function addMeetingCard(meeting, i) {
		return (
			<>
				<button
					key={i}
					className={`card card-small${
					selectedCard.index === i && selectedCard.subIndex === null
						? ' meeting-select'
						: ''
				}`}
					data-index={i}
					onClick={(e) => {
						if (e.target === e.currentTarget || window.innerWidth > 768) {
								setSelectedCard({ index: i, subIndex: null });
						}
					}}
				>
					{insertMeetingBefore(i)}
					<div class="edit-button-container">
						{addDeleteMeetingButton(i, null)}
						{addSplitExistingMeetingButton(meeting, i)}
					</div>
					<div class="meeting-header">
						<PlainText
							value={meeting.subMeetings[0].header}
							placeholder="Day"
							onChange={(val) =>
								updateSubField(meeting, i, null, "header", val)
							}
						/>
					</div>
					<div class="meeting-title">
						<PlainText
							value={meeting.subMeetings[0].title}
							placeholder="Title"
							onChange={(val) => updateSubField(meeting, i, null, "title", val)}
						/>
					</div>
				</button>
			</>
		);
	}

	function addSplitMeetingCard(meeting, i) {
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
				{insertMeetingBefore(i)}
				<div class="edit-button-container">
					{addDeleteMeetingButton(i, null)}
				</div>
				<div class="meeting-header">
					<PlainText
						value={meeting.supHeader}
						placeholder="Day"
						onChange={(val) => updateField(i, "supHeader", val)}
					/>
				</div>
				<div class="meeting-title container-two">
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
								<div class="add-sub-button-container">
									<div class="btn-ui add-button-left">
										<span className="tool-tip">Insert sub-meeting before</span>
										<button
											onClick={(e) => {
												insertSubMeeting(meeting, i, j);
												e.stopPropagation();
											}}
										>
											&#9630;
										</button>
									</div>
									{j===meeting.subMeetings.length - 1 &&
									<div class="btn-ui add-button-right">
										<span className="tool-tip">Insert sub-meeting after</span>
										<button
											onClick={(e) => {
												insertSubMeeting(meeting, i, j + 1);
												e.stopPropagation();
											}}
										>
											&#9626;
										</button>
									</div>
								}
								</div>
								<div className="edit-sub-button-container">
									{addDeleteMeetingButton(i, j)}
								</div>
								<div class="meeting-header">
									<PlainText
										value={subMeeting.header}
										placeholder={`Subheader ${j+1}`}
										onChange={(val) =>
											updateSubField(meeting, i, j, "header", val)
										}
									/>
								</div>
								<div class="meeting-title">
									<PlainText
										value={subMeeting.title}
										placeholder={`Subtitle ${j+1}`}
										onChange={(val) =>
											updateSubField(meeting, i, j, "title", val)
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

	function addDescriptionCard(meeting, i) {
		return (
			<div className={`card card-large card-description${
					selectedCard.index === i && selectedCard.subIndex === null
						? ' card-description-select'
						: ''
				}`}
				data-index={i}>
				<button class="close-popup" onClick={() => setSelectedCard({ index: null, subIndex: null })}>
					X
				</button>
				<div class="meeting-header">{meeting.subMeetings[0].header}</div>
				<div class="meeting-icon">
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<g fill="url(#iconGrad)">
							<path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
							<path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
							<path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
							<path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
							<path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
						</g>
					</svg>
				</div>
				<div class="meeting-description">
					<p>
						<PlainText
							value={meeting.subMeetings[0].description}
							placeholder="Description"
							onChange={(val) =>
								updateSubField(meeting, i, null, "description", val)
							}
						/>
					</p>
				</div>
			</div>
		);
	}

	function addSubDescriptionCards(meeting, i) {
		return meeting.subMeetings.map((subMeeting, j) => (
			<div
				className={`card card-large card-description${
					selectedCard.index === i && selectedCard.subIndex === j
						? ' card-description-select'
						: ''
				}`}
				data-index={i}
				data-subindex={j}
			>
				<button class="close-popup" onClick={() => setSelectedCard({ index: null, subIndex: null })}>
					X
				</button>
				<div class="meeting-header">
					{meeting.supHeader} - {subMeeting.header}
				</div>
				<div class="meeting-icon">
					<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
						<g fill="url(#iconGrad)">
							<path d="M24,29H8a5,5,0,0,1-5-5V10A5,5,0,0,1,8,5H24a5,5,0,0,1,5,5V24A5,5,0,0,1,24,29ZM8,7a3,3,0,0,0-3,3V24a3,3,0,0,0,3,3H24a3,3,0,0,0,3-3V10a3,3,0,0,0-3-3Z" />
							<path d="M24,25H20a1,1,0,0,1-1-1V20a1,1,0,0,1,1-1h4a1,1,0,0,1,1,1v4A1,1,0,0,1,24,25Zm-3-2h2V21H21Z" />
							<path d="M28,13H4a1,1,0,0,1,0-2H28a1,1,0,0,1,0,2Z" />
							<path d="M11,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,11,9Z" />
							<path d="M21,9a1,1,0,0,1-1-1V4a1,1,0,0,1,2,0V8A1,1,0,0,1,21,9Z" />
						</g>
					</svg>
				</div>
				<div class="meeting-description">
					<p>
						<PlainText
							value={subMeeting.description}
							placeholder="Description"
							onChange={(val) =>
								updateSubField(meeting, i, j, "description", val)
							}
						/>
					</p>
				</div>
			</div>
		));
	}

	
	// Card modification buttons

	function insertMeetingBefore(i) {
		return(
			<div class="add-button-container">
				<div class="btn-ui add-button-right">
					<span className="tool-tip">Insert meeting before</span>
					<button
						onClick={(e) => {
							insertMeeting(i);
							e.stopPropagation();
						}}
					>
						&#9626;
					</button>
				</div>
			</div>
		);
	}

	function addDeleteMeetingButton(i, j) {
		const toolTip = j === null ? "Delete meeting" : "Delete sub-meeting";
		return (
			<div class="btn-ui delete-button">
				<span className="tool-tip">{toolTip}</span>
				<button
					onClick={(e) => {
						handleDeleteClick(i, j);
						e.stopPropagation();
					}}
				>
					&#x2716;
				</button>
			</div>
		);
	}

	function addSplitExistingMeetingButton(meeting, i) {
		return (
			<div class="btn-ui split-button">
				<span className="tool-tip">Split into sub-meetings</span>
				<button
					onClick={(e) => {
						splitExistingMeeting(meeting, i);
						e.stopPropagation();
					}}
				>
					&#9870;
				</button>
			</div>
		);
	}
	
	let addMeeting = () => {
		updateMeetings([
			...meetings,
			{
				supHeader: "",
				subMeetings: [{ header: "", title: "", description: "" }],
			},
		]);
	};

	let insertMeeting = (i) => {
		const newMeetings = [
			...meetings.slice(0, i),
			{
				supHeader: "",
				subMeetings: [{ header: "", title: "", description: "" }],
			},
			...meetings.slice(i)
		];
		updateMeetings(newMeetings);
	};

	let addSubMeeting = (meeting, i) => {
		const newSubMeetings = [
			...meeting.subMeetings,
			{ header: "", title: "", description: "" },
		];
		updateField(i, "subMeetings", newSubMeetings);
	};

	let insertSubMeeting = (meeting, i, j) => {
		const newSubMeetings = [
			...meeting.subMeetings.slice(0, j),
			{ header: "", title: "", description: "" },
			...meeting.subMeetings.slice(j),
		];
		updateField(i, "subMeetings", newSubMeetings);
	};

	let splitExistingMeeting = (meeting, i) => {
		const newMeeting = { 
			...meeting, 
			supHeader: meeting.subMeetings[0].header, 
			subMeetings: [...meeting.subMeetings] 
		};
		const newMeetings = meetings.map((m, idx) =>
			idx === i ? { ...newMeeting, subMeetings: [...newMeeting.subMeetings, { header: "", title: "", description: "" }] } : m
		);
		updateMeetings(newMeetings);
	};

	let collapseExistingMeeting = (meeting, i) => {
		const remainingSubMeeting = meeting.subMeetings.find((_, j) => j !== selectedMeeting.subIndex);
		const newMeeting = { 
			...meeting, 
			supHeader: "", 
			subMeetings: [remainingSubMeeting] 
		};
		const newMeetings = meetings.map((m, idx) =>
			idx === i ? { ...newMeeting } : m
		);
		updateMeetings(newMeetings);
	};

	function handleDeleteClick(index, subIndex) {
		setSelectedMeeting( {index: index, subIndex: subIndex} );
		setIsModalOpenDelete(true);
	}

	function confirmDelete() {
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

	function showDeleteMeetingModal() {
		return (
			<Modal
				title="Delete Meeting"
				onRequestClose={() => setIsModalOpenDelete(false)}
			>
				<p>Are you sure you want to delete this meeting?</p>
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
					<svg width="0" height="0" style={{ position: "absolute" }}>
						<defs>
							<linearGradient id="iconGrad" x1="0" y1="0" x2="1" y2="1">
								<stop offset="0%" stopColor="var(--accent-primary)" />
								<stop offset="100%" stopColor="var(--accent-secondary)" />
							</linearGradient>
						</defs>
					</svg>
					<div class="meeting-button-column" ref={meetingsRef}>
						{meetings.map((meeting, i) =>
							meeting?.subMeetings?.length > 1
								? addSplitMeetingCard(meeting, i)
								: addMeetingCard(meeting, i),
						)}
						{isModalOpenDelete && showDeleteMeetingModal()}
						<div class="card-button">
							<Button variant="primary" onClick={addMeeting}>
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
							meeting?.subMeetings?.length > 1
								? addSubDescriptionCards(meeting, i)
								: addDescriptionCard(meeting, i),
						)}
					</div>
				</div>
			</div>
		</>
	);
}
