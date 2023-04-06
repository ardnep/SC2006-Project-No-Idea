import { Transport } from "./Transport";
import { getCyclingPrice } from "../controllers/PricingController";
export class Cycling extends Transport {
    constructor(name : string, type : string, displayIcon : string) {
        super(name,type,displayIcon);
    }
    getPrice(gMapsResponse:object): Promise<number> {
        return getCyclingPrice(gMapsResponse);
    };
};
