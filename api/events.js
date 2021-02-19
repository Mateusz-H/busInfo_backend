import {store} from "../sharedData.js";

export function onStopsRequest(socket){
    socket.emit("stopsReceive",store.stopsViewModel);
}