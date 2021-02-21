import {store} from "../sharedData.js";
import {batchTimetables} from "../utils/dataUtils.js";

export function onStopsRequest(socket){
    socket.emit("stopsReceive",store.stopsWithIds);
}
export function onJoinToStopChannelRequest(socket,stopName){
    if(store.stopsWithIds.hasOwnProperty(stopName)){
        store.incrementNumberOfUsersInStopChannel(stopName);
        store.addStopToActiveChannels(stopName);
        socket.emit("timetableReceive",stopName,batchTimetables(store.stopsWithIds[stopName]));
    }
    else{
        socket.emit("badStopName",stopName);
    }
}