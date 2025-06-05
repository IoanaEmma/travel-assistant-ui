export function getNumberOfDays(checkInDate: string, checkOutDate: string): number {
    const inDate = new Date(checkInDate);
    const outDate = new Date(checkOutDate);
    // Calculate difference in milliseconds and convert to days
    const diffTime = outDate.getTime() - inDate.getTime();
    return Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
}
