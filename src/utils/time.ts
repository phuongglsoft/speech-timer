export function getHours(time: number): string {
    const hrs = Math.floor(time / 3600);
    if (hrs === 0) return '';
    if (hrs < 10) return `0${hrs}`;
    return `${hrs}`;
}

export function getMinutes(time: number, hidePrecedingZero?: boolean): string {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time - hrs * 3600) / 60);
    if (hidePrecedingZero) {
        return `${mins}`;
    }
    if (mins === 0) return '00';
    if (mins < 10) return `0${mins}`;
    return `${mins}`;
}

export function getSeconds(time: number, hidePrecedingZero?: boolean): string {
    const hrs = Math.floor(time / 3600);
    const mins = Math.floor((time - hrs * 3600) / 60);
    const s = time - hrs * 3600 - mins * 60;

    if (hidePrecedingZero) {
        return `${s}`;
    }
    if (s === 0) return '00';
    if (s < 10) return `0${s}`;
    return `${s}`;

}