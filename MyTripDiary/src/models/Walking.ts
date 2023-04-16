/**
 * Represents a class for Walking transportation that extends the Transport class.
 * @module models/Walking
 */
import { Transport } from "./Transport";

export class Walking extends Transport {
    /**
     * Creates an instance of the Walking class.
     * @param name - The name of the Walking transportation.
     * @param type - The type of the Walking transportation.
     * @param displayIcon - The icon used to display the Walking transportation.
     */
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }

    /**
     * Gets the price of the Walking transportation based on the Google Maps response.
     * @param gMapsResponse - The Google Maps response object.
     * @returns A Promise that resolves to the price of the Walking transportation as a number.
     */
    getPrice(gMapsResponse: object): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(0);
        });
    }
};
