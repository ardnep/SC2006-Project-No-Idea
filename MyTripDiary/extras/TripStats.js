/** 
* A constructor for the statistics model
* @param {number} totalSpent - Total amount spent by the user on transport 
* @param {number} totalFuelCost - Total amount of fuel used by the user
* @param {number} totalDistanceTravelled - Total distance travelled by the user
* @param {number} totalTimeSpent - Total time spent travelling by the user
*/

export class TripStats {
    constructor(totalSpent, totalFuelCost, totalDistanceTravelled, totalTimeSpent) {
        this.totalSpent = totalSpent;
        this.totalFuelCost = totalFuelCost;
        this.totalDistanceTravelled = totalDistanceTravelled;
        this.totalTimeSpent = totalTimeSpent;
    }
};

