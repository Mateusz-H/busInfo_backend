import { getNearestDate } from "./utils/dataUtils.js";

export const store = {
  stops: {},
  stopsWithIds: {},
  timetable: {},
  numberOfUsersInStopChannel: {},
  numberOfActiveUsers: 0,
  activeChannels: [],
  setStops: function (stops) {
    let dates = getNearestDate(Object.keys(stops));
    if (dates.length > 0) {
      this.stops = stops[dates[0]]?.stops;
      this.setStopsWithId();
    } else console.log("Cannot find any stop information");
    //todo add logger
  },
  setStopsWithId: function () {
    this.stops.forEach((x) => {
      let stopName = x.stopDesc.replace(" (N/Ż)", "").trimEnd();
      this.stopsWithIds[stopName]
        ? this.stopsWithIds[stopName].push(x.stopId)
        : (this.stopsWithIds[stopName] = [x.stopId]);
      this.numberOfUsersInStopChannel[stopName] = 0;
    });
    console.log(this.stopsWithIds);
  },
  setTimetable: function (timetable) {
    this.timetable = timetable;
  },
  incrementNumberOfUsersInStopChannel: function (stopName) {
    this.numberOfUsersInStopChannel[stopName] += 1;
  },
  decrementNumberOfUsersInStopChannel: function (stopName) {
    this.numberOfUsersInStopChannel[stopName] -= 1;
    if (this.numberOfUsersInStopChannel[stopName] < 0) {
      this.removeStopFromActiveChannels(stopName);
      this.numberOfUsersInStopChannel[stopName] = 0;
    }
  },
  addStopToActiveChannels: function (socket,stopName) {
    if(!socket.adapter.rooms.has(stopName))
    this.activeChannels.push(stopName);
  },
  removeStopFromActiveChannels: function (stopName) {
    const index = this.activeChannels.indexOf(stopName);
    if (index > -1) {
      this.activeChannels.splice(index, 1);
    }
  },
};
