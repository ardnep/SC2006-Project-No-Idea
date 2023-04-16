/**
 * Represents a class for ExecutedTrip.
 * @module models/ExecutedTrip
 */

import { TripPrice } from "./TripPrice";

export class ExecutedTrip {
  /**
   * The trip ID.
   */
  tripID: string;
  /**
   * The execution number of the trip.
   */
  executionNumber: number;
  /**
   * The timestamp of the trip.
   */
  timeStamp: {seconds: number, nanoseconds: number};
  /**
   * The mode of transport used in the trip.
   */
  modeOfTransport: string;
  /**
   * The trip price information.
   */
  tripPrice: TripPrice;
  /**
   * The duration of the trip.
   */
  duration: number;
  /**
   * The distance of the trip.
   */
  distance: number;
  /**
   * Creates a new instance of the ExecutedTrip class.
   * @constructor
   * @param {string} tripID - The trip ID.
   * @param {number} executionNumber - The execution number of the trip.
   * @param {{seconds: number, nanoseconds: number}} timeStamp - The timestamp of the trip.
   * @param {string} modeOfTransport - The mode of transport used in the trip.
   * @param {TripPrice} tripPrice - The trip price information.
   * @param {number} duration - The duration of the trip.
   * @param {number} distance - The distance of the trip.
   */
  constructor(
    tripID: string,
    executionNumber: number,
    timeStamp: {seconds: number, nanoseconds: number},
    modeOfTransport: string,
    tripPrice: TripPrice,
    duration: number,
    distance: number
  ) {
    this.tripID = tripID;
    this.executionNumber = executionNumber;
    this.timeStamp = timeStamp;
    this.modeOfTransport = modeOfTransport;
    this.tripPrice = tripPrice;
    this.duration = duration;
    this.distance = distance;
  }
};
