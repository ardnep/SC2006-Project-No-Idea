/**
 * @fileOverview This module provides functions for managing trips and executed trips in a travel application.
 * @module controllers/SavedTripsController
 */

import { ExecutedTrip } from "../models/ExecutedTrip";
import { Trip } from "../models/Trip";
import { TripPrice } from "../models/TripPrice";
import { getCurrentUserId } from "./FirebaseController";
import {
  addData,
  getDataByCollection,
  addDataWithinSubCollection,
  getDataWithinSubCollection,
  updateData,
  updateDataWithinSubCollection,
} from "./DataController";

let savedTrips = [];
let executedTripsArray = [];

/**
 * Retrieves all active saved trips.
 *
 * @returns {Array} An array containing all active saved trips.
 */
export function getAllActiveSavedTrips() {
  const activeSavedTrips = [];
  savedTrips.forEach((savedTrip) => {
    if (!savedTrip.deleted) {
      activeSavedTrips.push(savedTrip);
    }
  });
  return activeSavedTrips;
}

/**
 * Retrieves all saved trips.
 *
 * @returns {Array} An array containing all saved trips.
 */
export function getAllSavedTrips() {
  return savedTrips;
}

/**
 * Retrieves all executed trips.
 *
 * @returns {Array} An array containing all executed trips.
 */
export function getAllExecutedTrips() {
  return executedTripsArray;
}

/**
 * Fetches all trips from the database and updates the local savedTrips and executedTripsArray arrays.
 *
 * @returns {Promise} A promise that resolves once all trips are fetched and processed.
 */
export async function fetchAllTrips() {
  savedTrips = [];
  executedTripsArray = [];
  savedTripsSnapshot = await getDataByCollection("SavedTrips");
  for (const doc of savedTripsSnapshot.docs) {
    let executedTripsSnapshot = await getDataWithinSubCollection(
      "SavedTrips",
      doc.id,
      "ExecutedInstances"
    );
    let executedTrips = parseExecutedTripsSnapshot(
      doc.id,
      executedTripsSnapshot
    );
    let trip = convertToTripClass(doc.data(), executedTrips);
    if (trip.ID.split("_")[0] === getCurrentUserId()) {
      savedTrips.push(trip);
      executedTrips.forEach((executedTrip) => {
        executedTripsArray.push(executedTrip);
      });
    }
  }
}

/**
 * Parses the executed trips snapshot and returns an array of ExecutedTrip objects.
 *
 * @param {string} savedTripID - The ID of the saved trip to which the executed trips belong.
 * @param {Object} executedTripsSnapshot - The snapshot data of executed trips from the database.
 * @returns {Array} An array containing ExecutedTrip objects.
 */
export function parseExecutedTripsSnapshot(savedTripID, executedTripsSnapshot) {
  const executedTrips = [];
  for (const doc of executedTripsSnapshot.docs) {
    let executedTrip = convertToExecutedTripClass(
      savedTripID,
      doc.id,
      doc.data()
    );
    executedTrips.push(executedTrip);
  }
  return executedTrips;
}

/**
 * Converts an object data of an executed trip to an ExecutedTrip object.
 *
 * @param {string} savedTripID - The ID of the saved trip to which the executed trip belongs.
 * @param {string} executionNumber - The execution number of the executed trip.
 * @param {Object} object - The data of the executed trip from the database.
 * @returns {ExecutedTrip} An ExecutedTrip object.
 */
function convertToExecutedTripClass(savedTripID, executionNumber, object) {
  return new ExecutedTrip(
    savedTripID,
    executionNumber,
    object.timeStamp,
    object.modeOfTransport,
    new TripPrice(object.estimatedPrice, object.userInputPrice),
    object.duration,
    object.distance
  );
}

/**
 * Converts a plain object to a Trip class instance.
 *
 * @function
 * @param {Object} object - The plain object to convert.
 * @param {Array} executedTrips - The array of executed trips associated with the trip.
 * @returns {Trip} - The Trip class instance.
 */
function convertToTripClass(object, executedTrips) {
  return new Trip(
    object.deleted,
    object.pinned,
    object.ID,
    object.name,
    object.srcName,
    object.srcLat,
    object.srcLong,
    object.destName,
    object.destLat,
    object.destLong,
    executedTrips
  );
}

/**
 * Stars or un-stars a saved trip by updating its "pinned" status.
 *
 * @function
 * @param {Trip} tripToStar - The saved trip to star or un-star.
 * @returns {void}
 */
export function starTrip(tripToStar) {
  const tripFound = savedTrips.find((trip) => {
    return trip.ID === tripToStar.ID;
  });
  tripFound.pinned = !tripFound.pinned;
  updateData("SavedTrips", tripFound.ID, { pinned: tripFound.pinned });
}

/**
 * Retrieves a saved trip by its ID.
 *
 * @function
 * @param {string} savedTripID - The ID of the saved trip.
 * @returns {Trip} - The saved trip with the specified ID.
 */
export function getSavedTripByID(savedTripID) {
  return savedTrips.find((trip) => {
    return trip.ID === savedTripID;
  });
}

/**
 * Renames a saved trip with a new name.
 *
 * @function
 * @param {Trip} tripToRename - The saved trip to rename.
 * @param {string} newName - The new name for the saved trip.
 * @returns {void}
 */
export function renameSavedTrip(tripToRename, newName) {
  const index = savedTrips.indexOf(tripToRename);
  if (index > -1) {
    savedTrips[index].name = newName;
  }
  updateData("SavedTrips", tripToRename.ID, { name: newName });
}

/**
 * Edits the price of an executed trip by updating its user input price.
 *
 * @function
 * @param {ExecutedTrip} executedTrip - The executed trip to edit.
 * @param {number} newPrice - The new user input price for the executed trip.
 * @returns {void}
 */
export function editExecutedTripPrice(executedTrip, newPrice) {
  const tripFound = executedTripsArray.find((trip) => {
    return (
      executedTrip.tripID === trip.tripID &&
      executedTrip.executionNumber === trip.executionNumber
    );
  });
  tripFound.tripPrice.userInputPrice = newPrice;
  updateDataWithinSubCollection(
    "SavedTrips",
    executedTrip.tripID,
    "ExecutedInstances",
    executedTrip.executionNumber.toString(),
    { userInputPrice: newPrice }
  );
}

/**
 * Deletes a saved trip by updating its "deleted" status.
 *
 * @function
 * @param {Trip} tripToDelete - The saved trip to delete.
 * @returns {void}
 */
export function deleteSavedTrip(tripToDelete) {
  const tripFound = savedTrips.find((trip) => {
    return trip.ID === tripToDelete.ID;
  });
  tripFound.deleted = true;
  updateData("SavedTrips", tripFound.ID, { deleted: true });
}

/**
 * Adds a new saved trip to the savedTrips array and to the database.
 *
 * @function
 * @param {Trip} tripToAdd - The saved trip to add.
 * @returns {void}
 */
export function addSavedTrip(tripToAdd) {
  savedTrips.push(tripToAdd);
  let tripInDB = { ...tripToAdd };
  delete tripInDB.executedInstances;
  addData(
    "SavedTrips",
    tripInDB.ID,
    Object.fromEntries(Object.entries(tripInDB))
  );
}

/**
 * Adds a new executed trip to the executedTripsArray and to the database.
 *
 * @function
 * @param {ExecutedTrip} executedTripToAdd - The executed trip to add.
 * @returns {void}
 */
export function addExecutedTrip(executedTripToAdd) {
  let tripInDB = { ...executedTripToAdd };
  delete tripInDB.tripID;
  delete tripInDB.executionNumber;
  delete tripInDB.tripPrice;

  addDataWithinSubCollection(
    "SavedTrips",
    executedTripToAdd.tripID,
    "ExecutedInstances",
    executedTripToAdd.executionNumber.toString(),
    Object.fromEntries(
      Object.entries(Object.assign(tripInDB, executedTripToAdd.tripPrice))
    )
  );

  console.log("pushed");
  executedTripsArray.push(executedTripToAdd);

  const trip = getSavedTripByID(executedTripToAdd.tripID);
  trip.executedInstances.push(executedTripToAdd);
}
