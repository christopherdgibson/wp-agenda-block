export function addMeeting (meetings) {
    return meetings, [
        ...meetings,
        {
            supHeader: "",
            subMeetings: [{ header: "", title: "", description: "" }],
        },
    ];
};

export function insertSubMeeting(meetings, i, j) {
    if (j == null) {
        return insertMeeting(meetings, i);
    }
    const meeting = meetings[i];
    const subMeetingsNew = [
        ...meeting.subMeetings.slice(0, j),
        { header: "", title: "", description: "" },
        ...meeting.subMeetings.slice(j),
    ];
    const meetingNew = updateMeeting(meeting, "subMeetings", subMeetingsNew)

    return toMeetingsArray(meetings, meetingNew, i);
};

function insertMeeting(meetings, i) {
    return [
        ...meetings.slice(0, i),
        {
            supHeader: "",
            subMeetings: [{ header: "", title: "", description: "" }],
        },
        ...meetings.slice(i),
    ];
};


export function splitMeeting(meetings, i) {
    const meeting = meetings[i];
    const meetingNew = {
            ...meeting, 
            supHeader: meeting.subMeetings[0].header, 
            subMeetings: [...meeting.subMeetings, { header: "", title: "", description: "" }]
        };
    return toMeetingsArray(meetings, meetingNew, i);
};

export function deleteMeeting(meetings, selectedMeeting) {
    // Delete entire meeting card when subMeeting null
    if (selectedMeeting.subIndex === null) {
        return meetings.filter((_, i) => i !== selectedMeeting.index);
    } else {
        const meeting = meetings[selectedMeeting.index];
        let meetingNew;
        if (meeting.subMeetings.length === 2) {
            meetingNew = collapseMeeting(meeting, selectedMeeting.subIndex);
        } else {
            const newSubMeetings = meeting.subMeetings.filter((_, j) => j !== selectedMeeting.subIndex);
            meetingNew = updateMeeting(meeting, "subMeetings", newSubMeetings);
        }
        return toMeetingsArray(meetings, meetingNew, selectedMeeting.index);
    }
}

function collapseMeeting(meeting, subIndex) {
    const remainingSubMeeting = meeting.subMeetings.find((_, j) => j !== subIndex);
    return {
        ...meeting,
        supHeader: "",
        subMeetings: [{
            ...remainingSubMeeting,
            header: remainingSubMeeting.header || meeting.supHeader
        }]
    };
};

export function updateField(meetings, meeting, field, value, index, subIndex) {
    let subMeetingsNew;
    let meetingNew;
    if (subIndex == null) {
        meetingNew = updateMeeting(meeting, field, value);
    } else {
        subMeetingsNew = meeting.subMeetings.map((subMeeting, j) =>
            j === subIndex ? { ...subMeeting, [field]: value } : subMeeting,
        );
        meetingNew = updateMeeting(meeting, "subMeetings", subMeetingsNew)
    }

    return toMeetingsArray(meetings, meetingNew, index);
};

function updateMeeting(meeting, field, value) {
    return {...meeting, [field]: value};
};

function toMeetingsArray(meetings, meeting, index) {
    return meetings.map((m, i) =>
        i === index ? meeting : m
    );
}
