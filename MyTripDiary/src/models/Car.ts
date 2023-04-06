import { Transport } from "./Transport";
import { callTollGuruAPI } from "../controllers/PricingController";
export class Car extends Transport {
    constructor(name : string, type : string, displayIcon : string) {
        super(name,type,displayIcon);
    }
    async getPrice(gMapsResponse:object): Promise<number> {
        return callTollGuruAPI(gMapsResponse);
    };
};
