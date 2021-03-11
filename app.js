import { SocketIoServer } from "./api/socketIoServer.js";
import { ExpressServer } from "./api/expressServer.js";
import {StopsService} from "./services/stopsService.js";
import {TimetablesService} from "./services/timetablesService.js";
import {RoutesService} from "./services/routesService.js";

export const appServer = new ExpressServer();
export const stopsService = new StopsService();
stopsService.getStops();
export const routesService = new RoutesService();
routesService.getRoutes();
export const timetablesService = new TimetablesService();
timetablesService.getTimetable();
export const socketIoServer = new SocketIoServer(
  appServer.server,
  "http://localhost:3000/"
);
