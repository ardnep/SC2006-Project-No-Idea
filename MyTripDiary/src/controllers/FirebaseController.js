import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBEObzGMQ5oBnM7QTDPMx5S53YZVWkT2CI",
    authDomain: "mytripdiary-186a4.firebaseapp.com",
    databaseURL: "https://mytripdiary-186a4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mytripdiary-186a4",
    storageBucket: "mytripdiary-186a4.appspot.com",
    messagingSenderId: "1034425680288",
    appId: "1:1034425680288:web:ad71dd6aa25aaaecfaa4c5",
    measurementId: "G-QT7Z8H7N8K"
};

/**
 * Initialize the firebase app with the necessary configs
 */
export function initializeFirebaseApp() {
    if (firebase.apps.length === 0) {
        app = firebase.initializeApp(firebaseConfig);
    } else {
        app = firebase.app();
    }
}

export function getCurrentUserId() {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
        return currentUser.uid;
    } else {
        return null;
    }
}

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
