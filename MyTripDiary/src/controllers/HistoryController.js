import { getAllExecutedTrips } from "./SavedTripsController";

/**
 * Get all the executed trips
 * @returns {Array} all executed trips for this user 
 */
export function getAllExecutedTripsList() { 
    const executedTripsMap = getAllExecutedTrips();
    return [...executedTripsMap.values()].flat();
}

/**
 * Get sorted list of executed trips
 * @returns {Array} all executed trips sorted
 */
export function getExecutedTripsSortedByDate() { 
    let executedTrips = getAllExecutedTripsList();
    executedTrips.sort((a, b) => a.timeStamp.seconds - b.timeStamp.seconds);
    return executedTrips;
}

/**
 * Get filtered list of executed trips based on filters
 * @param {Array} filters - list of the filters to apply
 * @returns {Array} the executed trips that are returned after applying the filter 
 */
function getFilteredList(filters) { }
