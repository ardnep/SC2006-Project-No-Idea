/** 
* A constructor for the executed trip model
* @param {integer} timeStamp - Timestamp of trip execution in epoch seconds
* @param {Transport} modeOfTransport - Mode of transport, as chosen by the user
* @param {TripPrice} tripPrice - The price object for the executed trip
* @param {integer} duration - Duration of the trip in seconds
*/

export class ExecutedTrip {
    constructor(tripID, timeStamp, modeOfTransport, tripPrice, duration) {
        this.tripID = tripID;
        this.timeStamp = timeStamp;
        this.modeOfTransport = modeOfTransport;
        this.tripPrice = tripPrice;
        this.duration = duration;
    }
};

