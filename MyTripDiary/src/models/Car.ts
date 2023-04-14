import { Transport } from "./Transport";
import axios from "axios";

export class Car extends Transport {
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }
    getPrice(gMapsResponse: any): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(0)
            /*axios.post('https://apis.tollguru.com/toll/v2/origin-destination-waypoints',{
                from: {
                    lat: gMapsResponse.legs[0].start_location['lat'],
                    lng: gMapsResponse.legs[0].start_location['lng']
                },
                to : {
                    lat: gMapsResponse.legs[0].end_location['lat'],
                    lng: gMapsResponse.legs[0].end_location['lng'],
                },
                serviceProvider : "gmaps"
            }, { 
                headers: { 
                "content-type": "application/json",
                "x-api-key": process.env.TOLL_GURU_KEY
                } 
            }).then(response => {
                let maxTollPrice = 0;
                for(let route of response.data.routes){
                    if(route.summary.hasTolls || route.summary.hasExpressTolls){
                        if(route.costs.tag && route.costs.tag > maxTollPrice){
                            maxTollPrice = route.costs.tag
                        }
                        if(route.costs.cash && route.costs.cash > maxTollPrice){
                            maxTollPrice = route.costs.cash
                        }
                        if(route.costs.licensePlate && route.costs.licensePlate > maxTollPrice){
                            maxTollPrice = route.costs.licensePlate
                        }
                        if(route.costs.prepaidCard && route.costs.prepaidCard > maxTollPrice){
                            maxTollPrice = route.costs.prepaidCard
                        }
                    }
                }
                resolve(maxTollPrice);
            }).catch((err) => {
                console.log(err);
                resolve(this.rejectionValue);
            });*/
        });
    };
};
