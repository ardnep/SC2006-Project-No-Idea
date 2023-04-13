import { ExecutedTrip } from '../models/ExecutedTrip';
import { Trip } from '../models/Trip';
import { TripPrice } from '../models/TripPrice';
import { firebaseAuth, getCurrentUserId } from './FirebaseController';
import { addData, getDataByCollection, addDataWithinSubCollection, getDataWithinSubCollection, updateData, updateDataWithinSubCollection } from './DataController'

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

export async function fetchAllTrips() {
    savedTrips = [];
    savedTripsSnapshot = await getDataByCollection("SavedTrips");
    for (const doc of savedTripsSnapshot.docs) {
        let executedTripsSnapshot = await getDataWithinSubCollection("SavedTrips", doc.id, "ExecutedInstances");
        let executedTrips = parseExecutedTripsSnapshot(doc.id, executedTripsSnapshot);
        let trip = convertToTripClass(doc.data(), executedTrips);
        if(trip.ID.split('_')[0] === getCurrentUserId()){
            savedTrips.push(trip);
            executedTrips.forEach((executedTrip) => {
                executedTripsArray.push(executedTrip)
            });
        }
    }
}

export function parseExecutedTripsSnapshot(savedTripID, executedTripsSnapshot) {
    const executedTrips = []
    for (const doc of executedTripsSnapshot.docs) {
        let executedTrip = convertToExecutedTripClass(savedTripID, doc.id, doc.data());
        executedTrips.push(executedTrip);
    }
    return executedTrips;
}

function convertToExecutedTripClass(savedTripID, executionNumber, object) {
    return new ExecutedTrip(savedTripID, executionNumber, object.timeStamp, object.modeOfTransport, new TripPrice(object.estimatedPrice, object.userInputPrice), object.duration, object.distance);
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

export function editExecutedTripPrice(executedTrip, newPrice) {
    const tripFound = executedTripsArray.find((trip) => { return executedTrip.tripID === trip.tripID && executedTrip.executionNumber === trip.executionNumber });
    tripFound.tripPrice.userInputPrice = newPrice;
    updateDataWithinSubCollection("SavedTrips", executedTrip.tripID, "ExecutedInstances", executedTrip.executionNumber.toString(), { userInputPrice: newPrice });
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

export function addExecutedTrip(executedTripToAdd) {
    let tripInDB = { ...executedTripToAdd };
    delete tripInDB.tripID;
    delete tripInDB.executionNumber;
    delete tripInDB.tripPrice;
    addDataWithinSubCollection("SavedTrips", executedTripToAdd.tripID, "ExecutedInstances", executedTripToAdd.executionNumber, Object.fromEntries(Object.entries(Object.assign(tripInDB, executedTripToAdd.tripPrice))));

    executedTripToAdd.timeStamp = { nanoseconds: executedTripToAdd.timeStamp.getTime() * 10e6, seconds: Math.round(executedTripToAdd.timeStamp.getTime() / 1000) };

    console.log("pushed");
    executedTripsArray.push(executedTripToAdd);

    const trip = getSavedTripByID(executedTripToAdd.tripID);
    trip.executedInstances.push(executedTripToAdd);
}