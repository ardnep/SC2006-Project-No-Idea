
import axios from "axios";
import moment from "moment";

export function callOneMapAPI(gMapsResponse){
    return new Promise<number>(async (resolve, reject) => {
        // Promise executor function
        // You can perform asynchronous operations here
        let datetime = moment().format('YYYY-MM-DD HH:m:s').split(' ')
        let date = datetime[0]
        let time = datetime[1].replaceAll(":","%3A")
        let apiURL = `https://developers.onemap.sg/privateapi/routingsvc/route?start=${gMapsResponse.legs[0].start_location["lat"]}%2C${gMapsResponse.legs[0].start_location["lng"]}&end=${gMapsResponse.legs[0].end_location["lat"]}%2C${gMapsResponse.legs[0].end_location["lng"]}&routeType=pt&mode=TRANSIT&token=${process.env.ONE_MAP_TOKEN}&date=${date}&time=${time}&numItineraries=1`
        console.log(apiURL)
        await axios.get(apiURL).then((result) => {
            resolve(result.data.plan.itineraries[0].fare);
        });
    });

}
export function callTollGuruAPI(gMapsResponse){
    return new Promise<number>(async (resolve, reject) => {
        resolve(0)
        // Promise executor function
        // You can perform asynchronous operations here
        /*await axios.post('https://apis.tollguru.com/toll/v2/origin-destination-waypoints',{
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
        })*/
    });
}

export function callTaxiFareAPI(gMapsResponse) : Promise<number> {
    console.log("HERE");
    return new Promise<number>(async (resolve, reject) => {
        // Promise executor function
        // You can perform asynchronous operations here
        let apiURL = `https://www.taxifarefinder.com/calculatefare.php?city=Singapore&distance=${gMapsResponse.distance * 1000}&duration=${gMapsResponse.duration * 60}`
        console.log(apiURL)
        await axios.get(apiURL).then((result) => {
            resolve(result.data.data.medium.fareValue);
        });
    });
}

export function getCyclingPrice(gMapsResponse) : Promise<number> {
    return new Promise<number>((resolve, reject) => {
        resolve(0);
    });
}

export function getWalkingPrice(gMapsResponse) : Promise<number> {
    return new Promise<number>((resolve, reject) => {
        resolve(0);
    });
}