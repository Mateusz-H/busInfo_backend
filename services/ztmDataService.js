import fetch from "node-fetch";
import { store } from "../sharedData.js";
export class ztmDataService {
  constructor(props) {
    this.getStops();
    this.getTimetable();
  }
  getStops() {
    fetch(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/4c4025f0-01bf-41f7-a39f-d156d201b82b/download/stops.json"
    )
      .then((res) => res.json())
      .then((body) => {
        store.setStops(body);
      });
  }
  getTimetable() {
    fetch("https://ckan2.multimediagdansk.pl/delays")
      .then((res) => res.json())
      .then((body) => store.setTimetable(body));
  }
}
