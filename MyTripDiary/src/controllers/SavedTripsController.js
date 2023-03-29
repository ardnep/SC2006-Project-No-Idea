import { ExecutedTrip } from '../models/ExecutedTrip';
import { Trip } from '../models/Trip';
import { addData, deleteData, getDataWithinSubCollection, updateData, updateDataWithinSubCollection } from './DataController'

let savedTrips = [];
const executedTripsMap = new Map();

/**
 * Get all the saved trips for this user
 * @returns {Array} array of all saved trips for this user
 */
export function getAllSavedTrips() {
    return savedTrips;
}

export function getAllExecutedTrips() {
    return executedTripsMap;
}

export function parseSavedTripsSnapshot(savedTripsSnapshot) {
    savedTrips = [];
    savedTripsSnapshot.forEach((doc) => {
        getDataWithinSubCollection("SavedTrips", doc.id, "ExecutedInstances")
            .then((executedTripsSnapshot) => {
                let executedTrips = parseExecutedTripsSnapshot(executedTripsSnapshot);
                let trip = convertToTripClass(doc.data(), executedTrips);
                savedTrips.push(trip);
                executedTripsMap.set(trip.ID, executedTrips);
            }
            );
    });
}

export function parseExecutedTripsSnapshot(executedTripsSnapshot) {
    const executedTrips = []
    executedTripsSnapshot.forEach((doc) => {
        let executedTrip = convertToExecutedTripClass(doc.data());
        executedTrips.push(executedTrip);
    });

    return executedTrips;
}

function convertToExecutedTripClass(object) {
    // modeOfTransport = Object.keys(Transport).find(key => Transport[key] === object.modeOfTransport);
    return new ExecutedTrip(object.timeStamp, object.modeOfTransport, object.tripPrice, object.duration);
}

function convertToTripClass(object, executedTrips) {
    return new Trip(object.ID, object.name, object.srcName, object.srcLat, object.srcLong, object.destName, object.destLat, object.destLong, executedTrips);
}

/**
 * Star a trip
 * @param {import('../models/Trip').Trip} tripToStar 
 * @returns {bool} true if successful else false
 */
function starTrip(tripToStar) { }

/**
 * Get a trip entity class from its ID
 * @param {string} tripToGet 
 * @returns {import('../models/Trip').Trip} trip 
 */
function getSavedTrip(tripToGet) { }

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
    const index = savedTrips.indexOf(tripToDelete);
    if (index > -1) {
        savedTrips.splice(index, 1);
    }
    deleteData("SavedTrips", tripToDelete.ID);
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