import { getNearestDate } from "./utils/dataUtils.js";

export const store = {
  stops: {},
  stopsViewModel: {},
  setStops: function (stops) {
    let dates = getNearestDate(Object.keys(stops));
    if (dates.length > 0) {
      this.stops = stops[dates[0]]?.stops;
      this.stops.forEach((x) => {
        let stopName = x.stopDesc.replace(" (N/Ż)","").trimEnd();
          this.stopsViewModel[stopName]? this.stopsViewModel[stopName].push(x.stopId):this.stopsViewModel[stopName]=[x.stopId]
      });
    } else console.log("Cannot find any stop information");
    //todo add logger
  },
};
