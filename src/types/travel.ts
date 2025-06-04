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

export interface AttractionsResponse {
    attractions: Attraction[];
}
export interface Flight {
    id?: number;
    origin: string;
    destination: string;
    totalPrice: string;
    bookingUrl: string;
    departureFlight: FlightDetails;
    returnFlight: FlightDetails;
}

export interface FlightDetails {
    id?: number;
    segments: FlightSegment[];
    totalStops: number;
}

export interface FlightSegment {
    id?: number;
    airline: string;
    flightNumber: string;
    departureAirport: string;
    departureTime: string;
    arrivalAirport: string;
    arrivalTime: string;
    duration: string;
}

export interface Hotel {
    id?: number;
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

export interface Attraction {
    id?: number;
    name: string;
    address: string;
    website: string;
    openingHours: string;
}

export interface Trip {
    id: string;
    userId: string;
    name: string;
}

type HotelWithoutPrice = Omit<Hotel, "price"> & { rates: Rate[] };
export interface TripDetails extends Trip {
    hotel: HotelWithoutPrice;
    flight: Flight;
    attractions: Attraction[];
}