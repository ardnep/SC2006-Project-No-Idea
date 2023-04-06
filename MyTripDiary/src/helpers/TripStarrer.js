import { getDataByCollection, updateData } from "../controllers/DataController";


export function starTrips() {
    getDataByCollection("SavedTrips").then((savedTripSnapshot) => {
        savedTripSnapshot.forEach((savedTrip) => {
            updateData("SavedTrips", savedTrip.id, { pinned: false });
        });
    })
}