import { store } from "../sharedData.js";
import { batchTimetables } from "../utils/dataUtils.js";
import { ztmDataService } from "../services/ztmDataService.js";
import {socketIoServer} from "../app.js";

export function onStopsRequest(socket) {
  socket.emit("stopsReceive", store.stopsWithIds);
}
export function onJoinToStopChannelRequest(socket, stopName) {
  if (store.stopsWithIds.hasOwnProperty(stopName)) {
    store.incrementNumberOfUsersInStopChannel(stopName);
    store.addStopToActiveChannels(stopName);
    socket.join(stopName);
    socket.emit(
      "timetableReceive",
      stopName,
      batchTimetables(store.stopsWithIds[stopName])
    );
  } else {
    socket.emit("badStopName", stopName);
  }
}
export function onLeaveStopChannelRequest(socket, stopName) {
  store.decrementNumberOfUsersInStopChannel(stopName);
}
export function onConnectionRequest() {
  store.numberOfActiveUsers += 1;
  if (
    store.numberOfActiveUsers > 0 &&
    !ztmDataService.isTimetableIntervalActive
  ) {
    ztmDataService.startKeepingTimetableUpToDate();
  }
}
export function onDisconnectRequest() {
  store.numberOfActiveUsers -= 1;
  if (
    store.numberOfActiveUsers <= 0 &&
    ztmDataService.isTimetableIntervalActive
  ) {
    store.numberOfActiveUsers = 0;
    ztmDataService.stopKeepingTimetableUpToDate();
  }
}
export function sendNewTimetableToActiveChannels() {
  console.log("Sending new timbetable",store.activeChannels)
  store.activeChannels.forEach((channelName) => {
    socketIoServer.socketIo.to(channelName).emit(batchTimetables(store.stopsWithIds[channelName]));
  });
}
