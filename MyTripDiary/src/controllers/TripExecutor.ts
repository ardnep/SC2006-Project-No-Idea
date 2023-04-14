import { ExecutedTrip } from "../models/ExecutedTrip";
import { Trip } from "../models/Trip";
import { TripPrice } from "../models/TripPrice";
import { addExecutedTrip } from "./SavedTripsController";

/**
 * Executed a trip
 * @param {import('../models/Trip').Trip} tripToExecute
 * @returns {bool} true if successful else false
 */
export function executeTrip(
  tripToExecute : Trip,
  timeStamp : Date,
  modeOfTransport : string,
  tripPrice : number,
  duration : number,
  distance : number
): void {
  var firebaseTimeStamp = {
    nanoseconds: timeStamp.getTime() * 10e6,
    seconds: Math.round(timeStamp.getTime() / 1000),
  }
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
