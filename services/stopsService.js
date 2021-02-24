import { getNearestDate } from "../utils/dataUtils.js";
import fetch from "node-fetch";

export class StopsService {
  stops = {};
  stopsWithIds = {};
  constructor() {}
  getStops() {
    fetch(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json"
    )
      .then((res) => res.json())
      .then((body) => {
        this.setStops(body);
      });
  }
  setStops(stops) {
    let dates = getNearestDate(Object.keys(stops));
    if (dates.length > 0) {
      this.stops = stops[dates[0]]?.stops;
      this.setStopsWithId();
    } else console.log("Cannot find any stop information");
    //todo add logger
  }
  setStopsWithId() {
    this.stops.forEach((x) => {
      let stopName = x.stopDesc.replace(" (N/Ż)", "").trimEnd();
      this.stopsWithIds[stopName]
        ? this.stopsWithIds[stopName].push(x.stopId)
        : (this.stopsWithIds[stopName] = [x.stopId]);
    });
  }
}
