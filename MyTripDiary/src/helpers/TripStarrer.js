import { getDataByCollection, getDataWithinSubCollection, updateData, updateDataWithinSubCollection } from "../controllers/DataController";


export function starTrips() {
    getDataByCollection("SavedTrips").then((savedTripSnapshot) => {
        savedTripSnapshot.forEach((savedTrip) => {
            getDataWithinSubCollection("SavedTrips", savedTrip.id, "ExecutedInstances").then((hello) => {
                updateDataWithinSubCollection("SavedTrips", savedTrip.id, "ExecutedInstances", "0", { distance: 0 });
            }).catch((error) => console.log(error));
        });
    })
}