const [meetings, setMeetings] = useState(attributes.meetings || []);
    console.log('meetings:', meetings);

    // Update block attributes whenever meetings change
    export function updateMeetings(newMeetings) {
        setMeetings(newMeetings);
        setAttributes({ meetings: newMeetings });
    };

    // Add a new row
    export function addMeeting() {
        console.log("addMeeting");
        updateMeetings([...meetings, { label: '', desc: '' }]);
    };

    // Remove a row
    export function removeMeeting(index) {
        const newMeetings = meetings.filter((_, i) => i !== index);
        updateMeetings(newMeetings);
    };

    // Update a field
    export function updateField(index, field, value) {
        const newMeetings = meetings.map((meeting, i) =>
            i === index ? { ...meeting, [field]: value } : meeting
        );
        updateMeetings(newMeetings);
    };