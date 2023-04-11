import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import "firebase/compat/firestore";
import { v4 as uuidv4 } from 'uuid';

export const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBEObzGMQ5oBnM7QTDPMx5S53YZVWkT2CI",
    authDomain: "mytripdiary-186a4.firebaseapp.com",
    databaseURL: "https://mytripdiary-186a4-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mytripdiary-186a4",
    storageBucket: "mytripdiary-186a4.appspot.com",
    messagingSenderId: "1034425680288",
    appId: "1:1034425680288:web:ad71dd6aa25aaaecfaa4c5",
    measurementId: "G-QT7Z8H7N8K"
});

export const firebaseAuth = firebaseApp.auth();

export function getCurrentUserId() {
    const currentUser = firebaseAuth.currentUser;
    if (currentUser) {
        return currentUser.uid;
    } else {
        return null;
    }
}

export function generateTripID() {
    return getCurrentUserId() + "_" + uuidv4();
}

export function updateUserDisplayName(newDisplayName) {
    const currentUser = firebaseAuth.currentUser;
    currentUser.updateProfile({ displayName: newDisplayName });
}

export function getUserDisplayName() {
    return firebaseAuth.currentUser.displayName;
}

export function getUserEmail() {
    return firebaseAuth.currentUser.email;
}

export function updateUserEmail(newEmail) {
    firebaseAuth.currentUser.updateEmail(newEmail);
}

export function getUserPhoneNumber() {
    return firebaseAuth.currentUser.phoneNumber;
}

export function userSignOut() {
    firebaseAuth.signOut();
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

