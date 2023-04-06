import { Transport } from "./Transport";
import { callOneMapAPI } from "../controllers/PricingController";
export class PublicTransport extends Transport {
    constructor(name : string, type : string, displayIcon : string) {
        super(name,type,displayIcon);
    }
    getPrice(gMapsResponse:object): Promise<number> {
        return callOneMapAPI(gMapsResponse);
    };
};
