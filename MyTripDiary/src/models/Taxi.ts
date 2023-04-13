import { Transport } from "./Transport";
import axios from "axios";
export class Taxi extends Transport {
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }
    getPrice(gMapsResponse: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let apiURL = `https://www.taxifarefinder.com/calculatefare.php?city=Singapore&distance=${gMapsResponse.distance * 1000}&duration=${gMapsResponse.duration * 60}`
            console.log(apiURL)
            axios.get(apiURL).then((result) => {
                resolve(result.data.data.medium.fareValue);
            }).catch((err) => {
                console.log(err);
                resolve(this.rejectionValue);
            });;
        });
    };
};
