/** 
* A constructor for the user model
* @param {Trip[]} allSavedTrips - List of all trips created and saved by the user
* @param {ExecutedTrip[]} allExecutedTrips - List of all executions of trips
*/

export class User {
    constructor(allSavedTrips, allExecutedTrips) {
        this.allSavedTrips = allSavedTrips;
        this.allExecutedTrips = allExecutedTrips;
    }
};

