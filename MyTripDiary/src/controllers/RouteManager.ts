/**
 * @fileoverview Creates instances of different transportation modes. (TransportFactory)
 * @module controllers/RouteManager
 */

import { Transport } from "../models/Transport";
import { Car } from "../models/Car";
import { Taxi } from "../models/Taxi";
import { PublicTransport } from "../models/PublicTransport";
import { Cycling } from "../models/Cycling";
import { Walking } from "../models/Walking";

/** Instance of a car. */
const car: Car = new Car("Car", "DRIVING", "car");

/** Instance of a taxi. */
const taxi: Taxi = new Taxi("Taxi", "DRIVING", "taxi");

/** Instance of public transport. */
const publicTransport: PublicTransport = new PublicTransport("Transit", "TRANSIT", "bus-alt");

/** Instance of cycling. */
const cycling: Cycling = new Cycling("Cycling", "BICYCLING", "bicycle");

/** Instance of walking. */
const walking: Walking = new Walking("Walking", "WALKING", "walking");

/**
 * Retrieves all available transportation modes.
 * @returns {Transport[]} An array of all available transportation modes.
 */
export function getAllTransports(): Transport[] {
  return [car, taxi, publicTransport, cycling, walking];
}

/**
 * Retrieves the default transportation mode.
 * @returns {Transport} The default transportation mode.
 */
export function getDefaultTransport(): Transport {
  return car;
}
