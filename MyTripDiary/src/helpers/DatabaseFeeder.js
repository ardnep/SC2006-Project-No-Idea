import { addData, updateData } from "../controllers/DataController";
import { getCurrentUserId } from "../controllers/FirebaseController";

import { Trip } from '../models/Trip';
import { v4 as uuidv4 } from 'uuid';
import { ExecutedTrip } from "../models/ExecutedTrip";
import Transport from "../enums/Transport";
import { getAllSavedTrips } from "../controllers/SavedTripsController";
import { getDataByDocument } from "../controllers/DataController";
import { updateDataMore } from "../controllers/DataController";


function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

function randomModeOfTransport() {
    return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
}

function randomPrice() { return Math.random() * (50 - 2) + 2; }

function randomDuration() { return Math.random() * (120 - 20) + 20; }

export function populateDB() {
    const locations = [
        { name: "Merlion Park", lat: 1.2868, long: 103.8545 },
        { name: "Gardens by the Bay", lat: 1.2814, long: 103.8633 },
        { name: "Sentosa Island", lat: 1.2494, long: 103.8303 },
        { name: "Marina Bay Sands", lat: 1.2836, long: 103.8605 },
        { name: "Singapore Zoo", lat: 1.4043, long: 103.793 },
        { name: "Universal Studios Singapore", lat: 1.2548, long: 103.8239 },
        { name: "Chinatown", lat: 1.2839, long: 103.8438 },
        { name: "Orchard Road", lat: 1.3038, long: 103.834 },
        { name: "Suntec City", lat: 1.294, long: 103.8578 },
        { name: "Haw Par Villa", lat: 1.2822, long: 103.7819 }
    ];

    // Generate 10 trips
    const trips = [];
    for (let i = 0; i < 10; i++) {
        const src = locations[Math.floor(Math.random() * locations.length)];
        const dest = locations[Math.floor(Math.random() * locations.length)];

        const tripID = getCurrentUserId() + "_" + uuidv4();
        const trip = new Trip(tripID, "Trip " + (i + 1), src.name, src.lat, src.long, dest.name, dest.lat, dest.long);
        trips.push(trip);
    }

    const executedTrips = [];
    trips.forEach((trip) => {
        addData('SavedTrips', trip.ID, Object.fromEntries(Object.entries(trip)));
        const executedTrip = new ExecutedTrip(randomDate(new Date(2021, 0, 1), new Date()), randomModeOfTransport(), randomPrice(), randomDuration());
        updateDataMore("SavedTrips", trip.ID, "ExecutedInstances", '0', Object.fromEntries(Object.entries(executedTrip)));
        executedTrips.push(executedTrip);
    });

    let counter = 0
    executedTrips.forEach((executedTrip) => {
        addData('ExecutedTrips', trips[counter].ID + `_${counter}`, Object.fromEntries(Object.entries(executedTrip)));
    })

    // counter = 0;
    // // trips.forEach((trip) => {
    // //     updateData('SavedTrips', trip.ID, { executedInstances: Object.fromEntries(Object.entries(executedTrips[counter])) });
    // //     counter++;
    // // })
    // getAllSavedTrips()
    //     .then((savedTripsSnapshot) => {
    //         savedTripsSnapshot.forEach((doc) => {
    //             updateData("SavedTrips", doc.id, {
    //                 executedInstances: getDataByDocument("ExecutedTrips", doc.id + "_0")
    //                     .then((d) => {
    //                         d.data();
    //                     })
    //             })
    //             counter++;
    //         })
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
}




