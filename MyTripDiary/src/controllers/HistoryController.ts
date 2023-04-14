import { ExecutedTrip } from "../models/ExecutedTrip";
import { getAllExecutedTrips } from "./SavedTripsController";

/**
 * Get sorted list of executed trips
 * @returns {Array} all executed trips sorted
 */
export function getExecutedTripsSortedByDate() : ExecutedTrip[]{
  let executedTrips = getAllExecutedTrips();
  executedTrips.sort((a, b) => b.timeStamp.seconds - a.timeStamp.seconds);
  return executedTrips;
}
