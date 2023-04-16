/**
 * Represents an abstract class for a Transport.
 * @module models/Transport
 * @abstract
 */
export abstract class Transport {
    /**
     * The name of the transport.
     */
    name: string;
    /**
     * The type of the transport.
     */
    type: string;
    /**
     * The display icon for the transport.
     */
    displayIcon: string;
    /**
     * The rejection value for the transport.
     * @readonly
     */
    readonly rejectionValue: number = -1;
    /**
     * Creates a new instance of the Transport class.
     * @constructor
     * @param {string} name - The name of the transport.
     * @param {string} type - The type of the transport.
     * @param {string} displayIcon - The display icon for the transport.
     */
    constructor(name: string, type: string, displayIcon: string) {
      this.name = name;
      this.type = type;
      this.displayIcon = displayIcon;
    }
    /**
     * Abstract method to get the price of the transport based on the Google Maps response.
     * @abstract
     * @param {object} gMapsResponse - The Google Maps response.
     * @returns {Promise<number>} - The price of the transport as a Promise.
     */
    abstract getPrice(gMapsResponse: object): Promise<number>;
};
  