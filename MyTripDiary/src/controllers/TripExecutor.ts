/**
 * @fileOverview Handles the logic for executing saved trips
 * @module controllers/TripExecutor
 */

import { ExecutedTrip } from "../models/ExecutedTrip";
import { Trip } from "../models/Trip";
import { TripPrice } from "../models/TripPrice";
import { addExecutedTrip } from "./SavedTripsController";

/**
 * Executes a trip and adds it to the list of executed trips.
 * @param {Trip} tripToExecute - The trip to be executed.
 * @param {Date} timeStamp - The timestamp of the trip execution.
 * @param {string} modeOfTransport - The mode of transport used for the trip.
 * @param {number} tripPrice - The price of the trip.
 * @param {number} duration - The duration of the trip in minutes.
 * @param {number} distance - The distance of the trip in kilometers.
 * @returns {void}
 */
export function executeTrip(
  tripToExecute: Trip,
  timeStamp: Date,
  modeOfTransport: string,
  tripPrice: number,
  duration: number,
  distance: number
): void {
  const firebaseTimeStamp = {
    nanoseconds: timeStamp.getTime() * 10e6,
    seconds: Math.round(timeStamp.getTime() / 1000),
  };
  const executedTrip = new ExecutedTrip(
    tripToExecute.ID,
    tripToExecute.executedInstances.length,
    firebaseTimeStamp,
    modeOfTransport,
    new TripPrice(tripPrice, -1),
    duration,
    distance
  );
  addExecutedTrip(executedTrip);
}
