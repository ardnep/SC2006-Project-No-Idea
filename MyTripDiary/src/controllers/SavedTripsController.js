import { ExecutedTrip } from '../models/ExecutedTrip';
import { Trip } from '../models/Trip';
import { addData, getDataWithinSubCollection, updateData, updateDataWithinSubCollection } from './DataController'

let savedTrips = [];
const executedTripsArray = [];

/**
 * Get all the saved trips for this user
 * @returns {Array} array of all saved trips for this user
 */
export function getAllActiveSavedTrips() {
    const activeSavedTrips = []
    savedTrips.forEach((savedTrip) => {
        if (!savedTrip.deleted) {
            activeSavedTrips.push(savedTrip);
        }
    })
    return activeSavedTrips;
}

export function getAllSavedTrips() {
    return savedTrips;
}

export function getAllExecutedTrips() {
    return executedTripsArray;
}

export function parseSavedTripsSnapshot(savedTripsSnapshot) {
    savedTrips = [];
    savedTripsSnapshot.forEach((doc) => {
        getDataWithinSubCollection("SavedTrips", doc.id, "ExecutedInstances")
            .then((executedTripsSnapshot) => {
                let executedTrips = parseExecutedTripsSnapshot(doc.id, executedTripsSnapshot);
                let trip = convertToTripClass(doc.data(), executedTrips);
                savedTrips.push(trip);
                executedTrips.forEach((executedTrip) => { executedTripsArray.push(executedTrip) });
            }
            );
    });
}

export function parseExecutedTripsSnapshot(savedTripID, executedTripsSnapshot) {
    const executedTrips = []
    executedTripsSnapshot.forEach((doc) => {
        let executedTrip = convertToExecutedTripClass(savedTripID, doc.data());
        executedTrips.push(executedTrip);
    });

    return executedTrips;
}

function convertToExecutedTripClass(savedTripID, object) {
    // modeOfTransport = Object.keys(Transport).find(key => Transport[key] === object.modeOfTransport);
    return new ExecutedTrip(savedTripID, object.timeStamp, object.modeOfTransport, object.tripPrice, object.duration);
}

function convertToTripClass(object, executedTrips) {
    return new Trip(object.deleted, object.pinned, object.ID, object.name, object.srcName, object.srcLat, object.srcLong, object.destName, object.destLat, object.destLong, executedTrips);
}

/**
 * Star a trip
 * @param {import('../models/Trip').Trip} tripToStar 
 * @returns {bool} true if successful else false
 */
export function starTrip(tripToStar) {
    const tripFound = savedTrips.find((trip) => { return trip.ID === tripToStar.ID });
    tripFound.pinned = !tripFound.pinned;
    updateData("SavedTrips", tripFound.ID, { pinned: tripFound.pinned });
}

/**
 * Get a trip entity class from its ID
 * @param {string} tripToGet 
 * @returns {import('../models/Trip').Trip} trip 
 */
export function getSavedTripByID(savedTripID) {
    return savedTrips.find((trip) => { return trip.ID === savedTripID });
}

/**
 * Rename a trip
 * @param {import('../models/Trip').Trip} tripToRename 
 * @returns {bool} true if successful else false 
 */
export function renameSavedTrip(tripToRename, newName) {
    const index = savedTrips.indexOf(tripToRename);
    if (index > -1) {
        savedTrips[index].name = newName;
    }
    updateData("SavedTrips", tripToRename.ID, { name: newName })
}

export function editExecutedTripPrice(tripToEditPrice, executionNumber, newPrice) {
    // TODO: UPDATE MAP AND SAVEDTRIPS ARRAY'S EXECUTEDTRIP CLASS
    updateDataWithinSubCollection("SavedTrips", tripToEditPrice.ID, "ExecutedInstances", executionNumber.toString(), { tripPrice: newPrice });
}

/**
 * Delete a trip
 * @param {import('../models/Trip').Trip} tripToDelete 
 * @returns {bool} true if successful else false  
 */
export function deleteSavedTrip(tripToDelete) {
    const tripFound = savedTrips.find((trip) => { return trip.ID === tripToDelete.ID });
    tripFound.deleted = true;
    updateData("SavedTrips", tripFound.ID, { deleted: true });
}

/**
 * Add a trip
 * @param {import('../models/Trip').Trip} tripToAdd 
 * @returns {bool} true if successful else false   
 */
export function addSavedTrip(tripToAdd) {
    savedTrips.push(tripToAdd);
    let tripInDB = { ...tripToAdd };
    delete tripInDB.executedInstances;
    addData('SavedTrips', tripInDB.ID, Object.fromEntries(Object.entries(tripInDB)));
}