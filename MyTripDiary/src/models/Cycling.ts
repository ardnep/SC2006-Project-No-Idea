import { Transport } from "./Transport"
export class Cycling extends Transport {
    constructor(name: string, type: string, displayIcon: string) {
        super(name, type, displayIcon);
    }
    getPrice(gMapsResponse: object): Promise<number> {
        return new Promise<number>((resolve, reject) => {
            resolve(0);
        });
    };
};
