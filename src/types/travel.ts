export interface TravelApiResponse {
    response: FlightsResponse | string | any;
    tab: string;
}

export interface FlightsResponse {
    flights: Flight[];
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