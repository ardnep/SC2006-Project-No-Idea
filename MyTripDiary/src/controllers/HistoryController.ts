/**
 * @fileOverview Used to sort executed trips
 * @module controllers/HistoryController
 */

import { ExecutedTrip } from "../models/ExecutedTrip";
import { getAllExecutedTrips } from "./SavedTripsController";

/**
 * Retrieves all executed trips sorted by date in descending order.
 * @returns {ExecutedTrip[]} - Array of executed trips sorted by date.
 */
export function getExecutedTripsSortedByDate(): ExecutedTrip[] {
  let executedTrips = getAllExecutedTrips();
  executedTrips.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds);
  return executedTrips;
}
