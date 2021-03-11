import fetch from "node-fetch";
import { getNearestDate } from "../utils/dataUtils.js";

export class RoutesService {
  routes = {};
  constructor() {}
  getRoutes() {
    return fetch(
      "https://ckan.multimediagdansk.pl/dataset/c24aa637-3619-4dc2-a171-a23eec8f2172/resource/22313c56-5acf-41c7-a5fd-dc5dc72b3851/download/routes.json"
    )
      .then((res) => res.json())
      .then((body) => (this.setRoutes(body)))
  }
  setRoutes(routes) {
    let dates = getNearestDate(Object.keys(routes));
    if (dates.length > 0) {
      let routesArray = routes[dates[0]]?.routes;
      routesArray.forEach((route) => {
        this.routes[route.routeId] = route.routeShortName;
      });
      console.log(this.routes)
    } else console.log("Cannot find any routes information");
    //todo add logger
  }
}
