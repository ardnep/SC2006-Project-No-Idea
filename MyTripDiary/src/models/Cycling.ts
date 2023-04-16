/**
 * Represents a class for Cycling transportation that extends the Transport class.
 * @module models/Cycling
 */
import { Transport } from "./Transport";

export class Cycling extends Transport {
    /**
     * Creates an instance of the Cycling class.
     * @param name - The name of the Cycling transportation.
     * @param type - The type of the Cycling transportation.
     * @param displayIcon - The icon used to display the Cycling transportation.
     */
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }

    /**
     * Gets the price of the Cycling transportation based on the Google Maps response.
     * @param gMapsResponse - The Google Maps response object.
     * @returns A Promise that resolves to the price of the Cycling transportation as a number.
     */
    getPrice(gMapsResponse: object): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(0);
        });
    }
};