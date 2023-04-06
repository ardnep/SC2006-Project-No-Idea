import { getAllExecutedTrips } from "./SavedTripsController";

/**
 * Get sorted list of executed trips
 * @returns {Array} all executed trips sorted
 */
export function getExecutedTripsSortedByDate() { 
    let executedTrips = getAllExecutedTrips();
    executedTrips.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds);
    return executedTrips;
}

/**
 * Get filtered list of executed trips based on filters
 * @param {Array} filters - list of the filters to apply
 * @returns {Array} the executed trips that are returned after applying the filter 
 */
function getFilteredList(filters) { }
