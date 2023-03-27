import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

const app = firebase.app()

export function addData(collection, doc, dataToAdd) {
    app.firestore().collection(collection).doc(doc).set(dataToAdd).catch((error) => {
        console.log(error);
    })
}

export function updateData(collection, doc, dataToUpdate) {
    app.firestore().collection(collection).doc(doc).update(dataToUpdate).catch((error) => {
        console.log(error);
    })
}

export function getDataByCollection(collection) {
    app.firestore().collection(collection).get()
        .then((querySnapshot) => {
            // querySnapshot.forEach((doc) => {
            //     console.log(doc.id, " => ", doc.data());
            // });
            return querySnapshot;
        })
        .catch((error) => {
            console.log(error);
        })
}

export function getDataByDocument(collection, doc) {
    app.firestore().collection(collection).doc(doc).get()
        .then((doc) => {
            if (doc.exists) {
                console.log(doc.id, " => ", doc.data());
            } else {
                console.log("No such document!");
            }
        })
        .catch((error) => {
            console.error("Error getting document: ", error);
        });
}

export function deleteData(collection, doc) {
    app.firebase().collection(collection).doc(doc).delete()
        .then(() => {
            console.log("Document deleted successfully");
        })
        .catch((error) => {
            console.error("Error deleting document: ", error);
        });
}

export function getAllSavedTrips() {
    getDataByCollection("SavedTrips").forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}