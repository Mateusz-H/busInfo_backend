import {Server} from "socket.io";
import {
    onConnectionRequest,
    onDisconnectRequest,
    onJoinToStopChannelRequest,
    onLeaveStopChannelRequest,
    onStopsRequest
} from "./events.js";

export class SocketIoServer{
    socketIo;
    constructor(serverInstance,baseUrl) {
         this.socketIo = new Server(serverInstance,{ cors: {
                origin: baseUrl,
                methods: ["websocket"]
            },path:"/api"});
         this.initializeDataEvents();
    }
    initializeDataEvents(){
        this.socketIo.on("connection", (socket) => {
            onConnectionRequest(socket);
            socket.on("disconnect", () => onDisconnectRequest(socket));
            socket.on("getStops", () => onStopsRequest(socket));
            socket.on("joinToStopChannel", (name) =>
                onJoinToStopChannelRequest(socket, name)
            );
            socket.on("leaveStopChannel", (name) =>
                onLeaveStopChannelRequest(socket, name)
            );
        })
    }
}