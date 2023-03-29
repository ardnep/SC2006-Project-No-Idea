/** 
* A constructor for the trip model
* @param {string} name - Trip Name, as given by the user
* @param {string} srcName - Name of src point
* @param {{x: number, y: number}} srcCoor - x,y coordinate for the src point
* @param {string} destName - Name of destination point
* @param {{x: number, y: number}} destCoor - x,y coordinate for the destination point 
*/

export class Trip {
    constructor(ID, name, srcName, srcLat, srcLong, destName, destLat, destLong, executedInstances) {
        this.ID = ID;
        this.name = name;
        this.srcName = srcName;
        this.srcLat = srcLat;
        this.srcLong = srcLong;
        this.destName = destName;
        this.destLat = destLat;
        this.destLong = destLong;
        this.executedInstances = executedInstances;
    }
};

