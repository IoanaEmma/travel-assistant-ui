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

export function generateHotelLink(
    siteName: "Booking.com" | "Agoda.com" | "Trip.com" | "Vio.com",
    hotelName: string,
    city: string,
    checkin: string,  // format: YYYY-MM-DD
    checkout: string  // format: YYYY-MM-DD
): string {
    const hotelQuery = hotelName.trim().replace(/\s+/g, "+");
    const cityQuery = city.trim().replace(/\s+/g, "+");

    switch (siteName.toLowerCase()) {
        case "booking.com":
            const [ciYear, ciMonth, ciDay] = checkin.split("-");
            const [coYear, coMonth, coDay] = checkout.split("-");
            return `https://www.booking.com/searchresults.html?ss=${cityQuery}+${hotelQuery}&checkin_year=${ciYear}&checkin_month=${parseInt(ciMonth)}&checkin_monthday=${parseInt(ciDay)}&checkout_year=${coYear}&checkout_month=${parseInt(coMonth)}&checkout_monthday=${parseInt(coDay)}`;

        case "agoda.com":
            return `https://www.agoda.com/search?city=${cityQuery}&q=${hotelQuery}&checkIn=${checkin}&checkOut=${checkout}`;

        case "trip.com":
            return `https://www.trip.com/hotels/list?city=${cityQuery}&keyword=${hotelQuery}&checkin=${checkin}&checkout=${checkout}`;

        case "vio.com":
            return `https://www.vio.com/search?placeName=${cityQuery}&query=${hotelQuery}&checkIn=${checkin}&checkOut=${checkout}`;

        default:
            return "Unsupported site name. Use 'Booking.com', 'Agoda.com', 'Trip.com', or 'Vio.com'.";
    }
}
