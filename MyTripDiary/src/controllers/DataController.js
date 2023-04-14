import { firebaseApp } from "./FirebaseController";

const app = firebaseApp;

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

export function getDataByCollection(collection) {
  return app.firestore().collection(collection).get();
}

export function getDataByDocument(collection, doc) {
  return app.firestore().collection(collection).doc(doc).get();
}

export function getDataWithinSubCollection(collection, doc, subCollection) {
  return app
    .firestore()
    .collection(collection)
    .doc(doc)
    .collection(subCollection)
    .get();
}

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
