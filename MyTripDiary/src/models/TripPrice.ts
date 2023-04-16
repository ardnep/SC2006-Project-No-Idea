/**
 * Represents a class for TripPrice.
 * @module models/TripPrice
 */
export class TripPrice {
    /**
     * The estimated price of the trip.
     */
    estimatedPrice: number;
    /**
     * The user input price for the trip.
     */
    userInputPrice: number;
    /**
     * Creates a new instance of the TripPrice class.
     * @constructor
     * @param {number} estimatedPrice - The estimated price of the trip.
     * @param {number} userInputPrice - The user input price for the trip.
     */
    constructor(estimatedPrice: number, userInputPrice: number) {
      this.estimatedPrice = estimatedPrice;
      this.userInputPrice = userInputPrice;
    }
  };
  