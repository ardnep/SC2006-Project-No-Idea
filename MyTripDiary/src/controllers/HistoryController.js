import { getAllExecutedTrips } from "./SavedTripsController";

/**
 * Get all the executed trips
 * @returns {Array} all executed trips for this user 
 */
export function getAllExecutedTripsList() { 
    const executedTripsMap = getAllExecutedTrips();
    return [...executedTripsMap.values()].flat();
}

function getDate(timestamp) {
    let date = new Date(1970, 0, 1);
    date.setSeconds(timestamp);
    return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
}

/**
 * Get sorted list of executed trips
 * @returns {Array} all executed trips sorted
 */
export function getExecutedTripsGroupedByDate() { 
    let executedTrips = getAllExecutedTripsList();
    const groupedTrips = executedTrips.reduce((acc, curr) => {
        const date = getDate(curr.timeStamp.seconds);
        if (!acc[date]) {
          acc[date] = [];
        }
        acc[date].push(curr);
        return acc;
    }, {});
    return groupedTrips;
}

/**
 * Get filtered list of executed trips based on filters
 * @param {Array} filters - list of the filters to apply
 * @returns {Array} the executed trips that are returned after applying the filter 
 */
function getFilteredList(filters) { }
