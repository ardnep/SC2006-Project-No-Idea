import { Transport } from "./Transport";
import { callTaxiFareAPI } from "../controllers/PricingController"
export class Taxi extends Transport {
    constructor(name : string, type : string, displayIcon : string) {
        super(name,type,displayIcon);
    }
    getPrice(gMapsResponse:object): Promise<number> {
        return callTaxiFareAPI(gMapsResponse);
    };
};
