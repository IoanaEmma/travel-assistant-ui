export function getNumberOfDays(checkInDate: string, checkOutDate: string): number {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    // Calculate difference in milliseconds and convert to days
    const diffTime = outDate.getTime() - inDate.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}

export function formatDateTime(date: string) {
    const [datePart, timePartRaw] = date.split('T');
    let timePart = '00:00';
    if (timePartRaw) {
        const [hh, mm] = timePartRaw.split(':');
        timePart = `${hh}:${mm}`;
    }
    return {
        date: datePart,
        time: timePart
    };
}