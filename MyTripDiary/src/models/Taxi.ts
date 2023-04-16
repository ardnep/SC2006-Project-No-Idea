/**
 * Represents a class for Taxi transportation that extends the Transport class.
 * @module models/Taxi
 */
import { Transport } from "./Transport";
import axios from "axios";

export class Taxi extends Transport {
    /**
     * Creates an instance of the Taxi class.
     * @param name - The name of the Taxi transportation.
     * @param type - The type of the Taxi transportation.
     * @param displayIcon - The icon used to display the Taxi transportation.
     */
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }

    /**
     * Gets the price of the Taxi transportation based on the Google Maps response using the FareFinder API.
     * @param gMapsResponse - The Google Maps response object.
     * @returns A Promise that resolves to the price of the Taxi transportation as a number.
     */
    getPrice(gMapsResponse: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let apiURL = `https://www.taxifarefinder.com/calculatefare.php?city=Singapore&distance=${gMapsResponse.distance * 1000}&duration=${gMapsResponse.duration * 60}`;
            console.log(apiURL);
            axios.get(apiURL).then((result) => {
                resolve(result.data.data.medium.fareValue);
            }).catch((err) => {
                console.log(err);
                resolve(this.rejectionValue);
            });
        });
    };
};
