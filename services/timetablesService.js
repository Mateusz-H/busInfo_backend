import fetch from "node-fetch";
import { socketIoServer, stopsService } from "../app.js";
import { batchTimetables } from "../utils/dataUtils.js";

export class TimetablesService {
  timetable = {};
  upToDateInterval;
  constructor() {
    this.keepTimetableUpToDate();
  }
  getTimetable() {
    return fetch("https://ckan2.multimediagdansk.pl/delays")
      .then((res) => res.json())
      .then((body) => (this.timetable = body));
  }

  keepTimetableUpToDate() {
    this.upToDateInterval = setInterval(
      () => this.getTimetable().then(()=>this.updateUsersTimetables()),
      5000
    );
  }
  stopKeepingTimetableUpToDate() {
    clearInterval(this.upToDateInterval);
  }
  updateUsersTimetables() {
      console.log("Active channels:",socketIoServer.activeChannels)
    socketIoServer.activeChannels.forEach((stopName) => {
      socketIoServer.socketIo
        .to(stopName)
        .emit(
          "timetableReceive",
          batchTimetables(stopsService.stopsWithIds[stopName])
        );
    });
  }
}
