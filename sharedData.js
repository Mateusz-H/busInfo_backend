import {getNearestDate} from "./utils/dataUtils.js";

export const store = {
    stops: {},
    setStops:function (stops){
        let dates = getNearestDate(Object.keys(stops));
        if(dates.length>0)
            this.stops=stops[dates[0]]?.stops;
        else
            console.log("Cannot find any stop information");
        //todo add logger
    }
};