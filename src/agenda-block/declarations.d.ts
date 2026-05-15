declare module '*.css';
declare module '*.scss';
declare module '@agenda-block/assets/js/meetingUtils.js' {
    export function splitMeeting(meetings: any[], index: number): any[];
    export function updateField(meetings: any[], meeting: any, field: string, value: any, i: number, j?: number): any[];
    export function addMeeting(meetings: any[]): any[];
    export function deleteMeeting(meetings: any[], selected: any): any[];
    export function insertSubMeeting(meetings: any[], index: any, subIndex: any): any[];
}