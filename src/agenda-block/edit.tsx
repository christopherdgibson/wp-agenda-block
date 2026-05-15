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


import { Button } from "@wordpress/components";
import { InspectorControls, useBlockProps } from "@wordpress/block-editor";
import { useRef, useState } from "@wordpress/element";
import type { BlockEditProps } from "@wordpress/blocks";

import type { BlockAttributes, EditProps, Meeting, SelectedCard } from "@agenda-block/types";
import CardColorsPanel from "@components/ui-panels/CardColorsPanel";
import MeetingCard from "@components/cards/MeetingCard";
import ContentCard from "@components/cards/ContentCard";
import { ShowDeleteMeetingModal } from "@components/buttons/DeleteMeetingButton";
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

export default function Edit({ attributes, setAttributes }: BlockEditProps<BlockAttributes>) {
    const { gradientColorLeft, gradientColorRight, cardBgColor, cardFontColor } = attributes;

    const descriptionsRef = useRef<HTMLDivElement>(null);
    const meetingsRef = useRef<HTMLDivElement>(null);
    const blockProps = useBlockProps({ className: "meetings-container" });

    const [meetings, setMeetings] = useState<Meeting[]>(attributes.meetings ?? []);
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
    const [selectedMeeting, setSelectedMeeting] = useState<SelectedCard>({ index: null, subIndex: null });
    const [selectedCard, setSelectedCard] = useState<SelectedCard>({ index: null, subIndex: null });

    const updateMeetings = (newMeetings: Meeting[], callback?: () => void): void => {
        setMeetings(newMeetings);
        setAttributes({ meetings: newMeetings });
        callback?.();
    };

    return (
        <>
            <InspectorControls>
                <CardColorsPanel attributes={attributes} setAttributes={setAttributes} />
            </InspectorControls>
            <div {...blockProps}>
                <div
                    className="meetings"
                    style={{
                        "--base-bg": cardBgColor,
                        "--font-selected": cardFontColor,
                        "--accent-primary": gradientColorLeft,
                        "--accent-secondary": gradientColorRight,
                    } as React.CSSProperties}
                >
                    <div className="meeting-button-column" ref={meetingsRef}>
                        {meetings.map((meeting, i) => (
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
                        ))}
                        {isModalOpenDelete && (
                            <ShowDeleteMeetingModal
                                selectedMeeting={selectedMeeting}
                                onConfirm={() => {
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
                            <Button variant="primary" onClick={() => updateMeetings(addMeeting(meetings))}>
                                Add Meeting
                            </Button>
                        </div>
                    </div>
                    <div
                        id="meeting-description-container"
                        className="meeting-description-container"
                        ref={descriptionsRef}
                        style={{ display: selectedCard.index !== null ? "grid" : "none" }}
                        onClick={(e) => {
                            if (e.target === descriptionsRef.current)
                                setSelectedCard({ index: null, subIndex: null });
                        }}
                    >
                        {meetings.map((meeting, i) =>
                            meeting.subMeetings.map((subMeeting, j) => {
                                const cardHeader = meeting.supHeader
                                    ? meeting.supHeader + (subMeeting.header ? " - " + subMeeting.header : "")
                                    : subMeeting.header;
                                return (
                                    <ContentCard
                                        key={`${i}-${j}`}
                                        i={i}
                                        j={j}
                                        subMeeting={subMeeting}
                                        cardHeader={cardHeader}
                                        selectedCard={selectedCard}
                                        setSelectedCard={setSelectedCard}
                                        updateDescription={(val: string) =>
                                            updateMeetings(updateField(meetings, meeting, "description", val, i, j))
                                        }
                                    />
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}