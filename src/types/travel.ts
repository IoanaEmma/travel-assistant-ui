export interface TravelApiResponse {
    response: FlightsResponse | HotelsResponse | string | any;
    tab: string;
}

export interface FlightsResponse {
    flights: Flight[];
}

export interface HotelsResponse {
    hotels: Hotel[];
}
export interface Flight {
    origin: string;
    destination: string;
    totalPrice: string;
    bookingUrl: string;
    departureFlight: FlightDetails;
    returnFlight: FlightDetails;
}

export interface FlightDetails {
    segments: FlightSegment[];
    totalStops: number;
}

export interface FlightSegment {
    airline: string;
    flightNumber: string;
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    duration: string;
}

export interface Hotel {
    name: string;
    key: string;
    accommodationType: string;
    rating: number;
    reviews: number;
    image: string;
    price: {
        min: number;
        max: number;
    },
    checkInDate: string;
    checkOutDate: string;
    city: string;
}

export type Rate = {
    name: string;
    ratePerNight: number;
    tax: number;
}
export interface HotelDetails {
    rates: Rate[];
    currency: string;
}