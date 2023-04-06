import { ExecutedTrip } from '../models/ExecutedTrip';
import { addExecutedTrip } from './SavedTripsController';

/**
 * Executed a trip
 * @param {import('../models/Trip').Trip} tripToExecute 
 * @returns {bool} true if successful else false
 */
export function executeTrip(tripToExecute, timeStamp, modeOfTransport, tripPrice, duration) {
    const executedTrip = new ExecutedTrip(tripToExecute.ID, tripToExecute.executedInstances.length, timeStamp, modeOfTransport, tripPrice, duration);
    addExecutedTrip(executedTrip);
}