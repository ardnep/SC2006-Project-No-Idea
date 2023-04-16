/**
 * Represents a class for Trip.
 * @module models/Trip
 */
import { ExecutedTrip } from "./ExecutedTrip";

export class Trip {
  /**
   * Whether the trip is marked as deleted.
   */
  deleted: boolean;
  /**
   * Whether the trip is pinned.
   */
  pinned: boolean;
  /**
   * The ID of the trip.
   */
  ID: string;
  /**
   * The name of the trip.
   */
  name: string;
  /**
   * The source name of the trip.
   */
  srcName: string;
  /**
   * The source latitude of the trip.
   */
  srcLat: number;
  /**
   * The source longitude of the trip.
   */
  srcLong: number;
  /**
   * The destination name of the trip.
   */
  destName: string;
  /**
   * The destination latitude of the trip.
   */
  destLat: number;
  /**
   * The destination longitude of the trip.
   */
  destLong: number;
  /**
   * The list of executed instances of the trip.
   */
  executedInstances: ExecutedTrip[];
  /**
   * Creates a new instance of the Trip class.
   * @constructor
   * @param {boolean} deleted - Whether the trip is marked as deleted.
   * @param {boolean} pinned - Whether the trip is pinned.
   * @param {string} ID - The ID of the trip.
   * @param {string} name - The name of the trip.
   * @param {string} srcName - The source name of the trip.
   * @param {number} srcLat - The source latitude of the trip.
   * @param {number} srcLong - The source longitude of the trip.
   * @param {string} destName - The destination name of the trip.
   * @param {number} destLat - The destination latitude of the trip.
   * @param {number} destLong - The destination longitude of the trip.
   * @param {ExecutedTrip[]} executedInstances - The list of executed instances of the trip.
   */
  constructor(
    deleted: boolean,
    pinned: boolean,
    ID: string,
    name: string,
    srcName: string,
    srcLat: number,
    srcLong: number,
    destName: string,
    destLat: number,
    destLong: number,
    executedInstances: ExecutedTrip[]
  ) {
    this.deleted = deleted;
    this.pinned = pinned;
    this.ID = ID;
    this.name = name;
    this.srcName = srcName;
    this.srcLat = srcLat;
    this.srcLong = srcLong;
    this.destName = destName;
    this.destLat = destLat;
    this.destLong = destLong;
    this.executedInstances = executedInstances;
  }
};
