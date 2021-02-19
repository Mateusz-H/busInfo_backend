import {Server} from "socket.io";

export class SocketIoServer{
    constructor(serverInstance,baseUrl) {
        return new Server(serverInstance,{ cors: {
                origin: baseUrl,
                methods: ["websocket"]
            },path:"/api"});
    }
}