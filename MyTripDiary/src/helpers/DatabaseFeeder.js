import { addData } from "../controllers/DataController";
import { getCurrentUserId } from "../controllers/FirebaseController";

import { Trip } from '../models/Trip';
import { v4 as uuidv4 } from 'uuid';

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

    trips.forEach((trip) => {
        addData('SavedTrips', trip.ID, Object.fromEntries(Object.entries(trip)));
    });
}




