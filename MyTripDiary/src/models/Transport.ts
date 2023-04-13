/** 
* A constructor for the transport model
* @param {string} name - Name of the transport, as shown to the user
* @param {string} type - 'private' or 'public'
* @param {string} displayIcon - Display Icon asset name
*/

export abstract class Transport {
    name: string;
    type: string;
    displayIcon: string;
    readonly rejectionValue: number = -1;
    constructor(name: string, type: string, displayIcon: string) {
        this.name = name;
        this.type = type;
        this.displayIcon = displayIcon;
    }
    abstract getPrice(gMapsResponse: object): Promise<number>;
};
