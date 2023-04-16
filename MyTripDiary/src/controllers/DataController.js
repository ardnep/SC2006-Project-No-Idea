/**
 * @fileOverview DataController module for handling CRUD operations with Firestore data.
 * @module controllers/DataController
 */

import { firebaseApp } from "./FirebaseController";

const app = firebaseApp;

/**
 * Adds data to a Firestore collection.
 * @function
 * @param {string} collection - The name of the collection to add data to.
 * @param {string} doc - The document ID of the document to add data to.
 * @param {object} dataToAdd - The data to add to the document.
 * @returns {void}
 */
export function addData(collection, doc, dataToAdd) {
  app
    .firestore()
    .collection(collection)
    .doc(doc)
    .set(dataToAdd)
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Updates data in a Firestore collection.
 * @function
 * @param {string} collection - The name of the collection to update data in.
 * @param {string} doc - The document ID of the document to update data in.
 * @param {object} dataToUpdate - The data to update in the document.
 * @returns {void}
 */
export function updateData(collection, doc, dataToUpdate) {
  app
    .firestore()
    .collection(collection)
    .doc(doc)
    .update(dataToUpdate)
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Retrieves all data from a Firestore collection.
 * @function
 * @param {string} collection - The name of the collection to retrieve data from.
 * @returns {Promise} - A Promise that resolves to the retrieved data.
 */
export function getDataByCollection(collection) {
  return app.firestore().collection(collection).get();
}

/**
 * Retrieves data from a Firestore document.
 * @function
 * @param {string} collection - The name of the collection containing the document.
 * @param {string} doc - The document ID of the document to retrieve data from.
 * @returns {Promise} - A Promise that resolves to the retrieved data.
 */
export function getDataByDocument(collection, doc) {
  return app.firestore().collection(collection).doc(doc).get();
}

/**
 * Retrieves data from a subcollection within a Firestore document.
 * @function
 * @param {string} collection - The name of the collection containing the document.
 * @param {string} doc - The document ID of the document containing the subcollection.
 * @param {string} subCollection - The name of the subcollection to retrieve data from.
 * @returns {Promise} - A Promise that resolves to the retrieved data.
 */
export function getDataWithinSubCollection(collection, doc, subCollection) {
  return app
    .firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .get();
}

/**
 * Adds data to a subcollection within a Firestore document.
 * @function
 * @param {string} collection - The name of the collection containing the document.
 * @param {string} doc - The document ID of the document containing the subcollection.
 * @param {string} subCollection - The name of the subcollection to add data to.
 * @param {string} subDoc - The document ID of the document to add data to within the subcollection.
 * @param {object} dataToAdd - The data to add to the subdocument.
 * @returns {void}
 */
export function addDataWithinSubCollection(
  collection,
  doc,
  subCollection,
  subDoc,
  dataToAdd
) {
  app
    .firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .doc(subDoc)
    .set(dataToAdd)
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Updates data in a subcollection within a Firestore document.
 * @function
 * @param {string} collection - The name of the collection containing the document.
 * @param {string} doc - The document ID of the document containing the subcollection.
 * @param {string} subCollection - The name of the subcollection to update data in.
 * @param {string} subDoc - The document ID of the document to update data in within the subcollection.
 * @param {object} dataToUpdate - The data to update in the subdocument.
 * @returns {void}
 */
export function updateDataWithinSubCollection(
  collection,
  doc,
  subCollection,
  subDoc,
  dataToUpdate
) {
  app
    .firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .doc(subDoc)
    .update(dataToUpdate)
    .catch((error) => {
      console.log(error);
    });
}

/**
 * Deletes data from a Firestore document.
 * @function
 * @param {string} collection - The name of the collection containing the document.
 * @param {string} doc - The document ID of the document to delete.
 * @returns {void}
 */
export function deleteData(collection, doc) {
  app
    .firestore()
    .collection(collection)
    .doc(doc)
    .delete()
    .then(() => {
      console.log("Document deleted successfully");
    })
    .catch((error) => {
      console.error("Error deleting document: ", error);
    });
}
