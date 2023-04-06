import { Transport } from "../models/Transport";
import { Car } from "../models/Car";
import { Taxi } from "../models/Taxi";
import { PublicTransport } from "../models/PublicTransport";
import { Cycling } from "../models/Cycling";
import { Walking } from "../models/Walking";

const car:Car = new Car("Car","DRIVING","car");
const taxi:Taxi = new Taxi("Taxi","DRIVING","taxi");
const publicTransport:PublicTransport = new PublicTransport("Public Transport","TRANSIT","bus-alt");
const cycling:Cycling = new Cycling("Cycling","BICYCLING","bicycle");
const walking:Walking = new Walking("Walking","WALKING","walking");

export function getAllTransports() : Array<Transport> {
    return [ car, taxi, publicTransport, cycling, walking ];
}

export function getDefaultTransport() : Transport {
    return car;
}