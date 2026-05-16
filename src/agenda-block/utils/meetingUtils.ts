import type { Meeting, SelectedCard, SubMeeting } from "@agenda-block/types";

export function addMeeting (meetings: Meeting[]): Meeting[] {
    return [
        ...meetings,
        {
            supHeader: "",
            subMeetings: [{ header: "", title: "", description: "" }],
        },
    ];
};

export function insertSubMeeting(meetings: Meeting[], index: number, subIndex: number | null = null): Meeting[] {
    if (subIndex == null) {
        return insertMeeting(meetings, index);
    }
    const meeting = meetings[index];
    const subMeetingsNew = [
        ...meeting.subMeetings.slice(0, subIndex),
        { header: "", title: "", description: "" },
        ...meeting.subMeetings.slice(subIndex),
    ];
    const meetingNew = updateSubMeetings(meeting, subMeetingsNew)

    return toMeetingsArray(meetings, meetingNew, index);
};

function insertMeeting(meetings: Meeting[], i: number) {
    return [
        ...meetings.slice(0, i),
        {
            supHeader: "",
            subMeetings: [{ header: "", title: "", description: "" }],
        },
        ...meetings.slice(i),
    ];
};

export function splitMeeting(meetings: Meeting[], i: number): Meeting[] {
    const meeting = meetings[i];
    const meetingNew = {
            ...meeting, 
            supHeader: meeting.subMeetings[0].header, 
            subMeetings: [...meeting.subMeetings, { header: "", title: "", description: "" }]
        };
    return toMeetingsArray(meetings, meetingNew, i);
};

export function deleteMeeting(meetings: Meeting[], selectedMeeting: SelectedCard): Meeting[] {
    if (selectedMeeting?.index == null) throw new Error("deleteMeeting called with no meeting selected");
    
    // Delete entire meeting card when subMeeting null
    if (selectedMeeting.subIndex === null) {
        return meetings.filter((_, i) => i !== selectedMeeting.index);
    } else {
        const meeting = meetings[selectedMeeting.index];
        let meetingNew: Meeting;
        if (meeting.subMeetings.length === 2) {
            meetingNew = collapseMeeting(meeting, selectedMeeting.subIndex);
        } else {
            const newSubMeetings = meeting.subMeetings.filter((_, j: number) => j !== selectedMeeting.subIndex);
            meetingNew = updateSubMeetings(meeting, newSubMeetings);
        }
        return toMeetingsArray(meetings, meetingNew, selectedMeeting.index);
    }
}

function collapseMeeting(meeting: Meeting, subIndex: number): Meeting {
    // Should never trigger — collapses from length 2 to 1, caller guarantees this
    if (meeting.subMeetings.length < 2) throw new Error("collapseMeeting called with fewer than 2 subMeetings");
    

    // find() returns T | undefined; ! asserts non-null since length >= 2 is guaranteed above
    const remainingSubMeeting = meeting.subMeetings.find((_, j) => j !== subIndex)!;
    return {
        ...meeting,
        supHeader: "",
        subMeetings: [{
            ...remainingSubMeeting,
            header: remainingSubMeeting.header || meeting.supHeader
        }]
    };
};

export function updateField(
    meetings: Meeting[],
    meeting: Meeting,
    field: keyof Meeting | keyof SubMeeting,
    value: string,
    index: number,
    subIndex: number | null = null) : Meeting[]
    {
    let subMeetingsNew: SubMeeting[];
    let meetingNew;
    if (subIndex == null) {
        meetingNew = updateMeeting(meeting, field as keyof Meeting, value);
    } else {
        subMeetingsNew = meeting.subMeetings.map((subMeeting, j) =>
            j === subIndex ? { ...subMeeting, [field]: value } : subMeeting,
        );
        meetingNew = updateSubMeetings(meeting, subMeetingsNew)
    }

    return toMeetingsArray(meetings, meetingNew, index);
};

function updateMeeting(meeting: Meeting, field: keyof Meeting, value: string): Meeting {
    return {...meeting, [field]: value};
};

function updateSubMeetings(meeting: Meeting, value: SubMeeting[]): Meeting {
    return {...meeting, subMeetings: value};
};

function toMeetingsArray(meetings: Meeting[], meeting: Meeting, index: number): Meeting[] {
    return meetings.map((m, i) =>
        i === index ? meeting : m
    );
}
