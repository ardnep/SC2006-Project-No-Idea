import { Transport } from "./Transport";
import moment from "moment";
import axios from "axios";
export class PublicTransport extends Transport {
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }
    getPrice(gMapsResponse: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            let datetime = moment().format('YYYY-MM-DD HH:m:s').split(' ')
            let date = datetime[0]
            let time = datetime[1].replaceAll(":", "%3A")
            let apiURL = `https://developers.onemap.sg/privateapi/routingsvc/route?start=${gMapsResponse.legs[0].start_location["lat"]}%2C${gMapsResponse.legs[0].start_location["lng"]}&end=${gMapsResponse.legs[0].end_location["lat"]}%2C${gMapsResponse.legs[0].end_location["lng"]}&routeType=pt&mode=TRANSIT&token=${process.env.ONE_MAP_TOKEN}&date=${date}&time=${time}&numItineraries=1`
            console.log(apiURL)
            axios.get(apiURL).then((result) => {
                resolve(result.data.plan.itineraries[0].fare);
            }).catch((err) => {
                console.log(err);
                resolve(this.rejectionValue);
            });
        });
    };
};
