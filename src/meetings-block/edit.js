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
	ButtonGroup,
	ColorPalette,
	ColorPicker,
	DuotonePicker,
	DuotoneSwatch,
	Modal,
	PanelBody,
	SegmentedControl,
} from "@wordpress/components";
import {
	InspectorControls,
	PlainText,
	useBlockProps,
} from "@wordpress/block-editor";
import { useEffect, useRef, useState } from "@wordpress/element";

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
	const {
		meetingsDividerColorLeft,
		meetingsDividerColorRight,
		meetingsBgColor,
		meetingsFontColor,
	} = attributes;
	const DEFAULT_FONT_COLOR = blockMetadata.attributes.meetingsFontColor.default;
	const DEFAULT_BG_COLOR = blockMetadata.attributes.meetingsBgColor.default;
	// meetingsBgColor "default": "#82c1f2"
	const DEFAULT_LEFT_COLOR =
		blockMetadata.attributes.meetingsDividerColorLeft.default;
	const DEFAULT_RIGHT_COLOR =
		blockMetadata.attributes.meetingsDividerColorRight.default;
	const DEFAULT_DUOTONE_COLORS = [DEFAULT_LEFT_COLOR, DEFAULT_RIGHT_COLOR];
	// const [color, setColor] = useState("#f00");
	// const colors = [
	// 	{ name: "red", color: "#f00" },
	// 	{ name: "white", color: "#fff" },
	// 	{ name: "blue", color: "#00f" },
	// ];
	const [duotone, setDuotone] = useState(DEFAULT_DUOTONE_COLORS);
	const DUOTONE_PALETTE = [
		{
			colors: DEFAULT_DUOTONE_COLORS,
			name: "Default",
			slug: "default-theme-colors",
		},
		{
			colors: ["#1a56d6", "#e07b20"], // #c2ddf7;
			name: "Blue and orange",
			slug: "blue-orange",
		},
		{
			colors: ["#1a6b3c", "#c4962a"], // #b8dfc8;
			name: "Forest and gold",
			slug: "forest-gold",
		},
		{
			colors: ["#5b2d8e", "#c0392b"], // #d4bfee;
			name: "Plum and red",
			slug: "plum-red",
		},
		{
			colors: ["#2c4a6e", "#e05c3a"], // #b8cfe0;
			name: "Slate and salmon",
			slug: "slate-salmon",
		},
		{
			colors: ["#8c00b7", "#fcff41"],
			name: "Purple and yellow",
			slug: "purple-yellow",
		},
		{
			colors: ["#6e0edc", "#b7b7b7"],
			name: "Purple and grey",
			slug: "purple-grey",
		},
		{	colors: ["#000097", "#ff4747"],
			name: "Blue and red",
			slug: "blue-red" },
		{
			colors: ["#000097", "#82c1f2"],
			name: "Blue and light blue",
			slug: "blue-light-blue",
		},
	];

	const COLOR_PALETTE = [
		{ color: "#ff4747", name: "Red", slug: "red" },
		{ color: "#fcff41", name: "Yellow", slug: "yellow" },
		{ color: "#000097", name: "Blue", slug: "blue" },
		{ color: "#8c00b7", name: "Purple", slug: "purple" },
	];

	const [activeTab, setActiveTab] = useState("presets");
	const [activeSubTab, setActiveSubTab] = useState("background");
	const [activeTabDivider, setActiveTabDivider] = useState("left");
	const descriptionsRef = useRef();
	const meetingsRef = useRef();
	const blockProps = useBlockProps({ className: "meetings-container" });

	// Initialize state from attributes or as an empty array
	let [meetings, setMeetings] = useState(attributes.meetings || []);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isModalOpenDefault, setIsModalOpenDefault] = useState(false);
	const [isModalOpenDivider, setIsModalOpenDivider] = useState(false);
	const [selectedMeeting, setSelectedMeeting] = useState(null);
	// console.log("useState ran");
	// console.log("meetings:", meetings);

	// Update block attributes whenever meetings change
	let updateMeetings = (newMeetings, callback) => {
		setMeetings(newMeetings);
		setAttributes({ meetings: newMeetings });
		if (callback) {
			callback;
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

	let addMeeting = () => {
		updateMeetings([
			...meetings,
			{
				supHeader: "",
				subMeetings: [{ header: "", title: "", description: "" }],
			},
		]);
		console.log("addMeeting", meetings);
	};

	let addSubMeeting = (meeting) => {
		const subMeetings = meeting.subMeetings;
		console.log("subMeetings:", subMeetings);
		const j = subMeetings.length;
		console.log("subMeetings length:", j);
		let newSubMeetings = [
			...subMeetings,
			{ header: "", title: "", description: "" },
		];
		console.log("newSubMeetings j defined:", subMeetings);
		meeting.subMeetings = newSubMeetings; // todo: update here?
		console.log("addSubMeeting final meeting:", meeting);
	};

	let splitExistingMeeting = (meeting, i) => {
		console.log("splitExistingMeeting", meeting);
		addSubMeeting(meeting);
		// const newSubMeeting = { header: "", title: "", description: "" };
		// updateField(i, "subMeetings", [...meeting.subMeetings, newSubMeeting]);
		updateField(i, "supHeader", meeting.subMeetings[0].header);
		console.log("meeting after title update:", meeting);
	};

	function handleDeleteClick(index) {
		setSelectedMeeting(index);
		setIsModalOpen(true);
	}

	function confirmDelete() {
		const newMeetings = meetings.filter((_, i) => i != selectedMeeting);
		updateMeetings(newMeetings);
		setIsModalOpen(false);
		setSelectedMeeting(null);
	}

	const handleClosePopup = () => {
		console.log("Handle close popup:");
		if (descriptionsRef) {
			const btnClosePopup =
				descriptionsRef.current.querySelector(".close-popup");
			console.log("closePopup:", btnClosePopup);
			descriptionsRef.current.style.display = "none";
		}
	};

	// Card modification buttons

	function addDeleteMeetingButton(i) {
		return (
			<div class="remove-button">
				<Button
					variant="primary"
					isDestructive
					onClick={(e) => {
						handleDeleteClick(i);
						e.stopPropagation();
					}}
				>
					X
				</Button>
			</div>
		);
	}

	function addSplitExistingMeetingButton(meeting, i) {
		return (
			<div class="remove-button">
				<Button
					variant="primary"
					onClick={(e) => {
						splitExistingMeeting(meeting, i);
						e.stopPropagation();
					}}
				>
					Split this meeting
				</Button>
			</div>
		);
	}

	// Display description card events

	let displayDescriptionCard = (row) => {
		// console.log("Handle btn click:");
		if (descriptionsRef) {
			// console.log("descriptionsRef:", descriptionsRef);
			descriptionsRef.current.style.display = "grid";
			descriptionsRef.current
				.querySelectorAll(".card-description")
				.forEach(
					(desc) => (desc.className = "card card-large card-description"),
				);
			descriptionsRef.current.querySelector(
				'.card-description[data-index="' + row + '"]',
			).className = "card card-large card-description card-description-select";
			// window.addEventListener("click", (event) => {
			// 	if (event.target === descriptionsRef.current) {
			// 		descriptionsRef.current.style.display = "none";
			// 	}
			// });
		}
	};

	let displaySubDescriptionCard = (row, subIndex) => {
		console.log("Handle subMeeting btn click:");
		if (descriptionsRef) {
			// console.log("descriptionsRef:", descriptionsRef);
			descriptionsRef.current.style.display = "grid";
			descriptionsRef.current
				.querySelectorAll(".card-description")
				.forEach(
					(desc) => (desc.className = "card card-large card-description"),
				);
			console.log("Before query selector:");
			descriptionsRef.current.querySelector(
				'.card-description[data-index="' +
					row +
					'"][data-subindex="' +
					subIndex +
					'"]',
			).className = "card card-large card-description card-description-select";
			console.log(
				"after query selector",
				descriptionsRef.current.querySelector(
					'.card-description[data-index="' +
						row +
						'"][data-subindex="' +
						subIndex +
						'"]',
				),
			);
			// window.addEventListener("click", (event) => {
			// 	if (event.target === descriptionsRef.current) {
			// 		descriptionsRef.current.style.display = "none";
			// 	}
			// });
		}
	};

	// Add cards for display

	function addMeetingCard(meeting, i) {
		return (
			<>
				<button
					key={i}
					class="card card-small"
					data-index={i}
					style={{ position: "relative" }}
					onClick={() => displayDescriptionCard(i)}
				>
					<div class="edit-button-container">
						{addDeleteMeetingButton(i)}
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
				class="card card-small"
				data-index={i}
				style={{ position: "relative" }}
				onClick={() => displayDescriptionCard(i)}
			>
				<div class="edit-button-container">{addDeleteMeetingButton(i)}</div>
				<div class="meeting-header">
					<PlainText
						value={meeting.supHeader}
						placeholder="Day"
						onChange={(val) => updateField(i, "supHeader", val)}
					/>
				</div>
				<div class="meeting-title container-two">
					{meeting.subMeetings.map((subMeeting, j) => (
						<div>
							<a
								class="card card-part"
								href
								onClick={(e) => {
									displaySubDescriptionCard(i, j);
									e.stopPropagation();
								}}
							>
								<div class="meeting-header">
									<PlainText
										value={subMeeting.header}
										placeholder="Subheader 1"
										onChange={(val) =>
											updateSubField(meeting, i, j, "header", val)
										}
									/>
								</div>
								<div class="meeting-title">
									<PlainText
										value={subMeeting.title}
										placeholder="Subtitle 1"
										onChange={(val) =>
											updateSubField(meeting, i, j, "title", val)
										}
									/>
								</div>
							</a>
						</div>
					))}
				</div>
			</button>
		);
	}

	function addDescriptionCard(meeting, i) {
		return (
			<div class="card card-large card-description" data-index={i}>
				<button class="close-popup" onClick={handleClosePopup}>
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
				class="card card-large card-description"
				data-index={i}
				data-subindex={j}
			>
				<button class="close-popup" onClick={handleClosePopup}>
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

	// Panels and UI

	function presetColorsPanel() {
		return (
			<div className="btn-grid" style={{ marginTop: "1em", textAlign: "center" }}>
				<Button
					className="btn-blue"
					onClickCapture={() => 
						setAttributes({ meetingsDividerColorLeft: "#1a56d6" ,
										meetingsDividerColorRight: "#e07b20",
										meetingsBgColor: "#c2ddf7" })
					}
				>
					Blue theme
				</Button>
				<Button
					className="btn-forest"
					onClickCapture={() => 
						setAttributes({ meetingsDividerColorLeft: "#1a6b3c" ,
										meetingsDividerColorRight: "#c4962a",
										meetingsBgColor: "#b8dfc8" })
					}
				>
					Forest theme
				</Button>
				<Button
					className="btn-plum"
					onClickCapture={() => 
						setAttributes({ meetingsDividerColorLeft: "#5b2d8e" ,
										meetingsDividerColorRight: "#c0392b",
										meetingsBgColor: "#d4bfee" })
					}
				>
					Plum theme
				</Button>
				<Button
					className="btn-slate"
					onClickCapture={() => 
						setAttributes({ meetingsDividerColorLeft: "#2c4a6e" ,
										meetingsDividerColorRight: "#e05c3a",
										meetingsBgColor: "#b8cfe0" })
					}
				>
					Slate theme
				</Button>
			</div>
		);
	}

	function meetingColorsPanel() {
		return (
			<PanelBody title="Meetings Colors">
				{/* <SegmentedControl
								value={activeTab}
								onChange={setActiveTab}
								options={[
									{ label: "Background", value: "background" },
									{ label: "Text", value: "text" },
								]}
							/> */}
				<ButtonGroup>
					{addActiveTab("presets", "Presets")}
					{addActiveTab("custom", "Custom")}
					{addActiveTab("defaults", "Defaults")}
				</ButtonGroup>
				{activeTab === "presets" && (
					presetColorsPanel()
				)}
				{activeTab === "custom" && (
					customColorsPanel()
				)}
				{activeTab === "defaults" && (
					restoreToDefaults()
				)}
			</PanelBody>
		);
	}

	function customColorsPanel() {
		return (
			<>
				<ButtonGroup>
					{addActiveSubTab("background", "Background")}
					{addActiveSubTab("text", "Text")}
					{addActiveSubTab("divider", "Divider")}
				</ButtonGroup>
				{activeSubTab === "background" && (
					// <ColorPalette
					// 	colors={colors}
					// 	value={color}
					// 	onChange={(color) => {
					// 		//setColor( color );
					// 		setAttributes({ meetingsBgColor: color });
					// 	}}
					// 	disableAlpha
					// />
					<ColorPicker
						color={meetingsBgColor}
						onChangeComplete={(value) =>
							setAttributes({ meetingsBgColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeSubTab === "text" && (
					<ColorPicker
						color={meetingsFontColor}
						onChangeComplete={(value) =>
							setAttributes({ meetingsFontColor: value.hex })
						}
						disableAlpha
					/>
				)}
				{activeSubTab === "divider" && (
					dividerColorsPanel()
				)}
			</>
		);
	}

	function restoreToDefaults() {
		return (
			<div style={{ marginTop: "1em", textAlign: "center" }}>
				<Button
					variant="primary"
					onClickCapture={() => setIsModalOpenDefault(true)}
				>
					Restore to defaults
				</Button>
				{isModalOpenDefault && (
					<Modal
						title="Restore Defaults"
						onRequestClose={() => setIsModalOpenDefault(false)}
					>
						<p>Are you sure you want to restore the default colors?</p>
						<Button
							variant="primary"
							onClick={() => {
								setAttributes({
									meetingsDividerColorLeft: DEFAULT_LEFT_COLOR,
									meetingsDividerColorRight: DEFAULT_RIGHT_COLOR,
									meetingsBgColor: DEFAULT_BG_COLOR,
									meetingsFontColor: DEFAULT_FONT_COLOR,
								});
								setIsModalOpenDefault(false);
							}}
						>
							Yes, restore.
						</Button>
						<Button
							variant="secondary"
							onClick={() => setIsModalOpenDefault(false)}
							style={{ marginLeft: "1em" }}
						>
							Cancel
						</Button>
					</Modal>
				)}
			</div>
		);
	}

	function dividerColorsPanel() {
		return (
			<PanelBody title="Divider Colors">
				<>
					<DuotonePicker
						duotonePalette={DUOTONE_PALETTE}
						colorPalette={COLOR_PALETTE}
						value={
							Array.isArray([meetingsDividerColorLeft, meetingsDividerColorRight])
								? [meetingsDividerColorLeft, meetingsDividerColorRight]
								: DEFAULT_DUOTONE_COLORS
						}
						onChange={(newValue) => {
							if (!Array.isArray(newValue) || newValue.length !== 2) {
								setDuotone(DEFAULT_DUOTONE_COLORS);
							} else {
								setAttributes({
									meetingsDividerColorLeft: newValue[0],
									meetingsDividerColorRight: newValue[1],
								});
							}
						}}
					/>
					<DuotoneSwatch values={[meetingsDividerColorLeft, meetingsDividerColorRight]} />
				</>
				{/* {activeTabDivider === "defaultDivider" && (
					<div style={{ marginTop: "1em", textAlign: "center" }}>
						<Button
							variant="primary"
							onClickCapture={() => setIsModalOpenDivider(true)}
						>
							Restore to defaults
						</Button>
						{isModalOpenDivider && (
							<Modal
								title="Restore Defaults"
								onRequestClose={() => setIsModalOpenDivider(false)}
							>
								<p>Are you sure you want to restore the default colors?</p>
								<Button
									variant="primary"
									onClick={() => {
										setAttributes({
											meetingsDividerColorLeft: DEFAULT_LEFT_COLOR,
											meetingsDividerColorRight: DEFAULT_RIGHT_COLOR,
										});
										setIsModalOpenDivider(false);
									}}
								>
									Yes, restore.
								</Button>
								<Button
									variant="secondary"
									onClick={() => setIsModalOpenDivider(false)}
									style={{ marginLeft: "1em" }}
								>
									Cancel
								</Button>
							</Modal>
						)}
					</div>
				)} */}
			</PanelBody>
		);
	}

	function showDeleteMeetingModal() {
		return (
			<Modal
				title="Delete Meeting"
				onRequestClose={() => setIsModalOpen(false)}
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
					onClick={() => setIsModalOpen(false)}
					style={{ marginLeft: "1em" }}
				>
					Cancel
				</Button>
			</Modal>
		);
	}

	const addActiveTab = (tabName, tabText) => {
		return (
			<Button
				variant={activeTab === tabName ? "primary" : "secondary"}
				onClick={() => setActiveTab(tabName)}
			>
				{tabText}
			</Button>
		);
	};

	const addActiveSubTab = (tabName, tabText) => {
		return (
			<Button
				variant={activeSubTab === tabName ? "primary" : "secondary"}
				onClick={() => setActiveSubTab(tabName)}
			>
				{tabText}
			</Button>
		);
	};

	return (
		<>
			<InspectorControls>
				{meetingColorsPanel()}
			</InspectorControls>
			<div {...blockProps}>
				<div
					class="meetings"
					style={{
						// "--meetings_description_bl": meetingsBgColor,
						"--base-bg": meetingsBgColor,
						"--meetings-font-color": meetingsFontColor,
						"--accent-primary": meetingsDividerColorLeft,
						"--accent-secondary": meetingsDividerColorRight,
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
						{isModalOpen && showDeleteMeetingModal()}
						{/* <div style={{ display: "grid" }}> */}
						<div class="card-button">
							<Button variant="primary" onClick={addMeeting}>
								Add Meeting
							</Button>
						</div>
						{/* </div> */}
					</div>
					<div
						id="meeting-description-container"
						class="meeting-description-container"
						ref={descriptionsRef}
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
