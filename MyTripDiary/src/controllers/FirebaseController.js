/**
 * Verifies if the loginCredentials are correct
 * @returns {bool} true if verified else false
 */
function verifyLogin() { }

/**
 * Check if the email exists
 * @returns {bool} true if email exists else false
 */
function isExistEmail() { }

/**
 * Add a new account to the database
 * @returns {bool} true if successfully added else false
 */
function addNewAccount() { }

/**
 * Send an email to confirm registration
 * @returns {bool} true if successfully sent else false
 */
function sendRegistrationConfirmationEmail() { }

/**
 * Add a trip to the database
 * @param {import('../models/Trip').Trip} tripToAdd 
 * @returns {bool} true if successful else false
 */
function addTripToDatabase(tripToAdd) { }

/**
 * Add a trip instance (executed trip) to the database
 * @param {import('../models/ExecutedTrip').ExecutedTrip} executedTrip 
 * @returns {bool} true if successful else false
 */
function addTripInstanceToDatabase(executedTrip) { }

/**
 * Update the price of the executed trip 
 * @param {import('../models/ExecutedTrip').ExecutedTrip} tripToUpdatePrice 
 * @returns {bool} true if successful else false
 */
function updateTripPrice(tripToUpdatePrice) { }

/**
 * Update the name of the trip
 * @param {import('../models/Trip').Trip} tripToUpdateName 
 * @returns {bool} true if successful else false
 */
function updateTripName(tripToUpdateName) { }

/**
 * Remove the trip from the database
 * @param {import('../models/Trip').Trip} tripToRemove 
 * @returns {bool} true if successful else false
 */
function removeTrip(tripToRemove) { }

/**
 * Get all the saved trips from the database
 * @returns {Array} list of all the saved trips for this user
 */
function getAllSavedTrips() { }

/**
 * Get all the executed trips from the database
 * @returns {Array} list of all executed trips for this user
 */
function getAllExecutedTrips() { } 