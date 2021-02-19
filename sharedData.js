import { getNearestDate } from "./utils/dataUtils.js";

export const store = {
  stops: {},
  stopsViewModel: {},
  setStops: function (stops) {
    let dates = getNearestDate(Object.keys(stops));
    if (dates.length > 0) {
      this.stops = stops[dates[0]]?.stops;
      this.stops.forEach((x) => {
          this.stopsViewModel[x.stopDesc]? this.stopsViewModel[x.stopDesc].push(x.stopId):this.stopsViewModel[x.stopDesc]=[x.stopId]
      });
    } else console.log("Cannot find any stop information");
    //todo add logger
  },
};
