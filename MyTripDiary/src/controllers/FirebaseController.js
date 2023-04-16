/**
 * @fileOverview FirebaseController module that provides utility functions for Firebase authentication and Firestore database operations.
 * @module controllers/FirebaseController
 */

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { v4 as uuidv4 } from "uuid";

/**
 * The Firebase app instance.
 * @type {firebase.app.App}
 */
export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyBEObzGMQ5oBnM7QTDPMx5S53YZVWkT2CI",
  authDomain: "mytripdiary-186a4.firebaseapp.com",
  databaseURL:
    "https://mytripdiary-186a4-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "mytripdiary-186a4",
  storageBucket: "mytripdiary-186a4.appspot.com",
  messagingSenderId: "1034425680288",
  appId: "1:1034425680288:web:ad71dd6aa25aaaecfaa4c5",
  measurementId: "G-QT7Z8H7N8K",
});

/**
 * The Firebase authentication instance.
 * @type {firebase.auth.Auth}
 */
export const firebaseAuth = firebaseApp.auth();

/**
 * Retrieves the current user's ID.
 * @returns {string|null} The current user's ID if signed in, null if not signed in.
 */
export function getCurrentUserId() {
  const currentUser = firebaseAuth.currentUser;
  if (currentUser) {
    return currentUser.uid;
  } else {
    return null;
  }
}

/**
 * Generates a unique trip ID for the current user.
 * @returns {string} The generated trip ID.
 */
export function generateTripID() {
  return getCurrentUserId() + "_" + uuidv4();
}

/**
 * Updates the current user's display name.
 * @param {string} newDisplayName - The new display name to update.
 * @returns {Promise<void>} A Promise that resolves when the display name is updated.
 */
export function updateUserDisplayName(newDisplayName) {
  const currentUser = firebaseAuth.currentUser;
  return currentUser.updateProfile({ displayName: newDisplayName });
}

/**
 * Retrieves the current user's display name.
 * @returns {string} The current user's display name.
 */
export function getUserDisplayName() {
  return firebaseAuth.currentUser.displayName;
}

/**
 * Retrieves the current user's email.
 * @returns {string} The current user's email.
 */
export function getUserEmail() {
  return firebaseAuth.currentUser.email;
}

/**
 * Updates the current user's email.
 * @param {string} newEmail - The new email to update.
 * @returns {Promise<void>} A Promise that resolves when the email is updated.
 */
export function updateUserEmail(newEmail) {
  return firebaseAuth.currentUser.updateEmail(newEmail);
}

/**
 * Retrieves the current user's phone number.
 * @returns {string|null} The current user's phone number if available, null if not available.
 */
export function getUserPhoneNumber() {
  return firebaseAuth.currentUser.phoneNumber;
}

/**
 * Signs out the current user.
 * @returns {Promise<void>} A Promise that resolves when the user is signed out.
 */
export function userSignOut() {
  return firebaseAuth.signOut();
}
