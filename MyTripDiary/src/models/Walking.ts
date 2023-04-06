import { Transport } from "./Transport";
import { getWalkingPrice } from "../controllers/PricingController";
export class Walking extends Transport {
    constructor(name : string, type : string, displayIcon : string) {
        super(name,type,displayIcon);
    }
    getPrice(gMapsResponse:object): Promise<number> {
        return getWalkingPrice(gMapsResponse);
    };
};
