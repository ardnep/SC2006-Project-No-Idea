/** 
* A constructor for the trip pricing model
* @param {number} estimatedPrice - Estimated Trip Price, as determined by the app
* @param {number} userInputPrice - Price given by user
*/

export class TripPrice {
    constructor(estimatedPrice, userInputPrice) {
        this.tripPrice = estimatedPrice;
        this.userInputPrice = userInputPrice;
    }
};

