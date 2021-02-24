import express from "express";
import router from "./routes.js";

export class ExpressServer{
    serverApp;
    server;
    constructor() {
        this.serverApp = express();
        this.server = this.serverApp.listen(4000, () =>
            console.log("Server is listening on port 4000!")
        );
        this.serverApp.use(router);
    }
}
