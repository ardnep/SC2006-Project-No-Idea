import { ExecutedTrip } from '../models/ExecutedTrip';
import { TripPrice } from '../models/TripPrice';
import { addExecutedTrip } from './SavedTripsController';

/**
 * Executed a trip
 * @param {import('../models/Trip').Trip} tripToExecute 
 * @returns {bool} true if successful else false
 */
export function executeTrip(tripToExecute, timeStamp, modeOfTransport, tripPrice, duration, distance) {
    const executedTrip = new ExecutedTrip(tripToExecute.ID, tripToExecute.executedInstances.length.toString(), timeStamp, modeOfTransport, new TripPrice(tripPrice, -1), duration, distance);
    addExecutedTrip(executedTrip);
}