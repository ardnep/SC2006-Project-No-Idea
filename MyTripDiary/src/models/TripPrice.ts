/** 
* A constructor for the trip pricing model
* @param {number} estimatedPrice - Estimated Trip Price, as determined by MyTripDiary
* @param {number} userInputPrice - Price given by user
*/

export class TripPrice {
    estimatedPrice: number;
    userInputPrice: number;
    constructor(estimatedPrice:number, userInputPrice:number) {
        this.estimatedPrice = estimatedPrice;
        this.userInputPrice = userInputPrice;
    }
};

