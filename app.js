import { SocketIoServer } from "./api/socketIoServer.js";
import { ExpressServer } from "./api/expressServer.js";

export const appServer = new ExpressServer();
export const socketIoServer = new SocketIoServer(
  appServer.server,
  "http://localhost:3000/"
);
