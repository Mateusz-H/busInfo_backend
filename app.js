import express from "express";
import router from "./api/routes.js";
import {SocketIoServer} from "./api/socketIoServer.js";
import {onConnection} from "./api/events.js";
import {ztmDataService} from "./services/ztmDataService.js";
import {store} from "./sharedData.js";

const serverApp = express();
const server = serverApp.listen(4000, () =>
    console.log("Server is listening on port 4000!")
);
serverApp.use(router);
const ztmData = new ztmDataService();
const socketIoServer = new SocketIoServer(server,"http://localhost:3000");
socketIoServer.on("connection",socket=>onConnection(socket));